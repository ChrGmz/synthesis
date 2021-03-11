import React from 'react';
import styles from './CategoryItems.module.scss';

function CategoryItems({ category, handleSubCategory, active }) {
  return (
    <div
      className={`${styles.container} ${active && styles.active}`}
      onClick={() => handleSubCategory(category)}
    >
      {category}
    </div>
  );
}

export default CategoryItems;
