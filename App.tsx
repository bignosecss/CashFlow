import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import { initDatabase } from '@/database/db';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type RootStackParamList = {
  Home: undefined;
  AddBill: undefined;
  Analytics: undefined;
};

import {
  StatusBar,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddBillScreen from './src/screens/AddBillScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import { theme } from '@/theme/theme';

const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
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
        <Toast config={{
          success: (props) => (
            <View style={{
              width: '95%',
              padding: theme.spacing.xlarge,
              backgroundColor: theme.colors.white,
              borderRadius: theme.borderRadius.medium,
              borderLeftColor: theme.colors.success,
              borderLeftWidth: 6,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: theme.shadow.shadowOpacity,
              shadowRadius: 4,
              elevation: theme.shadow.elevation + 1,
              marginTop: theme.spacing.xxlarge,
            }}>
              <Text style={{
                fontSize: theme.typography.body,
                fontWeight: '600',
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.fontFamily.semiBold,
              }}>
                {props.text1}
              </Text>
              {props.text2 && (
                <Text style={{
                  fontSize: theme.typography.caption,
                  color: theme.colors.textSecondary,
                  marginTop: theme.spacing.small,
                  fontFamily: theme.typography.fontFamily.regular,
                }}>
                  {props.text2}
                </Text>
              )}
            </View>
          ),
          error: (props) => (
            <View style={{
              width: '95%',
              padding: theme.spacing.xlarge,
              backgroundColor: theme.colors.white,
              borderRadius: theme.borderRadius.medium,
              borderLeftColor: theme.colors.error,
              borderLeftWidth: 6,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: theme.shadow.shadowOpacity,
              shadowRadius: 4,
              elevation: theme.shadow.elevation + 1,
              marginTop: theme.spacing.xxlarge,
            }}>
              <Text style={{
                fontSize: theme.typography.body,
                fontWeight: '600',
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.fontFamily.semiBold,
              }}>
                {props.text1}
              </Text>
              {props.text2 && (
                <Text style={{
                  fontSize: theme.typography.caption,
                  color: theme.colors.textSecondary,
                  marginTop: theme.spacing.small,
                  fontFamily: theme.typography.fontFamily.regular,
                }}>
                  {props.text2}
                </Text>
              )}
            </View>
          ),
        }} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
