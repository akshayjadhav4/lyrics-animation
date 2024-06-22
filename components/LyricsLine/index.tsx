import React from "react";
import { Text, View } from "react-native";
import AnimatedLine from "../AnimatedLine";
import { Colors } from "@/constants/Colors";

type Props = {
  line: string;
  isActiveLine: boolean;
  duration: number;
};

const LyricsLine = ({ line, isActiveLine, duration }: Props) => {
  return (
    <View
      style={[
        {
          marginBottom: 35,
        },
      ]}
    >
      {isActiveLine ? (
        <AnimatedLine line={line} duration={duration} />
      ) : (
        // Show plain text for non active lines
        <Text
          style={[
            {
              fontWeight: 800,
              fontSize: 28,
              opacity: 0.1,
              color: Colors.textPrimaryColor,
            },
          ]}
        >
          {line}
        </Text>
      )}
    </View>
  );
};

export default LyricsLine;
