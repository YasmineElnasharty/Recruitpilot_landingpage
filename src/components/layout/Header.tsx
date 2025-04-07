"use client"; // Add this if not already present

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss'; // Import the SCSS module
import { MouseEvent } from 'react'; // Import MouseEvent

// Simple Lock Icon SVG Component - Moved styling to SCSS
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.lockIcon} // Apply SCSS module class
  >
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const Header = () => {

  // Smooth scroll handler
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Check if we are already on the home page, otherwise let the link navigate
    if (window.location.pathname === '/') {
      e.preventDefault(); // Prevent default anchor link behavior only on the home page
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80; // Adjust this value based on your header's height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else {
        console.warn(`Target element with id "${targetId}" not found.`);
      }
    }
    // If not on the home page, allow default Link behavior (navigation to '/')
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/logo.png"
              alt="RecruitPilot AI Logo"
              width={235}
              height={50}
              priority
              className={styles.logoImage} // Apply style if needed, filter is here now
              style={{ filter: 'brightness(1.15)' }} // Keep inline style for filter or move to SCSS if preferred
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.navLink} ${styles.active}`}>
            Home
          </Link>
          <Link
            href="/#features" // Use hash fragment
            className={styles.navLink}
            onClick={(e) => handleScroll(e, 'features')} // Add onClick handler
          >
            Features
          </Link>
          <Link
            href="/#pricing" // Use hash fragment
            className={styles.navLink}
            onClick={(e) => handleScroll(e, 'pricing')} // Add onClick handler
          >
            Pricing
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <Link href="/pages" className={styles.navLink}>
            Pages
          </Link>
          <Link href="/faq" className={styles.navLink}>
            Faq
          </Link>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <Link href="/signup" className={styles.signUpButton}>
            <span className={styles.signUpContent}>
              Sign Up
              <LockIcon />
            </span>
          </Link>
          <Link href="/get-started" className={styles.getStartedButton}>
            <span className={styles.text}>Get Started</span>
            <span className={styles.arrow}>&gt;</span>
          </Link>
        </div>
      </div>
      {/* Bottom Border */}
      <div className={styles.bottomBorder}></div>
    </header>
  );
};

export default Header;