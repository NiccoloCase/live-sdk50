import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Animated, { FadeInUp } from "react-native-reanimated";
import { inlineStyle } from "../../Inline";
import { BackButton } from "../../buttons";
import { MyText } from "../../Text";
import Costants from "expo-constants";

interface DoubleHeaderProps {
  title: string;
  subtitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const DoubleHeader: React.FC<DoubleHeaderProps> = ({
  title,
  subtitle,
  containerStyle,
}) => {
  return (
    <Animated.View
      style={[
        {
          marginTop: hp(2),
          marginBottom: hp(4),
          ...inlineStyle,
          width: "100%",
          paddingTop: Platform.OS == "android" ? Costants.statusBarHeight : 0,
        },
        containerStyle,
      ]}
    >
      <BackButton />
      <View style={{ marginLeft: widthPercentageToDP(2), flex: 1 }}>
        <Animated.View entering={FadeInUp.springify()}>
          <MyText bold size="title">
            {title}
          </MyText>
        </Animated.View>
        <Animated.View
          style={{ width: "100%" }}
          entering={FadeInUp.springify().delay(200)}
        >
          <MyText style={{ marginTop: 5 }}>{subtitle}</MyText>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});
