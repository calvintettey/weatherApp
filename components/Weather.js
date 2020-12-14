import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Weather() {
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}></View>
      <View style={styles.bodyContainer}></View>
    </View>
  );
}

const styles = StyleSheet({
  weatherContainer: {
    flex: 1,
  },

  headerContainer: {},
  bodyContainer: {},
});
