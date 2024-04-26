import React from "react";
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Colors } from "../../../constant";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ErrorText, MyText } from "../../Text";
import { Platform } from "react-native";

interface TextAreaProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  containerStyle,
  errorMessage,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <MyText bold style={styles.title} size="inputLabel">
        {label}
      </MyText>
      <TextInput
        multiline={true}
        style={[styles.input, props.style]}
        placeholderTextColor={Colors.lightGrey}
        {...props}
      />
      <ErrorText>{errorMessage}</ErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 5,
    color: Colors.lightGrey,
  },
  input: {
    backgroundColor: Colors.backgroundLight,
    textAlignVertical: "top",
    borderRadius: 14,
    fontSize: hp(2.3),
    color: "#fff",
    padding: 10,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
    minHeight: hp(15),
    paddingVertical: hp(2),
  },
});
