import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, ButtonProps} from 'react-native-paper';
type AppButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
} & ButtonProps;

const AppButton = ({
  children,
  mode = 'contained',
  disabled = false,
  loading = false,
  icon = '',
  ...remainingProps
}: AppButtonProps) => {
  return (
    <Button
      mode={mode}
      disabled={disabled}
      loading={loading}
      icon={icon}
      {...remainingProps}>
      {children}
    </Button>
  );
};

export default AppButton;

const styles = StyleSheet.create({});
