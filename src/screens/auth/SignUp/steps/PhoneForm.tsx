import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors, Spacing } from "../../../../constant";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { FONT_SIZES, MyText } from "../../../../components/Text";
import PhoneInput from "react-native-phone-input";
import { useFormik } from "formik";
import { PhoneFormValidationSchema } from "../../../../helper/validation";
import { FloatingButton } from "../../../../components/buttons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Spinner } from "../../../../components/Spinner";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { TraslucentFloatingButton } from "../../../../components/buttons/FloatingButton/TraslucentFloatingButton";

interface FormProps {
  phoneNumber: string;
}

interface PhoneFormProps {
  next: () => void;
  signInWithPhoneNumber(number: string): void;
}

export const PhoneForm: React.FC<PhoneFormProps> = ({
  next,
  signInWithPhoneNumber,
}) => {
  const { t } = useTranslation();
  const ref = useRef<PhoneInput>(null);
  const formik = useFormik<FormProps>({
    initialValues: { phoneNumber: "" },
    validationSchema: PhoneFormValidationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      console.log({ values });
      await signInWithPhoneNumber(values.phoneNumber);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      ref.current?.blur();
      ref?.current?.focus();
    }, 1);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            entering={FadeInDown.delay(100).duration(900).springify()}
          >
            <View style={{ height: "70%" }}>
              <MyText mediumEmphasis size="small">
                {t("signup-screen:phone-label")}
              </MyText>

              <View style={styles.inputWrapper}>
                <PhoneInput
                  ref={ref}
                  disabled={formik.isSubmitting}
                  onChangePhoneNumber={(value) =>
                    formik.setFieldValue("phoneNumber", value)
                  }
                  style={{
                    paddingVertical: heightPercentageToDP(2),
                  }}
                  //textProps={{ autoFocus: true }}
                  buttonTextStyle={{
                    paddingVertical: heightPercentageToDP(0),
                  }}
                  textStyle={{
                    fontSize: FONT_SIZES.medium,
                    color: "#fff",
                    height: heightPercentageToDP(5),
                  }}
                  initialCountry="it"
                  autoFormat
                  cancelText="Annulla"
                  confirmText="Conferma"
                />
              </View>
            </View>
          </Animated.View>

          {formik.isValid && (
            <TraslucentFloatingButton onPress={formik.handleSubmit}>
              {formik.isSubmitting ? (
                <Spinner color="#fff" />
              ) : (
                <>
                  <MyText bold style={{ marginRight: 10 }}>
                    {t("next")}
                  </MyText>
                  <Feather name="chevron-right" size={24} color="white" />
                </>
              )}
            </TraslucentFloatingButton>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(2),
    flex: 1,
  },
  inputWrapper: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    paddingHorizontal: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(1),
  },
});
