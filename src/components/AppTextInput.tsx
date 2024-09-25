import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {useColors} from '../config/useColors';

type AppTextInputProps = {
  rightIcon?: string | null;
  toggleIcon?: () => void;
  secureTextEntry?: boolean;
} & TextInputProps;

const AppTextInput = ({
  mode = 'outlined',
  rightIcon = null,
  toggleIcon = () => {},
  secureTextEntry = false,
  ...remainingProps
}: AppTextInputProps) => {
  const {light, primary, dark} = useColors();
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={secureTextEntry}
        mode={mode}
        outlineColor={primary}
        textColor={dark}
        right={
          rightIcon ? (
            <TextInput.Icon icon={rightIcon} onPress={toggleIcon} />
          ) : null
        }
        style={[styles.input, {backgroundColor: light}]}
        {...remainingProps}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderRadius: 5,
  },
});
