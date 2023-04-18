import React from 'react';
import styles from './style.less';

function MacroApp() {
  return (
    <section className={styles.container}>
      <div id="subapp-viewport"></div>
      <div id="subapp-viewport2"></div>
      <div id="subapp-viewport3"></div>
    </section>
  );
}

export default MacroApp;
