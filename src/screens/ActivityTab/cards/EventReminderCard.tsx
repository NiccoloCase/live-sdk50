import React, { useMemo } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Activity,
  Event,
  useGetEventByIdQuery,
} from "../../../generated/graphql";
import { MyText } from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../../components/Image";
import { Blurhash } from "react-native-blurhash";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Inline } from "../../../components/Inline";
import Feather from "@expo/vector-icons/Feather";
import { formatTime, timeSince } from "../../../helper/format";
import { Colors } from "../../../constant";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

interface ActivityEventReminderCardProps {
  activity: Activity;
}

const PADDING_HORIZONTAL = widthPercentageToDP(5);
const HOLE_RADIUS = PADDING_HORIZONTAL * (3 / 5);

export const ActivityEventReminderCard: React.FC<
  ActivityEventReminderCardProps
> = ({ activity }) => {
  const navigation = useNavigation();

  const eventId = activity.data?.eventPreview?.id;

  const [cardHeight, setCardHeight] = React.useState(0);

  const { data } = useGetEventByIdQuery({
    variables: {
      id: eventId,
    },
    fetchPolicy: "cache-first", // Usa la cache se disponibile
  });

  const event = useMemo(() => {
    return (data?.getEventById ||
      activity.data?.eventPreview) as Partial<Event>;
  }, [data, activity]);

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
      <Inline>
        <View style={{ flex: 1, paddingRight: 20 }}>
          <MyText size="big" bold>
            Non mancare!
          </MyText>
          <MyText mediumEmphasis size="small">
            Oggi si svogle un evento che ti interessa
          </MyText>
        </View>
        <MyText mediumEmphasis light size="small">
          {timeSince(activity.createdAt)}
        </MyText>
      </Inline>
      <TouchableOpacity
        onPress={onPress}
        style={styles.card}
        onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)}
      >
        <Blurhash
          blurhash={event.image?.blurhash || ""}
          style={StyleSheet.absoluteFillObject}
        />
        <MyImage
          url={event?.image?.url}
          style={styles.image}
          height={MyDeliveryH.eventImage.small}
          blurhash={event?.image?.blurhash}
        />

        <View
          style={{
            paddingTop: heightPercentageToDP(2),
            flex: 1,
          }}
        >
          <MyText size="big" chainprinter>
            {event.title}
          </MyText>
          {event.date && (
            <Inline style={{ marginTop: heightPercentageToDP(2) }}>
              <Feather
                name="calendar"
                color={Colors.whiteSmoke}
                size={heightPercentageToDP(2.5)}
                style={{ marginRight: 5 }}
              />
              <MyText mediumEmphasis chainprinter>
                {formatTime(event.date)}
              </MyText>
            </Inline>
          )}

          {event.location?.locationText && (
            <Inline style={{ marginTop: heightPercentageToDP(2) }}>
              <Feather
                name="map-pin"
                color={Colors.whiteSmoke}
                size={heightPercentageToDP(2.5)}
                style={{ marginRight: 5 }}
              />
              <MyText mediumEmphasis style={{ flex: 1 }} chainprinter>
                {event.location?.locationText}
              </MyText>
            </Inline>
          )}
        </View>

        <Animated.View
          entering={Platform.OS === "android" ? FadeIn : undefined}
          style={{
            position: "absolute",
            backgroundColor: Colors.backgroundDark,
            top: cardHeight / 2 - HOLE_RADIUS,
            left: -HOLE_RADIUS,
            height: HOLE_RADIUS * 2,
            aspectRatio: 1,
            borderRadius: HOLE_RADIUS,
          }}
        />

        <Animated.View
          entering={Platform.OS === "android" ? FadeIn : undefined}
          style={{
            position: "absolute",
            backgroundColor: Colors.backgroundDark,
            top: cardHeight / 2 - HOLE_RADIUS,
            right: -HOLE_RADIUS,
            height: HOLE_RADIUS * 2,
            aspectRatio: 1,
            borderRadius: HOLE_RADIUS,
          }}
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
  },
  card: {
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: widthPercentageToDP(4),
    marginTop: heightPercentageToDP(1),
  },
});
