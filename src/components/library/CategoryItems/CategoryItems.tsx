import React from 'react';
import styles from './CategoryItems.module.scss';

interface ICategoryItems {
  // TODO: putting as string for now. connected to SelectionPanel
  category: string,
  handleSubCategory: (a: string) => void,
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
