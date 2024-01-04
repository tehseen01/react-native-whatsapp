import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigation} from './components';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigation.TabNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
