import { StyleSheet } from "react-native";
import { FONT_SIZES } from "../../Text";
import { Colors } from "../../../constant";
import { FONT_BOLD } from "../../../constant/typography";

export default StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 35,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#fff",
    fontSize: FONT_SIZES.title,
    textAlign: "center",
    fontFamily: FONT_BOLD,
  },
  focusCell: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 3,
  },
});
