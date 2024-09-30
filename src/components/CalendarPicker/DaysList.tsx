import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type daysListProps = {
  daysArray: string[];
};

const DaysList = ({daysArray}: daysListProps) => {
  return (
    <View style={styles.daysHeaderContainer} key={'daysList'}>
      {daysArray.map((day, index) => (
        <Text key={`${day}/${index}`} style={[styles.dayStyle]}>
          {day}
        </Text>
      ))}
    </View>
  );
};

export default DaysList;

const styles = StyleSheet.create({
  daysHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  dayStyle: {
    textAlign: 'center',
    flexGrow: 1,
    flexBasis: 5,
  },
});
