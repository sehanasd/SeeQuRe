import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        // Handle form submission
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { borderColor: 'black' }]} // Changed borderColor to black
                onChangeText={setCurrentPassword}
                value={currentPassword}
                placeholder="Current password"
                secureTextEntry
            />
            <TextInput
                style={[styles.input, { borderColor: 'black' }]} // Changed borderColor to black
                onChangeText={setNewPassword}
                value={newPassword}
                placeholder="New password"
                secureTextEntry
            />
            <TextInput
                style={[styles.input, { borderColor: 'black' }]} // Changed borderColor to black
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm password"
                secureTextEntry
            />
            <TouchableOpacity
                style={[styles.buttonContainer, { marginBottom: 20 }]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'black', // Changed borderColor to black
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        backgroundColor: '#2f90d8',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
