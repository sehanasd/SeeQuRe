import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Navigation = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title="feedback" onPress={() => navigation.navigate("feedback")} />
            </View>
            <View style={styles.button}>
                <Button title="register" onPress={() => navigation.navigate("register")} />
            </View>
            <View style={styles.button}>
                <Button title="scanner" onPress={() => navigation.navigate("scanner")} />
            </View>
            <View style={styles.button}>
                <Button title="login" onPress={() => navigation.navigate("login")} />
            </View>
            <View style={styles.button}>
                <Button title="urlhistory" onPress={() => navigation.navigate("urlhistory")} />
            </View>
            <View style={styles.button}>
                <Button title="userprofile" onPress={() => navigation.navigate("userprofile")} />
            </View>
        </View>
    );
};

export default Navigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    button: {
        margin: 10,
        borderRadius: 20,
        overflow: 'hidden',
        width: '50%', // Adjust this value to make the buttons smaller or larger
        alignSelf: 'center', // This will center the buttons horizontally
    },
});

