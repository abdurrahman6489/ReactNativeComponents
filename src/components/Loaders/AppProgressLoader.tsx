import {StyleSheet} from 'react-native';
import React from 'react';
import {useColors} from '../../config/useColors';
import {ProgressBar, ProgressBarProps} from 'react-native-paper';

type AppProgressBarLoaderProps = {
  loading: boolean;
} & ProgressBarProps;

const AppProgressLoader = ({
  loading,
  ...remainingProps
}: AppProgressBarLoaderProps) => {
  const colors = useColors();
  const {primary} = colors;
  if (!loading) return null;
  return (
    <ProgressBar
      progress={0.5}
      indeterminate={true}
      color={primary}
      {...remainingProps}
    />
  );
};

export default AppProgressLoader;

const styles = StyleSheet.create({});
