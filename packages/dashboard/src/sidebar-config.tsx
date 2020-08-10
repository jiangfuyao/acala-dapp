import { ReactComponent as LoanSVG } from '@acala-dapp/apps/assets/loan.svg';
import React from 'react';
import { SideBarConfig } from './types/sidebar';

export const sideBarConfig: SideBarConfig = {
  products: [
    {
      icon: <LoanSVG />,
      name: 'Home',
      path: 'home'
    },
    {
      icon: <LoanSVG />,
      items: [
        {
          name: 'Loans',
          path: 'loan'
        },
        {
          name: 'Treasury',
          path: 'treasury'
        },
        {
          name: 'Swap',
          path: 'swap'
        }
      ],
      name: 'Stablecoin'
    }
  ]
};
