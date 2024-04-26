import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Blurhash } from "react-native-blurhash";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  Activity,
  ActivityType,
  GetFriendshipRequestsDocument,
  User,
  useAcceptFriendshipMutation,
} from "../../../generated/graphql";
import { ProfilePicture } from "../../../components/ProfilePicture";
import { Inline } from "../../../components/Inline";
import { MyText } from "../../../components/Text";
import { useStoreActions } from "../../../store";
import { timeSince } from "../../../helper/format";
import { useNavigation } from "@react-navigation/native";

interface ActivityFriendshipCardProps {
  activity: Activity;
}

export const ActivityFriendshipCard: React.FC<ActivityFriendshipCardProps> = ({
  activity,
}) => {
  const type = activity.type;

  const [acceptFriendshipMutation] = useAcceptFriendshipMutation();
  const openSnack = useStoreActions((a) => a.snackbar.open);
  const navigation = useNavigation();

  const onPress = () => {
    const userId = activity.data?.userPreview?.id;
    const userPreload = activity.data?.userPreview;

    if (!userId) return;

    navigation.navigate("OtherProfile", {
      userId,
      userPreload,
    });
  };

  const acceptRequest = async () => {
    const targetId = activity.data?.user.id;

    if (!targetId) return;

    try {
      const data = await acceptFriendshipMutation({
        variables: { targetId },
        optimisticResponse: {
          __typename: "Mutation",
          acceptFriendship: {
            __typename: "ProcessResult",
            success: true,
          },
        },
        update: (cache, { data }) => {
          if (!data?.acceptFriendship.success) return;
          const cachedData: any = cache.readQuery({
            query: GetFriendshipRequestsDocument,
          });
          if (cachedData) {
            // Rimuovi la richiesta di amicizia dalla lista
            cache.writeQuery({
              query: GetFriendshipRequestsDocument,
              data: {
                getFriendshipRequests: cachedData.getFriendshipRequests.filter(
                  (x: User) => x.id !== targetId
                ),
              },
            });
            // Elimina l'attività
            cache.modify({
              id: `Activity:${activity.id}`,
              fields: {
                _hidden: () => true,
              },
            });
          }
        },
      });
      if (data.data?.acceptFriendship.success) {
        openSnack({ message: "Richiesta accettata" });
      } else throw data.errors;
    } catch (e) {
      openSnack({ message: "Si è verificato un errore" });
      console.warn(e);
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Inline style={{ justifyContent: "flex-end", marginBottom: 5 }}>
        <MyText size="small" light mediumEmphasis>
          {timeSince(activity.createdAt)}
        </MyText>
      </Inline>
      <View
        style={{
          paddingVertical: heightPercentageToDP(1),
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Blurhash
          blurhash={activity.data?.user?.profilePicture.blurhash}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0,0,0,0.4)" },
          ]}
        />
        <Inline>
          <ProfilePicture
            height={heightPercentageToDP(10)}
            url={activity.data?.user?.profilePicture.url}
            style={{ marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            {type === ActivityType.FriendshipRequest && (
              <MyText>
                <MyText bold>{activity.data?.user?.username}</MyText> vuole
                essere tuo amico
              </MyText>
            )}
            {type === ActivityType.FriendshipAccepted && (
              <MyText>
                <MyText bold>{activity.data?.userPreview?.username}</MyText> ha
                accettato la tua richiesta di amicizia
              </MyText>
            )}
            {type === ActivityType.FriendshipRejected && (
              <MyText>
                <MyText bold>{activity.data?.user?.username}</MyText> ha
                rifiutato la tua richiesta di amicizia
              </MyText>
            )}

            {type === ActivityType.FriendshipRequest && (
              <Inline style={{ marginTop: heightPercentageToDP(1) }}>
                <TouchableOpacity
                  onPress={acceptRequest}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  <MyText dark size="small" bold>
                    Accetta
                  </MyText>
                </TouchableOpacity>
              </Inline>
            )}
          </View>
        </Inline>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});
