import React, { useState } from "react";
import { View, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constant";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { MyText } from "../Text";
import { ModalComponent } from "../modals";

interface ErrorBadgeProps {
  errorMsg: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

export const ErrorBadge: React.FC<ErrorBadgeProps> = ({
  errorMsg,
  style,
  size,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Feather
          name="x-circle"
          color={Colors.errorRed}
          size={size || heightPercentageToDP(3)}
        />
      </TouchableOpacity>
      <ModalComponent
        height={heightPercentageToDP(25)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Errore"
      >
        <MyText
          style={{
            textAlignVertical: "center",
            flex: 1,
            paddingHorizontal: widthPercentageToDP(4),
          }}
        >
          {errorMsg}
        </MyText>
      </ModalComponent>
    </View>
  );
};
