//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Colors } from "../../constant";
import { MyText } from "../Text";
import chroma from "chroma-js";
import { useWhoamiQuery } from "../../generated/graphql";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Inline } from "../Inline";

export const StatsCard = () => {
  const { data: me } = useWhoamiQuery();

  const interactionsPercentage =
    !me?.whoami.stats?.acceptedInteractionsCount ||
    !me?.whoami.stats?.sentInteractionsCount
      ? 0
      : Math.min(
          (me.whoami.stats.acceptedInteractionsCount /
            me.whoami.stats.sentInteractionsCount) *
            100,
          100
        );

  return (
    <Animated.View
      style={{
        //backgroundColor: Colors.backgroundLight,
        paddingVertical: hp(1),
        borderRadius: 20,
      }}
      entering={FadeInUp.duration(400).delay(450).springify()}
    >
      <Animated.View
        entering={FadeInUp.duration(400).delay(600)}
        style={{
          backgroundColor: Colors.backgroundLight,
          padding: hp(1),
          borderRadius: 20,
          marginBottom: hp(1),
        }}
      >
        <Inline>
          <AnimatedCircularProgress
            size={hp(11)}
            width={15}
            fill={interactionsPercentage}
            backgroundColor={Colors.darkGrey}
            tintColor={Colors.whiteSmoke}
            duration={4000}
            style={{ marginRight: widthPercentageToDP(4) }}
          >
            {(fill) => (
              <MyText
                bold
                size="big"
                color={chroma(Colors.whiteSmoke).alpha(1).hex()}
              >
                {fill < 1 ? fill.toFixed(1) : Math.floor(fill)}%
              </MyText>
            )}
          </AnimatedCircularProgress>
          <MyText
            size="small"
            bold
            mediumEmphasis
            color={chroma(Colors.whiteSmoke).alpha(1).hex()}
          >
            Interazioni ricambiate
          </MyText>
        </Inline>
      </Animated.View>

      <Inline>
        <Animated.View
          entering={FadeInUp.duration(400).delay(300)}
          style={{
            marginBottom: hp(2),
            backgroundColor: Colors.backgroundLight,
            padding: hp(2),
            borderRadius: 20,
            marginRight: hp(1),
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyText
            bold
            size="title"
            style={{ textAlign: "center" }}
            mediumEmphasis
          >
            {me?.whoami.stats?.sentInteractionsCount || 0}
          </MyText>
          <MyText size="extraSmall" bold mediumEmphasis>
            Interazioni inviate
          </MyText>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(450)}
          style={{
            marginBottom: hp(2),
            backgroundColor: Colors.backgroundLight,
            padding: hp(2),
            borderRadius: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyText
            bold
            size="title"
            style={{ textAlign: "center" }}
            mediumEmphasis
          >
            {me?.whoami.stats?.recivedInteractionsCount || 0}
          </MyText>
          <MyText size="extraSmall" bold mediumEmphasis>
            Interazioni ricevute
          </MyText>
        </Animated.View>
      </Inline>
    </Animated.View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});
