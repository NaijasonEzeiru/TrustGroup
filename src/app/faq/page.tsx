import FAQ from '@/components/FAQ';
import React from 'react';
const faqs = require('../../../faq.json');
import styles from '@/styles/FAQ.module.css';

const Faq = () => {
  return (
    <section className={styles.FAQS}>
      <div className={styles.policy}>
        <div className={styles.pad}>
          <h1>Frequently Asked Questions</h1>
        </div>
        {faqs.map((items: any, index: any) => (
          <FAQ key={index} answer={items.answer} question={items.question} />
        ))}
      </div>
    </section>
  );
};

export default Faq;
