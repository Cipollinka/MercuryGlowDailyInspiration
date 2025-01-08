import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Loaders} from './src/components/Loader/loaders-screen.tsx';
import {UserProvider} from './src/user/Provider/UserProvider.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Main} from './src/components/Main/main-page.tsx';
import {OnBoardMain} from './src/components/OnBoards/on-board-main.tsx';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false}}>
          <Stack.Screen name="Loader" component={Loaders} />
          <Stack.Screen name="OnBoards" component={OnBoardMain} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
