import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChangePassword } from './Screens/Profile/ChangePassword';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import UrlHistory from './Screens/URLHistory/URLHistoryScreen';
import Login from './Screens/Login/LoginScreen';
import Scanner from './Screens/Scanner/ScannerPage';
import RegisterPage from './Screens/Register/RegisterPage';
import { ProfilePage } from './Screens/Profile/ProfilePage';
import FeedbackPage from './Screens/Profile/FeedbackPage';
import { ChangeUsernamePage } from './Screens/Profile/ChangeUsernamePage';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create a new component that includes the Stack Navigator
const ProfileStack = () => (
  <Stack.Navigator initialRouteName='profile page' >
    <Stack.Screen name="profile page" component={ProfilePage}  options={{ headerShown: false }}/>
    <Stack.Screen name="changeUsername" component={ChangeUsernamePage} options={{ headerShown: false }} />
    <Stack.Screen name="changePassword" component={ChangePassword}  />
    <Stack.Screen name="feedback" component={FeedbackPage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="scanner"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'scanner') {
              iconName = 'line-scan';
            } else if (route.name === 'profile') {
              iconName = 'account';
            } else if (route.name === 'urlHistory') {
              iconName = 'history';
            } else if (route.name === 'login') {
              iconName = 'login';
            } else if (route.name === 'register') {
              iconName = 'account-plus';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />; // Use MaterialCommunityIcons instead of FontAwesome
          },
        })}
      >
        <Tab.Screen name="login" component={Login} options={{ headerShown: false }}  /> 
        <Tab.Screen name="register" component={RegisterPage} options={{ headerShown: false }}  />
        <Tab.Screen name="scanner" component={Scanner}  options={{ headerShown: false }}  />
        <Tab.Screen name="urlHistory" component={UrlHistory}  options={{ headerShown: false }}  />
        <Tab.Screen name="profile" component={ProfileStack}  options={{ headerShown: false }}  /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
