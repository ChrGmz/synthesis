import React, { ChangeEvent, useRef } from 'react';
import styles from './Select.module.scss';

interface ISelect {
  options: string[] | number[],
  onChangeFn: ((_bars: string) => void),
  // defaultOption?: string[],
  initialOption?: string | number,
  maxWidth?: string,
}

// Removed ref as defaultOption was not being set
function Select({
  options,
  onChangeFn,
  // defaultOption,
  initialOption,
  maxWidth = '80px',
}: ISelect) {
  // const selectRef = useRef(null);

  function renderOptions() {
    // const _options = defaultOption ? [defaultOption, ...options] : options;

    return options.map((option: string | number, idx: number) => (
      <option value={option} key={idx}>
        {option}
      </option>
    ));
  }

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();

    onChangeFn(event.target.value);
    // if (defaultOption) selectRef.current.value = defaultOption;
  }

  return (
    <>
      <select
        className={styles.select}
        onChange={handleChange}
        value={initialOption}
        // ref={selectRef}
        style={{ maxWidth }}
      >
        {renderOptions()}
      </select>
    </>
  );
}

export default Select;
