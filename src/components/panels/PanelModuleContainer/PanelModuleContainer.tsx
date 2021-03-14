import React from 'react';
import styles from './PanelModuleContainer.module.scss';

//Yeah, I know what you are thinking. I had to do this hack becuase one of my panel modules needed to be in rows instead of cols.
//Will definitely look into it once I have time. Don't judge hehe.

interface IPanelModuleContainer {
  name: string,
  border: boolean,
  children: any,
  flex?: string
} 

function PanelModuleContainer({ name, border, children, flex = 'column' }: IPanelModuleContainer) {
  return (
    <div
      className={styles.container}
      style={{
        flexFlow: `${flex} nowrap`,
      }}
    >
      {name && <h3 className={styles.name}>{name}</h3>}
      {children}
    </div>
  );
}

export default PanelModuleContainer;
