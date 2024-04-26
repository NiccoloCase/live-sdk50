import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StyleProp,
} from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import hexToRgba from "hex-to-rgba";
import { Colors, Spacing } from "../../../constant";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Bubble } from "../../Bubble";
import { BlurView as ExpoBlur } from "expo-blur";
import { ViewStyle } from "react-native-phone-input";

export const FLOATING_BUTTON_HEIGHT = Math.max(hp(7.8), 55);

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
  accessibilityLabel?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const TraslucentFloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  onPress,
  index,
  minor,
  disabled,
  top,
  left,
  right,
  bottom: defaultBottom,
  style,
  accessibilityLabel,
}) => {
  let bottom =
    typeof defaultBottom === "number"
      ? defaultBottom
      : hp(7) + (index || 0) * (FLOATING_BUTTON_HEIGHT + MARGIN);

  return (
    <View
      style={[
        styles.container,
        {
          ...(style as any),
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
          entering={FadeInDown.springify()}
          exiting={FadeOutDown}
          style={[styles.floatingBtn]}
        >
          {Platform.OS === "ios" ? null : (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: hexToRgba(Colors.backgroundDark, 0.75) },
              ]}
            />
          )}

          <ExpoBlur
            style={[StyleSheet.absoluteFill]}
            tint="light"
            intensity={40}
          />

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
    borderRadius: 18,
    marginTop: hp(0.8),
    paddingHorizontal: wp(5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
