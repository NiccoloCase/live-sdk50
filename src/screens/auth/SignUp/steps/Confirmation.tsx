import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Spacing } from "../../../../constant";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { MyText } from "../../../../components/Text";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Spinner } from "../../../../components/Spinner";
import { UnderlineCodeInput } from "../../../../components/inputs";
import { useTranslation, Trans } from "react-i18next";
import { TraslucentFloatingButton } from "../../../../components/buttons/FloatingButton/TraslucentFloatingButton";

interface ConfirmationFormProps {
  verfyCode: (code: string) => void;
  phoneNumber?: string;
}
// TODO: resend code
export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
  verfyCode,
  phoneNumber,
}) => {
  const { t } = useTranslation();
  const [filled, setFilled] = useState(false);
  const [code, setCode] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      if (code) await verfyCode(code);

      setFilled(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ height: "70%" }}
        entering={FadeInUp.duration(900)}
      >
        <UnderlineCodeInput
          onFill={(code) => {
            setFilled(true);
            setCode(code);
          }}
          onCodeChange={(code) => {
            if (code.length < 6) setFilled(false);
          }}
        />

        <MyText
          light
          mediumEmphasis
          style={{
            marginTop: heightPercentageToDP(2),
            paddingHorizontal: 20,
          }}
          color={"#fff"}
        >
          <Trans
            i18nKey="signup-screen:verificationCodeText"
            values={{ phoneNumber }}
          >
            Inserisci il codice di verifica inviato a
            <MyText>{phoneNumber}</MyText>
          </Trans>
        </MyText>
      </Animated.View>

      {filled && (
        <TraslucentFloatingButton onPress={submit} disabled={loading}>
          {loading ? (
            <Spinner color="#fff" />
          ) : (
            <MyText bold>{t("next")}</MyText>
          )}
        </TraslucentFloatingButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingTop: hp(2),
    flexGrow: 1,
    justifyContent: "center",
    // backgroundColor: "orange",
  },
});
