import React, { useRef, useEffect, ReactElement } from "react";
import { Text, StyleSheet, useWindowDimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Spacing, Colors, Typography } from "../../../constant";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface ModalComponentProps {
  title?: string;
  subtitle?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  height?: number;
  children: ReactElement | ReactElement[];
  style?: any;
  drag?: boolean;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  setIsOpen,
  title,
  subtitle,
  height,
  style,
  children,
  drag = true,
}) => {
  // Modal
  const ref = useRef<RBSheet>(null);

  // Altezza del modal:
  const { height: windowHeight } = useWindowDimensions();
  const modalHeight = height || windowHeight - (windowHeight * 15) / 100;

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) ref.current.open();
    else ref.current.close();
  }, [isOpen, ref.current]);

  return (
    <RBSheet
      keyboardAvoidingViewEnabled
      ref={ref}
      height={modalHeight}
      closeOnDragDown={drag}
      closeOnPressMask={true}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      customStyles={{
        container: { ...styles.container, ...style },
        wrapper: {
          //    backgroundColor: "rgba(255,255,255,0.06)",
        },
      }}
    >
      {/** TITOLO */}
      {title && <Text style={styles.title}>{title}</Text>}
      {/** SOTTOTITOLO */}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.backgroundLight,
    paddingBottom: hp(2),
  },
  title: {
    marginTop: 10,
    fontSize: hp(3),
    fontFamily: Typography.FONT_BOLD,
    color: Colors.lightGrey,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    color: Colors.lightGrey,
    fontFamily: Typography.FONT_REGULAR,
    fontSize: hp(2.2),
    alignSelf: "center",
    textAlign: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
