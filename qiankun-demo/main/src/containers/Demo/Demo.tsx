import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

import Like from '$src/assets/svgs/like.svg';
import { wait } from '$src/helpers';

import styles from './style.less';

function Demo() {
  const [count, setCount] = useState(0);

  const handleOpenModal = useCallback(() => {
    Modal.confirm({
      title: 'title',
      content: 'content',
      onOk: async () => {
        await wait(3000);
      },
    });
  }, []);

  return (
    <div>
      <h1>demo</h1>
      <div className={styles['blue-background']}>
        <p className={styles.red}>red1</p>
        <p className={styles.green}>green2</p>
        <Like className={styles.small} />
      </div>
      <span data-testid="count">{count}</span>
      <Button onClick={() => setCount((prev) => prev + 1)}>increase</Button>
      <Button onClick={() => setCount((prev) => prev - 1)}>decrease</Button>
      <Button onClick={handleOpenModal}>open modal</Button>
    </div>
  );
}

export default Demo;
