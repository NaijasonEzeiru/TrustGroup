"use client"

import React, { useState } from 'react';
import styles from '@/styles/FAQ.module.css';

const FAQ = ({ question, answer }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.FAQ}>
      <span className={styles.flex} onClick={() => setOpen(!open)}>
        {open ? <h6>&#8211;</h6> : <h6>+</h6>}
        <h6>{question}</h6>
      </span>
      <p className={open ? styles.open : styles.close}>{answer}</p>
    </div>
  );
};

export default FAQ;
