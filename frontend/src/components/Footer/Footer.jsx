
import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  const quickLinks = ["Home", "Find Jobs", "Companies", "Mentoring"];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <section className={styles.callToAction}>
          <h2 className={styles.ctaTitle}>
            Explore Your <span className={styles.highlight}>Next Career</span>{" "}
            Move
          </h2>
          <p className={styles.ctaDescription}>
            Are you ready to take the next step in your career? JobLink help you
            discover exciting opportunities tailored to your skills and
            aspirations
          </p>
          <button className={styles.signUpButton}>Sign Up Now</button>
        </section>
        <div className={styles.footerDivider}></div>
        <nav className={styles.footerNav}>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href="#" className={styles.footerLink}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <section className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>
            Subscribe to <br /> our newsletter
          </h3>
          <form className={styles.subscribeForm}>
            <label htmlFor="email" className="visually-hidden">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className={styles.emailInput}
            />
            <button type="submit" className={styles.submitButton}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/870cb2e672da18ab9fe71545faa95fe57263007c90916c90a2aa0fd12b3c0029?placeholderIfAbsent=true&apiKey=8a1e4083f58f4588a29f4fafd0874267"
                alt="Submit"
                className={styles.submitIcon}
              />
            </button>
          </form>
        </section>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a53f9a153bbb281e9c434d54ae34e09ef910b6142b20a516714d1c2fc286f37?placeholderIfAbsent=true&apiKey=8a1e4083f58f4588a29f4fafd0874267"
        alt="Footer decoration"
        className={styles.footerDecoration}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/82bf3e2040fca7bd24312526b507bcf1504a2bc69b5b50765552e29568d9e2f8?placeholderIfAbsent=true&apiKey=8a1e4083f58f4588a29f4fafd0874267"
        alt=""
        className={styles.backgroundDecoration}
      />
    </footer>
  );
}

export default Footer;
