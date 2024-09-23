import React from "react";
import styles from "@/styles/Services.module.css";
import { IoIosSend } from "react-icons/io";
import {
  FaMoneyBillWave,
  FaExchangeAlt,
  FaWarehouse,
  FaClipboardList,
} from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";

const Services = () => {
  return (
    <section className={styles.services} id="services">
      <h1>Our Services</h1>
      <div className="line"></div>

      <p className="tac">You can choose any of our services</p>
      <div className={styles.boxCon}>
        <div className={styles.box}>
          <span className={styles.flex}>
            <span className={styles.icon}>
              <IoIosSend />
            </span>
            <h4 className="my-5">Money Transfer</h4>
          </span>
          <p>
            We offers you secure and easy transfer. Transfer money between users
            within a minutes.
          </p>
        </div>
        <div className={styles.box}>
          <span className={styles.flex}>
            <span className={styles.icon}>
              <FaMoneyBillWave />
            </span>
            <h4 className="my-5">Multi Currency</h4>
          </span>
          <p>
            We supports multi currency. Bank conveniently with currencies of
            your choice.
          </p>
        </div>
        <div className={styles.box}>
          <span className={styles.flex}>
            <span className={styles.icon}>
              <FaExchangeAlt />
            </span>
            <h4 className="my-5">Exchange Currency</h4>
          </span>
          <p>
            We offer lowest exchange fee so you can exchange your currency
            anytime.
          </p>
        </div>
        <div className={styles.box}>
          <span className={styles.flex}>
            <span className={styles.icon}>
              <FaWarehouse />
            </span>
            <h4 className="my-5">Fixed Deposit</h4>
          </span>
          <p>
            You can make payment request to you customer for any types of
            product or services.
          </p>
        </div>
        <div className={styles.box}>
          <span className={styles.flex}>
            <span className={styles.icon}>
              <FaClipboardList />
            </span>
            <h4 className="my-5">Apply Loan</h4>
          </span>
          <p>
            We offers different types loan with low interest rate. You can get a
            loan easily.
          </p>
        </div>
        <div className={styles.box}>
          <span className={styles.flex}>
            <span className={styles.icon}>
              <GiPayMoney />
            </span>
            <h4 className="my-5">Payment Request</h4>
          </span>
          <p>
            We offers long term investment and you will get good interest rate
            after maturity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
