"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.scss'; // Import the SCSS module

// How It Works Button component using SCSS modules
const HowItWorksButton = () => {
  return (
    <Link href="/how-it-works" className={styles.howItWorksButton}>
      <div className={styles.iconContainer}>
        <div className={styles.outerCircle}></div>
        <div className={styles.innerCircle}></div>
        <svg width="11" height="13" viewBox="0 0 10 12" className={styles.playIcon}>
          <path d="M3 2 C2.3 2 1.8 2.7 1.8 3.5 L1.8 8.5 C1.8 9.3 2.3 10 3 10 L8 7 C8.7 6.6 8.7 5.4 8 5 L3 2 Z" />
        </svg>
      </div>
      <span className={styles.linkText}>
        How IT Works
      </span>
    </Link>
  );
};

const HeroSection = () => {
  return (
    // Apply SCSS module class to the section
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <h1 className={styles.headline}>
          <span className={styles.headlineWhite}>Stop sucking </span>
          <span className={styles.headlineGradient}>
            at hiring.
          </span>
        </h1>

        <div className={styles.subHeadline}>
          <p>
            You might not, but let's face it, most recruitment sure does. Clunky systems, endless admin, perpetual ghosting, and ingrained biases.
          </p>
          <p>
            RecruitPilot AI is built by recruiters who know better, using ethical, AI-powered simplicity that cuts through the crap.
          </p>
          <p>
            Let machines do the heavy lifting while you stay human. Upgrade your tools and hire like a pro.
          </p>
        </div>

        <div className={styles.ctaContainer}>
          <Link href="/trial" className={styles.trialButton}>
            <span className={styles.buttonContent}>
              <span className={styles.text}>Start Free Trial</span>
              <span className={styles.arrow}>&rsaquo;</span>
            </span>
          </Link>

          <HowItWorksButton />
        </div>

        {/* Chat Interface Image Container */}
        <div className={styles.imageContainer}>
          {/* Glow Image */}
          <Image
            src="/images/glow.png"
            alt=""
            // Adjust width/height if needed relative to main image size change
            width={950}
            height={130}
            className={styles.glowImage}
            aria-hidden="true"
            priority
          />

          {/* Image Frame */}
          <div className={styles.imageFrame}>
            <Image
              src="/chat-interface.png"
              alt="RecruitPilot Chat Interface"
              // Reduced width and height props
              width={1100} // e.g., reduced from 1300
              height={550} // e.g., reduced from 650 (maintain aspect ratio)
              className={styles.chatImage}
              priority
            />
          </div>
        </div>
      </div>

      {/* Other Amber glow effect */}
      <div className={styles.bottomGlow}></div>
    </section>
  );
};

export default HeroSection; 