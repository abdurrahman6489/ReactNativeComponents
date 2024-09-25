import {StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {Tooltip, TooltipProps} from 'react-native-paper';
type AppToolTipProps = {
  title: string;
  children: ReactNode;
} & TooltipProps;

const AppToolTip = ({children, title}: AppToolTipProps) => {
  return <Tooltip title={title}>{children}</Tooltip>;
};

export default AppToolTip;

const styles = StyleSheet.create({});
