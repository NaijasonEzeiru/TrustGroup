import React from "react";
import styles from "@/styles/Hero.module.css";
import Link from "next/link";

const Hero = () => {
  return (
    <section className={styles.Hero} id="home">
      <div className={styles.texts}>
        <h2 className={styles.h2Hero}>
          Smart way to keep your money safe and secure
        </h2>
        <p className="mt-2 mb-5">
          Transfer money within minutes and save money for your future. All of
          your desired service in single platform.
        </p>
        <button className="btnIcon">
          <Link href="/dashboard" style={{ color: "white" }}>
            GET Started
            <span className="">
              <span className="grey">|</span>
            </span>{" "}
            <span>&#62;</span>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;
