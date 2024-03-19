import React from "react";
import { StyleSheet, Text, View, FlatList, Linking, TouchableOpacity, Alert } from "react-native";
import { useAtom } from "jotai";
import { userIdAtom } from '../userAtom';


const UrlHistory = () => {
    
    const sampleData = [
        { id: 1, url: 'https://facebook.com/', malicious: false },
        { id: 2, url: 'https://example.com/page2', malicious: true },
        { id: 3, url: 'https://example.com/page3', malicious: false },
        { id: 4, url: 'https://example.com/page4', malicious: false },
        { id: 5, url: 'https://example.com/page5', malicious: true },
        { id: 6, url: 'https://example.com/page6', malicious: false },
        { id: 7, url: 'https://example.com/page7', malicious: true },
        { id: 8, url: 'https://example.com/page8', malicious: false },
        { id: 9, url: 'https://example.com/page9', malicious: true },
        { id: 10, url: 'https://example.com/page10', malicious: false },
    ];
    const [userId] = useAtom(userIdAtom);
    Alert.alert("User's ID from login-history: ", userId);
    const handleUrlPress = (url, isMalicious) => {
        if (isMalicious) {
            Alert.alert(
                'Malicious Link',
                'This link seems to be malicious. Do you want to continue?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => openUrl(url),
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                'Open URL',
                `Do you want to open ${url} in the default browser?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => openUrl(url),
                    },
                ],
                { cancelable: false }
            );
        }
    };
    
    const openUrl = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleUrlPress(item.url, item.malicious)}>
            <View style={styles.itemContainer}>
                <Text style={styles.urlText}>{item.url}</Text>
                {item.malicious && <Text style={styles.maliciousLabel}>Malicious</Text>}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>URL History</Text>
            <FlatList
                data={sampleData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60, 
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    urlText: {
        fontSize: 16,
    },
    maliciousLabel: {
        color: 'red',
        fontWeight: 'bold',
    },
    listContent: {
        marginTop: 20, 
    },
});

export default UrlHistory;
