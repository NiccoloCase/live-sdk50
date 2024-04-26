import React from "react";
import { ActivityIndicator } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "../../constant";

interface SpinnerProps {
  color?: string;
  size?: number;
  big?: boolean;
  dark?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size,
  big,
  color,
  dark,
  ...props
}) => {
  return (
    <ActivityIndicator
      color={color ? color : dark ? Colors.darkGrey : "#fff"}
      size={size || (big ? heightPercentageToDP(6) : heightPercentageToDP(3))}
      {...props}
    />
  );
};
