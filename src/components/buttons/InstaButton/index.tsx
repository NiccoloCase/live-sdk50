import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../../constant";

interface InstaButtonProps {
  radius: number;
  username: string;
  noBorder?: boolean;
}

export const InstaButton: React.FC<InstaButtonProps> = ({
  radius,
  username,
  noBorder,
}) => {
  const handleInstaPress = () => {
    if (!username) return;
    const url = `https://www.instagram.com/${username}`;
    Linking.openURL(url);
  };

  return (
    <Animated.View
      style={[
        {
          borderRadius: radius / 2,
          backgroundColor: Colors.secondary,
          overflow: "hidden",

          width: radius,
          height: radius,
          justifyContent: "center",
          alignItems: "center",
        },
        noBorder ? {} : { borderColor: "#000", borderWidth: 1.5 },
      ]}
      entering={FadeInUp.springify()}
      exiting={FadeOutUp.springify()}
    >
      <LinearGradient
        colors={["#FEDA75", "#FA7E1E", "#D62976", "#962FBF", "#4F5BD5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={handleInstaPress}
          style={{
            width: radius,
            height: radius,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="instagram" size={radius / 2} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};
