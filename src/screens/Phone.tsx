import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {ChevronDown} from 'lucide-react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthRoutes';
import useAppwrite from '../appwrite/Context';
import Snackbar from 'react-native-snackbar';

type PhoneProps = NativeStackScreenProps<AuthStackParamList, 'Phone'>;

const Phone = ({navigation}: PhoneProps) => {
  const [phone, setPhone] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('+91');
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {appwrite} = useAppwrite();

  const handleSendOtp = async () => {
    try {
      const combinePhone = countryCode + phone;
      setLoading(true);
      const res = await appwrite.createPhoneSession(combinePhone);
      if (!res) throw new Error('Something went wrong');
      navigation.navigate('OTPScreen', {
        phone: combinePhone,
        userId: res,
      });
      setLoading(false);
      Snackbar.show({
        text: 'OTP sent successfully',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
      });
    } catch (error: any) {
      console.log('error', error.message);
      setLoading(false);
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  useEffect(() => {
    appwrite.currentUser().then(user => {
      if (user && !user.name) {
        navigation.navigate('ProfileInfo');
      }
    });
  }, []);

  return (
    <View className="flex-1 justify-between">
      <View className="flex-1 justify-center">
        <View className="text-start text-4xl p-2 text-black/80">
          <Text className="font-semibold text-4xl">Continue with</Text>
          <Text className="font-semibold text-4xl">your phone number</Text>
        </View>
        <View className="text-start text-black/80 p-2">
          <Text className="text-lg w-4/5">
            Please confirm your country code and enter your phone number
          </Text>
        </View>
        <View className="p-2 pt-10">
          <View className="border border-gray-400 flex flex-row items-center w-full rounded-md">
            <TouchableOpacity
              onPress={() => setShow(true)}
              className="border-r border-gray-300 p-2 flex flex-row items-center justify-between gap-x-1">
              <Text className="font-semibold text-black/80">{countryCode}</Text>
              <ChevronDown className="text-black/80" size={20} />
            </TouchableOpacity>
            <TextInput
              className="flex-1 h-11 pl-2"
              placeholder="Phone Number"
              keyboardType="number-pad"
              value={phone}
              maxLength={10}
              onChangeText={text => setPhone(text)}
            />
          </View>
          <TouchableOpacity
            disabled={phone.length !== 10 || loading}
            className="flex flex-row items-center justify-center disabled:bg-blue-100 bg-blue-500 mt-4 rounded-md h-11"
            onPress={handleSendOtp}>
            <Text className="text-white font-semibold text-lg">
              {loading ? 'Sending...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-center w-4/5 mx-auto mb-4">
        By click continue you agree to our terms of service and privacy
      </Text>
      <CountryPicker
        style={{modal: {paddingTop: 10, position: 'absolute', top: 0}}}
        lang="en"
        show={show}
        onRequestClose={() => setShow(false)}
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
};

export default Phone;
