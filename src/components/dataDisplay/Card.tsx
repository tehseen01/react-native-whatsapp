import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import {CheckCheck} from 'lucide-react-native';

interface CardProps {
  name: string;
  profile: string;
  lastMessage: string;
  time: string;
}

const Card = ({name, lastMessage, profile, time}: CardProps) => {
  return (
    <TouchableNativeFeedback>
      <View className="flex-row gap-x-4 p-4 ">
        <TouchableOpacity>
          {profile ? (
            <Image
              className="rounded-full"
              source={{
                uri: profile,
                width: 50,
                height: 50,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/blank_img.jpg')}
              className="w-[50px] h-[50px] rounded-full"
            />
          )}
        </TouchableOpacity>
        <View className=" flex-1">
          <View className="flex-1 flex-row justify-between">
            <Text className="text-lg font-semibold text-black/90">{name}</Text>
            <Text className="text-sm text-black/60">Yesterday</Text>
          </View>
          <View className="flex-1 flex-row justify-between">
            <Text>{lastMessage}</Text>
            <CheckCheck className="text-[#1e98be] text-xs " size={18} />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Card;
