import React from "react";
import { TextProps, StyleProp, TextStyle } from "react-native";
import { Colors } from "../../constant";
import { MyText } from "./MyText";

interface ErrorTextProp extends TextProps {
  style?: StyleProp<TextStyle>;
  bold?: boolean;
}

export const ErrorText: React.FC<ErrorTextProp> = ({
  style,
  bold,
  ...other
}) => {
  return (
    <MyText
      bold={bold || false}
      size="small"
      style={[{ color: Colors.errorRed }, style]}
      {...other}
    />
  );
};
