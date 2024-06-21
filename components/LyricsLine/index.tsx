import React from "react";
import { View } from "react-native";
import AnimatedLetter from "../AnimatedLetter";

type Props = {
  line: {
    text: string;
    time: string;
  };
  isActiveLine: boolean;
};

const LyricsLine = ({ line, isActiveLine }: Props) => {
  const splitText = line.text.trim().split(" ");
  return (
    <View
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 35,
        },
      ]}
    >
      {splitText.map((letter, index) => (
        <AnimatedLetter
          key={`${letter}-${index}`}
          letter={letter}
          appendSpace={index < splitText.length}
          isActiveLine={isActiveLine}
          index={index}
        />
      ))}
    </View>
  );
};

export default LyricsLine;
