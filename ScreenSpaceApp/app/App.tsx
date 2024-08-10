import React, {useEffect} from 'react';
import {BackHandler, SafeAreaView} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import RootNavigator from './navigation/RootNavigator';
import {nativeBaseTheme} from './ui/styles/theme';
import {UserProvider} from './UserContext';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

function App(): JSX.Element {
  // Disable hardware back button
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <UserProvider>
          <RootNavigator />
        </UserProvider>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default App;
