import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const AboutUs = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ alignItems: 'center', marginTop: 70 }}>
                    <Image
                        source={require("../../assets/SeeQuReLogo.png")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            marginBottom: 0,
                        }}
                    />
                </View>

                <View style={{ marginVertical: 0, alignItems: 'center', letterSpacing: 2 }}>
                    <Text style={styles.logoText}>
                        See
                        <Text style={styles.qText}>Q</Text>
                        <Text>u</Text>
                        <Text style={styles.rText}>R</Text>
                        e
                    </Text>
                </View>

                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{ marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 16,
                            marginVertical: 10,
                            color: COLORS.black
                        }}>
                            Where Security Meets Simplicity
                        </Text>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Email address</Text>

                        
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Password</Text>

                        
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
  
};

export default AboutUs;
