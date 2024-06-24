import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  line: string;
  duration: number;
};

const AnimatedLetter = ({
  letter,
  delayPerLetter,
  delay,
}: {
  letter: string;
  delayPerLetter: number;
  delay: number;
}) => {
  const opacity = useSharedValue(0.5);
  const translateY = useSharedValue(0);
  const animatedLetterStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: delayPerLetter,
        easing: Easing.out(Easing.exp),
      })
    );
    translateY.value = withDelay(
      delay,
      withSpring(-1, {
        duration: delayPerLetter,
      })
    );
  }, [letter]);

  return (
    <Animated.Text
      style={[
        {
          fontWeight: 800,
          fontSize: 28,
          opacity: 0.5,
          color: Colors.textPrimaryColor,
        },
        animatedLetterStyle,
      ]}
    >
      {letter}
    </Animated.Text>
  );
};

const AnimatedLine = ({ line, duration }: Props) => {
  const words = line.trim().split(" ");
  const letters = line.trim().split("");

  let indexInSentence = 0;
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {words.map((word, wordIndex) => {
        //Increment index for space
        if (wordIndex < words.length) {
          indexInSentence++;
        }
        return (
          <View
            key={`${word}-${wordIndex}`}
            style={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            {word.split("").map((letter, letterIndex) => {
              // current letter index in entire sentence
              const currentIndex = indexInSentence++;

              return (
                <AnimatedLetter
                  key={`${letter}-${letterIndex}`}
                  letter={letter}
                  //duration to animate each letter
                  delayPerLetter={duration / letters.length}
                  // delay to start animation of each letter
                  delay={currentIndex * (duration / letters.length)}
                />
              );
            })}
            {/* Add space after each word */}
            <Text>{wordIndex < words.length ? " " : ""}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default AnimatedLine;
