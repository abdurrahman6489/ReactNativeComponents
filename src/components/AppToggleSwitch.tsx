import {StyleSheet} from 'react-native';
import React from 'react';
import {Switch, SwitchProps} from 'react-native-paper';
type AppToggleSwitchProps = {
  isSwitchOn: boolean;
  onValueChange: (switchStatus: boolean) => void;
} & SwitchProps;

const AppToggleSwitch = ({
  isSwitchOn,
  onValueChange,
  ...remainingProps
}: AppToggleSwitchProps) => {
  const handleSwitchToggle = () => {
    onValueChange(isSwitchOn);
  };
  return (
    <Switch
      {...remainingProps}
      value={isSwitchOn}
      onValueChange={handleSwitchToggle}
    />
  );
};

export default AppToggleSwitch;

const styles = StyleSheet.create({});
