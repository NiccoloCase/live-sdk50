import React from "react";
import { View, StatusBar, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import { StyleSheet } from "react-native";
import { Spinner } from "../../../components/Spinner";

interface SplashScreenProps {}
export const SplashScreen: React.FC<SplashScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.backgroundDark} />
      <Image
        source={require("../../../../assets/splash.png")}
        style={{ width: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    justifyContent: "center",
    alignItems: "center",
  },
});
