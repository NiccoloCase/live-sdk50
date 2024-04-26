import React from "react";
import { TextProps } from "react-native";
import { Colors, Typography } from "../../constant";
import { MyText } from "./MyText";

interface HeaderTitleProps extends TextProps {
  title: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  style,
  ...other
}) => {
  return (
    <MyText
      size="title"
      style={[
        {
          fontFamily: Typography.FONT_BOLD,
        },
        style,
      ]}
      {...other}
    >
      {title}
    </MyText>
  );
};
