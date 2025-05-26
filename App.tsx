import React,{useState,useEffect} from 'react'
import { Text, StyleSheet, View ,ActivityIndicator} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddHabitScreen from './src/screens/AddHabitScreen';
import HabitProgressScreen from './src/screens/HabitProgressScreen';
import { RootStackParamList } from './src/types/navigation';
import HomeTabs from './src/Navigation/HomeTabs';
import { HabitProvider } from './src/context/HabitContext';
import { getUser } from './src/utils/Storage';
import { ThemeProvider } from './src/context/ThemeContext';



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      setInitialRoute(user ? 'HomeTabs' : 'SignUp');
    };
    checkUser();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
    <HabitProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute as keyof RootStackParamList}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    </HabitProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({})
