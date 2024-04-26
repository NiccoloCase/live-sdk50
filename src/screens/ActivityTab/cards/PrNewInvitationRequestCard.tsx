import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Activity } from "../../../generated/graphql";
import { MyText } from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../../components/Image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import { timeSince } from "../../../helper/format";
import { Blurhash } from "react-native-blurhash";
import { Inline } from "../../../components/Inline";

interface PrNewInvitationRequestCardProps {
  activity: Activity;
}

export const PrNewInvitationRequestCard: React.FC<
  PrNewInvitationRequestCardProps
> = ({ activity }) => {
  const navigation = useNavigation();

  const event = activity?.data?.eventPreview;

  const onPress = () => {
    if (!event) return;
    navigation.navigate("EventManager", {
      screen: "PrEventScreen",
      params: {
        eventId: event?.id,
        preload: event,
      },
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Inline
        style={{
          borderRadius: 20,
          overflow: "hidden",
          paddingVertical: heightPercentageToDP(1),
          paddingHorizontal: heightPercentageToDP(1),
        }}
      >
        <Blurhash
          blurhash={event?.image?.blurhash}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: Colors.backgroundDark,
              opacity: 0.5,
            },
          ]}
        />
        <MyImage
          url={event.image?.url}
          style={{
            aspectRatio: 1,
            height: heightPercentageToDP(10),
            borderRadius: 10,
            marginRight: 10,
          }}
          height={MyDeliveryH.eventImage.small}
        />

        <View style={{ flex: 1 }}>
          <MyText bold>Nuova richiesta!</MyText>
          <MyText mediumEmphasis size="small" style={{ marginTop: 4 }}>
            {activity.data?.userPreview?.username} ti ha inviato una richiesta
            per l'evento {event?.title}
          </MyText>
          <MyText size="small" light mediumEmphasis style={{ marginTop: 5 }}>
            {timeSince(activity.createdAt)}
          </MyText>
        </View>
      </Inline>
    </TouchableOpacity>
  );
};
