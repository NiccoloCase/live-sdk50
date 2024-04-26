import React from "react";
import {
  View,
  StyleSheet,
  Linking,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { InputText } from "../../../../components/inputs";
import { Colors, Spacing } from "../../../../constant";
import { ScrollView } from "react-native-gesture-handler";
import {
  FLOATING_BUTTON_HEIGHT,
  FloatingButton,
} from "../../../../components/buttons";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useFormik } from "formik";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SignupValidationSchema } from "../../../../helper/validation";
import { Inline } from "../../../../components/Inline";
import { STATIC } from "../../../../helper/APIs/myApi";
import Checkbox from "expo-checkbox";
import { MyText } from "../../../../components/Text";
import { Spinner } from "../../../../components/Spinner";

interface UserFormProps {
  submit: (username: string) => void;
}

interface SignUpFormValues {
  username: string;
  checkbox: boolean;
}

export const UserForm: React.FC<UserFormProps> = (props) => {
  const formik = useFormik<SignUpFormValues>({
    initialValues: { username: "", checkbox: false },
    validationSchema: SignupValidationSchema,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await props.submit(values.username);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View
              style={{ height: "100%", paddingTop: heightPercentageToDP(5) }}
            >
              <Animated.View
                entering={FadeInUp.duration(500)}
                style={{
                  marginBottom: heightPercentageToDP(1),
                }}
              >
                <InputText
                  label="Il tuo nome utente"
                  readonly={formik.isSubmitting}
                  onChangeText={formik.handleChange("username")}
                  onBlur={formik.handleBlur("username")}
                  value={formik.values.username}
                  errorMessage={
                    formik.touched.username ? formik.errors.username : undefined
                  }
                />
              </Animated.View>

              <Animated.View entering={FadeInUp.duration(500).delay(700)}>
                <Inline style={{ marginTop: hp(2.5) }}>
                  <Checkbox
                    style={styles.checkbox}
                    value={formik.values.checkbox}
                    onValueChange={(c) => formik.setFieldValue("checkbox", c)}
                    color={formik.values.checkbox ? Colors.primary : undefined}
                  />
                  <MyText style={{ flex: 1 }}>
                    Accetto i{" "}
                    <MyText
                      style={{ textDecorationLine: "underline" }}
                      onPress={() =>
                        Linking.openURL(STATIC.TERMS_OF_SERVICE_URL)
                      }
                    >
                      termini e condizioni
                    </MyText>{" "}
                    e le
                    <MyText
                      style={{ textDecorationLine: "underline" }}
                      onPress={() => Linking.openURL(STATIC.PRIVACY_POLICY_URL)}
                    >
                      {" "}
                      normative sulla privacy
                    </MyText>
                  </MyText>
                </Inline>
              </Animated.View>
            </View>

            <View style={{ zIndex: 1000 }}>
              {formik.isValid && (
                <FloatingButton onPress={formik.handleSubmit}>
                  {formik.isSubmitting ? (
                    <Spinner color="#fff" />
                  ) : (
                    <MyText bold>Continua</MyText>
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
    // paddingHorizontal: Spacing.screenHorizontalPadding,
    // paddingTop: hp(2),
    // paddingBottom: FLOATING_BUTTON_HEIGHT + hp(3),
    // flexGrow: 1,

    flex: 1,
    paddingVertical: 10,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
  text: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  checkbox: {
    marginRight: widthPercentageToDP(3.5),
    borderColor: Colors.darkGrey,
  },
});
