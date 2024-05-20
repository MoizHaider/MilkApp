/**
 * @format
 * @flow
 */
import "react-native-gesture-handler";
import Login from "./Login";
import Signup from "./Signup";
import Welcome from "./Welcome";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AuthStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false , animationEnabled: true }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}
