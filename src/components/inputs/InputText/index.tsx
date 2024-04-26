import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableNativeFeedback,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../../../constant";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ErrorText, FONT_SIZES } from "../../Text";

interface OutlinedTextInputProps extends TextInputProps {
  /** Titolo */
  label?: string;
  /** Se l'input contiene una pasword*/
  password?: boolean;
  /** Se l'input contiene un email */
  email?: boolean;
  /** Messaggio di errore */
  errorMessage?: string;
  /** Stile del contenitore */
  containerStyle?: StyleProp<ViewStyle>;
  /** Stile della casella input */
  inputWrapperStyle?: StyleProp<ViewStyle>;
  /** Stile del label */
  labelStyle?: StyleProp<TextStyle>;
  /** Se l'utente non può interagire con l'input */
  readonly?: boolean;
  /** Solo contorno inferiore */
  borderBottom?: boolean;
  /** Icona a sinistra */
  leftIcon?: React.ReactNode;
  /** Se nascondere il label */
  hideLabel?: boolean;
}

export const InputText: React.FC<OutlinedTextInputProps> = ({
  label,
  password,
  email,
  errorMessage,
  containerStyle,
  labelStyle,
  readonly,
  style,
  inputWrapperStyle,
  borderBottom,
  leftIcon,
  hideLabel,
  ...props
}) => {
  // Se la password è visibile
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /**
   * Funzione chimata quando viene cliccta l'icona alla destra
   * dell'input
   */
  const onRightIconClick = () => {
    if (password) setIsPasswordVisible(!isPasswordVisible);
  };

  /**
   * Calcola a seconda del contesto e restituisce tutte le altre propietà
   * dell'TextInput
   */
  const getAdditionalProps = () => {
    // Se l'input è una password
    if (password) {
      props.secureTextEntry = !isPasswordVisible;
      props.textContentType = "password";
      props.autoCapitalize = "none";
    }
    // Se l'input è una email
    if (email) {
      props.keyboardType = "email-address";
      props.textContentType = "emailAddress";
    }

    return props;
  };

  return (
    <View style={[{ marginBottom: hp(0.8) }, containerStyle]}>
      {!hideLabel && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          borderBottom
            ? {
                borderBottomColor: Colors.backgroundLight,
                borderBottomWidth: 2.5,
              }
            : {
                borderRadius: Spacing.inputTextBorderRadius,
                backgroundColor: Colors.backgroundLight,
              },
          inputWrapperStyle,
        ]}
      >
        {leftIcon || null}
        <TextInput
          placeholderTextColor={Colors.lightGrey}
          {...getAdditionalProps()}
          style={[
            styles.input,
            leftIcon ? { marginLeft: 10 } : undefined,
            style,
          ]}
          editable={!readonly}
        />
        {password && (
          <View style={styles.rightIconWrapper}>
            <TouchableOpacity
              onPress={onRightIconClick}
              style={
                Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : {}
              }
            >
              <Feather
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color={Colors.darkGrey}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ErrorText>{errorMessage}</ErrorText>
    </View>
  );
};

export const labelStyle = {
  color: Colors.lightGrey,
  fontSize: FONT_SIZES.inputLabel,
  marginBottom: 5,
  fontFamily: Typography.FONT_BOLD,
};

const styles = StyleSheet.create({
  labelWrapper: {
    zIndex: 2,
    position: "absolute",
  },
  label: labelStyle,
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: Spacing.inputTextHeight,
    paddingHorizontal: 10,
    fontFamily: Typography.FONT_BOLD,
  },
  input: {
    fontSize: FONT_SIZES.big,
    color: "#fff",
    flex: 1,
    height: Spacing.inputTextHeight,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  rightIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
