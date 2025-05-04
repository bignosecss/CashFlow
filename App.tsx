import React, {useEffect} from 'react';
import { initDatabase } from '@/database/db';

export type RootStackParamList = {
  Home: undefined;
  AddBill: undefined;
  Analytics: undefined;
};

import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddBillScreen from './src/screens/AddBillScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('Initializing database...');
    initDatabase()
      .then(success => console.log('Database initialized:', success))
      .catch(err => console.error('Database initialization failed:', err));
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddBill" component={AddBillScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
