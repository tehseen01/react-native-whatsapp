import React, {useEffect} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import SplashScreen from 'react-native-splash-screen';
import Router from './routes/Router';
import Toast from 'react-native-toast-message';
import {AppwriteProvider} from './appwrite/Context';

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 250);
  }, []);

  return (
    <AppwriteProvider>
      <SafeAreaProvider>
        <Router />
        <Toast />
      </SafeAreaProvider>
    </AppwriteProvider>
  );
}

export default App;
