import React from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import { Colors, Spacing } from "../../../constant";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeInLeft,
  FadeInUp,
  SlideInLeft,
} from "react-native-reanimated";
import Constants from "expo-constants";
import { BackButton } from "../../buttons";
import { MatchesButton } from "../../buttons/MatchesButton";
import { MyText } from "../../Text";
import { TouchableOpacity } from "react-native";
import { Inline } from "../../Inline";
import { SearchButton } from "../../buttons/SearchButton";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface LimitHeaderProps {
  closeButton?: boolean;
  hideNotification?: boolean;
  onFilterPress?: () => void;
  hideButtons?: boolean;
}

export const DiscoverHeader: React.FC<LimitHeaderProps> = ({
  closeButton,
  hideNotification,
  onFilterPress,
  hideButtons,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        {
          alignItems: "center",
          paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 0,
          //  Platform.OS == "android" ? insets.top : 0,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Animated.View entering={FadeInLeft.duration(500)}>
          <Image
            source={require("../../../../assets/images/logo.png")}
            style={{
              height: hp(9),
              aspectRatio: 431 / 231,
            }}
            resizeMode="contain"
          />
        </Animated.View>
        {/* <Animated.View entering={FadeInLeft.duration(300).delay(250)}>
          <MyText
            bold
            size="small"
            style={{ position: "absolute", bottom: 4, left: 4 }}
          >
            LocalNetwork
          </MyText>
        </Animated.View> */}
      </View>

      <Inline style={{}}>
        {!hideButtons && (
          <>
            {/* <Animated.View
              entering={FadeInUp.duration(600).springify().delay(200)}
              style={{ marginLeft: 10 }}
            >
              <MatchesButton />
            </Animated.View> */}
          </>
        )}
        {closeButton && (
          <Animated.View entering={FadeInUp.duration(900)}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="x" color="#fff" size={hp(3.6)} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </Inline>

      {onFilterPress && (
        <View style={[styles.btn, { right: 0 }]}>
          <TouchableOpacity onPress={onFilterPress}>
            <Animated.View
              style={{
                marginHorizontal: Spacing.screenHorizontalPadding,
                backgroundColor: Colors.backgroundLight,
                borderRadius: 20,
                paddingHorizontal: hp(1.5),
                paddingVertical: hp(1),
              }}
              entering={FadeInUp.duration(400)}
            >
              <MyText size="small" light>
                Filtra
              </MyText>
            </Animated.View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    // backgroundColor: Colors.backgroundDark,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  btn: {
    zIndex: 1000,
    position: "absolute",
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
});
