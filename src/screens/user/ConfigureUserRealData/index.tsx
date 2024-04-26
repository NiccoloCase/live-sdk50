//import liraries
import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { AppStackParamList } from "../../../navigation";
import { DoubleHeader } from "../../../components/headers";

export const ConfigureUserRealDataScreen: React.FC<
  StackScreenProps<AppStackParamList, "ConfigureUserRealDataScreen">
> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DoubleHeader
        title="Configura il tuo profilo"
        subtitle="Prima di continuare configura il tuo profilo"
      />
      <Text>ConfigureUserRealDataScreen:React.FC</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
