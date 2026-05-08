import { Stack } from "expo-router";
import NavBar from "../components/NavBar";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}

