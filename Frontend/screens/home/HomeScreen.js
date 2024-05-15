import { StyleSheet, Text, View } from "react-native";
import Navbar from "../../components/Navbar";

export default function screen() {
  return (
    <View>
      <View style = {styles.container}> Home Screen </View>
      {/* <Navbar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
   
    height: "100vh"
  }
})
