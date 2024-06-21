import { Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  line: {
    text: string;
    time: string;
  };
  isActiveLine: boolean;
};

const LyricsLine = ({ line, isActiveLine }: Props) => {
  return (
    <Text
      style={[
        {
          color: isActiveLine
            ? Colors.textPrimaryColor
            : Colors.textSecondaryColor,
          fontWeight: 800,
          marginVertical: 10,
          fontSize: 25,
        },
      ]}
    >
      {line.text}
    </Text>
  );
};

export default LyricsLine;
