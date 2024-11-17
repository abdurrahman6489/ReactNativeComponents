import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import {getDefaultFlexStyles} from '../../../Utils/defaultStyles';

type YearWrapperProps = {
  children: ReactNode;
};

const YearWrapper = ({children}: YearWrapperProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default YearWrapper;

const styles = StyleSheet.create({
  container: {
    ...getDefaultFlexStyles().flexRowStyles,
    justifyContent: 'space-evenly',
  },
});
