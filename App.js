import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import List from './src/screens/List';
import SplashScreen from './src/screens/SplashScreen'
import DataToko from './src/screens/DataToko'
import DataProduk from './src/screens/DataProduk'

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="List" component={List} />
              <Stack.Screen name="SplashScreen" component={SplashScreen} /> 
              <Stack.Screen name="DataToko" component={DataToko} /> 
              <Stack.Screen name="DataProduk" component={DataProduk} /> 
          </Stack.Navigator>
        </NavigationContainer>
  );
}

export default App;
