import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

export const Inline: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[styles.inline, style]} {...props} />;
};

const styles = StyleSheet.create({
  inline: { flexDirection: "row", alignItems: "center" },
});

export const inlineStyle = styles.inline;
