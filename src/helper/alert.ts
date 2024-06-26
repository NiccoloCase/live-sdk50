import { Platform, Alert } from "react-native";

const alertPolyfill = (
  title: string,
  description?: string,
  options?: any,
  extra?: any
) => {
  const result = window.confirm(
    [title, description].filter(Boolean).join("\n")
  );

  if (result) {
    const confirmOption = options?.find(({ style }: any) => style !== "cancel");
    confirmOption && confirmOption.onPress();
  } else {
    const cancelOption = options?.find(({ style }: any) => style === "cancel");
    cancelOption && cancelOption.onPress();
  }
};

const alert = Platform.OS === "web" ? alertPolyfill : Alert.alert;

export default alert;
