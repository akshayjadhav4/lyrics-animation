import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientBackground from "./GradientBackground";

const LyricsAnimation = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Lyrics Animation</Text>
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
