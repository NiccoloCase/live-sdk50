import React from "react";
import { View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Colors } from "../../../constant";
import { MyText } from "../../../components/Text";

interface MyMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  count: number;
}

const MyClusterMarker: React.FC<MyMarkerProps> = ({ coordinate, count }) => {
  return (
    <Marker coordinate={coordinate}>
      <View
        style={{
          width: 40,
          aspectRatio: 1,
          backgroundColor: Colors.secondary,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <MyText bold size="small">
          {count}
        </MyText>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

export default React.memo(MyClusterMarker);
