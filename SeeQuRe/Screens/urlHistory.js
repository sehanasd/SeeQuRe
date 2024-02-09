import React from "react";
import { StyleSheet, Text, View, FlatList, Linking, TouchableOpacity, Alert } from "react-native";

const urlHistory = () => {
    
    const sampleData = [
        { id: 1, url: 'https://facebook.com/' },
        { id: 2, url: 'https://example.com/page2' },
        { id: 3, url: 'https://example.com/page3' },
        { id: 4, url: 'https://example.com/page4' },
        { id: 5, url: 'https://example.com/page5' },
        { id: 6, url: 'https://example.com/page6' },
        { id: 7, url: 'https://example.com/page7' },
        { id: 8, url: 'https://example.com/page8' },
        { id: 9, url: 'https://example.com/page9' },
        { id: 10, url: 'https://example.com/page10' },
    ];

    const handleUrlPress = (url) => {
        Alert.alert(
            'Are you Sure?',
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
    };

    const openUrl = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleUrlPress(item.url)}>
            <View style={styles.item}>
                <Text>{item.url}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sampleData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default urlHistory;
