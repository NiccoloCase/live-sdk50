//import liraries
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import chroma from "chroma-js";

const MASK_COLORS = [
  chroma(Colors.backgroundDark).alpha(0).hex(),
  chroma(Colors.backgroundDark).alpha(1).hex(),
];

export const GradientHeaderBackground: React.FC<{
  height?: number;
}> = ({ height }) => {
  const _height = height || heightPercentageToDP(25);

  return (
    <>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary, Colors.backgroundDark]}
        style={[styles.gradient, { height: _height }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/** mask gradient */}
      <LinearGradient
        colors={MASK_COLORS}
        style={[styles.mask, { height: _height }]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    opacity: 0.25,
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,

    zIndex: -1,
  },
});
