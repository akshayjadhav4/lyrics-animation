import React, { useEffect } from "react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const COLORS_LIST = Object.values(Colors);
const GradientBackground = () => {
  const primaryColor = useSharedValue(COLORS_LIST[0]);
  const secondaryColor = useSharedValue(COLORS_LIST[2]);
  const colors = useDerivedValue(() => {
    return [primaryColor.value, secondaryColor.value];
  }, []);

  useEffect(() => {
    primaryColor.value = withRepeat(
      withTiming(COLORS_LIST[Math.random() < 0.5 ? 0 : 1], {
        duration: 4000,
      }),
      -1,
      true
    );
  }, [primaryColor]);

  return (
    <Canvas
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={colors}
        />
      </Rect>
    </Canvas>
  );
};

export default GradientBackground;
