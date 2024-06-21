import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  line: {
    text: string;
    time: string;
  };
  isActiveLine: boolean;
};

const LyricsLine = ({ line, isActiveLine }: Props) => {
  const opacity = useSharedValue(0.1);

  useEffect(() => {
    opacity.value = withTiming(isActiveLine ? 1 : 0.1, { duration: 500 });
  }, [isActiveLine]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  return (
    <Animated.Text
      style={[
        {
          fontWeight: 800,
          marginBottom: 35,
          fontSize: 28,
          color: Colors.textPrimaryColor,
        },
        animatedStyle,
      ]}
    >
      {line.text}
    </Animated.Text>
  );
};

export default LyricsLine;
