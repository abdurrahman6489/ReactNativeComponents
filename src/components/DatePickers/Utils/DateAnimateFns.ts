import {Animated, Easing} from 'react-native';

export const generateMonthAnimationFn = (
  translateXAnim: Animated.Value,
  callback: () => void,
  value: number,
) => {
  const animateFn = () => {
    Animated.timing(translateXAnim, {
      toValue: value,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      callback();
    });

    translateXAnim.setValue(-value);

    Animated.timing(translateXAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  return animateFn;
};
