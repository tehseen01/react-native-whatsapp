import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigation} from './components';

import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 250);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigation.TabNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
