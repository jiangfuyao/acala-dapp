import React, { FC, ReactNode, useState, memo, useEffect } from 'react';
import clsx from 'clsx';
import { randomID } from './utils';
import classes from './Tabs.module.scss';

export interface TabConfig {
  title: string;
  render?: () => ReactNode;
  value?: string;
}

interface Props {
  config: TabConfig[];
  style: 'normal' | 'button' | 'bar';
  onChange?: (active: TabConfig) => void;
}

export const Tabs: FC<Props> = memo(({
  config,
  style = 'normal',
  onChange
}) => {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    if (config[active]) {
      onChange && onChange(config[active]);
    }
  }, [active, config])

  const onClick = (index: number): void => {
    setActive(index);
  };

  return (
    <div className={clsx(classes.root, classes[style])}>
      <div className={classes.tabTitleContent}>
        {
          config.map((item: TabConfig, index: number): ReactNode => {
            return (
              <div
                className={clsx(classes.tabTitle, { [classes.active]: index === active })}
                key={`${randomID()}-tab-item`}
                onClick={(): void => onClick(index)}
              >
                {item.title}
              </div>
            );
          })
        }
      </div>
      {
        config[active]?.render ? (
          <div className={classes.tabContent}>
            {config[active]?.render()}
          </div>
        ) : null
      }
    </div>
  );
});

Tabs.displayName = 'Tabs';
