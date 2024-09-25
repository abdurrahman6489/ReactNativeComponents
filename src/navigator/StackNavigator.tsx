import React from 'react';
import Home from '../screens/Home';
import CalendarScreen from '../screens/CalendarScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeMap} from './routeMap';
import {useColors} from '../config/useColors';
import DatePickerScreen from '../screens/DatePickerScreen';

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
      <Stack.Screen
        name={routeMap.home}
        component={Home}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name={routeMap.calendar}
        component={CalendarScreen}
        options={{title: 'Calendar Picker'}}
      />
      <Stack.Screen
        name={routeMap.datePicker}
        component={DatePickerScreen}
        options={{title: 'Date Picker'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;