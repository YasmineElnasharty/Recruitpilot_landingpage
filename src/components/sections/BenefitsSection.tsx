import { MessageCircle, Target, Zap, FileBadge, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import styles from './BenefitsSection.module.scss'; // Import the SCSS module

const BenefitCard = ({ imageUrl, title, description }: { imageUrl: string, title: string, description: string }) => {
  return (
    <div className={styles.benefitCard}>
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          {/* Using Image component with layout="fill" requires positioned parent */}
          <Image
            src={imageUrl}
            alt={`${title} icon`}
            layout="fill"
            objectFit="contain"
            className={styles.iconImage} // Apply padding and object-fit
          />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      imageUrl: '/benefit-icons/humanity.png',
      title: 'Humanity in HRtech',
      description: 'Our candidate journey ensures a fairer and more equitable hiring process for every single applicant.'
    },
    {
      id: 2,
      imageUrl: '/benefit-icons/intuitive.png',
      title: 'Intuitive AI models',
      description: 'RecruitPilot\'s bespoke AI models weave intelligent automation throughout the entire recruitment lifecycle.',
    },
    {
      id: 3,
      imageUrl: '/benefit-icons/unrivaled.png',
      title: 'Unrivaled experiences',
      description: 'We\'re revolutionizing candidate experiences with our feedback engine and bespoke application pathways.'
    },
    {
      id: 4,
      imageUrl: '/benefit-icons/quality.png',
      title: 'Quality AI-driven content',
      description: 'We craft and deliver high-quality, AI-driven recruitment content that truly resonates with candidates.'
    },
    {
      id: 5,
      imageUrl: '/benefit-icons/bias.png',
      title: 'Bias reducing algorithms',
      description: 'RecruitPilot\'s algorithms are designed to reduce 29 types of bias at every recruitment touchpoint.'
    },
    {
      id: 6,
      imageUrl: '/benefit-icons/next-gen.png',
      title: 'Next-Gen recruiting',
      description: 'Our AI-driven assistants are specifically tailored for hiring, providing unmatched quality in every interaction.'
    }
  ];

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.tagWrapper}>
            <div className={styles.tagInner}>
              What We Do
            </div>
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleWhite}>HR tech that helps you </span>
            <span className={styles.titleAmber}>Stay Human</span>
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className={styles.grid}>
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              imageUrl={benefit.imageUrl}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>

      {/* Decorative Glow Effects */}
      <div className={styles.glowBottomRight}></div>
      <div className={styles.glowTopLeft}></div>
    </section>
  );
};

export default BenefitsSection; 