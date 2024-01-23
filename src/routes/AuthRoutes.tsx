import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Phone from '../screens/Phone';
import OTPScreen from '../screens/OTPScreen';
import {useColorScheme} from 'react-native';
import ProfileInfo from '../screens/ProfileInfo';

export type AuthStackParamList = {
  Phone: undefined;
  OTPScreen: {phone: string; userId: string};
  ProfileInfo: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthRoutes = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // contentStyle: {backgroundColor: isDarkMode ? 'black' : 'white'},
      }}>
      <Stack.Screen name="Phone" component={Phone} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
