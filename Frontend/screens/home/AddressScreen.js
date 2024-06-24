import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');

  const handlePlaceOrder = () => {
    // Logic to place the order with the entered address
    // For demonstration purposes, let's just navigate back to the previous screen
    
    
    // Show alert that the order has been placed
    Alert.alert('Order Placed', 'Your order has been placed successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
        multiline
      />
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8', // Background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333', // Text color
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc', // Border color
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    minHeight: 100, // Minimum height for multiline input
  },
  placeOrderButton: {
    backgroundColor: '#4caf50', // Button background color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
