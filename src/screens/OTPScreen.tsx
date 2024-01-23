import {ChevronLeft} from 'lucide-react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {AuthStackParamList} from '../routes/AuthRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {cn} from '../helpers/utils';
import useAppwrite from '../appwrite/Context';
import Snackbar from 'react-native-snackbar';
import ResendBtn from './OTPScreen/ResendBtn';

type OTPScreenProps = NativeStackScreenProps<AuthStackParamList, 'OTPScreen'>;

const OTPScreen = ({navigation, route}: OTPScreenProps) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [submitting, setSubmitting] = useState(false);

  const {appwrite} = useAppwrite();

  const handleChange = (index: number) => (value: string) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const combineOtp = newOtp.join('');

    if (combineOtp.length === 6) {
      Keyboard.dismiss();
      setSubmitting(true);
      appwrite
        .phoneVerify(route.params.userId, combineOtp)
        .then(res => {
          if (res) {
            Snackbar.show({
              text: 'OTP verified successfully',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'green',
            });
            navigation.navigate('ProfileInfo');
            setSubmitting(false);
          }
        })
        .catch((error: any) => {
          setSubmitting(false);
          setOtp(Array(6).fill(''));
          Alert.alert(
            '',
            'The code you entered is incorrect. Please try again',
            [{text: 'OK'}],
            {cancelable: true},
          );
        });
    }
  };

  const handleKeyDown = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4 flex-row items-center gap-x-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>
            <ChevronLeft className="text-black/80" size={24} />
          </Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold">OTP verification</Text>
      </View>
      <View className="items-center mt-4">
        <Text className="text-base">We've sent a verification code to</Text>
        <View className="justify-center flex-row items-center gap-x-2">
          <Text className="text-base font-semibold">{route.params.phone}.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-blue-500">Wrong number?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row justify-center gap-x-2 mt-6">
        {otp.map((data, index) => (
          <TextInput
            ref={input => (inputRefs.current[index] = input)}
            key={index}
            className={cn(
              'border border-gray-400 w-12 h-12 rounded-md text-center text-2xl focus:border-gray-900',
              data !== '' && 'border-blue-500',
            )}
            keyboardType="number-pad"
            value={data}
            maxLength={1}
            onChangeText={handleChange(index)}
            onKeyPress={e => handleKeyDown(index, e)}
            onFocus={() => inputRefs.current[index]?.setSelection(1, 1)}
          />
        ))}
      </View>
      <ResendBtn submitting={submitting} />
      <Modal visible={submitting} transparent>
        <View className="flex-1 justify-center items-center bg-black/20">
          <View className="bg-white p-4 flex-row gap-x-4 w-11/12 mx-auto items-center">
            <ActivityIndicator size={'large'} />
            <Text className="font-medium">Verifying...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OTPScreen;
