import React from 'react';
import styles from './PlayerHeader.css';

export default () => (
  <div
    className={styles.appBadge}
    style={{ backgroundImage: 'url(/assets/logo.png)' }}
  />
);
