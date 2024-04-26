import React, { Children, useContext, useEffect } from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors, Typography } from "../../constant";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { ViewStyle } from "react-native-phone-input";
import translate from "translate";
import { TextTranslationContext } from "../MyAutoTranslated";
import { getCurrentLanguage } from "../../helper/i18next";

export const FONT_SIZES = {
  title: 23,
  big: 18,
  medium: 15,
  small: 12,
  extraSmall: 9.5,
  inputLabel: 14,
};

interface MyTextProp extends TextProps {
  style?: StyleProp<TextStyle>;
  size?: "big" | "small" | "medium" | "title" | "inputLabel" | "extraSmall";
  bold?: boolean;
  light?: boolean;
  color?: string;
  mediumEmphasis?: boolean;
  dark?: boolean;
  opacity?: number;
  autoTranslation?: boolean;
  noAutoTranslation?: boolean;
  chainprinter?: boolean;
}

export const MyText: React.FC<MyTextProp> = ({
  children,
  style,
  size,
  bold,
  light,
  color,
  mediumEmphasis,
  dark,
  autoTranslation,
  noAutoTranslation,
  opacity,
  chainprinter,
  ...other
}) => {
  const fontSize = FONT_SIZES[size || "medium"];

  const { translation: isTranslationContext } = useContext(
    TextTranslationContext
  );
  const [translatedText, setTranslatedText] = React.useState("");

  // useEffect(() => {
  //   if (
  //     automaticTranslation &&
  //     typeof children === "string" &&
  //     children.length > 0
  //   ) {
  //     // console.log("text: ", children);
  //     translate(children, { from: "it", to: "en" }).then((res) => {
  //       //     console.log("translated: ", res);
  //       setTranslatedText(res);
  //     });
  //   }
  // }, [automaticTranslation]);

  const translateText = () => {
    if (typeof children === "string" && children.length > 0) {
      const language = getCurrentLanguage();
      if (language !== "it") {
        translate(children, { from: "it", to: language }).then((res) => {
          setTranslatedText(res);
        });
      }
    }
  };

  useEffect(() => {
    if (isTranslationContext && !noAutoTranslation) {
      translateText();
    } else {
      setTranslatedText("");
    }
  }, [isTranslationContext, noAutoTranslation, children]);

  return (
    <Text
      {...other}
      style={[
        {
          fontSize,
          color: !!color ? color : dark ? Colors.backgroundDark : "#fff",
          fontFamily: bold
            ? Typography.FONT_BOLD
            : light
            ? Typography.FONT_LIGHT
            : chainprinter
            ? Typography.FONT_CHAINPRINTER
            : Typography.FONT_REGULAR,

          opacity: mediumEmphasis
            ? Typography.mediumEmphasisOpacity
            : opacity || 1,
        },
        style,
      ]}
    >
      {translatedText || children}
    </Text>
  );
};

interface MyAnimatedTextProp extends MyTextProp {
  delay?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const MyAnimatedText: React.FC<MyAnimatedTextProp> = ({
  children,
  delay,
  containerStyle,
  ...props
}) => {
  return (
    <Animated.View
      // @ts-ignore
      style={containerStyle}
      entering={FadeInUp.delay(delay || 0)}
      exiting={FadeOutUp}
    >
      <MyText {...props}>{children}</MyText>
    </Animated.View>
  );
};
