import { AppState, View, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import {
  Canvas,
  Circle,
  mix,
  useSharedValueEffect,
  useValue,
  BackdropBlur,
  Group,
  rrect,
  rect,
} from "@shopify/react-native-skia";
import {
  interpolate,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { scale } from "chroma-js";
import { Colors } from "../../constant";

let COLORS = scale([Colors.primary, Colors.secondary]).mode("lch").colors(5);

const DURATION = 5000;
const DELAY = DURATION / COLORS.length;
const OPACITY = 0.55;

interface WaveProps {
  width: number;
  height: number;
  delay: number;
  color: string;
  isActive: boolean;
  posY: number;
}
const Wave: React.FC<WaveProps> = ({
  width,
  isActive,
  delay,
  color,
  posY,
  height,
}) => {
  // APP-STATE
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current
  );

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // ANIMAZIONE:
  const r = useValue(0);
  const opacity = useValue(1);
  const progress = useSharedValue(0);

  React.useEffect(() => {
    if (isActive) {
      console.log("isActive");
      progress.value = 0;
      progress.value = withRepeat(
        withDelay(0, withTiming(1, { duration: DURATION })),
        -1
      );
    } else {
      progress.value = withTiming(0, { duration: 600 });
    }
  }, [appStateVisible, isActive]);

  useSharedValueEffect(() => {
    r.current = interpolate(
      progress.value,
      [0, 0.5, 1],
      [0, width / 3, width / 2]
    );
    opacity.current = interpolate(progress.value, [0, 0.9, 1], [1, 1, 0]);
  }, progress);

  return (
    <Circle
      cx={width / 2}
      cy={height / 2}
      r={r}
      opacity={opacity}
      color={color}
    />
  );
};

interface RadarProps {
  isActive: boolean;
}

export const Radar: React.FC<RadarProps> = ({ isActive }) => {
  const width = 100;
  const height = 100;

  return (
    <View>
      <Canvas
        style={{
          width: width,
          height: height,
          //    backgroundColor: "red",
        }}
      >
        <Group opacity={OPACITY}>
          {[COLORS[0]].map((color, index) => (
            <Wave
              key={index}
              width={width}
              height={height}
              delay={index * DELAY}
              color={color}
              isActive={isActive}
              posY={0}
            />
          ))}
        </Group>
        <BackdropBlur
          blur={30}
          clip={rrect(rect(0, 0, width, height), width / 2, height / 2)}
        />
      </Canvas>
      <View
        style={{
          position: "absolute",
          top: height / 2 - 20 / 2,
          left: width / 2 - 20 / 2,
          width: 20,
          borderRadius: 20 / 2,
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primary,
        }}
      />
    </View>
  );
};
