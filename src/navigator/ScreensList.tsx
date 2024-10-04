import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {routeMap} from './routeMap';
import Home from '../screens/Home';
import CalendarListScreen from '../screens/CalendarScreen';
import DatePickerScreen from '../screens/DatePickerScreen';
import CalendarScreenInModal from '../screens/CalendarScreenInModal';
import MultiDatePickerScreenInModal from '../screens/MultiDatePickerScreenInModal';

type ScreenObjType = {
  name: string;
  Component: () => React.JSX.Element;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, string>;
        navigation: any;
      }) => NativeStackNavigationOptions)
    | undefined;
};

export const ScreenList: ScreenObjType[] = [
  {name: routeMap.home, Component: Home, options: {title: 'Home'}},
  {
    name: routeMap.calendar,
    Component: CalendarListScreen,
    options: {title: 'Calendar Picker'},
  },
  {
    name: routeMap.datePicker,
    Component: DatePickerScreen,
    options: {title: 'Date Picker'},
  },
  {
    name: routeMap.calendarWithModal,
    Component: CalendarScreenInModal,
    options: {title: 'Calendar In Modal'},
  },
  {
    name: routeMap.multiCalendarWithModal,
    Component: MultiDatePickerScreenInModal,
    options: {title: 'MultiPle Date Picker'},
  },
];
