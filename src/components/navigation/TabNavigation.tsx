import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CircleDashed, Cog, MessageCircle, Phone} from 'lucide-react-native';

// SCREENS
import Home from '../../screens/Home';
import Status from '../../screens/Status';
import Settings from '../../screens/Settings';
import {cn} from '../../helpers/utils';

export type RootStackParamsList = {
  Chats: undefined;
  Status: undefined;
  Phone: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamsList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({route}) => ({headerShown: false})}>
      <Tab.Screen
        name="Chats"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: 'WhatsApp',
          tabBarActiveTintColor: 'black',
          tabBarIcon: prop => (
            <MessageCircle
              className={cn('text-[#c6c6c6]', prop.focused && 'text-black/70')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Status"
        options={{
          tabBarActiveTintColor: 'black',
          tabBarIcon: prop => (
            <CircleDashed
              className={cn('text-[#c6c6c6]', prop.focused && 'text-black/70')}
            />
          ),
        }}
        component={Status}
      />
      <Tab.Screen
        name="Phone"
        options={{
          tabBarActiveTintColor: 'black',
          tabBarIcon: prop => (
            <Phone
              className={cn('text-[#c6c6c6]', prop.focused && 'text-black/70')}
            />
          ),
        }}
        component={Phone}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarActiveTintColor: 'black',
          tabBarIcon: prop => (
            <Cog
              className={cn('text-[#c6c6c6]', prop.focused && 'text-black/70')}
            />
          ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
