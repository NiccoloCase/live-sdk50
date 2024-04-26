//import liraries
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
import { Colors } from "../../../constant";
import QRCode from "react-native-qrcode-svg";
import { FONT_CHAINPRINTER } from "../../../constant/typography";
import { useNavigation } from "@react-navigation/native";

interface ActivityTicketCardProps {
  activity: Activity;
}
const CUT_RADIUS = 15;

export const ActivityTicketCard: React.FC<ActivityTicketCardProps> = ({
  activity,
}) => {
  const navigation = useNavigation();

  const event = activity.data?.eventPreview;

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const onPress = () => {
    if (!event) return;
    navigation.navigate("Event", {
      screen: "TicketScreen",
      params: {
        eventId: event?.id,
        event: event,
      },
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Inline style={{ marginBottom: 5 }}>
        <MyText style={{ flex: 1 }} size="small" light>
          Hai un nuovo biglietto
        </MyText>
        <MyText size="small" light mediumEmphasis>
          {timeSince(activity.createdAt)}
        </MyText>
      </Inline>
      <Inline
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setWidth(width);
          setHeight(height);
        }}
        style={styles.container}
      >
        <QRCode
          value="CIAO DA SPOTLIVE!"
          size={heightPercentageToDP(10)}
          color={"#000"}
          backgroundColor={"#fff"}
        />

        <MyText
          bold
          dark
          style={{
            marginLeft: heightPercentageToDP(2),
            fontFamily: FONT_CHAINPRINTER,
          }}
        >
          {event?.title}
        </MyText>

        <View
          style={{
            position: "absolute",
            top: height / 2 - CUT_RADIUS,
            left: -CUT_RADIUS,
            width: CUT_RADIUS * 2,
            aspectRatio: 1,
            backgroundColor: Colors.backgroundDark,
            borderRadius: CUT_RADIUS,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: height / 2 - CUT_RADIUS,
            right: -CUT_RADIUS,
            width: CUT_RADIUS * 2,
            aspectRatio: 1,
            backgroundColor: Colors.backgroundDark,
            borderRadius: CUT_RADIUS,
          }}
        />
      </Inline>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: heightPercentageToDP(1.15),
    paddingHorizontal: Math.max(heightPercentageToDP(1), CUT_RADIUS + 5),
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.whiteSmoke,
  },
});
