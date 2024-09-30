import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppButton from '../AppButton';
import {getDefaultFlexStyles} from '../../Utils/defaultStyles';

export type DefaultFooterProps = {
  submitText: string;
  cancelText: string;
  onSubmit: () => void;
  onCancel: () => void;
};

const DefaultFooter = ({
  cancelText,
  onCancel,
  onSubmit,
  submitText,
}: DefaultFooterProps) => {
  return (
    <View style={styles.footerStyle}>
      <AppButton style={styles.footerBtnStyle} onPress={onCancel} mode="text">
        {cancelText}
      </AppButton>
      <AppButton
        style={styles.footerBtnStyle}
        onPress={onSubmit}
        mode="contained">
        {submitText}
      </AppButton>
    </View>
  );
};

export default DefaultFooter;

const styles = StyleSheet.create({
  footerStyle: {
    ...getDefaultFlexStyles().flexRowStyles,
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  footerBtnStyle: {marginVertical: 3},
});
