import React from "react";
import { View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MyText } from "../../../components/Text";
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useTranslation } from "react-i18next";

interface WaitForConnectionScreenProps {
  whenConnectionIsBack: () => void;
}

export const WaitForConnectionScreen: React.FC<
  WaitForConnectionScreenProps
> = ({ whenConnectionIsBack }) => {
  const { t } = useTranslation("wait-for-connection-screen");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) whenConnectionIsBack();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MyText bold size="big" style={{ fontSize: hp(4), marginBottom: hp(2) }}>
        {t("title")}
      </MyText>
      <MyText>{t("subtitle")}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
