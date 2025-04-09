"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.scss'; // Import the SCSS module
import { useEffect, useRef, useState, ChangeEvent, FocusEvent } from 'react'; // Import useEffect, useRef, useState, ChangeEvent, FocusEvent

// --- NEW: Animated Search Bar Component ---
const AnimatedSearchBar = () => {
  const questions = [
    "What are best practices for conducting virtual interviews?",
    "How do I improve the candidate experience?",
    "What strategies can I use to reduce turnover?",
    "How should I negotiate the counteroffer with Jane?",
    "Which were the top 3 applicants to my Java Developer Job ad?",
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState(''); // Renamed from displayedText
  const [isDeleting, setIsDeleting] = useState(false);
  const [userInput, setUserInput] = useState(''); // State for user's actual input
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  const typingSpeed = 40;
  const deletingSpeed = 20;
  const pauseDuration = 1000;

  // Effect for the animation logic
  useEffect(() => {
    // Only run animation if the input is not focused AND user hasn't typed anything
    if (isFocused || userInput) {
       // If user is focused or has typed, ensure animated text is cleared
       // so it doesn't reappear awkwardly on slight timing issues.
       if (animatedText !== '') setAnimatedText('');
       return;
    };

    // --- Animation Logic ---
    const handleTyping = () => {
      const fullText = questions[currentQuestionIndex];

      if (isDeleting) {
        setAnimatedText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setAnimatedText((prev) => fullText.substring(0, prev.length + 1));
      }

      if (!isDeleting && animatedText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && animatedText === '') {
        setIsDeleting(false);
        setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
      }
    };
    // --- End Animation Logic ---

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);

  // Update dependencies: run effect when focus changes or user input clears, besides animation states
  }, [animatedText, isDeleting, currentQuestionIndex, questions, deletingSpeed, typingSpeed, pauseDuration, isFocused, userInput]);


  // Handler for user input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Handlers for focus state
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Optional: If you want the animation to restart immediately on blur
    // when input is empty, trigger a state update that useEffect depends on.
    // But the current useEffect dependency array handles this.
  };


  // Generate Icon (Sparkles) - Simple inline SVG
  const GenerateIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.47 7.53L20 10L14.47 12.47L12 18L9.53 12.47L4 10L9.53 7.53L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 16L5.47 18.53L8 20L5.47 21.47L4 24L2.53 21.47L0 20L2.53 18.53L4 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
       <path d="M18 16L19.47 18.53L22 20L19.47 21.47L18 24L16.53 21.47L14 20L16.53 18.53L18 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );


  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        className={styles.searchInput}
        // Use value prop now. Display user input if it exists, otherwise show animation (or empty if focused)
        value={userInput || (isFocused ? '' : animatedText)}
        // Use placeholder for a static hint or leave empty
        placeholder={isFocused || userInput ? '' : 'Ask RecruitPilot AI...'} // Show static placeholder only when not focused and no input/animation
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button className={styles.searchButton}>
        <GenerateIcon />
        <span>Generate</span>
      </button>
    </div>
  );
};
// --- END: Animated Search Bar Component ---

// Removed HowItWorksButton component

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
      {/* Gradient Circle Decorations */}
      <div className={`${styles.gradientCircleDecoration} ${styles.heroCircle1}`}></div>
      <div className={`${styles.gradientCircleDecoration} ${styles.heroCircle2}`}></div>

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

        {/* --- RENDER SEARCH BAR --- */}
        <AnimatedSearchBar />
        {/* --- END SEARCH BAR --- */}

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