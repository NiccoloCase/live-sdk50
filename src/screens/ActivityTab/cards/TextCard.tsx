import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Activity } from "../../../generated/graphql";
import { MyText } from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { MyImage } from "../../../components/Image";
import { Inline, inlineStyle } from "../../../components/Inline";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Blurhash } from "react-native-blurhash";
import Feather from "@expo/vector-icons/Feather";
import StarRating from "react-native-star-rating-widget";
import { Colors } from "../../../constant";
import { hideActivity } from "../services";

interface ActivityTextCardProps {
  activity: Activity;
}

export const ActivityTextCard: React.FC<ActivityTextCardProps> = ({
  activity,
}) => {
  const body = activity.data?.body;
  const title = activity.data?.title;

  useEffect(() => {
    if (!title && !body) hideActivity(activity.id);
  }, [title, body]);

  if (!title && !body) return null;

  return (
    <View style={styles.card}>
      <MyText bold size="big">
        {title}
      </MyText>
      {body && (
        <MyText mediumEmphasis style={{ marginTop: heightPercentageToDP(1) }}>
          {body}
        </MyText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 10,
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
    backgroundColor: Colors.backgroundLight,
  },
});
