import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { MyText } from "../Text";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { openMapsApp } from "../../navigation/linking";
import { inlineStyle } from "../../components/Inline";
import { mediumEmphasisOpacity } from "../../constant/typography";
import { Colors } from "../../constant";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { mapStyle } from "./mapStyle";
import MapsOverlay from "./MapOverlay";
import OrganizerMarker from "./OrganizerMarker";

export const MAP_VIEW_HEIGHT = heightPercentageToDP(22);

interface mapProps {
  locationText?: string;
  point: { coordinates: number[] };
  image?: string;
  draggable?: boolean;
}

const _EventMapView: React.FC<mapProps> = ({
  locationText,
  point,
  image,
  draggable,
}) => {
  const [mapReady, setMapReady] = useState(false);

  return (
    <>
      <View style={styles.mapContainer}>
        <MapView
          loadingIndicatorColor={Colors.primary}
          rotateEnabled={false}
          scrollEnabled={false}
          userLocationPriority="low"
          provider="google"
          initialRegion={{
            latitude: point.coordinates[1],
            longitude: point.coordinates[0],
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          customMapStyle={mapStyle}
          style={{
            flex: 1,
            overflow: "hidden",
            marginRight: -1,
            marginBottom: -1,
            marginTop: -1,
            marginLeft: -1,
          }}
          onMapReady={() => setMapReady(true)}
        >
          {image ? (
            <OrganizerMarker
              point={point}
              image={image}
              key={point.coordinates[0] + point.coordinates[1]}
            />
          ) : (
            <Marker
              coordinate={{
                latitude: point.coordinates[1],
                longitude: point.coordinates[0],
              }}
              pinColor={Colors.primary}
            />
          )}
        </MapView>
        <MapsOverlay reveal={mapReady} />
      </View>
      <TouchableOpacity
        onPress={() => {
          openMapsApp(
            point.coordinates[1] || point.coordinates[1]!,
            point.coordinates[0] || point.coordinates[0]!,
            locationText!
          );
        }}
        style={[styles.line, inlineStyle]}
      >
        <Feather
          name="map-pin"
          style={{ opacity: mediumEmphasisOpacity }}
          size={heightPercentageToDP(2.5)}
          color="#fff"
        />
        <View style={[styles.text, { paddingLeft: 5 }]}>
          <MyText>{locationText}</MyText>
          <MyText
            bold
            size="small"
            style={{ marginTop: 4, color: Colors.darkGrey }}
          >
            Vedi{" "}
            <Feather
              name="arrow-right-circle"
              size={heightPercentageToDP(1.6)}
              color={Colors.darkGrey}
            />
          </MyText>
        </View>
      </TouchableOpacity>
    </>
  );
};

export const EventMapView = React.memo(
  _EventMapView,
  (prevProps, nextProps) => {
    return (
      prevProps.point.coordinates[0] === nextProps.point.coordinates[0] &&
      prevProps.point.coordinates[1] === nextProps.point.coordinates[1]
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: MAP_VIEW_HEIGHT,
    width: "100%",
    borderRadius: 20,
    marginTop: hp(2),
    overflow: "hidden",
  },
  infoBoxContainer: {
    marginTop: hp(1),
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
  },
  line: {
    paddingVertical: hp(2),
    width: "100%",
  },
  text: { marginLeft: wp(1), flex: 1 },
});
