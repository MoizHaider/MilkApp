import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../styles";
import * as Location from "expo-location";

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

export default function ProfileScreen({ navigator }) {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Location Loading....."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [initialRegion, setInitialRegion] = useState(null);
  const [region, setRegion] = useState(null);


  const mapRef = useRef(null);

  

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert("Location not enabled", "Please enable your Location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      setInitialRegion(newRegion);
      setRegion(newRegion);

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(response);
      const address = {
        district: response.district,
        street: response.street,
        streetNo: response.streetNumber,
        city: response.city,
        postalCode: response.postalCode,
        region: newRegion,
      };
      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;

        setDisplayCurrentAddress(address);
      }
    }
  };


  const onRegionChangeComplete = async (region) => {
    // console.log("map ref ", mapRef)
    let response = await Location.reverseGeocodeAsync({
      latitude: region.latitude,
      longitude: region.longitude,
    });

    console.log(response);
    const address = {
      district: response.district | "",
      street: response.street | "",
      streetNo: response.streetNumber | "",
      city: response.city,
      postalCode: response.postalCode | "",
      house: response.house | "",
      region: region | "",
    };

    for (let item of response) {
      let address = `${item.name} ${item.city} ${item.postalCode}`;

      setDisplayCurrentAddress(address);
    }
    setRegion(region);

    console.log("onRegionChangeComplete", region);
  };

  if (!initialRegion) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View className="w-full h-full ">
      <View className = "w-full h-full">
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          showsUserLocation
          showsMyLocationButton={true}
          initialRegion={initialRegion}
          onMapReady={() => console.log("Map is ready")}
          onRegionChangeComplete={onRegionChangeComplete}
          scrollEnabled={true}
        ></MapView>

        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={require("../../assets/icons/markerIcon.png")}
          />
        </View>
      </View>

      <View
        style={styles.shadow}
        className="px-4 absolute bottom-0 rounded-t-[30px] py-6 bg-secondaryGreen w-full h-fit-content flex  items-center "
      >
        <View className="flex w-full justify-center items-center">
          <TextInput
            className="w-[100%] bg-gray-100 px-2 py-2 rounded-lg"
            // onChangeText={text => setTextInputValue(text)}
            // value={textInputValue}
            placeholder="Address Details eg: House No, Street No"
          />
          <TextInput
            className="w-[100%] bg-gray-100 placeholder-red-500 px-2 py-2 rounded-lg mt-2"
            // onChangeText={text => setTextInputValue(text)}
            // value={textInputValue}
            placeholder="Mobile No"
          />
        </View>

        <Pressable className="bg-white w-[80%] mt-6 flex py-3 items-center rounded-full">
          <Text className="text-primaryGreen font-bold text-lg">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  region: {
    color: "#fff",
    lineHeight: 20,
    margin: 20,
  },
});
