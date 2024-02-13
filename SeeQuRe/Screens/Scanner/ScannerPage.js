import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, Animated, Easing } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const [lineYPos] = useState(new Animated.Value(0)); // Vertical position of the line

  // Function to request camera permission
  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Function to handle scanned barcodes
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  useEffect(() => {
    startLineAnimation(); // Start animation when component mounts
  }, []);

  // Function to start the scanning line animation
  const startLineAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineYPos, {
          toValue: 300,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false, // Not using native driver for translate animation
        }),
        Animated.timing(lineYPos, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false, // Not using native driver for translate animation
        }),
      ]),
    ).start();
  };

  // Check camera permission status and return appropriate UI
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
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  // Return the main UI with barcode scanner and scanning line
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
        <Animated.View
          style={[
            styles.scanningLine,
            {
              transform: [{ translateY: lineYPos }], // Translate animation for scanning line
            },
          ]}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  scanningLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: 'green',
  },
});
