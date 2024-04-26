import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MyImage, MyDeliveryH } from "../../../components/Image";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Blurhash } from "react-native-blurhash";
import { Colors } from "../../../constant";
import { Inline } from "../../../components/Inline";
import { MyText } from "../../../components/Text";
import { timeSince } from "../../../helper/format";
import { Event } from "../../../generated/graphql";
import { useNavigation } from "@react-navigation/native";
import { FONT_CHAINPRINTER } from "../../../constant/typography";

interface EventAttentedCardProps {
  userId: string;
  event: Partial<Event>;
  backgroundColor?: string;
}

export const EventAttentedCard: React.FC<EventAttentedCardProps> = ({
  userId,
  event,
  backgroundColor,
}) => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Event", {
          screen: "EventScreen",
          params: {
            eventId: event.id,
            preload: event,
          },
        });
      }}
    >
      <View
        style={styles.container}
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <Blurhash
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          blurhash={event.image?.blurhash || ""}
        />
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />

        <Inline>
          <MyImage
            width={250}
            style={{
              aspectRatio: 1,
              height: heightPercentageToDP(10),
              borderRadius: 16,
            }}
            url={event.image?.url}
            height={MyDeliveryH.eventImage.small}
          />
          <View style={{ marginLeft: widthPercentageToDP(2), flex: 1 }}>
            <MyText
              bold
              style={{
                fontFamily: FONT_CHAINPRINTER,
              }}
            >
              {event.title?.toUpperCase()}
            </MyText>
            <MyText
              style={{
                marginTop: heightPercentageToDP(1),
                fontFamily: FONT_CHAINPRINTER,
              }}
              mediumEmphasis
              bold
              size="small"
            >
              {timeSince(event.date)}
            </MyText>
          </View>
        </Inline>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: height / 2 + 5,
          left: -10,
          right: 0,
          width: 18,
          aspectRatio: 1,
          borderRadius: 10,
          backgroundColor: backgroundColor || Colors.backgroundLight,
          zIndex: 100,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: height / 2 + 5,
          right: -10,
          width: 18,
          aspectRatio: 1,
          borderRadius: 10,
          backgroundColor: backgroundColor || Colors.backgroundLight,
          zIndex: 100,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: "hidden",
    paddingVertical: 10,
    paddingHorizontal: widthPercentageToDP(4.3),
    backgroundColor: Colors.backgroundPrimary,
    marginBottom: heightPercentageToDP(2),
  },
});
