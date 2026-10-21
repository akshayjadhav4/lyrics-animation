import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import GradientBackground from "./GradientBackground";
import LyricsLine from "@/components/LyricsLine";
import FlatListSpacer from "@/components/FlatListSpacer";
import { EnhancedLrc } from "@/types";

const LyricsAnimation = ({ parsedLrc }: { parsedLrc: EnhancedLrc[] }) => {
  const [currentLine, setCurrentLine] = useState<number>(0);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flatlistRef = useRef<FlatList<EnhancedLrc>>(null);

  useEffect(() => {
    const playLyrics = () => {
      if (currentLine < parsedLrc.length - 1) {
        const currentLyric = parsedLrc[currentLine].startMillisecond || 0;
        const nextLyric = parsedLrc[currentLine + 1].startMillisecond || 0;
        const duration = nextLyric - currentLyric;
        // Move to the next line after the duration
        intervalRef.current = setTimeout(() => {
          setCurrentLine((prevLine) => prevLine + 1);
          flatlistRef.current?.scrollToIndex({
            index: currentLine + 1,
            animated: true,
          });
        }, duration);
      }
    };

    playLyrics();

    return () => {
      // Clean up interval
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [currentLine, parsedLrc]);

  return (
    <View style={styles.container}>
      <GradientBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ref={flatlistRef}
          data={parsedLrc}
          renderItem={({ item, index }) => (
            <LyricsLine
              line={item}
              isActiveLine={index === currentLine}
              nextLineStartInMS={parsedLrc[index + 1]?.startMillisecond}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          ListHeaderComponent={<View style={{ height: 100 }}></View>}
          ListFooterComponent={<FlatListSpacer />}
        />
      </SafeAreaView>
    </View>
  );
};

export default LyricsAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
