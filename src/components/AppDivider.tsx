import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Divider, DividerProps} from 'react-native-paper';
import {primaryColor} from '../config/colors';
type AppDividerProps = {
  height?: number;
  color?: string;
  style?: DividerProps['style'];
} & DividerProps;

const AppDivider = ({
  height = 0.5,
  color = primaryColor,
  style = {},
  ...remainingProps
}: AppDividerProps) => {
  return (
    <Divider
      {...remainingProps}
      style={[{height, backgroundColor: color}, style]}
    />
  );
};

export default AppDivider;

const styles = StyleSheet.create({});
