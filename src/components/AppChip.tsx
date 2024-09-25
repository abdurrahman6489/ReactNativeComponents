import {StyleSheet} from 'react-native';
import React from 'react';
import {Chip, ChipProps} from 'react-native-paper';

type AppChipProps = {
  icon: string;
  title: string;
  onPress: () => void;
} & ChipProps;

const AppChip = ({icon, title, onPress, ...remainingProps}: AppChipProps) => {
  return (
    <Chip icon={icon} onPress={onPress} {...remainingProps}>
      {title}
    </Chip>
  );
};

export default AppChip;

const styles = StyleSheet.create({});
