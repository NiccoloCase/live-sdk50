import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Colors } from "../../constant";

interface MapOverlayProps {
  reveal: boolean;
}

export default function MapsOverlay(props: MapOverlayProps) {
  const { reveal } = props;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reveal) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [reveal]);

  return (
    <Animated.View
      pointerEvents={reveal ? "none" : "auto"}
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.backgroundLight,
        opacity: fadeAnim,
      }}
    ></Animated.View>
  );
}
