import React, { createContext, FC, PropsWithChildren, useState } from 'react';
import { useLockPrices, LockedPricesResult } from '@acala-dapp/react-hooks/useLockPrices';

export type EmergencyShutdownStep = 'trigger' | 'process' | 'reclaim' | 'success';

export const StepRoute: EmergencyShutdownStep[] = ['trigger', 'process', 'reclaim'];

export interface EmergencyShutdownContextData {
  step: EmergencyShutdownStep;
  setStep: (step: EmergencyShutdownStep) => void;
  lockedPrices: LockedPricesResult;
}

export const EmergencyShutdownContext = createContext<EmergencyShutdownContextData>({} as EmergencyShutdownContextData);

export const EmergencyShutdownProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const lockedPrices = useLockPrices();
  const [step, setStep] = useState<EmergencyShutdownStep>('trigger');

  return (
    <EmergencyShutdownContext.Provider value={{
      lockedPrices,
      setStep,
      step
    }}>
      {children}
    </EmergencyShutdownContext.Provider>
  );
};
