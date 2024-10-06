import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useColors} from '../../../config/useColors';
import AppIconButton from '../../AppIconButton';
import {getDefaultFlexStyles} from '../../../Utils/defaultStyles';
import {formatInReadableDate} from '../Utils/DateUtilFunctions';

type ShowSelectedDatesProps = {
  date: string;
  isSelected: boolean;
  onDatePress: (date: string) => void;
  onDelete: (date: string) => void;
};

const ShowSelectedDates = ({
  date,
  isSelected,
  onDatePress,
  onDelete,
}: ShowSelectedDatesProps) => {
  const {primary, light, secondary} = useColors();
  const formattedDate = formatInReadableDate(new Date(date));
  return (
    <Pressable
      style={[
        styles.container,
        {backgroundColor: isSelected ? primary : secondary},
      ]}>
      <Text
        style={[styles.textStyle, {color: light}]}
        onPress={() => onDatePress(date)}>
        {formattedDate}
      </Text>
      <AppIconButton
        icon="close"
        size={15}
        iconColor={light}
        style={{margin: 0, padding: 0}}
        onPress={() => onDelete(date)}
      />
    </Pressable>
  );
};

export default ShowSelectedDates;

const styles = StyleSheet.create({
  container: {
    ...getDefaultFlexStyles().flexRowStyles,
    justifyContent: 'center',
    paddingLeft: 8,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  textStyle: {margin: 0},
});
