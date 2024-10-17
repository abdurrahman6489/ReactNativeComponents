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
      title: 'Calendar Picker with Modal',
      iconName: 'calendar-month',
      onPress: function () {
        navigateToRoute(routeMap.calendarWithModal);
      },
    },
    {
      title: 'Multiple Date Picker with Modal',
      iconName: 'calendar-range',
      onPress: function () {
        navigateToRoute(routeMap.multiCalendarWithModal);
      },
    },
    {
      title: 'Date Range Picker with Modal',
      iconName: 'calendar-multiselect',
      onPress: function () {
        navigateToRoute(routeMap.dateRangePickerWithModal);
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
