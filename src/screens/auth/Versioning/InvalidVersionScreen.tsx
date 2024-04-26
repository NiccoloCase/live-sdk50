import { View } from "react-native";
import React from "react";
import { MyText } from "../../../components/Text";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";

export const InvalidVersionScreen = () => {
  const { t } = useTranslation("versioning-screens");
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: hp(5),
      }}
    >
      <MyText size="title" bold style={{ marginBottom: hp(4) }}>
        {t("version-invalid")}
      </MyText>
      <MyText style={{ textAlign: "center" }}>
        {t("version-invalid-subtitle")}
      </MyText>
    </View>
  );
};
