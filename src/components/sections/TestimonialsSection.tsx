"use client"; // Make sure client component directive is present

// import { User, UserSquare } from 'lucide-react'; // Remove unused imports
import styles from './TestimonialsSection.module.scss'; // Import the SCSS module
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image'; // Import next/image

const TestimonialCard = ({ 
  name, 
  title, 
  testimonial, 
  imageUrl // Add imageUrl prop
}: { 
  name: string, 
  title: string, 
  testimonial: string, 
  imageUrl: string // Add imageUrl type
}) => {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
             {/* Use Next/Image component */}
             <Image 
               src={imageUrl}
               alt={`${name}'s profile picture`}
               layout="fill" 
               objectFit="cover"
               className={styles.profileImage} // Add a class for styling
             />
          </div>
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

// --- Counter Animation Hook (Using requestAnimationFrame) ---
const useCounter = (targetValue: number, duration: number = 2000, isVisible: boolean) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null); // To store requestAnimationFrame ID
  const startTimeRef = useRef<number | null>(null); // To store animation start time
  const currentValRef = useRef<number>(0); // Ref to track current value internally

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp; // Initialize start time on first frame
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(1, elapsed / duration); // Progress from 0 to 1

    const currentTargetValue = Math.floor(progress * targetValue); // Linear interpolation
    currentValRef.current = currentTargetValue; // Update internal ref first
    setCount(currentTargetValue); // Update state for rendering

    if (progress < 1) {
      // If animation not finished, request next frame
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [targetValue, duration]);


  useEffect(() => {
    if (isVisible) {
      // Start animation when visible
      startTimeRef.current = null; // Reset start time
      currentValRef.current = 0; // Reset internal value
      setCount(0); // Reset displayed value
      frameRef.current = requestAnimationFrame(animate);
    } else {
      // Reset count and cancel animation when not visible
      setCount(0);
      currentValRef.current = 0;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      startTimeRef.current = null;
    }

    // Cleanup function to cancel animation on unmount or if visibility changes again
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
       startTimeRef.current = null;
    };
  }, [isVisible, animate]); // Rerun effect when visibility changes or animate function updates

  return count;
};
// --- End Counter Hook ---

