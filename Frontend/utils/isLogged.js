import AsyncStorage from "@react-native-async-storage/async-storage";


export const isLogged = async () => {
  try {
    const email = await AsyncStorage.getItem("email");
    const token = await AsyncStorage.getItem("token");
    const phoneNo = await AsyncStorage.getItem("phoneNo");
    const userId = await AsyncStorage.getItem("userId");

    if (!email || !token || !phoneNo || !userId) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking user authentication status:", error);
    return false;
  }
};
