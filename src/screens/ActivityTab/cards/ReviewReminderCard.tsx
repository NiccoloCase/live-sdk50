import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Activity } from "../../../generated/graphql";
import { MyText } from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../../components/Image";
import { Inline, inlineStyle } from "../../../components/Inline";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Blurhash } from "react-native-blurhash";
import Feather from "@expo/vector-icons/Feather";
import StarRating from "react-native-star-rating-widget";

interface ActivityReviewReminderCardProps {
  activity: Activity;
}

export const ActivityReviewReminderCard: React.FC<
  ActivityReviewReminderCardProps
> = ({ activity }) => {
  const navigation = useNavigation();
  const [rating, setRating] = React.useState(0);

  const event = activity.data?.eventPreview;

  const onEventPress = () => {
    if (!event) return;
    navigation.navigate("Event", {
      screen: "EventScreen",
      params: {
        eventId: event?.id,
        preload: event,
      },
    });
  };

  const onReviewPress = (stars?: number) => {
    if (!event) return;
    navigation.navigate("Event", {
      screen: "CreateReviewScreen",
      params: {
        eventId: event?.id,
        rating: stars,
      },
    });
  };

  return (
    <View style={styles.btn}>
      <Blurhash
        blurhash={event.image?.blurhash || ""}
        style={StyleSheet.absoluteFillObject}
      />

      <Inline>
        <TouchableOpacity onPress={onEventPress}>
          <MyImage
            url={activity.data?.eventPreview?.image?.url}
            blurhash={activity.data?.eventPreview?.image?.blurhash}
            style={styles.image}
            height={MyDeliveryH.eventImage.small}
          />
        </TouchableOpacity>

        <TouchableOpacity disabled onPress={() => onReviewPress()}>
          <MyText size="big" bold>
            Lascia una recensione!
          </MyText>
          <MyText mediumEmphasis>Valuta la tua esperienza</MyText>

          <StarRating
            style={{
              marginLeft: -heightPercentageToDP(0.5),
              marginTop: 10,
            }}
            rating={rating || 0}
            starSize={heightPercentageToDP(3)}
            onChange={(rating) => {
              setRating(rating);
              onReviewPress(rating);
              setTimeout(() => setRating(0), 1000);
            }}
            enableSwiping={false}
            color={"#fff"}
            animationConfig={{ scale: 2 }}
          />
        </TouchableOpacity>
      </Inline>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    height: heightPercentageToDP(10),
    borderRadius: 10,
    marginRight: 10,
  },
  btn: {
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: widthPercentageToDP(3),
    marginTop: heightPercentageToDP(1),
  },
});
