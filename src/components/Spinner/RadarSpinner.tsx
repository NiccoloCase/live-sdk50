import React from "react";
import { ActivityIndicator, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "../../constant";
import AnimatedLottieView from "lottie-react-native";

import { AppState, useWindowDimensions } from "react-native";

import {
  Canvas,
  Circle,
  mix,
  useSharedValueEffect,
  useValue,
  BackdropBlur,
  Group,
} from "@shopify/react-native-skia";
import {
  interpolate,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { scale } from "chroma-js";

const DURATION = 2000;

let COLORS = scale([Colors.primary, Colors.secondary]).mode("lch").colors(15);

const DELAY = DURATION / (COLORS.length * 4);
const OPACITY = 0.55;

interface WaveProps {
  width: number;
  height: number;
  delay: number;
  color: string;
  isActive: boolean;
  posY: number;
}
const Wave: React.FC<WaveProps> = ({ width, isActive, delay, color, posY }) => {
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
      progress.value = 0;
      progress.value = withDelay(
        delay,
        withRepeat(withTiming(1, { duration: DURATION }), -1)
      );
    } else {
      progress.value = withTiming(0, { duration: 600 });
    }
  }, [appStateVisible, isActive]);

  useSharedValueEffect(() => {
    r.current = mix(progress.value, 30, width / 5);
    opacity.current = interpolate(progress.value, [0, 0.1, 1], [0, 1, 0]);
  }, progress);

  return (
    <Circle cx={width / 2} cy={posY} r={r} opacity={opacity} color={color} />
  );
};

interface RadarProps {
  isActive: boolean;
  width: number;
  height: number;
}

export const Radar: React.FC<RadarProps> = ({ isActive, width, height }) => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Group
        opacity={OPACITY}
        transform={[
          {
            translateY: height / 2,
          },
        ]}
      >
        {COLORS.map((color, index) => (
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
      <BackdropBlur blur={30} />
    </Canvas>
  );
};

interface SpinnerProps {}

export const RadarSpinner: React.FC<SpinnerProps> = ({ ...props }) => {
  const width = heightPercentageToDP(50);

  return (
    <View
      style={{
        width: width,
        aspectRatio: 1,
      }}
    >
      <Radar isActive={true} width={width} height={width} />
    </View>
  );
};
