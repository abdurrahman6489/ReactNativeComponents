import {StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {Chip, ChipProps} from 'react-native-paper';

type AppChipProps = {
  icon: string;
  children: ReactNode;
  onPress: () => void;
} & ChipProps;

const AppChip = ({
  icon,
  onPress,
  children,
  ...remainingProps
}: AppChipProps) => {
  return (
    <Chip icon={icon} onPress={onPress} {...remainingProps}>
      {children}
    </Chip>
  );
};

export default AppChip;

const styles = StyleSheet.create({});
