import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import styles from "./styles";
import { ViewStyle } from "react-native-phone-input";

const CELL_COUNT = 6;

interface CodeInputProps {
  containerStyle?: ViewStyle;
  onFill: (value: string) => void;
  onCodeChange?: (code: string) => void;
  autoFocus?: boolean;
}

export const UnderlineCodeInput: React.FC<CodeInputProps> = ({
  onFill,
  containerStyle,
  onCodeChange,
  autoFocus,
}) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length === CELL_COUNT && typeof onFill === "function")
      onFill(value);
  }, [value]);

  const onChangeText = (text: string) => {
    if (typeof onCodeChange === "function") onCodeChange(text);
    setValue(text);
  };

  return (
    <View style={containerStyle}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        autoFocus={typeof autoFocus === "boolean" ? autoFocus : true}
        onChangeText={onChangeText}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
