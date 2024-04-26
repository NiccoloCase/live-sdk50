import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MyText } from "../../../components/Text";
import { Colors, Spacing } from "../../../constant";
import { useWhoamiQuery } from "../../../generated/graphql";
import { useTranslation } from "react-i18next";

export const BanScreen = () => {
  const { data } = useWhoamiQuery();
  const { t } = useTranslation("ban-screen");

  if (!data || !data.whoami.ban?.banned) return null;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <MyText size="big" bold>
          {t("title")}
        </MyText>
        <MyText bold mediumEmphasis>
          {t("subtitle")}
        </MyText>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.backgroundDark,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
