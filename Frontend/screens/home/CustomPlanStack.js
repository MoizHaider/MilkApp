import CustomsPlan from "./CustomsPlans.js";
import OrderAddress from "../profile/ProfileScreen.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";

const Stack = createStackNavigator();

export default function CustomPlanStack({ navigation }) {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{ animationEnabled: true, headerShown: false }}
      initialRouteName="Custom Plan"
    >
      <Stack.Screen name="Custom Plan" component={CustomsPlan} />
      <Stack.Screen
        name="Order Address"
        component={OrderAddress}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
