import React from 'react';
import {Snackbar, SnackbarProps} from 'react-native-paper';
type AppSnackbarProps = {
  title: string;
  visible: boolean;
  onDismiss: () => void;
  action?: SnackbarProps['action'];
};

const AppSnackbar = ({
  title,
  visible,
  onDismiss,
  action,
  ...remainingProps
}: AppSnackbarProps) => {
  return (
    <Snackbar
      {...remainingProps}
      visible={visible}
      onDismiss={onDismiss}
      action={action}>
      {title}
    </Snackbar>
  );
};

export default AppSnackbar;
