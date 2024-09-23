import React from "react";
import styles from "@/styles/ContactForm.module.css";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdEmail, MdLocationOn } from "react-icons/md";

const ContactForm = () => {
  return (
    <section className={styles.contactForm} id="contact">
      <h1>Contact Us</h1>
      <div className="line"></div>
      <div className="flex gap-7 my-9 flex-col md:flex-row">
        <div className="flex flex-col justify-center items-center w-full shadow-lg py-7 gap-3 px-4">
          <span className={styles.icon}>
            <RiCustomerService2Fill />
          </span>
          <h4>Call Us</h4>
          <p></p>
        </div>
        <div className="flex flex-col justify-center items-center w-full shadow-lg py-7 gap-3 px-4">
          <span className={styles.icon}>
            <MdEmail />
          </span>
          <h4>Email Us</h4>

          <a href="mailto:TrustGroupCUbank@accountant.com">
            {/* <p>TrustGroupCUbank@accountant.com</p> */}
          </a>
        </div>
        <div className="flex flex-col justify-center items-center w-full shadow-lg py-7 gap-3 px-4">
          <span className={styles.icon}>
            <MdLocationOn />
          </span>
          <h4>Location</h4>
        </div>
      </div>
      <p className="mt-10 font-medium text-xl mb-3">Write us a message</p>
      <form>
        <div className={styles.flex}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
        </div>
        <div className={styles.flex}>
          <input type="text" placeholder="Your Phone Number" />
          <input type="text" placeholder="Subject" />
        </div>
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">SEND MESSAGE</button>
      </form>
    </section>
  );
};

export default ContactForm;
