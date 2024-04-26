import React, { useEffect, useMemo } from "react";
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
import {
  useGetSchoolByIdLazyQuery,
  useWhoamiQuery,
} from "../../../generated/graphql";
import { inlineStyle } from "../../Inline";
import { useTranslation } from "react-i18next";
import { BlurView } from "@react-native-community/blur";
import { Bubble } from "../../Bubble";
import { Blurhash } from "react-native-blurhash";

export const RadarCarouselCard = () => {
  const navigation = useNavigation();
  const { data: me } = useWhoamiQuery();

  return (
    <TouchableOpacity
      onPress={() => {
        if (
          !me?.whoami.stats?.spottedCount ||
          me.whoami.stats?.spottedCount < 1
        )
          navigation.navigate("RadarTab", { screen: "RadarScreen" });
        else navigation.navigate("MySpotsScreen");
      }}
    >
      <View style={styles.container}>
        <View style={[styles.box, inlineStyle]}>
          {Platform.OS === "ios" ? (
            <>
              <Bubble top={0} right={-10} offsetY={-70} />
              <Bubble
                bottom={-60}
                left={-20}
                colors={[Colors.primary, Colors.primary]}
              />

              <BlurView
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                blurType="dark"
                blurAmount={35}
                blurRadius={20}
              />
            </>
          ) : (
            <>
              <Bubble top={0} right={-40} size={200} noAnimation />
              <Bubble
                top={-53}
                left={-20}
                colors={[Colors.primary, Colors.primary]}
                noAnimation
              />
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: chroma(Colors.backgroundDark)
                    .alpha(0.6)
                    .hex(),
                }}
              />
              <Blurhash
                blurhash="LFK81A2|Z2OtM}fkxsafmjWrTfnh"
                style={[StyleSheet.absoluteFillObject, { opacity: 0.2 }]}
              />
            </>
          )}
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
    overflow: "hidden",
    backgroundColor: Colors.backgroundLight,
    borderRadius: 15,
    width: "100%",
    height: "100%",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    justifyContent: "space-around",
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    position: "absolute",
    right: -Spacing.screenHorizontalPadding,
    top: -10,
    borderRadius: 10,
    zIndex: 100,
    elevation: 100,
  },
});
