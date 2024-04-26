import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { ModalComponent } from "../ModalComponent";
import { MyText } from "../../Text";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { InputText } from "../../inputs";
import { Colors } from "../../../constant";
import { useWhoamiQuery } from "../../../generated/graphql";
import { useFormik } from "formik";
import { ContactInfoFormValidationSchema } from "../../../helper/validation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { primary } from "../../../constant/colors";
import { ScrollView } from "react-native-gesture-handler";

interface SetContactInfoModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelected: (option?: ContactInfoFormValues) => void;
}

interface ContactInfoFormValues {
  name: string;
  phoneNumber?: string;
  wsNumber?: string;
  instagram?: string;
  types: string[];
}

export const SetContactInfoModal: React.FC<SetContactInfoModalProps> = ({
  isOpen,
  setIsOpen,
  onSelected,
}) => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const formik = useFormik({
    initialValues: {
      name: "",
      types: [],
    },
    validationSchema: ContactInfoFormValidationSchema,
    onSubmit: (values: ContactInfoFormValues) => {
      setIsOpen(false);

      if (values.types.length === 0) {
        onSelected(undefined);
        return;
      }

      const payload: any = { ...values };

      if (!values.types.includes("phone") && values.phoneNumber)
        delete payload.phoneNumber;
      if (!values.types.includes("ws") && values.wsNumber)
        delete payload.wsNumber;
      if (!values.types.includes("insta") && values.instagram)
        delete payload.instagram;

      // Delete the types field
      delete payload.types;

      onSelected(payload);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const { data: me } = useWhoamiQuery();

  useEffect(() => {
    if (me) {
      if (!formik.values.name) {
        if (me.whoami.firstName)
          formik.setFieldValue("name", me.whoami.firstName);
        else if (me.whoami.lastName)
          formik.setFieldValue("name", me.whoami.lastName);
        else if (me.whoami.username)
          formik.setFieldValue("name", me.whoami.username);
      }

      if (!formik.values.phoneNumber) {
        if (me?.whoami?.phoneNumber)
          formik.setFieldValue("phoneNumber", me.whoami.phoneNumber);
      }
      if (!formik.values.wsNumber) {
        if (me?.whoami?.phoneNumber)
          formik.setFieldValue("wsNumber", me?.whoami?.phoneNumber);
      }

      if (!formik.values.instagram) {
        if (me?.whoami?.links?.instagramName)
          formik.setFieldValue("instagram", me?.whoami?.links?.instagramName);
      }
    }
  }, [me]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  const renderContent = () => {
    return (
      <>
        <MyText
          mediumEmphasis
          style={{
            marginTop: heightPercentageToDP(2),
            marginBottom: heightPercentageToDP(3),
          }}
        >
          Inserisci le informazioni che vuoi condividere con i tuoi clienti.
        </MyText>

        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <InputText
            label="Il tuo nome di contatto"
            value={values.name}
            errorMessage={touched.name ? errors.name : undefined}
            onChangeText={handleChange("name") as any}
            onBlur={handleBlur("name") as any}
            containerStyle={{ marginHorizontal: 0 }}
          />

          <MyText
            bold
            style={{
              marginTop: heightPercentageToDP(1),
              marginBottom: heightPercentageToDP(3),
            }}
          >
            Come vuoi essere contattato?
          </MyText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => {
                if (formik.values.types.includes("phone"))
                  formik.setFieldValue(
                    "types",
                    formik.values.types.filter((type) => type !== "phone")
                  );
                else
                  formik.setFieldValue("types", [
                    ...formik.values.types,
                    "phone",
                  ]);
              }}
            >
              <Checkbox
                color={primary}
                style={{ alignSelf: "center", marginBottom: 10 }}
                value={formik.values.types.includes("phone")}
                pointerEvents="none"
              />
              <MyText bold size="small" style={{ alignSelf: "center" }}>
                Cellulare
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => {
                if (formik.values.types.includes("ws"))
                  formik.setFieldValue(
                    "types",
                    formik.values.types.filter((type) => type !== "ws")
                  );
                else
                  formik.setFieldValue("types", [...formik.values.types, "ws"]);
              }}
            >
              <Checkbox
                color={primary}
                style={{ alignSelf: "center", marginBottom: 10 }}
                value={formik.values.types.includes("ws")}
                pointerEvents="none"
              />
              <MyText bold size="small" style={{ alignSelf: "center" }}>
                Whatsapp
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => {
                if (formik.values.types.includes("insta"))
                  formik.setFieldValue(
                    "types",
                    formik.values.types.filter((type) => type !== "insta")
                  );
                else
                  formik.setFieldValue("types", [
                    ...formik.values.types,
                    "insta",
                  ]);
              }}
            >
              <Checkbox
                color={primary}
                style={{ alignSelf: "center", marginBottom: 10 }}
                value={formik.values.types.includes("insta")}
                pointerEvents="none"
              />
              <MyText bold size="small" style={{ alignSelf: "center" }}>
                Instagram
              </MyText>
            </TouchableOpacity>
          </View>

          <View
            style={{ opacity: formik.values.types.includes("phone") ? 1 : 0.2 }}
          >
            <InputText
              label="Numero di telefono"
              value={values.phoneNumber}
              errorMessage={errors.phoneNumber}
              onChangeText={handleChange("phoneNumber") as any}
              onBlur={handleBlur("phoneNumber") as any}
              containerStyle={{
                marginHorizontal: 0,
                marginTop: heightPercentageToDP(3),
              }}
            />
          </View>
          <View
            pointerEvents={formik.values.types.includes("ws") ? "auto" : "none"}
            style={{ opacity: formik.values.types.includes("ws") ? 1 : 0.2 }}
          >
            <InputText
              label="Numero Whatsapp"
              value={values.wsNumber}
              errorMessage={errors.wsNumber}
              onChangeText={handleChange("wsNumber") as any}
              onBlur={handleBlur("wsNumber") as any}
              containerStyle={{ marginHorizontal: 0 }}
            />
          </View>
          <View
            pointerEvents={
              formik.values.types.includes("insta") ? "auto" : "none"
            }
            style={{ opacity: formik.values.types.includes("insta") ? 1 : 0.2 }}
          >
            <InputText
              label="Instagram"
              value={values.instagram}
              errorMessage={errors.instagram}
              onChangeText={handleChange("instagram") as any}
              onBlur={handleBlur("instagram") as any}
              containerStyle={{ marginHorizontal: 0 }}
              autoCapitalize="none"
            />
          </View>
        </View>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: 20,
          paddingTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsOpen(false)}
          style={{
            backgroundColor: Colors.backgroundLight,
            paddingVertical: heightPercentageToDP(2),
            paddingHorizontal: heightPercentageToDP(6),
            borderRadius: 10,
            flex: 1,
            marginRight: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyText mediumEmphasis light style={{ color: Colors.lightGrey }}>
            Annulla
          </MyText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit as any}
          style={{
            backgroundColor: Colors.whiteSmoke,
            paddingVertical: heightPercentageToDP(2),
            paddingHorizontal: heightPercentageToDP(6),
            borderRadius: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5,
          }}
        >
          <MyText bold dark>
            Salva
          </MyText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ModalComponent
      height={heightPercentageToDP(80)}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Contatto"
      style={{
        backgroundColor: Colors.backgroundDark,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        keyboardShouldPersistTaps="never"
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          {renderContent()}
        </KeyboardAvoidingView>
      </ScrollView>
      {renderFooter()}
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 20,
    backgroundColor: Colors.backgroundLight,
    padding: heightPercentageToDP(2.5),
    flex: 1,
    marginHorizontal: 5,
  },
});
