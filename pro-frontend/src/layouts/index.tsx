import React, { FC } from 'react';
import styles from './index.less';
import NavBar from '../components/NavBar';

const BasicLayout: FC = (props) => {
  
  return (
    <div className={styles.wrapper}>
      <NavBar />
      {props.children}
    </div>
  );
};

export default BasicLayout;
