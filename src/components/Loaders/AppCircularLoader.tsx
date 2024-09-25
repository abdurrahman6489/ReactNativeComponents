import {StyleSheet} from 'react-native';
import React from 'react';
import {useColors} from '../../config/useColors';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native-paper';

type AppActivityIndicatorProps = {
  loading: boolean;
} & ActivityIndicatorProps;

const AppCircularLoader = ({
  loading,
  ...remainingProps
}: AppActivityIndicatorProps) => {
  const colors = useColors();
  const {primary} = colors;
  if (!loading) return null;
  return (
    <ActivityIndicator
      animating={loading}
      color={primary}
      {...remainingProps}
    />
  );
};

export default AppCircularLoader;

const styles = StyleSheet.create({});
