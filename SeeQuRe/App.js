import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feedback from './Screens/feedbackScreen';
import Login from './Screens/loginScreen';
import Register from './Screens/registerScreen';
import urlHistory from './Screens/urlHistory';
import userProfile from './Screens/userProfileScreen';
import Navigation from './Screens/navigationScreen';
import Scanner from './Screens/scannerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="navigation">
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='navigation' component={Navigation} />
        <Stack.Screen name='feedback' component={Feedback} />
        <Stack.Screen name='register' component={Register} />
        <Stack.Screen name='scanner' component={Scanner} />
        <Stack.Screen name='urlhistory' component={urlHistory} />
        <Stack.Screen name='userprofile' component={userProfile} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
