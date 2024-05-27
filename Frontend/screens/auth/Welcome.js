import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../styles"; // Adjust the path to where your Colors are defined
import CustomButton from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = ({  }) => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading1}>Welcome To <Text style = {{color: "white"}}>DairyDash</Text></Text>
        <Text style={styles.heading2}>Let's Get Started</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/welcome.png")} // Adjust the path to your image
          style={styles.image}
        />
      </View>
      <View style = {{width: "100%", flexDirection: "column", rowGap: 10}}>
        <CustomButton
          width="90%"
          text={"Signup"}
          backgroundColor={Colors.primaryGreen}
          color="white"
          borderColor={Colors.primaryGreen}
          paddingVertical={12}
          onPress = {()=>{navigation.navigate("signup")}}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Already have an account </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text style={{ color: "white", fontWeight: 500 }}>Login</Text>
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
    alignItems: "center",
    backgroundColor: Colors.secondaryGreen,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headingContainer: {
    width: "100%",
    alignSelf: "center",

    rowGap: 5
  },
  heading1: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Arial",
    text: "center",
    textAlign: "center",
    alignSelf: "center",
    color: Colors.darkGreen
  },
  heading2: {
    fontSize: 20,
    fontWeight: "semi-bold",
    marginTop: 10,
    fontFamily: "Arial",
    text: "center",
    textAlign: "center",
    alignSelf: "center",
    color: Colors.darkGreen,
  },
  imageContainer: {},
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: Colors.primaryGreen,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 30,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default WelcomeScreen;
