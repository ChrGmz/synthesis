import React from 'react';
import styles from './CategoryItems.module.scss';

interface ICategoryItems {
  category: ,
  handleSubCategory: ,
  active: boolean
}

function CategoryItems({ category, handleSubCategory, active }: ICategoryItems) {
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
