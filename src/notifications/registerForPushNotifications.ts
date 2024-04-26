import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { keys } from "../config";

export const getExpoPushToken = async (): Promise<string | undefined> => {
  if (Device.isDevice) {
    // CANALE NOTIFICHE
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: keys.EXPO_PROJECT_ID,
      })
    ).data;
    console.log("Push token: ", token);

    return token;
  } else {
    console.log("Not real device. Skipping push notifications registration.");
  }
};
