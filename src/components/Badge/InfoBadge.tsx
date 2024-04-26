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

interface InfoBadgeProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

export const InfoBadge: React.FC<InfoBadgeProps> = ({ text, style, size }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Feather
          name="info"
          color={Colors.whiteSmoke}
          size={size || heightPercentageToDP(2.5)}
        />
      </TouchableOpacity>
      <ModalComponent
        height={heightPercentageToDP(25)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Aiuto"
      >
        <MyText
          style={{
            textAlignVertical: "center",
            flex: 1,
            paddingHorizontal: widthPercentageToDP(4),
          }}
        >
          {text}
        </MyText>
      </ModalComponent>
    </View>
  );
};
