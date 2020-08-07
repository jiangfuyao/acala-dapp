import React, { FC, useMemo, useContext, useCallback } from 'react';
import clsx from 'clsx';
import { Button } from '@acala-dapp/ui-components';
import classes from './Controller.module.scss';
import { EmergencyShutdownContext, StepRoute } from './EmergencyShutdownProvider';

export const Controller: FC = () => {
  const { setStep, step } = useContext(EmergencyShutdownContext);

  const hasPrevious = useMemo(() => {
    return step !== 'trigger';
  }, [step]);

  const handlePrevious = useCallback(() => {
    const currentIndex = StepRoute.findIndex((i) => i === step);

    if (currentIndex >= 0 && currentIndex < StepRoute.length) {
      setStep(StepRoute[currentIndex - 1]);
    }
  }, [setStep, step]);

  const handleNext = useCallback(() => {
    const currentIndex = StepRoute.findIndex((i) => i === step);

    if (currentIndex >= 0 && currentIndex < StepRoute.length - 1) {
      setStep(StepRoute[currentIndex + 1]);
    }
  }, [setStep, step]);

  return (
    <div className={clsx(classes.root, { [classes.hasPrevious]: hasPrevious })}>
      {
        hasPrevious ? <Button
          className={classes.previous}
          color='primary'
          onClick={handlePrevious}
          type='ghost'
        >
          Previous
        </Button> : null
      }
      <Button
        className={classes.next}
        color='primary'
        onClick={handleNext}
        size='large'
        type='normal'
      >
        NEXT
      </Button>
    </div>
  );
};
