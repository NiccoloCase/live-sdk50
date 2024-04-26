import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";
import hexToRgba from "hex-to-rgba";
import { Colors, Spacing } from "../../../constant";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const FLOATING_BUTTON_HEIGHT = Math.max(hp(7), 55);

const MARGIN = hp(1);

interface FloatingButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  index?: number;
  minor?: boolean;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  translucent?: boolean;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  onPress,
  index,
  minor,
  disabled,
  top,
  left,
  right,
  bottom: defaultBottom,
  translucent,
  accessibilityLabel,
}) => {
  let bottom =
    typeof defaultBottom === "number"
      ? defaultBottom
      : hp(10) + (index || 0) * (FLOATING_BUTTON_HEIGHT + MARGIN);

  return (
    <View
      style={[
        styles.container,
        {
          top: top,
          left: left,
          bottom,
          right:
            typeof right === "number"
              ? right
              : typeof left === "number"
              ? undefined
              : Spacing.screenHorizontalPadding,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
      >
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={[
            styles.floatingBtn,
            {
              backgroundColor: minor
                ? hexToRgba(Colors.whiteSmoke, 0.75)
                : hexToRgba(Colors.primary, translucent ? 0.9 : 1),
            },
          ]}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  floatingBtn: {
    minHeight: FLOATING_BUTTON_HEIGHT,
    minWidth: FLOATING_BUTTON_HEIGHT,
    borderRadius: 20,
    marginTop: hp(0.8),
    paddingHorizontal: wp(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
