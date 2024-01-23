import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default Loader;
