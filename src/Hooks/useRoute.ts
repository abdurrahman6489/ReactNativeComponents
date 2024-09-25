import {routeMap} from '../navigator/routeMap';
import {useAppNavigateToRoute} from './useAppNavigateToRoute';

export const useRoute = () => {
  const {navigateToRoute} = useAppNavigateToRoute();

  const routeArray = [
    {
      title: 'Calendar Picker',
      iconName: 'calendar-month',
      onPress: function () {
        navigateToRoute(routeMap.calendar);
      },
    },
    {
      title: 'Date Picker',
      iconName: 'clock-edit-outline',
      onPress: function () {
        navigateToRoute(routeMap.datePicker);
      },
    },
  ];
  return routeArray;
};
