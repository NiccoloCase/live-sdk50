import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { MyText } from "../../Text";
import { Colors, Spacing } from "../../../constant";
import chroma from "chroma-js";
import { Inline, inlineStyle } from "../../Inline";
import { useTranslation } from "react-i18next";
import { BlurView } from "@react-native-community/blur";
import { Blurhash } from "react-native-blurhash";
import { Bubble } from "../../Bubble";

export const CompleteProfileCard = () => {
  const navigation = useNavigation();
  const { t } = useTranslation("components");

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Profile", {
          screen: "EditProfileScreen",
          initial: false,
        });
      }}
    >
      <View style={styles.container}>
        <View style={[styles.box, inlineStyle]}>
          {Platform.OS === "ios" ? (
            <>
              <Blurhash
                blurhash="LFK81A2|Z2OtM}fkxsafmjWrTfnh"
                style={[StyleSheet.absoluteFillObject, { opacity: 0.2 }]}
              />

              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: chroma(Colors.backgroundDark)
                    .alpha(0.1)
                    .hex(),
                }}
              />
              <Bubble top={10} left={-100} size={100} />
              <BlurView
                style={StyleSheet.absoluteFillObject}
                blurType="dark"
                blurAmount={35}
                blurRadius={20}
              />
            </>
          ) : (
            <>
              <Bubble
                top={10}
                left={-50}
                size={100}
                noAnimation
                opacity={0.2}
              />

              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: chroma(Colors.backgroundDark)
                    .alpha(0.1)
                    .hex(),
                }}
              />
            </>
          )}

          <Feather name="edit" size={hp(3)} color={Colors.whiteSmoke} />

          <View style={{ flex: 1, marginLeft: 15 }}>
            <MyText bold color={Colors.whiteSmoke}>
              {t("discover-carousel.complete-profile-card.title")}
            </MyText>
            <MyText
              light
              mediumEmphasis
              size="small"
              style={{ marginTop: heightPercentageToDP(0.45) }}
            >
              {t("discover-carousel.complete-profile-card.subtitle")}
            </MyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  box: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 15,
    width: "100%",
    height: "100%",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    justifyContent: "center",
    overflow: "hidden",
  },
});
