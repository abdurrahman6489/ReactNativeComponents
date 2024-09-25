import {useAppNavigation} from './useAppNavigation';

export const useAppNavigateToRoute = () => {
  const navigation = useAppNavigation();
  const navigateToRoute = (route: string) => navigation.navigate(route);
  return {navigateToRoute};
};
