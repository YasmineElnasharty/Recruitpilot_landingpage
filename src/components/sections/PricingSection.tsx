import Link from 'next/link';
import Image from 'next/image';
import styles from './PricingSection.module.scss'; // Import the SCSS module

const PricingSection = () => {
  // Removed inline gradientStyle

  return (
    <section id="pricing" className={styles.pricingSection}>
      {/* Gradient Circle Decoration */}
      <div className={`${styles.gradientCircleDecoration} ${styles.pricingCircle1}`}></div>

      <div className={styles.container}>
        {/* Apply gradient background via SCSS */}
        <div className={styles.gradientBox}>
          <div className={styles.contentWrapper}>
            {/* Background Robot Image 1 */}
            <div className={`${styles.image} ${styles.backgroundRobot1}`}> {/* Wrap in divs for positioning */}
              <Image
                src="/images/robot-bg.png" // Ensure path is correct
                alt="" // Decorative
                layout="fill"
                objectFit="contain" // Keep contain
                aria-hidden="true"
              />
            </div>
            {/* Background Robot Image 2 */}
            <div className={`${styles.image} ${styles.backgroundRobot2}`}> {/* Wrap in divs for positioning */}
              <Image
                src="/images/robot-bg.png" // Ensure path is correct
                alt="" // Decorative
                layout="fill"
                objectFit="contain" // Keep contain
                aria-hidden="true"
              />
            </div>

            {/* Text Container (Left Side) */}
            <div className={styles.textContainer}>
              <div className={styles.tag}>
                Try RecruitPilot
              </div>
              <h2 className={styles.title}>
                Plans starting from just<br />
                $19 per month
              </h2>
              <p className={styles.description}>
                Pretty much the greatest hits of recruitment tools
                <br />
                you&apos;ll use every day.
              </p>
              <Link href="/trial" className={styles.trialButton}>
                <span className={styles.text}>Start Free Trial</span>
                <span className={styles.arrow}>›</span>
              </Link>
              <p className={styles.noCreditText}>
                No credit card required.
              </p>
            </div>

            {/* Quote Container (Right Side) */}
            <div className={styles.quoteContainer}>
              <div className={styles.quoteInner}>
                 <p className={styles.quoteHeading}>Ever heard this?</p>
                 <blockquote className={styles.quoteBody}>
                   I got into recruitment to do more admin<br />and meet fewer people.
                 </blockquote>
                 <p className={styles.quoteConclusion}>No. Neither have we.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 