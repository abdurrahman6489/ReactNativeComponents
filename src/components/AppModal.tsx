import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {Portal, Modal, ModalProps} from 'react-native-paper';
type AppModalProps = {
  visible: boolean;
  header?: ReactNode | null;
  footer?: ReactNode | null;
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ModalProps['contentContainerStyle'];
  onDismiss: () => void;
} & ModalProps;

const AppModal = ({
  visible,
  children,
  header = null,
  footer = null,
  contentContainerStyle = {},
  style = {},
  onDismiss,
  ...remainingProps
}: AppModalProps) => {
  return (
    <Portal>
      <Modal
        {...remainingProps}
        style={[styles.style, style]}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}>
        {header}
        {children}
        {footer}
      </Modal>
    </Portal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  style: {margin: 5},
  contentContainerStyle: {padding: 10},
});
