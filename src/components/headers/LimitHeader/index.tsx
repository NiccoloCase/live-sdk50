import React from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import { Colors, Spacing } from "../../../constant";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";
import Constants from "expo-constants";
import { BackButton } from "../../buttons";
import { MatchesButton } from "../../buttons/MatchesButton";
import { MyText } from "../../Text";
import { TouchableOpacity } from "react-native";

interface LimitHeaderProps {
  back?: boolean;
  hideNotification?: boolean;
  onFilterPress?: () => void;
}

export const LimitHeader: React.FC<LimitHeaderProps> = ({
  back,
  hideNotification,
  onFilterPress,
}) => {
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
      {back ? (
        <View style={styles.btn}>
          <BackButton />
        </View>
      ) : (
        <Animated.View entering={FadeInUp.duration(900)} style={styles.btn}>
          <MatchesButton />
        </Animated.View>
      )}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View entering={FadeInUp.duration(900)}>
          <Image
            source={require("../../../../assets/images/logoxlimit.png")}
            style={{
              height: hp(9),
              aspectRatio: 431 / 231,
            }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      {!hideNotification ? (
        <Animated.View
          style={[styles.btn, { right: 0 }]}
          entering={FadeInUp.duration(900)}
        >
          <NotificationButton />
        </Animated.View>
      ) : null}

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
    backgroundColor: Colors.backgroundDark,
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
