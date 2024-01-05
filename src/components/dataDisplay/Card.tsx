import {View, Text, Image, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import {
  CheckCheck,
  Info,
  MessageCircle,
  MessageSquare,
  Phone,
  Video,
} from 'lucide-react-native';
import {Feedback, General} from '..';

interface CardProps {
  name: string;
  profile: string;
  lastMessage: string;
  time: string;
}

const Card = ({name, lastMessage, profile, time}: CardProps) => {
  return (
    <TouchableNativeFeedback>
      <View className="flex-row gap-x-4 p-4">
        <Feedback.Modal>
          <Feedback.ModalTrigger>
            <View className="ml-3">
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
            </View>
          </Feedback.ModalTrigger>
          <Feedback.ModalContent>
            <View className="w-3/4 relative">
              <Text className="text-white bg-black/20 absolute top-0 left-0 z-10 w-full p-2 font-semibold">
                {name}
              </Text>
              <TouchableNativeFeedback>
                <Image
                  className="w-full aspect-square"
                  source={{
                    uri: profile,
                  }}
                />
              </TouchableNativeFeedback>
              <View className="bg-white p-4 flex-row justify-between">
                <TouchableNativeFeedback>
                  <MessageSquare className="text-black/70" />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                  <Phone className="text-black/70" />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                  <Video className="text-black/70" />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                  <Info className="text-black/70" />
                </TouchableNativeFeedback>
              </View>
            </View>
          </Feedback.ModalContent>
        </Feedback.Modal>
        {/* <TouchableOpacity onPress={() => setShowModal(prev => !prev)}>
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
        </TouchableOpacity> */}
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
