import React, { useEffect, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { MyText } from "../../Text";
import { Colors, Spacing } from "../../../constant";
import chroma from "chroma-js";
import {
  useGetSchoolByIdLazyQuery,
  useWhoamiQuery,
} from "../../../generated/graphql";
import { capitalizeInitials } from "../../../helper/format/text";
import { Inline } from "../../Inline";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Bubble } from "../../Bubble";
import { Blurhash } from "react-native-blurhash";

export const SchoolCard = () => {
  const navigation = useNavigation();
  const { data: me } = useWhoamiQuery();
  const [getSchoolById, { data: schoolData }] = useGetSchoolByIdLazyQuery();

  const { t } = useTranslation("components");

  const alreadyJoined = useMemo(() => {
    if (me?.whoami.school?.id) return true;
    else return false;
  }, [me, schoolData]);

  const isAdmin = useMemo(() => {
    if (me?.whoami.school?.isAdmin) return true;
    else return false;
  }, [me, schoolData]);

  useEffect(() => {
    if (!me?.whoami.school?.id) return;
    else
      getSchoolById({
        variables: { id: me?.whoami.school?.id },
        fetchPolicy: "cache-and-network",
      });
  }, [me]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (alreadyJoined || isAdmin)
          navigation.navigate("School", { screen: "MySchoolScreen" });
        else navigation.navigate("School", { screen: "JoinSchoolScreen" });
      }}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          {Platform.OS == "ios" ? (
            <>
              <Bubble />
              <Bubble top={0} left={200} offsetY={-100} />
              <BlurView
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                blurType="dark"
                blurAmount={35}
                blurRadius={20}
              />
            </>
          ) : (
            <>
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: chroma(Colors.backgroundDark)
                    .alpha(0.5)
                    .hex(),
                }}
              />
              <Blurhash
                blurhash="LFK81A2|Z2OtM}fkxsafmjWrTfnh"
                style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}
              />
            </>
          )}

          {alreadyJoined ? (
            isAdmin ? (
              <>
                <MyText bold style={{ marginBottom: hp(1) }}>
                  {t("discover-carousel.school-card.admin")}
                </MyText>
                <Inline>
                  {schoolData?.getSchoolById?.name ? (
                    <MyText style={{ flex: 1 }}>
                      {capitalizeInitials(schoolData?.getSchoolById?.name)}
                    </MyText>
                  ) : null}

                  {schoolData?.getSchoolById?.prov ? (
                    <MyText mediumEmphasis light size="small">
                      {capitalizeInitials(schoolData?.getSchoolById?.prov)}
                    </MyText>
                  ) : null}
                </Inline>
              </>
            ) : (
              <>
                <MyText
                  bold
                  size="small"
                  mediumEmphasis
                  style={{ marginBottom: hp(1) }}
                >
                  {t("discover-carousel.school-card.your-school")}
                </MyText>
                <Inline>
                  {schoolData?.getSchoolById?.name ? (
                    <MyText style={{ flex: 1 }}>
                      {capitalizeInitials(schoolData?.getSchoolById?.name)}
                    </MyText>
                  ) : null}

                  {schoolData?.getSchoolById?.prov ? (
                    <MyText mediumEmphasis light size="small">
                      {capitalizeInitials(schoolData?.getSchoolById?.prov)}
                    </MyText>
                  ) : null}
                </Inline>
              </>
            )
          ) : (
            <>
              <MyText bold>
                {t("discover-carousel.school-card.join-title")}
              </MyText>
              <MyText
                size="small"
                light
                style={{ marginTop: heightPercentageToDP(0.45) }}
              >
                {t("discover-carousel.school-card.join-subtitle")}
              </MyText>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  box: {
    overflow: "hidden",
    backgroundColor: Colors.backgroundLight,
    borderRadius: 15,
    width: "100%",
    height: "100%",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    justifyContent: "space-around",
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    position: "absolute",
    right: -Spacing.screenHorizontalPadding,
    top: -10,
    borderRadius: 10,
    zIndex: 100,
    elevation: 100,
  },
});
