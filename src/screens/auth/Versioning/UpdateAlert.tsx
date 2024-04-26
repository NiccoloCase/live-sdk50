import { StyleSheet, View } from "react-native";
import React from "react";
import { MyText } from "../../../components/Text";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { formatShortDay, formatTime } from "../../../helper/format";
import { SubmitButton } from "../../../components/buttons";
import { useStoreActions, useStoreState } from "../../../store";
import { Colors } from "../../../constant";

export const UpdateAlertScreen = () => {
  const nextMajorVersion = useStoreState((s) => s.versioning.nextMajorVersion);
  const setNextMajorVersion = useStoreActions(
    (a) => a.versioning.setNextMajorVersion
  );
  const isAuth = useStoreState((s) => s.auth.isAuthenticated);

  //  if (!isAuth) return null;

  return null;

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: "space-around",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: wp(5),
          paddingVertical: hp(3),
          backgroundColor: Colors.backgroundLight,
          borderRadius: 10,
        },
      ]}
    >
      <View>
        <MyText
          size="title"
          bold
          style={{ marginBottom: hp(6), textAlign: "center" }}
        >
          Tempo di rinnovamento!
        </MyText>
        <MyText size="big" style={{ marginBottom: hp(4), textAlign: "center" }}>
          Il {formatShortDay(new Date(), true)} la versione di questa app in uso
          non sarà più supportata. Aggiorna l'app il più presto possibile per
          continuare ad usarla
        </MyText>
      </View>

      <SubmitButton
        title="Ho capito"
        containerStyle={{ width: "100%" }}
        onPress={() => {
          setNextMajorVersion(undefined);
        }}
      />
    </View>
  );
};
