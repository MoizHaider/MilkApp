import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import HomeStack from "../screens/home/HomeStack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { BottomFabBar } from "rn-wave-bottom-bar";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { Colors } from "../styles";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import AuthStack from "../screens/auth/AuthStack";

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const { userData } = useContext(UserContext);
  console.log("this is user data ", userData);

  return (
    <Tab.Navigator
      initialRouteName="homeStack"
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryGreen,

        tabBarActiveBackgroundColor: Colors.primaryGreen,

        tabBarInactiveBackgroundColor: "white",

        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: Colors.darkGreen,
          fontWeight: 400,
        },
      }}
      tabBar={(props) => (
        <BottomFabBar
          mode={"circle"}
          isRtl={false}
          focusedButtonStyle={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            elevation: 14,
          }}
          bottomBarContainerStyle={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          {...props}
        />
      )}
    >
      {userData.status === false ? (
        <Tab.Screen
          name="auth"
          component={AuthStack}
          options={{
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
      ) : (
        <>
          <Tab.Screen
            name="auth"
            component={AuthStack}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          />
          <Tab.Screen
            name="homeStack"
            component={HomeStack}
            options={{
              tabBarLabel: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused, size }) => (
                <Ionicons name="home" size={size} color={"white"} />
              ),
            }}
          />

          <Tab.Screen
            name="profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profile",
              headerShown: true,
              tabBarStyle: {
                display: "none",
              },

              tabBarIcon: ({ color, focused, size }) => (
                <Ionicons name="person" size={size} color={"white"} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default Navbar;
