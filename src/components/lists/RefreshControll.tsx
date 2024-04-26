import { Platform, RefreshControlProps } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Colors } from "../../constant";

export const myRefreshControl = (props: RefreshControlProps) => {
  return (
    <RefreshControl
      colors={Platform.OS === "android" ? [Colors.darkGrey] : undefined}
      tintColor={Colors.whiteSmoke}
      {...props}
    />
  );
};
