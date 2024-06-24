import LyricsAnimation from "@/components/LyricsAnimation";
import { lrcString } from "@/constants/lrcString";
import { LineType, parseEnhanced } from "clrc";
import { View } from "react-native";

export default function Index() {
  const parsedLrc = parseEnhanced(lrcString);
  const lyrics = parsedLrc.filter(
    (lrc) => lrc.type === LineType.ENHANCED_LYRIC
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LyricsAnimation parsedLrc={lyrics} />
    </View>
  );
}
