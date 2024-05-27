import { useRef } from "react";
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
import CustomButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Formik } from "formik";
import { BACKEND_URL } from "@env";

const SignUpScreen = ({}) => {
  const navigation = useNavigation();

  const signup = async ({ email, phoneNumber, password }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
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
        <Image source={require("../../assets/images/logo.png")} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{ email: "", password: "", phoneNumber: "" }}
          onSubmit={signup}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={styles.input}
                  placeholder="Enter your Email"
                />
              </View>
              <View>
                <Text style={styles.label}>Phone Number</Text>

                <TextInput
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  style={styles.input}
                  placeholder="Enter your Mobile number"
                />
              </View>
              <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  style={styles.input}
                  placeholder="Enter 6 characters password "
                  secureTextEntry
                />
              </View>

              <Pressable
                className="bg-primaryGreen py-3 rounded-full flex items-center mt-5"
                onPress={handleSubmit}
              >
                <Text className="text-white font-semibold">Signup</Text>
              </Pressable>
            </View>
          )}
        </Formik>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
          <Text>Already have an account </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text style={{ color: Colors.primaryGreen, fontWeight: 500 }}>
              Login
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
    width: "70%",
    height: "70%",
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

export default SignUpScreen;
