import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Colors } from "../../styles.js";

const HomeScreen = ({navigation}) => {
  const onPress = (title) => {
    console.log(`${title} card pressed!`);
  };

  const handlePress = (title) => {
    console.log(`${title} Button pressed!`);
  };

  let plansCardData = [
    {
      title: "Plan1",
      img: "",
      prods: [
        { prd: "Milk", qty: "every Day" },
        { prd: "Bread", qty: "Evry week" },
      ],
      ttlPrice: 500,
    },
    {
      title: "Plan2",
      img: "",
      prods: [
        { prd: "Milk", qty: "every Day" },
        { prd: "Bread", qty: "Evry week" },
      ],
      ttlPrice: 500,
    },
  ];

  const renderItem = ({ item }) => (
    <PlanCard
      title={item.title}
      img={item.img}
      prods={item.prods}
      ttlPrice={item.ttlPrice}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={{ backgroundColor: Colors.secondaryGreen, margin: 0, padding: 0 }}>
        <View style={styles.headerContainer}>
          <Image source={"./assets/logo.png"} style={styles.image} />
          <Text style={styles.locationText}>Lahore, Pakistan</Text>
        </View>

        <View key={4} style={styles.infoContainer}>
          <Text>Get your Dairy Products</Text>
        </View>

        <View key={5} style={styles.infoContainer}>
          <Text>Delivered!</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={"./assets/MilkBox.jpg"}
            style={styles.image1}
          />
        </View>
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.cardContainer}
      >
        <TouchableOpacity
         
          style={styles.card}
        >
          <Text className = "text-center justify-cetner">Create Custom Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("home2")}
          style={styles.card}
        >
          <Text className = "text-center justify-cetner">My Plan</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Plans</Text>
        <Text style={styles.text1}>View All</Text>
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.cardContainer}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("Milk")}
        >
          <Text style={styles.buttonText}>Milk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => handlePress("Paneer")}
        >
          <Text style={styles.buttonText}>Paneer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => handlePress("Cheese")}
        >
          <Text style={styles.buttonText}>Cheese</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("Ghee")}
        >
          <Text style={styles.buttonText}>Ghee</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.cardContainer1}>
        <FlatList
          data={plansCardData}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const PlanCard = ({ title, img, prods, ttlPrice }) => {
  return (
    <View style={styles.card}>
      <Image
        source={"./assets/MilkBottle2.jpeg"}
        style={styles.image3}
      />
      <Text>{title}</Text>
      <View>
        <FlatList
          data={prods}
          renderItem={({ item }) => (
            <View>
              <Text>{item.prd}</Text>
              <Text>{item.qty}</Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View>
        <TouchableOpacity>
          <Text>Add</Text>
        </TouchableOpacity>
        <Text>{ttlPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 0,
    marginTop: 0,
  },
  cardContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 0,
    marginTop: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 0,
    marginTop: 0,
    paddingHorizontal: 10,
    height: 150,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 0,
    marginTop: 0,
    paddingHorizontal: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    height: 100,
    width: 150,
    marginBottom: 15,
  },
  image1: {
    height: 100,
    width: 120,
    marginBottom: 10,
  },
  image2: {
    height: 100,
    width: 120,
    marginTop: 0,
    marginBottom: 10,
  },
  image3: {
    height: 100,
    width: 120,
    marginTop: 0,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 350,
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    height: 150, // Adjusted height to accommodate text and image
    width: 150,
    alignItems: "center",
    justifyContent: "center", // Center the content within the card
  },
  title: {
    fontSize: 16,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  button1: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  button2: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
