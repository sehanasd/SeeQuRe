import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"



const Login = ({ navigation }) => {

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // const handleNavigation = () => {
    //     navigation.navigate("register");
    // };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ alignItems: 'center', marginTop: 0 }}>
                    <Image 
                        source={require("../../assets/SeeQuReLogo.png")}
                        style={{
                            height: 230,
                            width: 230,
                            borderRadius: 20,
                            marginTop: 0,
                            marginBottom: 0,
                        }}
                    />
                </View>

                <View style={{ marginVertical: 0, alignItems: 'center', letterSpacing: 2}}>
                    <Text style={styles.logoText}>
                        See
                    <Text style={styles.qText}>Q</Text>
                    <Text>u</Text>
                    <Text style={styles.rText}>R</Text>
                        e
                    </Text>                           
                </View>

                {/* title and slogan */}
                <View style={{ flex: 1, marginHorizontal: 22}}>
                    <View style={{ marginVertical: 10,  alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginVertical: 10,
                            color: COLORS.black
                        }}>
                            Where Security Meets Simplicity
                        </Text>

                        <Text style={{
                            fontSize: 14,
                            color: COLORS.black
                        }}>Access Your World: Welcome to SeeQuRe</Text>
                        
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Email address</Text>

                        <View style={{
                            width: "100%",
                            height: 40,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>

                            {/* Email text feild */}
                            <TextInput
                                placeholder='Enter your email address'
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Password</Text>

                        <View style={{
                            width: "100%",
                            height: 40,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>

                            {/* password feild */}
                            <TextInput
                                placeholder='Enter your password'
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={!isPasswordShown}
                                style={{
                                    width: "100%"
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 6
                    }}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? COLORS.blue : undefined}
                        />

                        <Text>Remenber Me</Text>
                    </View>

                    {/* login button */}
                    <Button
                        title="Sign In"
                        filled
                        style={{
                            marginTop: 10,
                            marginBottom: 4,
                            height: 40,
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: 'center',
                        marginVertical: 10
                    }}>
                        <Text style={{ paddingTop: 6, fontSize: 16, color: COLORS.black, flex: 0.6, lineHeight: 15}}>Don't have an account ? </Text>
                        <Button title="Register" onPress={() => navigation.navigate("register")} style={{ borderRadius: 0, borderWidth: 0, padding: 10, backgroundColor: 'transparent' }} />
                    </View>
                </View>
            </ScrollView>
            
            
        </SafeAreaView>
    )
}

const COLORS = {
    white: "#FFFFFF",
    black: "#222222",
    darkGreen: "#007260",
    lightGreen: "#82fa63",
    blue: "#2f90d8",
    lightBlue: "#46a7e4",
    grey: "#CCCCCC"
}

const Button = (props) => {
    const filledBgColor = props.color || COLORS.blue;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.blue;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style,
                overflow: 'hidden'
                
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 16, ... { color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 5,
        paddingVertical: 5,
        borderColor: COLORS.blue,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoText: {
        fontSize: 25,
        color: COLORS.black,
    },
    qText: {
        color: COLORS.lightGreen, 
        fontWeight: 'bold',
    },
    rText: {
        color: COLORS.lightBlue, 
        fontWeight: 'bold',
    },
})
export default Login
