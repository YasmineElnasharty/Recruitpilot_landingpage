"use client";

import Image from 'next/image';
import styles from './BrandsSection.module.scss'; // Import the SCSS module
import { useState, useEffect } from 'react'; // Import useState and useEffect

const BrandsSection = () => {
  const brands = [
    { name: 'Spotify', logo: '/brands/spotify.png' },
    { name: 'Dropbox', logo: '/brands/dropbox.png' },
    { name: 'LinkedIn', logo: '/brands/linkedin.png' },
    { name: 'Indeed', logo: '/brands/indeed.png' },
    { name: 'Hootsuite', logo: '/brands/hootsuite.png' },
    { name: 'Metacritic', logo: '/brands/metacritic.png' },
    { name: 'Mailchimp', logo: '/brands/mailchimp.png' },
  ];

  // Create a combined list with unique keys for the ticker
  const tickerItems = [
    ...brands.map((brand, index) => ({ ...brand, uniqueKey: `first-${index}` })),
    ...brands.map((brand, index) => ({ ...brand, uniqueKey: `second-${index}` })),
  ];

  // State to track client-side mounting
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state only on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={styles.brandsSection}>
      <div className={styles.container}>
        <div className={styles.headerText}>
          <p>We help recruiters and HR teams from top companies:</p>
        </div>

        {/* Logo ticker container */}
        <div className={styles.tickerContainer}>
          {/* Conditionally apply the animation class */}
          <div className={isMounted ? styles.tickerTrack : styles.tickerTrackBase}> {/* Use base style before mount */}
            {/* Map over the combined list */}
            {tickerItems.map((item) => (
              <div
                key={item.uniqueKey} // Use the pre-generated unique key
                className={styles.tickerItem}
              >
                <div className={styles.logoWrapper}>
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={280}
                    height={110}
                    className={styles.brandLogo}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle divider effect */}
      <div className={styles.bottomDivider}></div>
    </section>
  );
};

export default BrandsSection;