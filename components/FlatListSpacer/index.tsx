import { View, useWindowDimensions } from "react-native";

const FlatListSpacer = () => {
  const { height } = useWindowDimensions();
  return <View style={{ height }} />;
};

export default FlatListSpacer;
