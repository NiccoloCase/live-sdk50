import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import RBSheet from "react-native-raw-bottom-sheet";
import { Spacing, Colors, Typography } from "../../../constant";
import { Feather } from "@expo/vector-icons";
import { useStoreActions, useStoreState } from "../../../store";
import { MyText } from "../../Text";

interface DeletionConfirmationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  deleteItem: () => Promise<boolean>;
  text?: string;
  successText?: string;
}

export const DeletionConfirmationDialog: React.FC<
  DeletionConfirmationDialogProps
> = ({ isOpen, setIsOpen, deleteItem, text, successText }) => {
  const [success, setSucces] = useState<boolean | null>(null);
  const openSnackbar = useStoreActions((a) => a.snackbar.open);
  const isOnline = useStoreState((a) => a.network.isOnline);

  const ref = useRef<RBSheet>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) ref.current.open();
    else ref.current.close();
  }, [isOpen]);

  const handleDelate = async () => {
    try {
      const success = await deleteItem();
      setSucces(success);

      if (success) {
        setIsOpen(false);
        if (isOnline)
          openSnackbar({
            message: successText || "Elemento eliminato con successo!",
          });
      }
    } catch (err) {
      setSucces(false);
    }
  };

  const renderContent = () => {
    if (success === false)
      return (
        <>
          <Feather
            name="alert-circle"
            size={hp(10)}
            color={Colors.errorRed}
            style={styles.icon}
          />
          <MyText bold size="big">
            Si è verificato un errore, riprova più tardi.
          </MyText>
        </>
      );
    else
      return (
        <View style={{ width: "100%" }}>
          <MyText bold size="big" style={{ textAlign: "center" }}>
            {text || "Sei sicuro di voler eliminare questo Artwork?"}
          </MyText>

          <TouchableOpacity
            accessibilityLabel="Elimina la classe"
            onPress={handleDelate}
            style={[styles.button, { backgroundColor: Colors.errorRed }]}
          >
            <MyText bold>Elimina</MyText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            style={[
              styles.button,
              {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: Colors.whiteSmoke,
                marginTop: hp(2),
              },
            ]}
          >
            <MyText bold>Annulla</MyText>
          </TouchableOpacity>
        </View>
      );
  };

  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      customStyles={{ container: styles.container }}
    >
      {renderContent()}
    </RBSheet>
  );
};

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
  button: {
    marginHorizontal: widthPercentageToDP(4),
    backgroundColor: Colors.whiteSmoke,
    paddingVertical: hp(2.5),
    borderRadius: 10,
    alignItems: "center",
    marginTop: hp(2),
  },
  icon: { paddingVertical: hp(2) },
});
