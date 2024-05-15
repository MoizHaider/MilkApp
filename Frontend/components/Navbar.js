import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { BottomFabBar } from "rn-wave-bottom-bar";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { Colors } from "../styles";
import TabBar from "enhanced-fluid-bottom-navigation-bar";

const Tab = createBottomTabNavigator();

const Navbar = ({navigation, onTabPress}) => {
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
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        tabBar={(props) => <FluidTabBar />}
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

const FluidTabBar = () => {
  return (
    <TabBar
      onPress={(tabIndex) => {
        const route = this.props.navigation.state.routes[tabIndex];
        this.props.onTabPress({ route });
      }}
      tintColor = "#ffffff"
      selectColor = {Colors.secondaryGreen}
      backgroundColor = {Colors.primaryGreen}
      autoSelect = {0}
      values={[
        
        {
          title: "Home",
          icon: "check",
         
          size: 32,
        },
        {
          title: "Tab 1",
          icon: "star",
          iconSet: "MaterialIcons",
          size: 32,
        },
      ]}
    />
  );
};

export default Navbar;
