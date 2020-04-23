import { ReactNode } from 'react';

type Placement = 'top left' | 'top right' | 'bottom left' | 'bottom right';

export interface NotificationConfig {
  id: number;
  icon?: ReactNode;
  title?: ReactNode;
  content: ReactNode;
  placement: Placement;
  removedDelay?: number;
  type?: 'info' | 'success' | 'error';
  remove: (delay?: number) => void;
  update: (config: Partial<NotificationConfig>) => void;
}

export interface PartialNotificationConfig {
  icon?: ReactNode;
  title?: ReactNode;
  type?: 'info' | 'success' | 'error';
  content: ReactNode;
  placement: Placement;
}
