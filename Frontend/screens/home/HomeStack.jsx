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

import CustomPlanStack from "./CustomPlanStack.js";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ animationEnabled: true }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="My Plan" component={Home2} />
      <Stack.Screen name="Custom Plan" component={CustomPlanStack} />
    </Stack.Navigator>
  );
}
