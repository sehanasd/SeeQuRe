import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export function ChangeUsernamePage() {
    const [currentUsername, setCurrentUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCurrentUsername}
                value={currentUsername}
                placeholder="Current username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setNewUsername}
                value={newUsername}
                placeholder="New username"
            />
            <Button
                title="Submit"
                color="#2f90d8"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
    },
});
