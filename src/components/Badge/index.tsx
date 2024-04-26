import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "../../constant";
import { FONT_SIZES } from "../Text";
import { FONT_BOLD } from "../../constant/typography";

interface BadgeProps {
  style?: StyleProp<ViewStyle>;
  count?: number;
  text?: string;
  color?: string;
  textStyle?: StyleProp<TextStyle>;
}
export const Badge: React.FC<BadgeProps> = ({
  style,
  count,
  text,
  color,
  textStyle,
}) => {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color || Colors.primary },
        style,
      ]}
    >
      <Text style={[styles.badgeInner, textStyle]}>
        {text ? text : count ? (count > 9 ? "9+" : count) : null}
      </Text>
    </View>
  );
};

const R = hp(1.2);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: R,
    height: R * 2,
    minWidth: R * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeInner: {
    textAlign: "center",
    color: Colors.whiteSmoke,
    fontSize: FONT_SIZES.small,
    fontFamily: FONT_BOLD,
  },
});
