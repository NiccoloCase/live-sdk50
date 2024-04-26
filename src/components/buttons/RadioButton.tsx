//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  TouchableOpacity,
} from "react-native";
import Animated, { withTiming } from "react-native-reanimated";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "../../constant";

interface MyRadioButtonProps extends ViewProps {
  isSelected: boolean;
  onSelect: () => void;
  color?: string;
}

export const MyRadioButton: React.FC<MyRadioButtonProps> = ({
  children,
  isSelected,
  onSelect,
  style,
  color,
  ...props
}) => {
  const size = heightPercentageToDP(2.75);

  const _color = color || Colors.primary;

  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      {...props}
      onPress={() => {
        if (isSelected) return;
        onSelect();
      }}
    >
      <View
        style={[
          styles.button,
          {
            height: size,
            borderRadius: size / 2,
            borderColor: _color,
            borderWidth: 2,
          },
        ]}
      >
        <View
          style={{
            height: size * 0.6,
            borderRadius: size * 0.3,
            aspectRatio: 1,
            backgroundColor: _color,
            opacity: isSelected ? 1 : 0,
          }}
        />
      </View>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
  },
});
