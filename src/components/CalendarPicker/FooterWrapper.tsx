import {StyleSheet} from 'react-native';
import React from 'react';
import DefaultFooter, {DefaultFooterProps} from './DefaultFooter';

type FooterWrapperProps = {
  isFooterRequired: boolean;
  onCancel: () => void;
  handleSelectDate: () => void;
  renderCustomFooter: ((props: DefaultFooterProps) => React.JSX.Element) | null;
};

const FooterWrapper = ({
  isFooterRequired,
  renderCustomFooter = null,
  onCancel,
  handleSelectDate,
}: FooterWrapperProps) => {
  if (!isFooterRequired) return <></>;
  return !renderCustomFooter ? (
    <DefaultFooter
      cancelText="Cancel"
      submitText="Submit"
      onCancel={onCancel}
      onSubmit={handleSelectDate}
    />
  ) : (
    renderCustomFooter({
      cancelText: 'Cancel',
      submitText: 'Submit',
      onCancel: onCancel,
      onSubmit: handleSelectDate,
    })
  );
};

export default FooterWrapper;

const styles = StyleSheet.create({});
