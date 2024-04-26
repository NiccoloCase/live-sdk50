import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Activity } from "../../../generated/graphql";
import { MyText } from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../../components/Image";

interface FriendFollowedEventCardProps {
  activity: Activity;
}

export const ActivityFriendFollowedEventCard: React.FC<
  FriendFollowedEventCardProps
> = ({ activity }) => {
  const navigation = useNavigation();

  const event = activity.data?.eventPreview;

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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("OtherProfile", {
            userId: activity.data?.userId,
            userPrload: undefined,
          });
        }}
      >
        <MyText>
          <MyText bold>{activity.data?.userUsername}</MyText> segue l'evento
        </MyText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <MyImage
          url={activity.data?.eventPreview?.image?.url}
          style={styles.image}
          blurhash={activity.data?.eventPreview?.image?.blurhash}
          height={MyDeliveryH.eventImage.small}
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
