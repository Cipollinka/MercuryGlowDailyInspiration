import React from 'react';
import {UserProvider} from './user/Provider/UserProvider.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Main} from './components/Main/main-page.tsx';
import {OnBoardMain} from './components/OnBoards/on-board-main.tsx';

const Stack = createStackNavigator();

export default function MainRoot() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}>
          <Stack.Screen name="OnBoards" component={OnBoardMain} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
