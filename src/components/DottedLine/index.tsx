import hexToRgba from "hex-to-rgba";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Inline } from "../Inline";

const styles = StyleSheet.create({
  dottedLineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginLeft: 10,
    marginRight: 10,
    opacity: 0.5,
    paddingTop: 20,
    flex: 1,
  },
  dottedLine: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: hexToRgba("#000000", 0.5),
    margin: -2,
    marginTop: 0,
    flex: 1,
    height: 20,
  },
});

const LINE_COLOR_DARK = hexToRgba("#000000", 0.5);
const LINE_COLOR_LIGHT = hexToRgba("#FFFFFF", 0.9);

export const DottedLine: React.FC<{ light?: boolean; height?: number }> = ({
  light,
  height,
}) => {
  return (
    <Inline style={{ flex: 1 }}>
      <View
        style={[
          styles.dottedLineContainer,
          {
            paddingTop: height || 20,
          },
        ]}
      >
        <View
          style={[
            styles.dottedLine,
            {
              borderColor: light ? LINE_COLOR_LIGHT : LINE_COLOR_DARK,
              height: height || 20,
            },
          ]}
        />
      </View>
    </Inline>
  );
};
