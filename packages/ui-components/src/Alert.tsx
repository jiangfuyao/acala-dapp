import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

import { MessageType } from './types';
import { ReactComponent as AlertIcon } from './assets/alert.svg';
import './Alert.scss';

interface AlertProps {
  message: ReactNode;
  type: MessageType;
}

export const Alert: FC<AlertProps> = ({ message, type }) => {
  return (
    <div className={clsx('aca-alert', type)}>
      <AlertIcon className='aca-alert__icon' />
      <span className='aca-alert__message'>{message}</span>
    </div>
  );
};
