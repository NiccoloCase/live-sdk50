import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Platform, SafeAreaView, Vibration, View } from "react-native";
import { Colors } from "../../constant";
import { RadarStackParamList } from "../../navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { MyText } from "../../components/Text";
import { StyleSheet } from "react-native";
import { SUBMIT_BUTTON_HEIGHT, SubmitButton } from "../../components/buttons";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RadarHeader } from "../../components/headers";

export const RadarScreen: React.FC<
  StackScreenProps<RadarStackParamList, "Radar">
> = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <RadarHeader />

      <SubmitButton
        containerStyle={{ flex: 1 }}
        backgroundColor={false ? undefined : "#fff"}
        animate
        animationDelay={1000}
        disabled={true}
      >
        <MyText color={false ? "#fff" : Colors.primary}>Start</MyText>
      </SubmitButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    paddingTop: hp(3.5),
  },
});
