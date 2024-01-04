import {View, Text} from 'react-native';
import React from 'react';
import {Camera, Search} from 'lucide-react-native';

interface HeaderProps {
  title: string;
}

const Header = ({title}: HeaderProps) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'yellow',
      }}>
      <Text>{title}</Text>
      <View style={{justifyContent: 'space-between'}}>
        <Search className="text-black" />
        <Camera className="text-black" />
      </View>
    </View>
  );
};

export default Header;
