import Image from "next/image";
import React from "react";
import styles from "@/styles/About.module.css";
import Link from "next/link";

const About = () => {
  return (
    <section id="about">
      <div className={styles.aboutFlex}>
        <div className={styles.aboutImgCon}>
          <Image
            className={styles.aboutImg}
            src={"/about-us.jpg"}
            alt="about us"
            // width={450}
            // height={300}
            fill
          />
        </div>
        <div className={styles.about}>
          <h2 className="mb-5">About Us</h2>
          <p className="mb-7">
            TrustGroupCU is a micro banking system. We offer different types of
            financial services to our customers all over the world. We have
            multiple branches to provide different services such as Loan, Wire
            transfer, Long term deposit, savings and some other related
            services.
          </p>
          <button className="btnIcon">
            <Link href="/#services"></Link>
            SERVICES <span className="grey">|</span>
            <span>&#62;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
