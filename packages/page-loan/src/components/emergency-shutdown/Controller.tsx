import React, { FC, useMemo, useContext, useCallback } from 'react';
import clsx from 'clsx';

import { Button } from '@acala-dapp/ui-components';
import { useModal } from '@acala-dapp/react-hooks';

import classes from './Controller.module.scss';
import { EmergencyShutdownContext, StepRoute } from './EmergencyShutdownProvider';
import { ReclaimModal } from './ReclaimModal';

export const Controller: FC = () => {
  const { canReclaim, setStep, step } = useContext(EmergencyShutdownContext);
  const { close: closeReclaimModal, open: openReclaimModal, status } = useModal();

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

  const hasNext = useMemo<boolean>(() => {
    if (step === 'process') return canReclaim;

    if (step === 'reclaim') return false;

    return true;
  }, [canReclaim, step]);

  const hasReclaim = useMemo<boolean>(() => {
    if (step === 'reclaim') return true;

    return false;
  }, [step]);

  // if step is success, don't display controll component
  if (step === 'success') {
    return null;
  }

  return (
    <div className={clsx(classes.root, { [classes.hasPrevious]: hasPrevious, [classes.signlePrevious]: !hasNext && !hasReclaim })}>
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
      {
        hasNext ? <Button
          className={classes.next}
          color='primary'
          onClick={handleNext}
          size='large'
          type='normal'
        >
          NEXT
        </Button> : null
      }
      {
        hasReclaim ? <Button
          className={classes.next}
          color='primary'
          onClick={openReclaimModal}
          size='large'
          type='normal'
        >
          Reclaim
        </Button> : null
      }
      <ReclaimModal
        onClose={closeReclaimModal}
        visiable={status}
      />
    </div>
  );
};
