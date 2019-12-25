import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MainScreen from "./Screens/MainScreen";
import RoomSelectionScreen from "./Screens/RoomSelectionScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RoomSelectionScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
