import React from 'react';
import classNames from 'classnames';

import styles from './RadioGroup.scss';

const internalButton = props => {
  return classNames({
    [styles.radioChecked]: props.checked === true,
    [styles.radioUnchecked]: props.checked === false,
  })
}



const RadioIcon = props => {
  console.log('radio icon', props);
  return (
    <span className={styles.radioButton}>
      <i className={internalButton(props)} />
    </span>
  );
};

export default RadioIcon;
