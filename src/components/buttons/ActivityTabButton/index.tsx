import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Badge } from "../../Badge";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import {
  useHasUnseenActivitiesQuery,
  useWhoamiQuery,
} from "../../../generated/graphql";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const RADIUS = hp(0.8);

interface ActivityTabButtonProps {
  color: string;
  size: number;
  isBadgeVisible?: boolean;
}

export const ActivityTabButton: React.FC<ActivityTabButtonProps> = ({
  color,
  size,
  isBadgeVisible,
}) => {
  const { data } = useHasUnseenActivitiesQuery({
    fetchPolicy: "cache-and-network",
  });

  const hasUnseenActivities = data?.hasUnseenActivities;

  const showBadge =
    (typeof isBadgeVisible === "boolean" && isBadgeVisible) ||
    hasUnseenActivities;

  return (
    <View>
      <FontAwesome5 name="heart" size={size} color={color} />
      {showBadge && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            styles.badge,
            {
              bottom: 0 - RADIUS - 2,
              right: size / 2 - RADIUS / 2,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: "relative" },
  badge: {
    position: "absolute",

    aspectRatio: 1,
    width: RADIUS,
    backgroundColor: Colors.secondary,
    borderRadius: hp(1),
  },
});
