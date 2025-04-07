import Link from 'next/link';
import Image from 'next/image';
import styles from './PricingSection.module.scss'; // Import the SCSS module

const PricingSection = () => {
  // Removed inline gradientStyle

  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.container}>
        {/* Apply gradient background via SCSS */}
        <div className={styles.gradientBox}>
          <div className={styles.contentWrapper}>
            {/* Text Container */}
            <div className={styles.textContainer}>
              <div className={styles.tag}>
                Try RecruitPilot
              </div>
              <h2 className={styles.title}>
                Plans starting from just<br />
                $19 per month
              </h2>
              <p className={styles.description}>
                No credit card required. 10+ tools to explore
              </p>

              <Link href="/trial" className={styles.trialButton}>
                <span className={styles.text}>Start Free Trial</span>
                <span className={styles.arrow}>›</span>
              </Link>
            </div>

            {/* Image container */}
            <div className={styles.imageContainer}>
              {/* Background Robot Image 1 */}
              <Image
                src="/images/robot-bg.png" // Ensure these paths are correct
                alt="" // Decorative image, empty alt
                layout="fill"
                // objectFit handled by SCSS
                className={styles.backgroundRobot1} // Apply specific style
                aria-hidden="true" // Hide decorative images from screen readers
              />
              {/* Background Robot Image 2 */}
              <Image
                src="/images/robot-bg.png" // Ensure these paths are correct
                alt="" // Decorative image, empty alt
                layout="fill"
                // objectFit handled by SCSS
                className={styles.backgroundRobot2} // Apply specific style
                 aria-hidden="true" // Hide decorative images from screen readers
              />

              {/* Foreground Main Image */}
              <Image
                src="/images/pricing-graphic.png" // Ensure this path is correct
                alt="Pricing illustration" // Descriptive alt text
                layout="fill"
                // objectFit handled by SCSS
                className={styles.foregroundImage} // Apply specific style
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 