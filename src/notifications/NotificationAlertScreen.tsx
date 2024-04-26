import React, { useEffect, useState } from "react";
import {
  AppState,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { MyText } from "../components/Text";
import { StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { BlurView } from "@react-native-community/blur";
import { keys } from "../config";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Costants from "expo-constants";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import { SubmitButton } from "../components/buttons";
import { useStoreReRender, useStoreState } from "../store";
import { Colors } from "../constant";
import { setPushNotificationToken } from "./setPushNotificationToken";
import { GradientHeaderBackground } from "../components/headers/GradientBbackground";

export const NotificationAlertScreen = () => {
  const [deined, setDeined] = useState(false);
  const [show, setShow] = useState(false);
  const [granted, setGranted] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(false);
  const isAuth = useStoreState((state) => state.auth.isAuthenticated);

  useStoreReRender();

  useEffect(() => {
    if (isAuth && !deined) checkPermission();
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active" && !granted && isAuth && !deined) {
        checkPermission();
      }
    });

    return () => subscription.remove();
  }, [isAuth, deined, granted]);

  const checkPermission = () => {
    Notifications.getPermissionsAsync().then((existingStatus) => {
      console.log("existingStatus", existingStatus);
      if (existingStatus.status !== "granted") {
        setShow(true);
        setCanAskAgain(existingStatus.canAskAgain);
      } else {
        onNotificationGranted();
      }
    });
  };

  const onNotificationGranted = () => {
    setShow(false);
    setGranted(true);
    // IMPOSTA IL PUSH TOKEN
    setTimeout(() => {
      console.log("setPushNotificationToken called");
      setPushNotificationToken();
    }, 5 * 1000);
  };

  const onPress = () => {
    if (!canAskAgain) {
      Linking.openSettings();
    } else {
      Notifications.requestPermissionsAsync().then((status) => {
        if (status.status !== "granted") {
          setShow(true);
          setCanAskAgain(status.canAskAgain);
        }
      });
    }
  };

  if (!show || !isAuth) return null;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Platform.OS === "ios" && (
        <BlurView
          blurRadius={Platform.OS === "ios" ? 15 : 25}
          blurType="dark"
          overlayColor="rgba(0,0,0,0.6)"
          blurAmount={Platform.OS === "ios" ? 30 : 100}
          style={StyleSheet.absoluteFillObject}
        ></BlurView>
      )}

      <View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            paddingTop: Costants.statusBarHeight + heightPercentageToDP(3),
          },

          Platform.OS === "android" && {
            backgroundColor: Colors.backgroundDark,
          },
        ]}
      >
        {Platform.OS === "android" && <GradientHeaderBackground />}
        <Animated.View
          entering={FadeInUp.duration(800).delay(350)}
          style={{
            maxHeight: heightPercentageToDP(7),
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ height: "100%", width: "100%" }}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(800).delay(400)}>
          <MyText color={Colors.whiteSmoke} style={{ textAlign: "center" }}>
            Ti da il benvenuto
          </MyText>
        </Animated.View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              width: "80%",
              height: "100%",
            }}
          >
            <Animated.View entering={FadeInUp.duration(800).delay(800)}>
              <MyText bold style={{}} size="title">
                {keys.APP_NAME} non è divertente senza notifiche!
              </MyText>
              <MyText
                style={{
                  marginTop: heightPercentageToDP(1),
                }}
              >
                {canAskAgain
                  ? "Non perderti alcuna funzionalità"
                  : "Abilita le notifiche dalle impostazioni dell'app"}
              </MyText>
            </Animated.View>
            <Animated.View entering={FadeInUp.duration(800).delay(1000)}>
              <SubmitButton
                onPress={onPress}
                title={canAskAgain ? "Consenti notifiche" : "Apri impostazioni"}
                style={{
                  marginTop: heightPercentageToDP(6),
                }}
                backgroundColor={Colors.whiteSmoke}
                textStyle={{ color: "#000" }}
              />
            </Animated.View>
            {Platform.OS == "ios" && (
              <Animated.View
                entering={FadeInUp.duration(800).delay(1000)}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  paddingBottom: heightPercentageToDP(4),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setShow(false);
                    setDeined(true);
                  }}
                >
                  <MyText bold style={{ textAlign: "center" }}>
                    Continua senza
                  </MyText>
                  <MyText light size="small" style={{ textAlign: "center" }}>
                    (rinunciando ad alcune funzionalità)
                  </MyText>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
