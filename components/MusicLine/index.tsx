import React, { useEffect } from "react";
import { Canvas, Circle } from "@shopify/react-native-skia";
import {
  cancelAnimation,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const MusicLine = ({
  isActiveLine,
  duration,
}: {
  isActiveLine: boolean;
  duration: number;
}) => {
  const r = useSharedValue(8);
  const opacity = useSharedValue(0.1);
  const c = 12;
  useEffect(() => {
    if (isActiveLine) {
      r.value = withRepeat(withTiming(12, { duration: 1000 }), -1, true);
      opacity.value = withTiming(1, { duration: duration });
    }
    return () => {
      cancelAnimation(r);
      opacity.value = withTiming(0.1, { duration: 100 });
    };
  }, [isActiveLine]);
  return (
    <Canvas style={{ flex: 1, height: 63 }}>
      <Circle cx={12} cy={c} r={r} color="white" opacity={opacity} />
      <Circle cx={12 * 4} cy={c} r={r} color="white" opacity={opacity} />
      <Circle cx={12 * 7} cy={c} r={r} color="white" opacity={opacity} />
    </Canvas>
  );
};

export default MusicLine;
