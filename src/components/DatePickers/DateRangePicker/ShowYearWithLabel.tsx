import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useColors} from '../../../config/useColors';
import {Icon} from 'react-native-paper';
import {getDefaultFlexStyles} from '../../../Utils/defaultStyles';

type YearWithLabelProps = {
  label: string;
  year: number;
};

const ShowYearWithLabel = ({label, year}: YearWithLabelProps) => {
  const {primary, light} = useColors();
  return (
    <View
      style={{
        padding: 4,
        paddingHorizontal: 5,
        paddingBottom: 5,
        marginHorizontal: 5,
        borderRadius: 5,
      }}>
      <Text
        style={{
          marginVertical: 3,
          fontSize: 15,
          textAlign: 'center',
        }}>
        {label}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: primary,
          borderRadius: 10,
          padding: 5,
          ...getDefaultFlexStyles().flexRowStyles,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: light,
            fontSize: 13,
            marginRight: 5,
          }}>
          {year}
        </Text>
        <Icon size={12} source={'pencil'} color={light} />
      </TouchableOpacity>
    </View>
  );
};

export default ShowYearWithLabel;

const styles = StyleSheet.create({});
