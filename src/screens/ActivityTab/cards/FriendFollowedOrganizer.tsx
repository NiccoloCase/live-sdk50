import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Activity,
  Organizer,
  OrganizerFieldsFragmentDoc,
  useGetOrganizerByIdLazyQuery,
} from "../../../generated/graphql";
import { MyText } from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../../components/Image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Inline } from "../../../components/Inline";
import { cache } from "../../../graphql/cache";

interface ActivityFriendFollowedOrganizerCardProps {
  activity: Activity;
}

export const ActivityFriendFollowedOrganizerCard: React.FC<
  ActivityFriendFollowedOrganizerCardProps
> = ({ activity }) => {
  const navigation = useNavigation();
  const [fetchOrganizer, { data: organizerData }] =
    useGetOrganizerByIdLazyQuery({
      fetchPolicy: "cache-first",
    });

  const [organizer, setOrganizer] = useState<Partial<Organizer> | null>(null);

  useEffect(() => {
    if (activity.data?.organizerId) {
      // Verifica se è già nella cache
      const fragment = cache.readFragment({
        id: "Organizer:" + String(activity.data?.organizerId),
        fragment: OrganizerFieldsFragmentDoc,
        fragmentName: "OrganizerFields",
      });

      if (fragment) {
        setOrganizer(fragment as any);
        return;
      }

      // Se non è nella cache, esegue la query
      fetchOrganizer({
        variables: { id: activity.data?.organizerId },
      }).then((res) => {
        if (res.data?.getOrganizerById)
          setOrganizer(res.data.getOrganizerById as any);
      });
    }
  }, [activity]);

  const username = activity.data?.userUsername;

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
              blurhash={organizer.image?.blurhash}
              style={{
                height: heightPercentageToDP(7),
                aspectRatio: 1,
                borderRadius: 10,
                marginRight: 10,
              }}
              height={MyDeliveryH.organizerImage.small}
            />

            <View style={{ flex: 1 }}>
              <MyText mediumEmphasis>
                {username} ha inizato a seguire{" "}
                <MyText bold>{organizer.name}</MyText>
              </MyText>
            </View>
          </Inline>
        </TouchableOpacity>
      )}
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
