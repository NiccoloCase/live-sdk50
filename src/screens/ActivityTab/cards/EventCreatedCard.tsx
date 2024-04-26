import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Activity,
  useGetOrganizerByIdLazyQuery,
  useGetOrganizerByIdQuery,
} from "../../../generated/graphql";
import { MyText } from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../../components/Image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Inline } from "../../../components/Inline";

interface ActivityEventCreatedCardProps {
  activity: Activity;
}

export const ActivityEventCreatedCard: React.FC<
  ActivityEventCreatedCardProps
> = ({ activity }) => {
  const navigation = useNavigation();
  const [fetchOrganizer, { data: organizerData }] =
    useGetOrganizerByIdLazyQuery({
      fetchPolicy: "cache-first",
    });

  useEffect(() => {
    if (activity.data?.organizerId)
      fetchOrganizer({
        variables: { id: activity.data?.organizerId },
      });
  }, [activity]);

  const event = activity.data?.eventPreview;
  const organizer = organizerData?.getOrganizerById;

  const onPress = () => {
    if (!event) return;
    navigation.navigate("Event", {
      screen: "EventScreen",
      params: {
        eventId: event?.id,
        preload: event,
      },
    });
  };

  return (
    <>
      {organizer && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Event", {
              screen: "OrganizerScreen",
              params: {
                organizerId: organizer.id,
                preload: organizer,
              },
            });
          }}
        >
          <Inline style={{}}>
            <MyImage
              url={organizer?.image?.url}
              height={MyDeliveryH.organizerImage.small}
              blurhash={organizer.image?.blurhash}
              style={{
                height: heightPercentageToDP(7),
                aspectRatio: 1,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <View>
              <MyText>{organizer?.name}</MyText>
              <MyText mediumEmphasis size="small" style={{ marginTop: 2 }}>
                ha pubblicato un nuovo evento
              </MyText>
            </View>
          </Inline>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onPress}>
        <MyImage
          height={MyDeliveryH.eventImage.small}
          url={activity.data?.eventPreview?.image?.url}
          style={styles.image}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 10,
    marginTop: 5,
  },
});