const TestimonialsSection = () => {
  // USE THE UPDATED testimonials array from Step 2 ABOVE
  const testimonials = [
    { id: 1, name: 'Sasha M.', title: 'Talent Acquisition Manager', testimonial: `The job ad creator and boolean search builder alone are saving me hours every week. It's like having a sourcing assistant on demand.`, imageUrl: '/testimonials/Sasha.png' }, // Ensure paths are correct!
    { id: 2, name: 'Ravi D.', title: 'HR Coordinator', testimonial: `The bias and inclusion checker is a game-changer. I feel confident that our job ads are truly inclusive now.`, imageUrl: '/testimonials/Ravi.png' },
    { id: 3, name: 'Elena G.', title: 'Recruiter', testimonial: `I never thought creating job descriptions could be this easy. The builder is intuitive and fast.`, imageUrl: '/testimonials/Elena.png' },
    { id: 4, name: 'Marcus T.', title: 'Talent Partner', testimonial: `I use the CV summarizer multiple times daily—it helps me spot the best candidates in seconds.`, imageUrl: '/testimonials/Marcus.png' }, 
    { id: 5, name: 'Tiffany C.', title: 'Talent Manager', testimonial: `The candidate scorecard tool makes evaluation so much more consistent and fair. Love it!`, imageUrl: '/testimonials/Tiffany.png' },
    { id: 6, name: 'Noah K.', title: 'HR Specialist', testimonial: `Feedback generation is usually painful. Now it's seamless, huge time saver!`, imageUrl: '/testimonials/Noah.png' },
    { id: 7, name: 'Fatima Z.', title: 'Recruitment Consultant', testimonial: `The AI agent for candidate sourcing finds people I would've missed. Seriously impressive.`, imageUrl: '/testimonials/Fatima.png' },
    { id: 8, name: 'Carlos S.', title: 'Lead Recruiter', testimonial: `The screening question creator helped us weed out mismatches early in the process.`, imageUrl: '/testimonials/Carlos.png' } 
  ];

  // State for active index
  const [currentIndex, setCurrentIndex] = useState(0);
  // --- State and Ref for Intersection Observer ---
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // --- End Observer State/Ref ---

  // --- Counter State - Pass isVisible ---
  const animatedCount = useCounter(1250, 2000, isVisible);

  // --- Effect for Intersection Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on intersection status
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // relative to document viewport
        rootMargin: '0px', // margin around root
        threshold: 0.1 // 10% visible
      }
    );

    const currentRef = sectionRef.current; // Capture current value
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Cleanup observer
      }
    };
  }, []); // Run only once on mount

  // Navigation functions
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Function to determine dynamic class based on position relative to current index
  const getCardClass = (index: number) => {
    const pos = index - currentIndex;
    if (pos === 0) return styles.isActive;
    if (pos === -1) return styles.isPrevious;
    if (pos === 1) return styles.isNext;
    // Add classes for cards further away if needed for smoother transitions or different styles
    if (pos < -1) return styles.isFarPrevious;
    if (pos > 1) return styles.isFarNext;
    return ''; // Default empty class
  };

  // --- Data for Desktop Tickers ---
  // Duplicate arrays for seamless looping
  const firstRowTickerItems = [
    ...testimonials.slice(0, 4).map((t, i) => ({ ...t, uniqueKey: `r1-${i}` })),
    ...testimonials.slice(0, 4).map((t, i) => ({ ...t, uniqueKey: `r1-copy-${i}` }))
  ];
  const secondRowTickerItems = [
    ...testimonials.slice(4, 8).map((t, i) => ({ ...t, uniqueKey: `r2-${i}` })),
    ...testimonials.slice(4, 8).map((t, i) => ({ ...t, uniqueKey: `r2-copy-${i}` }))
  ];
  // --- End Data ---

  return (
    <section ref={sectionRef} className={styles.testimonialsSection}>
      {/* Gradient Circle Decoration */}
      <div className={`${styles.gradientCircleDecoration} ${styles.testimonialsCircle1}`}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.tagWrapper}>
            <div className={styles.tagInner}>
              Testimonials
            </div>
          </div>
          {/* --- UPDATED Title Structure --- */}
          <h2 className={styles.mainTitle}>
            <span className={styles.countHighlight}>{animatedCount.toLocaleString()}+</span> customers <span className={styles.titleHighlight}>love us</span>
          </h2>
          {/* --- END UPDATE --- */}
        </div>

        {/* --- Mobile Stacked/Cover Flow Container --- */}
        {/* Renamed container class for clarity */}
        <div className={styles.mobileStackedContainer}>
           {/* Renamed track class for clarity */}
           <div className={styles.mobileStackedTrack}>
              {/* Render ALL testimonials for positioning */}
              {testimonials.map((testimonial, index) => (
                // Apply dynamic classes for positioning/styling
                <div key={`mobile-${testimonial.id}`} className={`${styles.mobileCardWrapper} ${getCardClass(index)}`}>
                   <TestimonialCard
                      name={testimonial.name}
                      title={testimonial.title}
                      testimonial={testimonial.testimonial}
                      imageUrl={testimonial.imageUrl} // Pass the prop
                    />
                </div>
              ))}
           </div>
           {/* --- Navigation Controls Below --- */}
           {/* Keep the sliderControls div for layout */}
           <div className={styles.sliderControls}>
              <button
                onClick={goToPrevious}
                className={`${styles.arrowButton} ${styles.arrowLeft}`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className={`${styles.arrowButton} ${styles.arrowRight}`}
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
           </div>
        </div>
        {/* --- End Mobile Container --- */}

        {/* --- Desktop Tickers (Replaces Grid) --- */}
        <div className={styles.desktopTickersContainer}> {/* Wrapper for desktop tickers */}
          {/* First Ticker Row (Moves Left) */}
          <div className={styles.tickerRowContainer}>
            <div className={`${styles.testimonialTickerTrack} ${styles.tickerLeft}`}>
              {firstRowTickerItems.map((item) => (
                <div key={item.uniqueKey} className={styles.testimonialTickerItem}>
                  <TestimonialCard {...item} />
                </div>
              ))}
            </div>
          </div>
          {/* Second Ticker Row (Moves Right) */}
          <div className={styles.tickerRowContainer}>
            <div className={`${styles.testimonialTickerTrack} ${styles.tickerRight}`}>
              {secondRowTickerItems.map((item) => (
                <div key={item.uniqueKey} className={styles.testimonialTickerItem}>
                  <TestimonialCard {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* --- End Desktop Tickers --- */}

      </div>
      {/* Removed Glow Effect */}
    </section>
  );
};

export default TestimonialsSection; 