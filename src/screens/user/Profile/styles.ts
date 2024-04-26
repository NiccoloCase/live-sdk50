import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FONT_SIZES } from "../../../components/Text";
import { Colors, Spacing, Typography } from "../../../constant";

export const NAV_HEADER_HEIGHT = hp(7);
export const TAB_BAR_HEIGHT = hp(6.4);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: Spacing.headerHeight,
    justifyContent: "center",
  },
  card: {
    paddingVertical: hp(2.5),
    paddingHorizontal: hp(1.5),
    backgroundColor: Colors.backgroundLight,
    borderRadius: 17,
    marginBottom: hp(1.5),
  },
  inlineCard: {
    flex: 1,
  },
});
