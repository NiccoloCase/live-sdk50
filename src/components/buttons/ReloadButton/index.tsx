import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { MyText } from "../../Text";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../../constant";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Inline } from "../../Inline";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface ReloadButtonProps {
  loading?: boolean;
  onPress?: () => void;
}
export const ReloadButton: React.FC<ReloadButtonProps> = ({
  onPress,
  loading,
}) => {
  const spin = useSharedValue(0);

  useEffect(() => {
    if (loading)
      spin.value = withRepeat(
        withTiming(360, { duration: 1100, easing: Easing.linear }),
        -1
      );
    else spin.value = 0;
  }, [loading]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spin.value}deg` }],
    };
  }, [spin]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Inline
        style={{
          backgroundColor: Colors.backgroundLight,
          paddingHorizontal: widthPercentageToDP(4),
          paddingVertical: heightPercentageToDP(1.6),
          borderRadius: 10,
        }}
      >
        <MyText bold style={{ marginRight: 10 }}>
          Ricarica
        </MyText>
        <Animated.View style={animatedIconStyle}>
          <Feather
            name="refresh-cw"
            size={heightPercentageToDP(2)}
            color="#fff"
          />
        </Animated.View>
      </Inline>
    </TouchableOpacity>
  );
};
