import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Animated,
  Easing,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export default function ScannerPage({ navigation }) {
  // State variables for camera permission, scanned status, and scanned URL
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedUrl, setScannedUrl] = useState("Not yet scanned");

  // Animated value for the scanning line position
  const lineYPos = useRef(new Animated.Value(-150)).current;

  // Request camera permission on component mount
  useEffect(() => {
    const askForCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    askForCameraPermission();
  }, []);

  // Start the scanning line animation when the scanned state changes
  useEffect(() => {
    if (!scanned) {
      startLineAnimation();
    }
  }, [scanned]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedUrl(data);

    try {
      const response = await axios
        .post("http://192.168.1.7:5001/model_prediction", {
          url: data,
        })
        // .then(() => {
        //   Alert.alert("Prediction Result", response.data.prediction);
        // });
        .then((response) => {
          // Handling success
          Alert.alert("Prediction Result", response.data.prediction);
        });
    } catch (error) {
      console.error("Error sending scanned URL:", error);
    }
  };

  // Function to start the scanning line animation
  const startLineAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineYPos, {
          toValue: 300,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(lineYPos, {
          toValue: -150,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  // Function to reset the scanner state
  const resetScanner = () => {
    setScanned(false);
    setScannedUrl("Not yet scanned");
    // Restart the scanning line animation
    startLineAnimation();
  };

  // Effect hook to handle focus effect
  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
      setScannedUrl("Not yet scanned");
      startLineAnimation();
      return () => {
        lineYPos.stopAnimation();
      };
    }, [])
  );

  // Render UI based on camera permission status
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Render camera view, scanning line, scanned URL, and scan again button
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.barcodebox}>
          <Animated.View
            style={[
              styles.scanningLine,
              {
                transform: [{ translateY: lineYPos }],
              },
            ]}
          />
        </View>
      </Camera>
      <Text style={styles.maintext}>{scannedUrl}</Text>
      {scanned && (
        <Button title={"Scan again?"} onPress={resetScanner} color="tomato" />
      )}
    </View>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: 300,
    height: 300,
    overflow: "hidden",
    borderRadius: 30,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    fontWeight: "bold", // Make the scanned URL bold
  },
  barcodebox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  scanningLine: {
    position: "absolute",
    width: "100%",
    height: 3,
    backgroundColor: "green",
  },
});
