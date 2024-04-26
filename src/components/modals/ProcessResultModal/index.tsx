import React from "react";
import { Text, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import RBSheet from "react-native-raw-bottom-sheet";
import { Spacing, Colors, Typography } from "../../../constant";
import { Feather } from "@expo/vector-icons";

interface ProcessModalProps {}

export class ProcessResultModal extends React.Component<ProcessModalProps> {
  private modalRef: RBSheet | null = null;

  state = {
    success: null,
    options: { successMessage: "", errorMessage: "" },
  };

  open(
    success: boolean,
    options: { successMessage?: string; errorMessage?: string }
  ) {
    this.setState({ options, success }, () => this.modalRef?.open());
  }

  renderContent = () => {
    if (this.state.success)
      return (
        <>
          <Feather
            name="check-circle"
            size={hp(10)}
            color={Colors.successGreen}
            style={styles.icon}
          />
          <Text style={styles.message}>
            {this.state.options.successMessage}
          </Text>
          {/* <TouchableOpacity style={styles.successButton}>
            <MyText>Vai alla home</MyText>
          </TouchableOpacity> */}
        </>
      );
    else if (!this.state.success)
      return (
        <>
          <Feather
            name="alert-circle"
            size={hp(10)}
            color={Colors.errorRed}
            style={styles.icon}
          />
          <Text style={styles.message}>
            {this.state.options.errorMessage ||
              "Si è verificato un errore, riprova più tardi."}
          </Text>
        </>
      );
    else return null;
  };

  render() {
    return (
      <RBSheet
        ref={(ref) => (this.modalRef = ref)}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{ container: styles.container }}
      >
        {this.renderContent()}
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.backgroundLight,
    paddingTop: hp(1),
    paddingBottom: hp(3),
    alignItems: "center",
  },
  message: {
    marginTop: hp(2),
    fontSize: hp(2.6),
    fontFamily: Typography.FONT_BOLD,
    color: "#fff",
    marginBottom: hp(1),
    textAlign: "center",
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(4),
    borderRadius: 5,
    marginHorizontal: hp(1.2),
  },
  buttonText: {
    fontSize: hp(2),
    fontFamily: Typography.FONT_BOLD,
    color: Colors.lightGrey,
  },
  icon: { paddingVertical: hp(2) },
  successButton: {
    backgroundColor: Colors.successGreen,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: hp(0.5),
    borderRadius: 4,
  },
});
