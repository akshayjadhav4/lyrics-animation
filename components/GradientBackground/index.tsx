import React, { useEffect } from "react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import {
  cancelAnimation,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const COLORS_LIST = Object.values(Colors);
const GradientBackground = () => {
  const { width, height } = useWindowDimensions();
  const primaryColor = useSharedValue(COLORS_LIST[0]);
  const secondaryColor = useSharedValue(COLORS_LIST[2]);
  const colors = useDerivedValue(() => {
    return [primaryColor.get(), secondaryColor.get()];
  }, []);

  useEffect(() => {
    primaryColor.set(
      withRepeat(
        withTiming(COLORS_LIST[2], {
          duration: 4000,
        }),
        -1,
        true,
      ),
    );
    secondaryColor.set(
      withRepeat(
        withTiming(COLORS_LIST[0], {
          duration: 4000,
        }),
        -1,
        true,
      ),
    );
    return () => {
      cancelAnimation(primaryColor);
      cancelAnimation(secondaryColor);
    };
  }, [primaryColor, secondaryColor]);

  return (
    <Canvas pointerEvents="none" style={StyleSheet.absoluteFill}>
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
