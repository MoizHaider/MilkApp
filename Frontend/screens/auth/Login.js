import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../styles";
import CustomButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({}) => {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const login = async () => {
    console.log("url", BACKEND_URL);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, {
        email,
        password,
      });

      const { token, email: userEmail, phoneNo, userId } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("email", userEmail);
      await AsyncStorage.setItem("phoneNo", phoneNo);
      await AsyncStorage.setItem("userId", userId);

      // Navigate to the home screen or another screen
      navigation.navigate("home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/icon.png")} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          ref={emailRef}
          style={styles.input}
          placeholder="Enter your Email"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Enter 6 characters password "
          secureTextEntry
        />
        <CustomButton
          marginTop={10}
          marginBottom={10}
          backgroundColor={Colors.primaryGreen}
          width={"100%"}
          color={"white"}
          text="Login"
          onPress={login}
        />
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Text>Don't have an account </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signup");
            }}
          >
            <Text style={{ color: Colors.primaryGreen, fontWeight: 500 }}>
              Signup
            </Text>
          </TouchableOpacity>
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
    marginBottom: 10,
    paddingHorizontal: 10,
    placeholderTextColor: Colors.lightGray,
  },
});

export default LoginScreen;
