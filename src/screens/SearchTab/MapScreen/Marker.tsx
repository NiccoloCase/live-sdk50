//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { Colors } from "../../../constant";
import { MyDeliveryH, MyImage } from "../../../components/Image";
import { MyText } from "../../../components/Text";

interface MyMarkerProps {
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const MyMarker: React.FC<MyMarkerProps> = ({
  title,
  description,
  coordinate,
}) => {
  return (
    <Marker coordinate={coordinate}>
      <View style={{ width: 40, aspectRatio: 1 }}>
        <MyImage
          //    onLoadEnd={handleOnLoadEnd}
          url={
            "https://res.cloudinary.com/dynsmaeo3/image/upload/v1712160087/SPOTLIVE-PROD/sknvdryv679cdrawxcpf.jpg"
          }
          height={MyDeliveryH.organizerImage.small}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 13,
            borderColor: Colors.whiteSmoke,
            borderWidth: 1,
          }}
        />
      </View>

      <Callout
        tooltip
        style={{
          backgroundColor: Colors.whiteSmoke,
          width: 200,
          height: 200,
          borderRadius: 20,
          padding: 20,
        }}
      >
        <MyImage
          url={
            "https://res.cloudinary.com/dynsmaeo3/image/upload/v1712160087/SPOTLIVE-PROD/sknvdryv679cdrawxcpf.jpg"
          }
          height={MyDeliveryH.organizerImage.small}
          style={{
            width: 200,
            borderRadius: 13,
            borderColor: Colors.whiteSmoke,
            borderWidth: 1,
          }}
        />

        <MyText dark>{title}</MyText>
        <MyText dark>{description}</MyText>
      </Callout>
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

export default MyMarker;
