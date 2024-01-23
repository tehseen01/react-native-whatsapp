import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useAppwrite from '../appwrite/Context';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import {Feedback} from '../components';

const Router = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {appwrite, isLoggedIn, setIsLoggedIn, setUser} = useAppwrite();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsLoading(true);
        const user = await appwrite.currentUser();
        if (user && user.name.length > 0) {
          setIsLoggedIn(true);
          setUser(user);
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.log('error', error.message);
      }
    };

    getCurrentUser();
  }, []);

  if (isLoading) {
    return <Feedback.Loader />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Router;
