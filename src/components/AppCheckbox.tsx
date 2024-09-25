import {StyleSheet} from 'react-native';
import React from 'react';
import {Checkbox, CheckboxItemProps} from 'react-native-paper';
import {dark} from '../config/colors';
import {useColors} from '../config/useColors';

type AppCheckboxProps = {
  value: string;
  status: CheckboxItemProps['status'];
  color?: string;
  unCheckColor?: string;
  onCheck: (value: string) => void;
} & CheckboxItemProps;

const AppCheckbox = ({
  value,
  status,
  color = '',
  unCheckColor = dark,
  onCheck,
  ...remainingProps
}: AppCheckboxProps) => {
  const colors = useColors();
  const checkboxColor = color ? color : colors.primary;

  const handleCheckPress = () => {
    onCheck(value);
  };
  return (
    <Checkbox.Item
      {...remainingProps}
      mode="android"
      status={status}
      color={checkboxColor}
      uncheckedColor={unCheckColor}
      onPress={handleCheckPress}
    />
  );
};

export default AppCheckbox;

const styles = StyleSheet.create({});
