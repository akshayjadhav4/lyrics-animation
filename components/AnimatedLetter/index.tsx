import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

type Props = {
  letter: string;
  appendSpace: boolean;
  isActiveLine: boolean;
  index: number;
};

const AnimatedLetter = ({
  letter,
  appendSpace,
  isActiveLine,
  index,
}: Props) => {
  const letterOpacity = useSharedValue(0.1);
  useEffect(() => {
    letterOpacity.value = withDelay(
      isActiveLine ? index * 100 : 0,
      withTiming(isActiveLine ? 1 : 0.1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })
    );
  }, [isActiveLine, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: letterOpacity.value,
  }));
  return (
    <Animated.Text
      style={[
        {
          fontWeight: 800,
          fontSize: 28,
          color: Colors.textPrimaryColor,
        },
        animatedStyle,
      ]}
    >
      {letter} {appendSpace ? " " : ""}
    </Animated.Text>
  );
};

export default AnimatedLetter;
