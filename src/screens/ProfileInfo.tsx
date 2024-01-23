import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import React from 'react';
import {Camera} from 'lucide-react-native';
import useAppwrite from '../appwrite/Context';
import Snackbar from 'react-native-snackbar';

const ProfileInfo = () => {
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {appwrite, setIsLoggedIn} = useAppwrite();

  const handleSetProfileInfo = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await appwrite.updateProfile(name);
      setLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View>
      <Text className="text-center font-semibold pt-5 pb-6 text-[#005d4b] text-base">
        Profile Info
      </Text>
      <Text className="text-center">
        Please provide your name and an optional profile photo
      </Text>
      <View className="flex flex-row items-center justify-center my-6">
        <View className="flex flex-col items-center justify-center">
          <View className="h-28 w-28 rounded-full bg-gray-400 items-center justify-center">
            <Camera className="text-white/90" size={50} strokeWidth={1.2} />
          </View>
          <Text className="text-center pt-2">Add Photo</Text>
        </View>
      </View>
      <TextInput
        placeholder="Type your name here"
        value={name}
        onChangeText={text => setName(text)}
        className="border-b-2 border-[#005d4b] py-2 mx-4 my-4"
      />
      <TouchableOpacity
        disabled={name.length < 3 || loading}
        className="flex flex-row items-center justify-center disabled:bg-blue-100 bg-[#005d4b] mt-4 rounded-md h-11 mx-4"
        onPress={handleSetProfileInfo}>
        <Text className="text-white font-semibold text-lg">
          {loading ? 'Loading...' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileInfo;
