import React from 'react';

import Like from '$src/assets/svgs/like.svg';
import { useAppDispatch, useAppSelector } from '$src/hooks';
import { decrease, increase } from '$src/redux/reducers';

import styles from './style.less';
import { shallowEqual } from 'react-redux';

function ReduxDemo() {
  const count = useAppSelector((state) => state.app.count, shallowEqual);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Two</h1>
      <div className={styles['blue-background']}>
        <p className={styles.red}>red1</p>
        <p className={styles.green}>green2</p>
        <Like className={styles.small} />
      </div>
      <span data-testid="count">{count}</span>
      <button onClick={() => dispatch(increase(1))}>increase</button>
      <button onClick={() => dispatch(decrease(1))}>decrease</button>
    </div>
  );
}

export default ReduxDemo;
