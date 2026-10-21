import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { useSyncExternalStore } from "react";
import { Text, View } from "react-native";

const subscribe = () => () => {};

export default function LyricsScreen() {
  // CanvasKit needs a browser; static export must render only the loading state.
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const fallback = (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading lyrics…</Text>
    </View>
  );

  return isClient ? (
    <WithSkiaWeb
      getComponent={() => import("./LyricsContent")}
      opts={{ locateFile: (file) => `/${file}` }}
      fallback={fallback}
    />
  ) : (
    fallback
  );
}
