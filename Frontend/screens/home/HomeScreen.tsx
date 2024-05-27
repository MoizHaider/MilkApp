import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListRenderItem,
} from "react-native";
import { Colors } from "../../styles";

interface Product {
  prd: string;
  qty: string;
}

interface Plan {
  title: string;
  img: string;
  prods: Product[];
  ttlPrice: number;
}

interface HomeScreenProps {
  navigation: any; // Replace `any` with the appropriate type for your navigation prop
}

interface HomeScreenState {
  plansCardData: Plan[];
}

class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      plansCardData: [
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
      ],
    };
  }

  onPress = (title: string) => {
    console.log(`${title} card pressed!`);
  };

  handlePress = (title: string) => {
    console.log(`${title} Button pressed!`);
  };

  renderItem: ListRenderItem<Plan> = ({ item }) => (
    <PlanCard
      title={item.title}
      img={item.img}
      prods={item.prods}
      ttlPrice={item.ttlPrice}
    />
  );

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ backgroundColor: Colors.secondaryGreen, margin: 0, padding: 0 , paddingVertical: 20}}>
          <View style={styles.headerContainer}>
            <Image source={require("../../assets/favicon.png")} className = "w-30 h-30 rounded-full" />
            <Text style={styles.locationText}>Lahore, Pakistan</Text>
          </View>

          <View key={4} style={styles.infoContainer}>
            <Text className = "text-2xl font-bold color-darkGreen ">Get your Dairy Products</Text>
            <Text className = "text-lg font-semibold color-darkGreen">Delivered!</Text>
          </View>

          <View className = "flex items-center mt-5 ">
            <Image
              source={require("../../assets/images/HomeTopImage.jpg")}
              style={styles.image1}
            />
          </View>
        </View>

        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.cardContainer}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("home2")}
            style={styles.card}
          >
            <Text style={styles.title}>Create Custom Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onPress("My Plan")}
            style={styles.card}
          >
            <Text style={styles.title}>My Plan</Text>
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
            onPress={() => this.handlePress("Milk")}
          >
            <Text style={styles.buttonText}>Milk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => this.handlePress("Paneer")}
          >
            <Text style={styles.buttonText}>Paneer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => this.handlePress("Cheese")}
          >
            <Text style={styles.buttonText}>Cheese</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handlePress("Ghee")}
          >
            <Text style={styles.buttonText}>Ghee</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.cardContainer1}>
          <FlatList
            data={this.state.plansCardData}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    );
  }
}

interface PlanCardProps {
  title: string;
  img: string;
  prods: Product[];
  ttlPrice: number;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, img, prods, ttlPrice }) => {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/milkCardImage.jpg")}
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
    paddingVertical: 30,
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
    marginBottom: 0,
    marginTop: 0,
    paddingHorizontal: 10,
    gap: 20,
    alignItems:"center"
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
    height: 150,
    width: 200,
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
    color: Colors.lightGray,
    fontSize: 16,
  },
});

export default HomeScreen;
