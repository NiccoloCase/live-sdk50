import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "../../../store";
import { Colors, Spacing } from "../../../constant";
import { MyText } from "../../Text";
import { Platform, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TAB_BAR_HEIGHT } from "../../TabBar";
import { BlurView } from "expo-blur";

export const SnackbarComponent: React.FC = () => {
  const isOpen = useStoreState((s) => s.snackbar.isOpen);
  const message = useStoreState((s) => s.snackbar.message);
  const close = useStoreActions((s) => s.snackbar.close);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        close();
      }, 2500);
    }
  }, [isOpen]);

  const safe = useSafeAreaInsets();

  return (
    <>
      {isOpen && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={{
            position: "absolute",
            bottom:
              TAB_BAR_HEIGHT +
              heightPercentageToDP(1) +
              (Platform.OS == "android" ? safe.bottom : 0),

            left: widthPercentageToDP(15),
            right: widthPercentageToDP(15),
            minHeight: heightPercentageToDP(6),
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          {Platform.OS == "android" && (
            <View
              style={{
                backgroundColor: Colors.backgroundDark,
                opacity: 0.9,
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
            />
          )}

          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            intensity={Platform.OS == "android" ? 100 : 60}
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <MyText bold size="small" style={{ textAlign: "center" }}>
              {message}
            </MyText>
          </View>
        </Animated.View>
      )}
    </>
  );
};
