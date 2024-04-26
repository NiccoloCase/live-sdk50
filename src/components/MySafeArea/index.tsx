//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// create a component
const MySafeArea: React.FC<any> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingTop: insets.top }}>{children}</View>;
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

//make this component available to the app
export default MySafeArea;
