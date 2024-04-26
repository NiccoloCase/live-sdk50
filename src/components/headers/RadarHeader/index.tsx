import React from "react";
import { StyleSheet, View, Image, Platform, Text } from "react-native";
import { Colors, Spacing } from "../../../constant";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Constants from "expo-constants";
import Animated, { FadeInUp } from "react-native-reanimated";
import { MyText } from "../../Text";

export const RadarHeader = () => {
  return (
    <View
      style={[
        styles.header,
        {
          marginTop: Platform.OS == "android" ? hp(1.5) : 0,
        },
      ]}
    >
      <Animated.View
        entering={FadeInUp.duration(500).springify()}
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: hp(3.5),
            color: "white",
            fontFamily: "Poppins",
          }}
        >
          SpotLive
        </Text>
        <Animated.View entering={FadeInUp.duration(500).delay(100).springify()}>
          <MyText bold mediumEmphasis style={{ marginTop: -10 }}>
            Radar
          </MyText>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: Spacing.screenHorizontalPadding,
    flexDirection: "row",
  },
});
