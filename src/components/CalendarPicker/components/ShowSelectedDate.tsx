import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import AppDivider from '../../AppDivider';
import {useColors} from '../../../config/useColors';

type ShowSelectedDateProps = {
  selectedDate: Date;
};

const ShowSelectedDate = ({selectedDate}: ShowSelectedDateProps) => {
  const {light, primary} = useColors();
  return (
    <>
      <AppDivider color={light} height={0.5} />
      <Pressable style={[styles.container, {backgroundColor: primary}]}>
        <Text style={[styles.selectedDateTextStyle, {color: light}]}>
          {selectedDate.toDateString()}
        </Text>
      </Pressable>
    </>
  );
};

export default ShowSelectedDate;

const styles = StyleSheet.create({
  container: {padding: 10},
  selectedDateTextStyle: {fontSize: 25, fontWeight: '400', textAlign: 'center'},
});
