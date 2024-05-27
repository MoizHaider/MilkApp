import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Colors } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";

const LoginScreen = ({}) => {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const login = async ({ email, password }) => {
    console.log("url", BACKEND_URL);

    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, {
        email,
        password,
      });

      const { token, email: userEmail, phoneNo, userId } = response.data;
      console.log("login data ", token, userEmail,phoneNo, userId )
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("email", userEmail);
      await AsyncStorage.setItem("phoneNo", phoneNo);
      await AsyncStorage.setItem("userId", userId);

      // Navigate to the home screen or another screen
      navigation.navigate("homeStack", {screen: "home"});
    } catch (error) {
      console.error("Login Error ", error.response.data);
    }
  };
  function handleSubmit() {}
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/images/logo.png")} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={login}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                ref={emailRef}
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="Enter your Email"
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                ref={passwordRef}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={styles.input}
                placeholder="Enter 6 characters password "
                secureTextEntry
              />
              <Pressable
                className="bg-primaryGreen py-3 mt-5 rounded-full flex items-center "
                onPress={handleSubmit}
              >
                <Text className="text-white font-semibold">Login</Text>
              </Pressable>
            </View>
          )}
        </Formik>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
          <Text>Don't have an account </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("signup");
            }}
         
          >
            <Text style={{ color: Colors.primaryGreen, fontWeight: 500 }}>
              Signup
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Colors.secondaryGreen,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 50,
  },
  formContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    placeholderTextColor: Colors.lightGray,
  },
});

export default LoginScreen;
