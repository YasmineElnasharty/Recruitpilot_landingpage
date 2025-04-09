"use client";

import { Target, Bot, HardDrive } from 'lucide-react';
import styles from './FeaturesSection.module.scss'; // Import the SCSS module

const FeatureCard = ({ 
  icon, 
  title, 
  description
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    // Apply the SCSS module class
    <div className={styles.featureCard}>
      <div className={styles.iconWrapper}>
        {icon} {/* Icon is passed in directly */}
      </div>
      <div className={styles.cardText}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Target size={28} />,
      title: 'AI Tools',
      description: 'Use our AI tools to create sourcing, presentation and interviewing content and output in secconds.'
    },
    {
      icon: <Bot size={28} />,
      title: 'AI Agents',
      description: 'Use our AI agents to automate and perfrom tasks on autopilot from screening to onboarding.'
    },
    {
      icon: <HardDrive size={28} />,
      title: 'Storage & RAG',
      description: 'Customizable storage allows you to retain and search data effortlessly.'
    }
  ];

  return (
    <section id="features" className={styles.featuresSection}>
      {/* Gradient Circle Decoration */}
      <div className={`${styles.gradientCircleDecoration} ${styles.featuresCircle1}`}></div>

      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left column with features */}
          <div className={styles.leftColumn}>
            <div className={styles.headerContent}>
              <div className={styles.tagWrapper}>
                <div className={styles.tagInner}>
                  Our Plug & Play Tools
                </div>
              </div>
              <h2 className={styles.title}>Start to use in a few<br />seconds</h2>
            </div>

            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                  {/* Divider */}
                  {index < features.length - 1 && (
                    <div className={styles.divider}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column with placeholder */}
          <div className={styles.rightColumn}>
            <div className={styles.placeholderOuter}>
              <div className={styles.placeholderInner}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;