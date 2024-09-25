import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

export const useAppNavigation = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return navigation;
};
