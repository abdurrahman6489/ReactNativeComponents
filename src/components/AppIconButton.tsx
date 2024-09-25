import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconButton, IconButtonProps} from 'react-native-paper';
import {useColors} from '../config/useColors';

type Props = {
  color?: string;
} & IconButtonProps;

const AppIconButton = ({
  color = '',
  icon,
  size = 30,
  ...remainingProps
}: Props) => {
  const {primary} = useColors();
  const colorToUse = !!color ? color : primary;
  return (
    <IconButton
      icon={icon}
      iconColor={colorToUse}
      size={size}
      {...remainingProps}
    />
  );
};

export default AppIconButton;

const styles = StyleSheet.create({});
