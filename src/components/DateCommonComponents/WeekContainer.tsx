import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';

type WeekContainerProps = {children: ReactNode};

const WeekContainer = ({children}: WeekContainerProps) => {
  return <View style={styles.daysHeaderContainer}>{children}</View>;
};

export default WeekContainer;

const styles = StyleSheet.create({
  daysHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
});
