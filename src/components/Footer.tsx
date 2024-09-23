import Link from "next/link";
import React from "react";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="resFlex">
        <span className={styles.sect1}>
          <h2 className="logo mb-5">TrustGroupCU</h2>
          <p className="mb-3">
            TrustGroupCU is a micro banking system. We offer different types of
            financial services to our customers all over the world such as Loan,
            Wire transfer, Long term deposit, savings and some other related
            services.
          </p>
        </span>
        <span className={styles.sect}>
          <h4>Quick Explore</h4>
          <div className={styles.line}></div>
          <ul className="mt-2">
            <li>
              <Link className={styles.navLinks} href={"/#contact"}>
                Contact
              </Link>
            </li>
            <li>
              <Link className={styles.navLinks} href={"/#about"}>
                About
              </Link>
            </li>
            <li>
              <Link className={styles.navLinks} href={"/#services"}>
                Services
              </Link>
            </li>
          </ul>
        </span>
        <span className={styles.sect}>
          <h4>Pages</h4>
          <div className={styles.line}></div>
          <ul className="mt-2">
            <li>
              <Link className={styles.navLinks} href={"/privacy-policy"}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className={styles.navLinks} href={"/terms-condition"}>
                Terms & Condition
              </Link>
            </li>
            <li>
              <Link className={styles.navLinks} href={"/faq"}>
                FAQ
              </Link>
            </li>
          </ul>
        </span>
      </div>
      <p>
        Copyright © 2022 <strong>TrustGroupCU</strong> - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
