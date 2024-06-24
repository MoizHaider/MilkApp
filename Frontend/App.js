import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import Navbar from "./components/Navbar";
import { Suspense } from "react";

import UserContextProvider from "./context/UserContextProvider";
import { View, Text } from "react-native";




export default function App() {


  return (
    <NavigationContainer>
      <UserContextProvider>
        <Navbar />
      </UserContextProvider>
    </NavigationContainer>
  );
}
