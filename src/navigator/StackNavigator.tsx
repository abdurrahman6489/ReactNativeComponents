import React from 'react';
import Home from '../screens/Home';
import CalendarScreen from '../screens/CalendarScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeMap} from './routeMap';
import {useColors} from '../config/useColors';
import DatePickerScreen from '../screens/DatePickerScreen';
import CalendarScreenInModal from '../screens/CalendarScreenInModal';
import DateRangeScreenInModal from '../screens/DateRangeScreenInModal';

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
      <Stack.Screen
        name={routeMap.calendarWithModal}
        component={CalendarScreenInModal}
        options={{title: 'Calendar In Modal'}}
      />
      <Stack.Screen
        name={routeMap.dateRangePickerWithModal}
        component={DateRangeScreenInModal}
        options={{title: 'Date Range In Modal'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
