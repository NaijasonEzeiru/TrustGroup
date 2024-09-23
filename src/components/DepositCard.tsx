import React from "react";
import styles from "@/styles/Card.module.css";

const DepositCard = () => {
  return (
    <section>
      <h1>Fixed Deposit Plans</h1>
      <div className="line"></div>
      <p className="tac">
        You will get maximum rewards with us by making long term deposit
      </p>
      <div className="resFlex mt70">
        <div className={styles.card}>
          <div className="flex justify-between px-8 py-3 text-white bg-[#e12355]">
            <h4>Basic</h4>
            <h4>8.00%</h4>
          </div>
          <div className={styles.bottom}>
            <li className={styles.list}>
              {" "}
              <span>Duration</span> 12 Month
            </li>

            <li className={styles.list}>
              {" "}
              <span>{} Interest Rate</span> 8.00%
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Minimum</span> $10.00
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Maximum</span> $500.00
            </li>
            <a>APPLY NOW</a>
          </div>
        </div>
        <div className={styles.card}>
          <div className="flex justify-between px-8 py-3 text-white bg-[#e12355]">
            <h4>Standard</h4>
            <h4>10.00%</h4>
          </div>
          <div className={styles.bottom}>
            <li className={styles.list}>
              {" "}
              <span>{} Duration</span> 24 Month
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Interest Rate</span> 10.00%
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Minimum</span> $100.00
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Maximum</span> $1,000.00
            </li>
            <a>APPLY NOW</a>
          </div>
        </div>
        <div className={styles.card}>
          <div className="flex justify-between px-8 py-3 text-white bg-[#e12355]">
            <h4>Professional</h4>
            <h4>15.00%</h4>
          </div>
          <div className={styles.bottom}>
            <li className={styles.list}>
              {" "}
              <span>{} Duration</span> 36 Month
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Interest Rate</span> 15.00%
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Minimum</span> $500.00
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Maximum</span> $20,000.00
            </li>
            <a>APPLY NOW</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositCard;
