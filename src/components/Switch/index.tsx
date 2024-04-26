import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { Colors } from "../../constant";

interface MySwitchProps {
  isEnabled?: boolean;
  setIsEnabled: (value: boolean) => void;
}
export const MySwitch: React.FC<MySwitchProps> = ({
  isEnabled,
  setIsEnabled,
}) => {
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <Switch
      trackColor={{ false: Colors.darkGrey, true: Colors.primary }}
      thumbColor={Colors.whiteSmoke}
      ios_backgroundColor={Colors.darkGrey}
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={{ transform: [{ scaleX: 1.07 }, { scaleY: 1.07 }] }}
    />
  );
};
