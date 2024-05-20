import { useRef } from "react";
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

const SignUpScreen = ({}) => {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  const signup = async () => {
    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await axios.post(`${BACKEND_URL}user/signup`, {
        email,
        phoneNumber,
        password,
      });
      // Handle successful signup (e.g., navigate to another screen)
      console.log("Signup successful", response.data);
      navigation.navigate("login");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Signup error", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/icon.png")} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Enter your Email"
          />
        </View>
        <View>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            ref={phoneNumberRef}
            style={styles.input}
            placeholder="Enter your Mobile number"
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            ref={passwordRef}
            style={styles.input}
            placeholder="Enter 6 characters password "
            secureTextEntry
          />
        </View>

        <CustomButton
          backgroundColor={Colors.primaryGreen}
          borderColor={Colors.primaryGreen}
          width={"100%"}
          color="white"
          marginTop={10}
          marginBottom={10}
          text="Signup"
          onPress={signup}
        />

        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Text>Already have an account </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text style={{ color: Colors.primaryGreen, fontWeight: 500 }}>
              Login
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
    width: "70%",
    height: "70%",
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

export default SignUpScreen;
