import {StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
     <Image
        source="https://reactnative.dev/img/tiny_logo.png"
        style={{ width: 64, height: 64 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {color: "blue"},
});