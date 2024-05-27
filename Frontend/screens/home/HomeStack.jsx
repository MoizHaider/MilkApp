import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen.tsx";
import Home2 from "./Home2";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: true }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="home2" component={Home2} />
    </Stack.Navigator>
  );
}
