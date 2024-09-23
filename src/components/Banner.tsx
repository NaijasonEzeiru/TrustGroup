import React from 'react';
import styles from '@/styles/Banner.module.css';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className='flex-wrap'>
        <span className={styles.sect}>
          <h3>550000</h3>
          <p className={styles.NM15}>Customers</p>
        </span>
        <span className={styles.sect}>
          <h3>4</h3>
          <p className={styles.NM15}>Branches</p>
        </span>
        <span className={styles.sect}>
          <h3>709580</h3>
          <p className={styles.NM15}>Total Transactions</p>
        </span>
        <span className={styles.sect}>
          <h3>198</h3>
          <p className={styles.NM15}>Supported Countries</p>
        </span>
      </div>
    </section>
  );
};

export default Banner;
