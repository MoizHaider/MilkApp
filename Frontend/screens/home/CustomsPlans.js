import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  TextInput,
  Switch,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../styles"; // Ensure this import is correct
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AddressScreen from "./AddressScreen";

const CustomsPlan = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [milkCount, setMilkCount] = useState(0);
  const [breadCount, setBreadCount] = useState(0);
  const [cheeseCount, setCheeseCount] = useState(0);
  const [paneerCount, setPaneerCount] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState("");
  const [startInputValue, setStartInputValue] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [skipDays, setSkipDays] = useState([]);
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const products = [
    {
      id: 1,
      name: "Milk",
      price: "Rs 290/L",
      image: require("../../assets/HomePageImages/milk3.jpg"),
    },
    {
      id: 2,
      name: "Bread",
      price: "Rs 50/loaf",
      image: require("../../assets/HomePageImages/bread.jpg"),
    },
    {
      id: 3,
      name: "Cheese",
      price: "Rs 600/KG",
      image: require("../../assets/HomePageImages/cheese.jpg"),
    },
    {
      id: 4,
      name: "Paneer",
      price: "Rs 500/KG",
      image: require("../../assets/HomePageImages/paneer.jpg"),
    },
  ];

  const totalMilkPrice = milkCount * (numberOfDays - skipDays.length) * 290;
  const totalBreadPrice = breadCount * (numberOfDays - skipDays.length) * 50;
  const totalCheesePrice = cheeseCount * (numberOfDays - skipDays.length) * 600;
  const totalPaneerPrice = paneerCount * (numberOfDays - skipDays.length) * 500;

  // Calculate overall total price
  const overallTotalPrice =
    totalMilkPrice + totalBreadPrice + totalCheesePrice + totalPaneerPrice;
  const decrementCount = (productId) => {
    if (productId === 1) {
      setMilkCount((prevCount) => Math.max(0, prevCount - 1));
    } else if (productId === 2) {
      setBreadCount((prevCount) => Math.max(0, prevCount - 1));
    } else if (productId === 3) {
      setCheeseCount((prevCount) => Math.max(0, prevCount - 1));
    } else if (productId === 4) {
      setPaneerCount((prevCount) => Math.max(0, prevCount - 1));
    }
  };

  const incrementCount = (productId) => {
    if (productId === 1) {
      setMilkCount((prevCount) => prevCount + 1);
    } else if (productId === 2) {
      setBreadCount((prevCount) => prevCount + 1);
    } else if (productId === 3) {
      setCheeseCount((prevCount) => prevCount + 1);
    } else if (productId === 4) {
      setPaneerCount((prevCount) => prevCount + 1);
    }
  };

  const handleAddToCart = () => {
    Alert.alert(
      "Products added to cart!",
      `Milk: ${milkCount}, Bread: ${breadCount}, Cheese: ${cheeseCount}, Paneer: ${paneerCount}`
    );
  };

  const showDatePicker = () => {
    Keyboard.dismiss(); // Dismiss the keyboard if open
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleNext = () => {
    navigation.navigate("Order Address"); // Navigate to the 'Address' screen
  };
  const handleConfirm = (date) => {
    const selectedDate = date.toISOString().split("T")[0];
    setSelectedStartDate(selectedDate);
    setStartInputValue(selectedDate);
    hideDatePicker();
    // Unfocus the input field
    TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
  };

  const handleSkipDayConfirm = (date) => {
    const selectedDate = date.toISOString().split("T")[0];
    setSkipDays([...skipDays, selectedDate]);
    hideDatePicker();
    // Unfocus the input field
    TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
  };

  return (
    <ScrollView style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Products</Text>
            <TouchableOpacity
              style={styles.crossButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
          {products.map((product, index) => (
            <View key={product.id} style={styles.productContainer}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity onPress={() => decrementCount(product.id)}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="red"
                    />
                  </TouchableOpacity>
                  <Text style={styles.productCount}>
                    {product.id === 1
                      ? milkCount
                      : product.id === 2
                      ? breadCount
                      : product.id === 3
                      ? cheeseCount
                      : paneerCount}
                  </Text>
                  <TouchableOpacity onPress={() => incrementCount(product.id)}>
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="green"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.mainContent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Select Products</Text>
        </TouchableOpacity>

        <View style={styles.countContainer}>
            <Text className = "text-xl font-semibold items-start ">Selected Products</Text>
          <View style={styles.countRow}>
            {milkCount != 0 && (
              <View style={styles.productCountContainer}>
                <Image style={styles.smallImage} source={products[0].image} />
                <View className="flex items-end justify-center">
                  <Text style={styles.countText}>Milk Count</Text>
                  <Text style={styles.countText}>{milkCount}</Text>
                </View>
              </View>
            )}
            {breadCount != 0 && (
              <View style={styles.productCountContainer}>
                <Image style={styles.smallImage} source={products[1].image} />
                <View className="flex items-end justify-center">
                  <Text style={styles.countText}>Bread Count</Text>
                  <Text style={styles.countText}>{breadCount}</Text>
                </View>
              </View>
            )}
            {cheeseCount != 0 && (
              <View style={styles.productCountContainer}>
                <Image style={styles.smallImage} source={products[2].image} />
                <View className="flex items-end justify-center">
                  <Text style={styles.countText}>Cheese Count</Text>
                  <Text style={styles.countText}>{cheeseCount}</Text>
                </View>
              </View>
            )}
            {paneerCount != 0 && (
              <View style={styles.productCountContainer}>
                <Image style={styles.smallImage} source={products[3].image} />
                <View className="flex items-end justify-center">
                  <Text style={styles.countText}>Paneer Count</Text>
                  <Text style={styles.countText}>{paneerCount}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

      </View>

      <View style={styles.customPage}>
        <TextInput
          style={styles.input}
          placeholder="Number of days                                            1-31"
          keyboardType="numeric"
          value={numberOfDays}
          onChangeText={(text) => {
            // Check if the input is numeric
            if (/^\d+$/.test(text)) {
              // Convert the input to a number
              const number = parseInt(text, 10);
              // Check if the number is between 1 and 31
              if (number >= 1 && number <= 31) {
                // Update the state if the input is valid
                setNumberOfDays(text);
              } else {
                Alert.alert(
                  "Invalid input",
                  "Please enter a number between 1 and 31"
                );
              }
            } else {
              Alert.alert("Invalid input", "Please enter a numeric value");
            }
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Start date"
          keyboardType="numeric"
          value={startInputValue}
          onChangeText={setStartInputValue}
          onFocus={showDatePicker}
        />
        <TouchableOpacity
          style={[styles.input, { zIndex: 1 }]}
          onPress={showDatePicker}
        >
          <Text>
            {skipDays.length > 0 ? skipDays.join(", ") : "Select Skip Days"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={selectedStartDate ? handleSkipDayConfirm : handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.autoRenewalContainer}>
          <Text style={styles.autoRenewalText}>Auto Renewal</Text>
          <Switch value={autoRenewal} onValueChange={setAutoRenewal} />
        </View>
      </View>

      <ScrollView style={styles.priceSummary}>
        <Text style={styles.priceSummaryTitle}>Price Summary</Text>
        <Text style={styles.priceSummaryItem}>
          Milk Price: {totalMilkPrice}
        </Text>
        <Text style={styles.priceSummaryItem}>
          Bread Price: {totalBreadPrice}
        </Text>
        <Text style={styles.priceSummaryItem}>
          Cheese Price: {totalCheesePrice}
        </Text>
        <Text style={styles.priceSummaryItem}>
          Paneer Price: {totalPaneerPrice}
        </Text>
        <Text style={styles.totalPrice}>Total: {overallTotalPrice}</Text>
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    padding: 20,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.primaryGreen,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  customPage: {
    backgroundColor: "#f5f5f5", // Adjust the background color as needed
    width: "100%",
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
  },
  customPageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  autoRenewalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  autoRenewalText: {
    fontSize: 16,
  },
  countContainer: {
    display: "flex",
    width: "100%",
    
    backgroundColor: "#f5f5f5",
    marginBottom: 30,
    padding: 20,
    borderRadius: 20,
  },

  countText: {
    fontSize: 15,
    marginBottom: 10,
  },
  countRow: {
    gap: 5,
    marginVertical: 10,
    alignItems: "start",
    width: "100%",
  },
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  crossButton: {
    padding: 5,
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
    color: Colors.darkGreen,
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productCount: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  doneButton: {
    backgroundColor: Colors.primaryGreen,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  doneText: {
    color: "white",
    fontSize: 20,
  },
  cartButton: {
    backgroundColor: Colors.primaryGreen,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  cartButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  priceSummary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 30,
  },
  priceSummaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  priceSummaryItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: Colors.primaryGreen,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 120,
  },
  nextButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default CustomsPlan;
