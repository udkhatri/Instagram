import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors,
} from "react-native-paper";
import Constants from "expo-constants";
import App1 from "./Navigation/App1";
import { StyleSheet } from "react-native";
const theme = {
  ...DefaultTheme,
  roundness: 9,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1f1f1f",
    accent: "#f1c40f",
    light: "#fff",
  },
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <App1 style={styles.droidSafeArea} />
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Constants.statusBarHeight,
  },
});
