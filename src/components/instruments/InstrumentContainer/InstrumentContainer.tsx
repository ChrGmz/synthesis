import React, { useState, useRef } from 'react';

import Select from '@components/Select/Select';

import { Mute, Sound } from '@resources/icons';
import styles from './InstrumentContainer.module.scss';

function InstrumentContainer({
  handleActiveInstrument,
  handleDeleteInstrument,
  menuOptions,
  handleMute,
  active,
  name,
  mute,
}) {
  const [menu, setMenu] = useState(false);

  const timeoutRef = useRef(null);

  function renderMenu() {
    return menuOptions.map((option, idx) => {
      const { name, method, args = [] } = option;
      return (
        <>
          <div
            className={styles.menuOption}
            key={name + idx}
            onClick={() => method(...args)}
          >
            <p className={styles.menuOptionName} key={name + idx}>
              {name}
            </p>
          </div>
        </>
      );
    });
  }

  function handleOpenMenu() {
    timeoutRef.current = setTimeout(() => {
      setMenu(true);
    }, 200);
  }

  //Wait for some time before closing the menu to prevent closing on accidentally leaving the container
  function handleCloseMenu() {
    timeoutRef.current = setTimeout(() => {
      setMenu(false);
    }, 250);
  }

  function handleMenuTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  return (
    <div
      // className={styles.instrumentContainer}
      className={`${styles.panel} ${active && styles.activePanel}`}
      onMouseLeave={handleCloseMenu}
      onMouseEnter={handleMenuTimeout}
    >
      <div className={styles.deleteContainer}>
        <h1 className={styles.delete} onClick={handleDeleteInstrument}>
          X
        </h1>
      </div>

      <div
        className={`${styles.instrumentContainer}`}
        onClick={handleActiveInstrument}
      >
        <p>{name.replace('.wav', '')}</p>
      </div>

      <div
        onClick={handleMute}
        className={`${styles.muteButton} ${active && styles.activeButton}`}
      >
        {mute === true ? (
          <Mute className={styles.svg} />
        ) : (
          <Sound className={styles.svg} />
        )}
      </div>

      <div
        className={`${styles.fxButton} ${active && styles.activeButton}`}
        onClick={() => setMenu(true)}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleMenuTimeout}
      >
        +
      </div>

      {menu && (
        <div className={styles.menu}>
          <h1 className={styles.closePanel} onClick={() => setMenu(false)}>
            X
          </h1>
          {renderMenu()}
        </div>
      )}
    </div>
  );
}

export default InstrumentContainer;
