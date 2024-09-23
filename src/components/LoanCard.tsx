import React from "react";
import styles from "@/styles/Card.module.css";

const LoanCard = () => {
  return (
    <section className={styles.loanCard}>
      <h1>Loan Packages</h1>
      <div className="line"></div>
      <p className="tac">
        We offer different types loan with low interest rate. You will get
        hassle free loan easily.
      </p>
      <div className="resFlex mt70">
        <div className={styles.card}>
          <div
            className="flex justify-between px-8 py-3 text-white bg-[#223a66]"
            style={{ backgroundColor: "#223a66" }}
          >
            <h4>Student Loan</h4>
            <h4>5.00 %</h4>
          </div>
          <div className={styles.bottom}>
            <li className={styles.list}>
              {" "}
              <span>{} Term</span> 24 Month
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Interest Rate</span> 5.00 %
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Interest Type</span> Flat Rate
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Minimum</span> $100.00
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Maximum</span> $1,000.00
            </li>
            <a style={{ backgroundColor: "#223a66" }} className={styles.aHover}>
              APPLY NOW
            </a>
          </div>
        </div>
        <div className={styles.card}>
          <div
            className="flex justify-between px-8 py-3 text-white bg-[#223a66]"
            style={{ backgroundColor: "#223a66" }}
          >
            <h4>Standard</h4>
            <h4>10.00%</h4>
          </div>
          <div className={styles.bottom}>
            <li className={styles.list}>
              {" "}
              <span>{} Term</span> 12 Month
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Interest Rate</span> 12.00 %
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Interest Type</span> Mortgage
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Minimum</span> $1,000.00
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Maximum</span> $100,000.00
            </li>
            <a style={{ backgroundColor: "#223a66" }} className={styles.aHover}>
              APPLY NOW
            </a>
          </div>
        </div>
        <div className={styles.card}>
          <div
            className="flex justify-between px-8 py-3 text-white bg-[#223a66]"
            style={{ backgroundColor: "#223a66" }}
          >
            <h4>Professional</h4>
            <h4>15.00%</h4>
          </div>
          <div className={styles.bottom}>
            <li className={styles.list}>
              {" "}
              <span>{} Term</span> 36 Month
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Interest Rate</span> 12.00 %
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Interest Type</span> Mortgage
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Minimum</span> $5.000.00
            </li>
            <li className={styles.list}>
              {" "}
              <span>{} Maximum</span> $50,000.00
            </li>
            <a style={{ backgroundColor: "#223a66" }} className={styles.aHover}>
              APPLY NOW
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCard;
