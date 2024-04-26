import * as React from "react";
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableHighlightProps,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Spacing, Typography } from "../../../constant";
import { Spinner } from "../../Spinner";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { FONT_SIZES } from "../../Text";

export const SUBMIT_BUTTON_HEIGHT = Math.max(65, hp(8.2));

interface SubmitButtonProps extends TouchableHighlightProps {
  /** titolo del bottone */
  title?: string;
  subtitle?: string;
  /** Stile del bottone */
  containerStyle?: StyleProp<ViewStyle>;
  /** Stile del titolo */
  textStyle?: StyleProp<TextStyle>;
  /** Se sta caricandp */
  isLoading?: boolean;
  /** Se ha posizione absolute   */
  floating?: boolean;
  /** Se animare l'entrata del bottone */
  animate?: boolean;
  /** Ritardo nell'animazione */
  animationDelay?: number;
  /** Colore di sfondo statico */
  backgroundColor?: string;
  spinnerColor?: string;
  colors?: string[];
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  subtitle,
  containerStyle,
  textStyle,
  isLoading,
  colors,
  children,
  disabled,
  floating,
  animate,
  backgroundColor,
  animationDelay,
  spinnerColor,
  ...props
}) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => (animation.value = withSpring(1)), animationDelay || 0);
  }, []);

  const content = isLoading ? (
    <Spinner color={spinnerColor || "#fff"} size={35} />
  ) : (
    <View>
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle]}>{subtitle}</Text>}
    </View>
  );

  return (
    <Animated.View
      entering={animate ? FadeInDown.delay(100) : undefined}
      exiting={animate ? FadeOutDown : undefined}
      style={[
        floating && {
          position: "absolute",
          bottom: 0,
          left: Spacing.screenHorizontalPadding,
          right: Spacing.screenHorizontalPadding,
        },
        containerStyle as any,
      ]}
    >
      <TouchableOpacity
        {...props}
        disabled={disabled || isLoading}
        accessibilityLabel={title}
      >
        <LinearGradient
          style={[
            styles.button,
            ,
            {
              opacity: disabled || isLoading ? 0.6 : 1,
              backgroundColor: backgroundColor || Colors.primary,
            },
          ]}
          colors={
            backgroundColor
              ? [backgroundColor, backgroundColor]
              : colors
              ? colors
              : [Colors.primary, Colors.secondary]
          }
          start={[0, 1]}
          end={[1, 0]}
        >
          {children ? children : content}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    maxWidth: 500,
    width: "100%",
    height: SUBMIT_BUTTON_HEIGHT,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: widthPercentageToDP(3),
  },
  text: {
    color: "#fff",
    fontSize: FONT_SIZES.big,
    fontFamily: Typography.FONT_BOLD,
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    fontSize: FONT_SIZES.medium,
    fontFamily: Typography.FONT_LIGHT,
    textAlign: "center",
  },
});
