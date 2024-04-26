import React, { useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constant";
import { opacity } from "@cloudinary/url-gen/actions/adjust";

interface BubbleProps {
  colors?: string[];
  offsetX?: number;
  offsetY?: number;
  startScale?: number;
  endScale?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  duration?: number;
  size?: number;
  noAnimation?: boolean;
  opacity?: number;
}

export const Bubble: React.FC<BubbleProps> = ({
  colors,
  offsetX,
  offsetY,
  startScale,
  endScale,
  top,
  right,
  size,
  bottom,
  left,
  duration,
  opacity,
  noAnimation,
}) => {
  const _duration = duration || 5000;

  const scale = useSharedValue(startScale || 1);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const moveBubble = () => {
    positionX.value = withRepeat(
      withDelay(
        0,
        withRepeat(
          withSequence(
            withTiming(offsetX || 30, {
              duration: _duration,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) })
          ),
          -1
        )
      ),
      -1
    );

    positionY.value = withRepeat(
      withDelay(
        0,
        withRepeat(
          withSequence(
            // split duration of 500ms to 250ms
            withTiming(offsetY || -30, {
              duration: _duration,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0, {
              duration: _duration / 2,
              easing: Easing.inOut(Easing.ease),
            })
          ),
          -1
        )
      ),
      -1
    );

    scale.value = withRepeat(
      withSequence(
        // split duration of 500ms to 250ms
        withTiming(endScale || 2, {
          duration: _duration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(startScale || 1, {
          duration: _duration / 2,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1
    );

    rotation.value = withRepeat(
      withDelay(
        0,
        withRepeat(
          withSequence(
            withTiming(360, {
              duration: _duration,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0, {
              duration: _duration,
              easing: Easing.inOut(Easing.ease),
            })
          ),
          -1
        )
      ),
      -1
    );
  };

  useEffect(() => {
    if (!noAnimation) moveBubble();
  }, [noAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    } as any;
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          aspectRatio: 1,
          height: size || 80,
          top,
          right,
          bottom,
          left,
          opacity: opacity || 1,
        },
      ]}
    >
      <LinearGradient
        colors={colors || [Colors.primary, Colors.secondary]}
        style={{ borderRadius: 100, width: "100%", height: "100%" }}
      />
    </Animated.View>
  );
};
