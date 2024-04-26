import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Region } from "react-native-maps";
import { Colors, Spacing } from "../../../constant";
import { mapStyle } from "../../../components/Maps/mapStyle";
import Animated from "react-native-reanimated";
import MapsOverlay from "../../../components/Maps/MapOverlay";
import { BackButton } from "../../../components/buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightPercentageToDP } from "react-native-responsive-screen";
import hexToRgba from "hex-to-rgba";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { SearchBar } from "../../../components/inputs";
import { inlineStyle } from "../../../components/Inline";
import { Feather } from "@expo/vector-icons";
import MyMarker from "./Marker";
import { Clusterer, useClusterer } from "react-native-clusterer";
import MyClusterMarker from "./ClusterMarker";

const MARKES = [
  {
    id: 1,
    title: "Title 1",
    description: "Description 1",
    coordinate: {
      latitude: 37.78826,
      longitude: -122.4324,
    },
  },
  {
    id: 2,
    title: "Title 2",
    description: "Description 2",
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 3,
    title: "Title 3",
    description: "Description 3",
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4322,
    },
  },
  {
    id: 4,
    title: "Title 3",
    description: "Description 3",
    coordinate: {
      latitude: 37.7883,
      longitude: -122.4322,
    },
  },
];

export const MapScreen = () => {
  const [mapReady, setMapReady] = useState(false);
  const safe = useSafeAreaInsets();
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

  const [points, cluster] = useClusterer(
    MARKES.map((marker) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [marker.coordinate.longitude, marker.coordinate.latitude],
      },
      properties: {
        id: marker.id,
        title: marker.title,
        description: marker.description,
      },
    })),

    {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
    currentRegion || {
      latitude: MARKES[0].coordinate.latitude,
      longitude: MARKES[0].coordinate.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }
  );

  useEffect(() => {
    setInitialRegion({
      latitude: MARKES[0].coordinate.latitude,
      longitude: MARKES[0].coordinate.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    return;

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  const onRegionChangeComplete = (region: Region) => {
    setCurrentRegion(region);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, opacity: mapReady ? 1 : 0 }}>
        {initialRegion && (
          <MapView
            loadingIndicatorColor={Colors.primary}
            userLocationPriority="balanced"
            provider="google"
            initialRegion={initialRegion}
            customMapStyle={mapStyle}
            followsUserLocation
            showsUserLocation
            showsMyLocationButton
            rotateEnabled={false}
            style={{
              flex: 1,
              overflow: "hidden",
              marginRight: -1,
              marginBottom: -1,
              marginTop: -1,
              marginLeft: -1,
            }}
            onMapReady={() => setMapReady(true)}
            onRegionChangeComplete={onRegionChangeComplete}
          >
            {points.map((point) => {
              if (!point) return null;

              console.log("RENDERING POINT", point.properties?.cluster_id);

              return (
                <MyClusterMarker
                  coordinate={{
                    latitude: point.geometry.coordinates[1],
                    longitude: point.geometry.coordinates[0],
                  }}
                  key={point.properties?.cluster_id}
                  count={1}
                />
              );

              if (
                (point.properties as any)?.cluster_id &&
                (point.properties as any).point_count > 0
              ) {
                return (
                  <MyClusterMarker
                    coordinate={{
                      latitude: point.geometry.coordinates[1],
                      longitude: point.geometry.coordinates[0],
                    }}
                    key={point.properties.id}
                    count={(point.properties as any).point_count}
                  />
                );
              } else
                return (
                  <MyMarker
                    coordinate={{
                      latitude: point.geometry.coordinates[1],
                      longitude: point.geometry.coordinates[0],
                    }}
                    key={point.properties.id}
                    title={point.properties.title}
                    description={point.properties.description}
                  />
                );
            })}
          </MapView>
        )}
      </View>
      <MapsOverlay reveal={mapReady} />

      <View
        style={[
          {
            position: "absolute",
            top: safe.top,
            left: Spacing.screenHorizontalPadding,
            right: Spacing.screenHorizontalPadding,
          },
          inlineStyle,
        ]}
      >
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: hexToRgba(Colors.backgroundDark, 0.5),
            borderRadius: 18,
            aspectRatio: 1,
            height: heightPercentageToDP(5.7),
          }}
        >
          <BackButton onlyIcon />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: hexToRgba(Colors.backgroundDark, 0.5),
              borderRadius: 18,
              aspectRatio: 1,
              height: heightPercentageToDP(5.7),
            }}
          >
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
