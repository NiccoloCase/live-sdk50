import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MyAnimatedText, MyText } from "../../components/Text";
import { Colors, Spacing } from "../../constant";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { keys } from "../../config";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";

interface HomeWelcomeProps {
  isActive: boolean;
}

export const HomeWelcome: React.FC<HomeWelcomeProps> = ({ isActive }) => {
  if (isActive) return null;

  const { t } = useTranslation();

  const [width, setWidth] = useState(0);

  return (
    <View style={styles.container}>
      <MyAnimatedText bold size="title">
        {t("radar-screen:welcome.title")}
      </MyAnimatedText>
      <MyAnimatedText delay={400} style={{ marginTop: hp(2) }}>
        {t("radar-screen:welcome.subtitle")}
      </MyAnimatedText>

      <Animated.View
        style={{
          marginTop: hp(2),
          flexDirection: "row",
        }}
        entering={FadeInLeft.delay(500).duration(400)}
        exiting={FadeOut}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={{ width: 3, height: "100%" }}
        />
        <MyText
          mediumEmphasis
          style={{ paddingLeft: hp(1), paddingVertical: hp(1) }}
        >
          {t("radar-screen:welcome.description1")}
        </MyText>
      </Animated.View>

      {/* <Animated.View
        entering={FadeInLeft.delay(900).duration(400)}
        exiting={FadeOut}
        style={{
          borderLeftWidth: 3,
          borderColor: Colors.secondary,
          paddingVertical: hp(1),
          paddingHorizontal: hp(1),
          marginTop: hp(2),
        }}
      >
        <MyText mediumEmphasis>
          <Trans i18nKey={"radar-screen:welcome.description2"}>
            <MyText bold></MyText>
          </Trans>
        </MyText>
      </Animated.View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(7),
  },
});
