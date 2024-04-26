import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Spacing, Colors } from "../../../constant";
import { Feather } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FONT_SIZES, MyText } from "../../Text";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { Trans, useTranslation } from "react-i18next";
import { Image } from "react-native-image-crop-picker";
import { UploadType } from "../../../helper/cloudinary";

export type MediaPickerImageResult = Image;

interface ImagePickerModalProps {
  title?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSelected: (res: MediaPickerImageResult) => void;
  pickerProps?: Partial<any>;
  type: UploadType;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  setIsOpen,
  onSelected,
  title,
  pickerProps,
  type,
}) => {
  const ref = useRef<RBSheet>(null);

  // Dimensioni:
  const { height } = useWindowDimensions();
  const modalHeight = (height * 36) / 100;

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) ref.current.open();
    else ref.current.close();
  }, [isOpen]);

  return (
    // @ts-ignore
    <RBSheet
      ref={ref}
      height={modalHeight}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      customStyles={{ container: styles.container }}
    >
      <SafeAreaView
        style={{ flex: 1, marginBottom: Platform.OS == "ios" ? 30 : 0 }}
      >
        {/** TITOLO */}
        <MyText bold size="title" style={styles.title}>
          {title}
        </MyText>
        {/* 
        <View style={{ flex: 1 }}>
          <Animated.View
            entering={FadeInLeft.delay(200)}
            style={{
              borderLeftColor: Colors.secondary,
              borderLeftWidth: 3,
              paddingLeft: 10,
              marginTop: hp(3),
            }}
          >
            <Trans i18nKey={"components:picker-modal.text"}>
              <MyText>
                Non è consenito ed è soggetto alla sospensione dell'account, il
                caricamento di:
              </MyText>
              <MyText>- Contenuti violenti, offensivi, discriminatori.</MyText>
              <MyText>- Materiale sessualmente esplicito. </MyText>
              <MyText>- Contenuti che incitano all'odio.</MyText>
              <MyText>
                - Foto manipolate o che si appropriano dell'identià altrui.
              </MyText>
            </Trans>
          </Animated.View> 
        </View>*/}

        <MyText
          style={{ marginTop: heightPercentageToDP(2) }}
          mediumEmphasis
          light
          size="small"
        >
          Proseguendo dichiari di attenerti ai termini e condizioni sul
          caricamento di contenuti.
        </MyText>
      </SafeAreaView>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.backgroundDark,
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  option: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
    borderLeftWidth: 3,
    backgroundColor: "red",
  },
  optionText: {
    fontSize: 16,
    color: Colors.lightGrey,
  },
  searchBar: {
    backgroundColor: Colors.backgroundLight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: hp(1.7),
    borderRadius: 8,
    marginBottom: 35,
  },
  serachBarInput: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    color: "#fff",
  },
});
