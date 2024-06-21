import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GradientBackground from "./GradientBackground";
import { Lyrics } from "@/constants/Lyrics";
import LyricsLine from "@/components/LyricsLine";
import FlatListSpacer from "@/components/FlatListSpacer";
import { parseTime } from "@/utils";

const LyricsAnimation = () => {
  const [currentLine, setCurrentLine] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const flatlistRef = useRef<FlatList>(null);

  useEffect(() => {
    const playLyrics = () => {
      if (currentLine < Lyrics.length - 1) {
        const currentLyric = Lyrics[currentLine];
        const nextLyric = Lyrics[currentLine + 1];
        const duration =
          (parseTime(nextLyric.time) - parseTime(currentLyric.time)) * 1000; // Convert seconds to milliseconds

        // Move to the next line after the duration
        intervalRef.current = setTimeout(() => {
          setCurrentLine((prevLine) => prevLine + 1);
          flatlistRef.current?.scrollToIndex({
            index: currentLine,
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
  }, [currentLine]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          ref={flatlistRef}
          data={Lyrics}
          renderItem={({ item, index }) => (
            <LyricsLine line={item} isActiveLine={index === currentLine} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingLeft: 20 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          ListFooterComponent={<FlatListSpacer />}
        />
      </SafeAreaView>
      <GradientBackground />
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
