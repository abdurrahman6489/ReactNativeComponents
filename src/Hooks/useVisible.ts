import {useState} from 'react';

export const useVisible = (initialStatus = false) => {
  const [isVisible, setIsVisible] = useState(() => initialStatus);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);
  const toggle = () => setIsVisible(prev => !prev);
  return {isVisible, open, close, toggle};
};
