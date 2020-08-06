import React, { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useLockPrices, LockedPricesResult } from '@acala-dapp/react-hooks/useLockPrices';
import { useEmergencyShutdown } from '@acala-dapp/react-hooks';

export type EmergencyShutdownStep = 'trigger' | 'process' | 'reclaim' | 'success';

export interface EmergencyShutdownContextData {
  step: EmergencyShutdownStep;
  lockedPrices: LockedPricesResult;
}

export const EmergencyShutdownContext = createContext<EmergencyShutdownContextData>({} as EmergencyShutdownContextData);

export const EmergencyShutdownProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const lockedPrices = useLockPrices();
  const { canRefund } = useEmergencyShutdown();
  const step = useMemo<EmergencyShutdownStep>(() => {
    return 'trigger';

    if (isEmpty(lockedPrices)) {
      return 'trigger';
    }

    if (canRefund) {
      return 'process';
    }

    return 'reclaim';
  }, [canRefund, lockedPrices]);

  return (
    <EmergencyShutdownContext.Provider value={{ lockedPrices, step }}>
      {children}
    </EmergencyShutdownContext.Provider>
  );
};
