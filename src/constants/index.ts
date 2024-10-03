import {ColorSchemeName} from 'react-native';
import {CheckboxItemProps, RadioButtonItemProps} from 'react-native-paper';

export const checkedBoxCheckedStatus: CheckboxItemProps['status'] = 'checked';
export const checkedBoxUncheckedStatus: CheckboxItemProps['status'] =
  'unchecked';
export const checkBoxIndeterminateStatus: CheckboxItemProps['status'] =
  'indeterminate';
('indeterminate');

export const radioButtonCheckedStatus: RadioButtonItemProps['status'] =
  'checked';
export const radioButtonUncheckedStatus: RadioButtonItemProps['status'] =
  'unchecked';
export const radioButtonIndeterminateStatus: CheckboxItemProps['status'] =
  'indeterminate';

export const darkMode: ColorSchemeName = 'dark';
export const lightMode: ColorSchemeName = 'light';

export const appModeObj = {
  dark: darkMode,
  light: lightMode,
};
