"use client"; // Add this if not already present

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss'; // Import the SCSS module
import { MouseEvent, useState } from 'react'; // Import MouseEvent and useState

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

// Hamburger Icon SVG Component
const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" // Adjust size as needed
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" // Use currentColor to inherit color
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// Close Icon SVG Component (Optional, for mobile menu)
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  // Handler for links that navigate away (like Blog, Pages, Faq)
  const handleNavAway = () => {
    setIsMobileMenuOpen(false); // Close menu on navigation
  };

  return (
    <header className={`${styles.header} ${isMobileMenuOpen ? styles.mobileMenuOpenState : ''}`}>
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

        {/* --- Mobile Menu Toggle Button --- */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* --- Navigation --- */}
        {/* Apply conditional class for mobile visibility/styling */}
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileNavActive : ''}`}>
          {/* Add a close button inside the mobile menu (optional) */}
          <button
             className={`${styles.mobileMenuToggle} ${styles.closeButtonInside}`}
             onClick={toggleMobileMenu}
             aria-label="Close menu"
           >
             <CloseIcon />
           </button>

          <Link href="/" className={`${styles.navLink} ${styles.active}`} onClick={handleNavAway}>
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
          <Link href="/blog" className={styles.navLink} onClick={handleNavAway}>
            Blog
          </Link>
          <Link href="/pages" className={styles.navLink} onClick={handleNavAway}>
            Pages
          </Link>
          <Link href="/faq" className={styles.navLink} onClick={handleNavAway}>
            Faq
          </Link>

           {/* Optionally, include Action Buttons inside mobile nav */}
           <div className={styles.mobileNavActions}>
              <Link href="/signup" className={styles.signUpButton} onClick={handleNavAway}>
                <span className={styles.signUpContent}>
                  Sign Up
                  <LockIcon />
                </span>
              </Link>
              <Link href="/get-started" className={styles.getStartedButton} onClick={handleNavAway}>
                <span className={styles.text}>Get Started</span>
                <span className={styles.arrow}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16" // Keep viewBox or adjust if needed
                    fill="none" // No fill for stroke-based icon
                    stroke="currentColor" // Use currentColor for stroke
                    strokeWidth="2" // Set stroke thickness
                    strokeLinecap="round" // Round the ends of the line
                    strokeLinejoin="round" // Round the corners where lines meet
                    width="1em" // Size using em relative to parent font-size
                    height="1em"
                  >
                    {/* Polyline for a chevron shape > */}
                    <polyline points="6 4 10 8 6 12" />
                  </svg>
                </span>
              </Link>
           </div>
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
            <span className={styles.arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16" // Match viewBox
                fill="none" // No fill
                stroke="currentColor" // Stroke color
                strokeWidth="2" // Stroke thickness
                strokeLinecap="round" // Rounded ends
                strokeLinejoin="round" // Rounded corners
                width="1em" // Match size
                height="1em"
              >
                {/* Same polyline path */}
                 <polyline points="6 4 10 8 6 12" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
      {/* Bottom Border */}
      <div className={styles.bottomBorder}></div>
    </header>
  );
};

export default Header;