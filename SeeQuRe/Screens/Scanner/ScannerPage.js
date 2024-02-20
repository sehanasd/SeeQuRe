import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, Animated, Easing } from 'react-native';
import { Camera } from 'expo-camera';

export default function ScannerPage() {
  // State variables
  const [hasPermission, setHasPermission] = useState(null); // Permission state
  const [scanned, setScanned] = useState(false); // Scanned state
  const [text, setText] = useState('Not yet scanned'); // Scanned text

  // Animated value for scanning line position
  const [lineYPos] = useState(new Animated.Value(0)); 

  // Function to request camera permission
  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  // Effect to request camera permission on component mount
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Function to handle barcode scanning event
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data);
  };

  // Effect to start the animation of the scanning line on component mount
  useEffect(() => {
    startLineAnimation(); 
  }, []);

  // Function to start the animation of the scanning line
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
          toValue: 0,
          duration: 0,
          useNativeDriver: false, 
        }),
      ]),
    ).start();
  };

  // Render logic based on camera permission status
  if (hasPermission === null) {
    // Display message while requesting camera permission
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    // Display message when camera permission is denied
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  // Render camera view and barcode scanning functionality
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        {/* Barcode box containing the scanning line */}
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
      {/* Display scanned text and option to scan again */}
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 300,
    height: 300, 
    overflow: 'hidden',
    borderRadius: 30,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scanningLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: 'green',
  },
});
