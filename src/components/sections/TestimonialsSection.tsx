import { User, UserSquare } from 'lucide-react';
import styles from './TestimonialsSection.module.scss'; // Import the SCSS module

// Function to guess gender (very basic) - icons styled via SCSS now
const getIconBasedOnName = (name: string) => {
  // Simple checks for specific female names, default to male/generic otherwise
  const lowerCaseName = name.toLowerCase();
  if (lowerCaseName.startsWith('sasha') || lowerCaseName.startsWith('elena') || lowerCaseName.startsWith('tiffany') || lowerCaseName.startsWith('fatima')) {
    return <UserSquare size={24} className={styles.icon} />; // Example female/alternate icon
  }
  return <User size={24} className={styles.icon} />; // Default male/generic icon
};

const TestimonialCard = ({ name, title, testimonial }: { name: string, title: string, testimonial: string }) => {
  return (
    // Use SCSS module class for the card
    <div className={styles.testimonialCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
             {getIconBasedOnName(name)}
          </div>
          {/* Removed h4, using spans with specific classes */}
          <div className={styles.nameTitleWrapper}>
            <span className={styles.name}>
              {name},
            </span>
            <span className={styles.titleText}>{title}</span>
          </div>
        </div>
        <p className={styles.testimonialText}>{testimonial}</p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  // Use template literals (backticks) for testimonial strings
  const testimonials = [
    { id: 1, name: 'Sasha M.', title: 'Talent Acquisition Manager', testimonial: `The job ad creator and boolean search builder alone are saving me hours every week. It's like having a sourcing assistant on demand.`},
    { id: 2, name: 'Ravi D.', title: 'HR Coordinator', testimonial: `The bias and inclusion checker is a game-changer. I feel confident that our job ads are truly inclusive now.` },
    { id: 3, name: 'Elena G.', title: 'Recruiter', testimonial: `I never thought creating job descriptions could be this easy. The builder is intuitive and fast.`},
    { id: 4, name: 'Marcus T.', title: 'Talent Partner', testimonial: `I use the CV summarizer multiple times daily—it helps me spot the best candidates in seconds.`},
    { id: 5, name: 'Tiffany C.', title: 'Talent Manager', testimonial: `The candidate scorecard tool makes evaluation so much more consistent and fair. Love it!`},
    { id: 6, name: 'Noah K.', title: 'HR Specialist', testimonial: `Feedback generation is usually painful. Now it's seamless, huge time saver!`},
    { id: 7, name: 'Fatima Z.', title: 'Recruitment Consultant', testimonial: `The AI agent for candidate sourcing finds people I would've missed. Seriously impressive.`},
    { id: 8, name: 'Carlos S.', title: 'Lead Recruiter', testimonial: `The screening question creator helped us weed out mismatches early in the process.`}
  ];

  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.tagWrapper}>
            <div className={styles.tagInner}>
              Testimonials
            </div>
          </div>
          <h2 className={styles.title}>
            What our customers say <span className={styles.titleHighlight}>about us</span>
          </h2>
        </div>

        {/* First row */}
        {/* Apply SCSS grid class */}
        <div className={`${styles.grid} ${styles.firstRow}`}>
          {firstRow.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              title={testimonial.title}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>

        {/* Second row */}
        {/* Apply SCSS grid class */}
        <div className={`${styles.grid} ${styles.secondRow}`}> {/* Added secondRow class if needed for alignment */}
           {secondRow.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              title={testimonial.title}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </div>

      {/* Amber glow effect */}
      <div className={styles.glowEffect}></div>
    </section>
  );
};

export default TestimonialsSection; 