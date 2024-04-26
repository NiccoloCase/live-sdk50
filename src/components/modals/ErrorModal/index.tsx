import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "../../../constant";
import { FontAwesome5 } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ModalComponent } from "../ModalComponent";
import { MyText } from "../../Text";

interface ErrorModalProps {
  isVisible: boolean;
  hideModal: () => void;
  message: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  hideModal,
  isVisible,
  message,
}) => {
  return (
    <ModalComponent
      isOpen={isVisible}
      setIsOpen={(value) => {
        if (!value) hideModal();
      }}
      height={hp(35)}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <FontAwesome5
            name="times-circle"
            color={Colors.errorRed}
            size={hp(12)}
          />
        </View>
        <MyText style={styles.msg}>{message}</MyText>
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  top: {
    width: hp(15),
    height: hp(15),
    borderRadius: hp(15) / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(0.5),
  },
  msg: {
    paddingTop: hp(2.5),
  },
});
