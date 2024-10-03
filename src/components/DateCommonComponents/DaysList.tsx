import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useColors} from '../../config/useColors';

type daysListProps = {
  daysArray: string[];
};

const DaysList = ({daysArray}: daysListProps) => {
  const {darkModeColor} = useColors();
  return (
    <View style={styles.daysHeaderContainer} key={'daysList'}>
      {daysArray.map((day, index) => (
        <Text
          key={`${day}/${index}`}
          style={[styles.dayStyle, {color: darkModeColor}]}>
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
