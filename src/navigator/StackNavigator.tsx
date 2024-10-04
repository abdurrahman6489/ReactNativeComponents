import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeMap} from './routeMap';
import {useColors} from '../config/useColors';

import {ScreenList} from './ScreensList';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const {primary, light} = useColors();
  const initialRouteName = routeMap.home;
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        statusBarColor: primary,
        animation: 'slide_from_bottom',
        headerStyle: {
          backgroundColor: primary,
        },
        headerTintColor: light,
        headerTitleAlign: 'center',
      }}>
      {ScreenList.map(({name, Component, options}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={Component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigator;
