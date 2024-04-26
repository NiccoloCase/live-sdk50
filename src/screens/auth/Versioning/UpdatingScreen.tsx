import { View } from "react-native";
import React from "react";
import { MyText } from "../../../components/Text";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Spinner } from "../../../components/Spinner";
import { useTranslation } from "react-i18next";

export const UpdatingScreen = () => {
  const { t } = useTranslation("versioning-screens");
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Spinner color="#fff" big />
      <MyText size="big" bold style={{ marginTop: hp(6) }}>
        {t("updating")}
      </MyText>
    </View>
  );
};
