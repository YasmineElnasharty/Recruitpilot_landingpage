"use client";

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import styles from './Footer.module.scss'; // Import the SCSS module

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.mainContentContainer}`}> {/* Added mainContentContainer for distinction */}
        <div className={styles.grid}>
          {/* Services Column */}
          <div className={styles.column}>
            <h3 className={styles.sectionTitle}>Services</h3>
            <p className={`${styles.text} ${styles.marginBottomLarge}`}>
              SEO agencies typically work businesses of all sizes across various industries to
              help them achieve their online
            </p>
            <div className={styles.socialIcons}>
              <Link href="#" className={`${styles.socialIconLink} ${styles.primary}`}>
                <FaFacebook className={styles.icon} />
              </Link>
              <Link href="#" className={`${styles.socialIconLink} ${styles.secondary}`}>
                <FaTwitter className={styles.icon} />
              </Link>
              <Link href="#" className={`${styles.socialIconLink} ${styles.secondary}`}>
                <FaInstagram className={styles.icon} />
              </Link>
              <Link href="#" className={`${styles.socialIconLink} ${styles.secondary}`}>
                <FaDribbble className={styles.icon} />
              </Link>
            </div>
          </div>

          {/* Address & Contact Column */}
          <div className={styles.column}>
            <h3 className={styles.sectionTitle}>Address</h3>
            <p className={`${styles.text} ${styles.marginBottomSmall}`}>55 Street, 2nd block, 3rd Floor</p>
            <p className={`${styles.text} ${styles.marginBottomLarge}`}>Melbourne, Australia</p>

            <h3 className={styles.sectionTitle}>Contact</h3>
            <p className={`${styles.text} ${styles.marginBottomSmall}`}>infoquland@gmail.com</p>
            <p className={styles.text}>+880 456 852 99</p>
          </div>

          {/* Newsletter Column */}
          <div className={styles.column}>
            <h3 className={styles.sectionTitle}>Newsletter</h3>
            <p className={`${styles.text} ${styles.marginBottomMedium}`}>Subscribe newsletter to get updates</p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Email Address"
                className={styles.emailInput}
                name="newsletter_email"
              />
              <Link href="/signup" className={styles.signUpButton}>
                <span className={styles.text}>Sign Up</span>
                <span className={styles.arrow}>›</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyrightSection}>
         <div className={styles.copyrightContainer}>
            <p className={styles.copyrightText}>
              2024 © All rights reserved by <span className={styles.highlight}>RecruitPilot AI</span>
            </p>
            <div className={styles.links}>
              <Link href="/privacy" className={styles.linkItem}>
                Privacy Policy
              </Link>
              <span className={styles.separator}>|</span>
              <Link href="/terms" className={`${styles.linkItem} ${styles.secondary}`}>
                Terms & Conditions
              </Link>
            </div>
         </div>
      </div>

      {/* Scroll Top Button */}
      <div className={`${styles.scrollTopContainer} ${showScrollTop ? styles.visible : ''}`}>
        <div className={styles.scrollTopWrapper}>
          <div className={styles.scrollTopBackground}></div>
          <Link
            href="#top"
            onClick={handleScrollToTop}
            className={styles.scrollTopButton}
            aria-label="Scroll to top"
          >
            ↑
          </Link>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className={styles.blurEffect}></div>
    </footer>
  );
};

export default Footer; 