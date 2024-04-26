import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../../constant";
import { HeaderTitle } from "../../Text/HeaderTitle";

export const ChatHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle title="Chat" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingTop: 15,
    paddingBottom: 5,
    flexDirection: "row",
    backgroundColor: Colors.backgroundDark,
    position: "relative",
  },
});
