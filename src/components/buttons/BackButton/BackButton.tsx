import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import hexToRgba from "hex-to-rgba";

export const BackButton: React.FC<
  TouchableOpacityProps & {
    x?: boolean;
    rounded?: boolean;
    onlyIcon?: boolean;
  }
> = ({ x, onlyIcon, rounded, ...props }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      accessibilityLabel="Indietro"
      accessibilityHint="Torna indietro"
      disabled={onlyIcon}
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
      {...props}
      style={[rounded && styles.roundedHeaderButton]}
    >
      {x ? (
        <Feather
          name="x"
          color={"#fff"}
          size={heightPercentageToDP(3.6)}
          style={{
            padding: 4,
          }}
        />
      ) : (
        <Feather
          name="chevron-left"
          color={"#fff"}
          size={heightPercentageToDP(3.3)}
          style={{
            padding: 4,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const HEADER_BTN_WIDTH = Math.max(heightPercentageToDP(4.7), 40);

const styles = StyleSheet.create({
  roundedHeaderButton: {
    width: HEADER_BTN_WIDTH,
    borderRadius: 16,
    aspectRatio: 1,
    overflow: "hidden",
    backgroundColor: hexToRgba(Colors.backgroundLightBright, 0.5),
    justifyContent: "center",
    alignItems: "center",
  },
});
