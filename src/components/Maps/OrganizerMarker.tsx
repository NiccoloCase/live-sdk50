import React, { Component, memo, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Marker } from "react-native-maps";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { MyImage, MyDeliveryH } from "../Image";
import { whiteSmoke } from "../../constant/colors";

interface OrganizerMarkerProps {
  point: { coordinates: number[] };
  image?: string;
}

const OrganizerMarker: React.FC<OrganizerMarkerProps> = ({ point, image }) => {
  const [markerLoaded, setMarkedLoaded] = useState(false);

  const handleOnLoadEnd = () => {
    setMarkedLoaded(true);
  };

  return (
    <Marker
      tracksViewChanges={!markerLoaded}
      coordinate={{
        latitude: point.coordinates[1],
        longitude: point.coordinates[0],
      }}
      style={{ height: heightPercentageToDP(6), aspectRatio: 1 }}
    >
      <TouchableOpacity onPress={() => console.log("click")}>
        {image && (
          <MyImage
            onLoadEnd={handleOnLoadEnd}
            url={image}
            height={MyDeliveryH.organizerImage.small}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 13,
              borderColor: whiteSmoke,
              borderWidth: 0.5,
            }}
          />
        )}
      </TouchableOpacity>
    </Marker>
  );
};

export default memo(OrganizerMarker, (prevProps, nextProps) => {
  // Aggiorna solo se cambia la posizione o l'immagine
  if (
    prevProps.point.coordinates[0] !== nextProps.point.coordinates[0] ||
    prevProps.point.coordinates[1] !== nextProps.point.coordinates[1] ||
    prevProps.image !== nextProps.image
  ) {
    return false;
  }
  return true;
});
