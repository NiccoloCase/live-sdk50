//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MyImage } from "../../../components/Image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Spacing } from "../../../constant";
import { MyText } from "../../../components/Text";
import hexToRgba from "hex-to-rgba";
import { RegionCard } from "./RegionCard";

// create a component
const Regions = () => {
  const disabled = false;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        scrollEnabled={!disabled}
        contentContainerStyle={{
          paddingHorizontal: Spacing.screenHorizontalPadding,
        }}
      >
        <RegionCard disabled={disabled} />
        <RegionCard disabled={disabled} />
        <RegionCard disabled={disabled} />
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginHorizontal: -Spacing.screenHorizontalPadding,
  },
});

//make this component available to the app
export default Regions;
