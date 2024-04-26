import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors, Typography } from "../../../constant";
import { Feather } from "@expo/vector-icons";
import { FONT_SIZES } from "../../Text";
import hexToRgba from "hex-to-rgba";
import { TextInputProps } from "react-native";

interface ExploreSearchBarProps extends TextInputProps {
  setValue: (value: string) => void;
  value: string;
  showSearchResults?: boolean;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText: (t: string) => void;
  onSearchPress?: () => void;
  textColor?: string;
  showX?: boolean;
}

export const SearchBar: React.FC<ExploreSearchBarProps> = ({
  value,
  setValue,
  showSearchResults,
  placeholder,
  containerStyle,
  onSearchPress,
  onChangeText,
  textColor,
  showX,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        style={[styles.input, textColor ? { color: textColor } : undefined]}
        placeholder={placeholder}
        placeholderTextColor={
          props.placeholderTextColor || textColor || Colors.whiteSmoke
        }
        value={value}
        onChangeText={(t) => {
          setValue(t);
          onChangeText(t);
        }}
      />

      {showSearchResults ? (
        <TouchableOpacity
          onPress={() => {
            setValue("");
            onChangeText("");
          }}
        >
          <Feather
            name="x"
            size={hp(3.5)}
            color={textColor || Colors.lightGrey}
          />
        </TouchableOpacity>
      ) : showX && (value == " " || value.length > 0) ? (
        <TouchableOpacity
          onPress={() => {
            onChangeText("");
            setValue("");
          }}
        >
          <Feather
            name="x"
            size={hp(2.7)}
            color={textColor || Colors.lightGrey}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSearchPress}>
          <Feather
            name="search"
            size={hp(2.7)}
            color={textColor || Colors.lightGrey}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(1.5),
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: hp(1.7),
    fontSize: FONT_SIZES.medium,
    fontFamily: Typography.FONT_BOLD,
    color: Colors.whiteSmoke,
    marginLeft: wp(2.5),
  },
});
