import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import { Spacing } from "../../../constant";
import { InputText } from "../../../components/inputs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../../navigation";
import { FloatingButton, SubmitButton } from "../../../components/buttons";
import { SignInValidationSchema } from "../../../helper/validation";
import {
  useDeleteLoggedAccountMutation,
  useWhoamiQuery,
} from "../../../generated/graphql";
import { useStoreActions } from "../../../store";
import { MyText } from "../../../components/Text";
import Animated, { FadeInUp } from "react-native-reanimated";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Spinner } from "../../../components/Spinner";
import { logout } from "../../../helper/auth/logout";
import { useTranslation } from "react-i18next";

interface DeleteAccountFormValues {
  verificationInput: string;
}

export const DeleteAccountScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const me = useWhoamiQuery();
  const openSnack = useStoreActions((a) => a.snackbar.open);

  // FORM
  const formik = useFormik<DeleteAccountFormValues>({
    initialValues: {
      verificationInput: "",
    },
    onSubmit,
  });

  // GRAPHQL
  const [deleteAccountMutation] = useDeleteLoggedAccountMutation();

  async function askConfirmation() {
    Keyboard.dismiss();
    Alert.alert(
      t("delete-account-screen:warning.title"),
      t("delete-account-screen:warning.subtitle"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        { text: t("ok"), onPress: formik.submitForm },
      ]
    );
  }

  async function onSubmit() {
    try {
      const { data } = await deleteAccountMutation();
      if (data?.deleteLoggedAccount.success) {
        Alert.alert(
          "delete-account-screen:success.title",
          "delete-account-screen:success.subtitle"
        );
        logout(true);
      } else throw new Error();
    } catch (err: any) {
      console.warn(err);
      openSnack({
        message: t("errors.generic"),
      });
    }
  }

  const { values, errors, touched, handleChange, handleBlur } = formik;

  if (!me.data?.whoami.username) return null;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/** INPUT */}
            <Animated.View
              entering={FadeInUp.duration(500)}
              style={{
                zIndex: 100,
                flex: 1,
                marginTop: heightPercentageToDP(10),
              }}
            >
              <MyText bold>{t("delete-account-screen:label")}</MyText>
              <InputText
                autoCapitalize="none"
                placeholder={t("delete-account-screen:name-placeholder")}
                value={values.verificationInput}
                errorMessage={
                  touched.verificationInput
                    ? errors.verificationInput
                    : undefined
                }
                onChangeText={handleChange("verificationInput") as any}
                onBlur={handleBlur("verificationInput") as any}
                containerStyle={{ marginBottom: 0, marginHorizontal: 0 }}
              />
            </Animated.View>

            {/** SUBMIT */}
            <View style={{ zIndex: 1000, marginBottom: 50 }}>
              {formik.isValid &&
                formik.values.verificationInput ===
                  me.data?.whoami.username && (
                  <FloatingButton onPress={askConfirmation}>
                    {formik.isSubmitting ? (
                      <Spinner color="#fff" />
                    ) : (
                      <MyText bold>{t("next")}</MyText>
                    )}
                  </FloatingButton>
                )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
});
