import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {Button, ButtonProps} from 'react-native-paper';

type modeType = ButtonProps['mode'];

export type btnType = {
  text: string;
  style?: ButtonProps['style'];
  mode?: modeType;
  disabled?: boolean;
  onPress: () => void;
} & Partial<ButtonProps>;

type Props = {
  leftBtn: btnType;
  rightBtn: btnType;
  btnContainerStyle?: ViewStyle;
};

type btnModeObjType = {
  mode: modeType;
  btn: btnType;
};

const AppBtnGroup = ({leftBtn, rightBtn, btnContainerStyle = {}}: Props) => {
  const btnModeArray: btnModeObjType[] = [
    {btn: leftBtn, mode: 'outlined'},
    {btn: rightBtn, mode: 'contained'},
  ];

  return (
    <View style={[styles.container, btnContainerStyle]}>
      {btnModeArray.map(({btn, mode}, index) => {
        const {
          onPress,
          text,
          style = {},
          disabled = false,
          ...remainingProps
        } = btn;
        return (
          <Button
            key={`${text}/${index}`}
            style={[styles.btn, style]}
            disabled={disabled}
            mode={mode}
            onPress={onPress}
            {...remainingProps}>
            {text}
          </Button>
        );
      })}
    </View>
  );
};

export default AppBtnGroup;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    flexWrap: 'wrap',
  },
  btn: {
    flexGrow: 1,
    flexBasis: 150,
    marginHorizontal: 3,
    marginVertical: 3,
  },
});
