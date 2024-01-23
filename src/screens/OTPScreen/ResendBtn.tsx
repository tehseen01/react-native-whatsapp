import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {cn} from '../../helpers/utils';

const ResendBtn = ({submitting}: {submitting: boolean}) => {
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsResendDisabled(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown > 0 && isResendDisabled) {
      const countdownTimer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [countdown, isResendDisabled]);

  return (
    <View className="flex-col justify-center items-center mt-10">
      <TouchableOpacity disabled={isResendDisabled || submitting}>
        <Text className={cn(!isResendDisabled && 'text-blue-500')}>
          Resend OTP {isResendDisabled ? `in ${countdown}s` : null}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResendBtn;
