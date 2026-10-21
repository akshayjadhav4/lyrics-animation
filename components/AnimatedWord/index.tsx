import { View } from "react-native";
import React, { useEffect } from "react";
import { AnimatedLetterProps, AnimatedWordProps } from "@/types";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

const AnimatedLetter = ({ letter, duration, delay }: AnimatedLetterProps) => {
  const opacity = useSharedValue(0.5);
  const translateY = useSharedValue(0);
  const animatedLetterStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.get(),
      transform: [{ translateY: translateY.get() }],
    };
  });
  useEffect(() => {
    opacity.set(
      withDelay(
        delay,
        withTiming(1, {
          duration: duration,
          easing: Easing.out(Easing.exp),
        }),
      ),
    );
    translateY.set(
      withDelay(
        delay,
        withTiming(-2, {
          duration: duration,
          easing: Easing.linear,
        }),
      ),
    );
    return () => {
      cancelAnimation(opacity);
      cancelAnimation(translateY);
    };
  }, [delay, duration, opacity, translateY]);
  return (
    <Animated.Text
      style={[
        { fontSize: 28, fontWeight: 800, color: Colors.textPrimaryColor },
        animatedLetterStyle,
      ]}
    >
      {letter}
    </Animated.Text>
  );
};

const AnimatedWord = ({ word, duration }: AnimatedWordProps) => {
  const letters = word.content.split("");
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {letters.map((letter, index) => (
        <AnimatedLetter
          key={`${letter}-${index}`}
          letter={letter}
          delay={word.startMillisecond + index * (duration / letters.length)}
          duration={duration / letters.length}
        />
      ))}
    </View>
  );
};

export default AnimatedWord;
