import React, { useEffect } from "react";
import { LyricsLineProps } from "@/types";
import AnimatedWord from "../AnimatedWord";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MusicLine from "../MusicLine";

const LyricsLine = ({
  line,
  isActiveLine,
  nextLineStartInMS,
}: LyricsLineProps) => {
  const viewOpacity = useSharedValue(0.1);
  const words = line?.words;
  const viewStyle = useAnimatedStyle(() => {
    return { opacity: viewOpacity.value };
  });
  useEffect(() => {
    viewOpacity.value = withTiming(isActiveLine ? 1 : 0.1, {
      duration: 100,
      easing: Easing.inOut(Easing.quad),
    });
  }, [isActiveLine]);

  if (line.content === " ") {
    const currentLineDuration = line.startMillisecond || 0;
    const nextLineDuration = nextLineStartInMS || 2000;

    return (
      <MusicLine
        isActiveLine={isActiveLine}
        duration={nextLineDuration - currentLineDuration}
      />
    );
  }
  return words ? (
    <Animated.View
      style={[
        {
          marginBottom: 35,
          flexDirection: "row",
          flexWrap: "wrap",
        },
        viewStyle,
      ]}
    >
      {words.map((word, wordIndex) => {
        /**
         * duration =
         * nextWord startMillisecond - currentWord startMillisecond
         *
         * if currentWord is last word in line
         * then duration = nextLine startMillisecond - currentWord startMillisecond
         *
         * if currentWord is last word in last line
         * then default duration = 500
         */
        const duration =
          wordIndex < words.length - 1
            ? words[wordIndex + 1].startMillisecond - word.startMillisecond
            : nextLineStartInMS
            ? nextLineStartInMS - word.startMillisecond
            : 500;

        return (
          <AnimatedWord
            key={`${word}-${wordIndex}`}
            word={word}
            duration={duration}
          />
        );
      })}
    </Animated.View>
  ) : null;
};

export default LyricsLine;
