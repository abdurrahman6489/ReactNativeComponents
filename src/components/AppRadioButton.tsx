import {StyleSheet} from 'react-native';
import React from 'react';
import {RadioButton, RadioButtonItemProps} from 'react-native-paper';
import {useColors} from '../config/useColors';
import {dark} from '../config/colors';
type AppRadioButtonProps = {
  value: string;
  status: RadioButtonItemProps['status'];
  color?: string;
  unCheckColor?: string;
  onPress: (value: string) => void;
} & RadioButtonItemProps;

const AppRadioButton = ({
  value,
  status,
  color = '',
  unCheckColor = dark,
  onPress,
  ...remainingProps
}: AppRadioButtonProps) => {
  const colors = useColors();
  const radioBtnColor = color ? color : colors.primary;

  const handleRadioButtonPress = () => {
    onPress(value);
  };

  return (
    <RadioButton.Item
      {...remainingProps}
      mode="android"
      value={value}
      onPress={handleRadioButtonPress}
      color={radioBtnColor}
      uncheckedColor={unCheckColor}
    />
  );
};

export default AppRadioButton;

const styles = StyleSheet.create({});
