import React from "react";
import { ActivityIndicator, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "../../constant";
import AnimatedLottieView from "lottie-react-native";

interface SpinnerProps {
  size?: number;
  big?: boolean;
}

export const PulseSpinner: React.FC<SpinnerProps> = ({
  size,
  big,
  ...props
}) => {
  const width = size
    ? size
    : big
    ? heightPercentageToDP(22)
    : heightPercentageToDP(12);

  return (
    <View
      style={{
        width: width,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatedLottieView
        source={require("../../../assets/lottie/loading_pulse_secondary.json")}
        autoPlay
        loop
        style={{
          width: width * 1.4,
          aspectRatio: 1,
          opacity: 0.7,
        }}
      ></AnimatedLottieView>
    </View>
  );
};
