import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { BottomFabBar } from "rn-wave-bottom-bar";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { Colors } from "../styles";

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.secondaryGreen,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: Colors.darkGreen,
          fontWeight: 500,
        },
        tabBarStyle: {
          backgroundColor: Colors.primaryGreen,
        },
      }}
      tabBar={(props) => (
        <BottomFabBar
          mode={"circle"}
          isRtl={false}
          focusedButtonStyle={{
            width: 80,
            height: 80,
            elevation: 20,
            borderWidth: 10,
            marginTop: 10,
            borderColor: "white",
            borderRadius: "50%",
          }}
          bottomBarContainerStyle={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
            height: 70,
          }}
          {...props}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
