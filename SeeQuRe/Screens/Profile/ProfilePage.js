import React from 'react';
import { View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export function ProfilePage() {
    const navigation = useNavigation();
    return (
        <View>
            <Button onPress={() => navigation.navigate('changeUsername')} title='Change Username'></Button>
            <Button onPress={() => navigation.navigate('changePassword')} title='Change Password'></Button>
            <Button onPress={() => navigation.navigate('feedback')} title='Feedback'></Button>
        </View>

    )
}
