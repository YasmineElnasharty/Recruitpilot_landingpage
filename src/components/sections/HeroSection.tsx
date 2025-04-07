"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.scss'; // Import the SCSS module
import { useEffect, useRef } from 'react'; // Import useEffect and useRef

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

// // Removed easing function for linear motion
// const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const HeroSection = () => {
  // Ref for the image frame element
  const imageFrameRef = useRef<HTMLDivElement>(null);
  // Ref for the section itself to calculate relative scroll
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Add scroll effect logic
  useEffect(() => {
    const frame = imageFrameRef.current;
    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;
    if (!frame || !section || !imageContainer) {
        console.warn("HeroSection refs not found, scroll effect disabled.");
        return;
    }

    const initialRotation = 15; // Start tilted AWAY (backward)
    const finalRotation = 0;    // End upright

    // Set initial state via CSS variable
    frame.style.setProperty('--scroll-rotate-x', `${initialRotation}deg`);

    const handleScroll = () => {
      const containerTop = imageContainer.offsetTop; // Use image container's top position
      // const containerHeight = imageContainer.offsetHeight; // Remove unused variable
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // --- Define Scroll Range with Precise Endpoint ---
      // End animation exactly when the container top hits the viewport top
      const animationEnd = containerTop;
      // Start the animation significantly earlier, e.g., when the container top
      // is still below the bottom of the viewport or just entering it.
      // Let's start it when the container top is one full viewport height above its final position.
      const animationStart = containerTop - viewportHeight;
      // --- End Range Definition ---

      const scrollRange = animationEnd - animationStart;

      if (scrollRange <= 0) {
         // If range is invalid, determine state based on scroll position
         const finalStateProgress = scrollY >= animationEnd ? 1 : (scrollY <= animationStart ? 0 : 0);
         const finalStateRotation = initialRotation + (finalRotation - initialRotation) * finalStateProgress;
         frame.style.setProperty('--scroll-rotate-x', `${finalStateRotation}deg`);
        return;
      }

      // Calculate progress relative to the new range
      const currentScroll = scrollY - animationStart;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollRange));

      // Use Linear Progress
      const currentRotation = initialRotation + (finalRotation - initialRotation) * progress;

      // console.log(`Progress: ${progress.toFixed(2)}, Rotation: ${currentRotation.toFixed(2)}deg`);

      frame.style.setProperty('--scroll-rotate-x', `${currentRotation}deg`);
    };

    // Debounce function (optional but recommended for performance)
    let timeoutId: NodeJS.Timeout | null = null;
    const debouncedHandleScroll = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            handleScroll();
            timeoutId = null;
        }, 5); // Adjust debounce delay (e.g., 5-10ms)
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (timeoutId) clearTimeout(timeoutId); // Cleanup timeout on unmount
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Add ref to the section
    <section ref={sectionRef} className={styles.heroSection}>
      <div className={styles.container}>
        <h1 className={styles.headline}>
          <span className={styles.headlineWhite}>Stop sucking </span>
          <span className={styles.headlineGradient}>
            at hiring.
          </span>
        </h1>

        <div className={styles.subHeadline}>
          <p>
            You might not, but let&apos;s face it, most recruitment sure does. Clunky systems, endless admin, perpetual ghosting, and ingrained biases.
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
        <div ref={imageContainerRef} className={styles.imageContainer}>
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
          <div ref={imageFrameRef} className={styles.imageFrame}>
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