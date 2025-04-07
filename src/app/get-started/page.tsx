import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaApple } from 'react-icons/fa'; // Assuming react-icons is installed
import styles from './SignInPage.module.scss'; // Reuse or adapt styles

const SignInPage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Left Column - Form */}
      <div className={styles.leftColumn}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to continue your journey with us and explore all the features we offer.
          </p>

          {/* Social Logins */}
          <div className={styles.socialLoginContainer}>
            <button className={`${styles.socialButton} ${styles.googleButton}`}>
              <FaGoogle className={styles.socialIcon} />
              Continue with Google
            </button>
            <button className={`${styles.socialButton} ${styles.appleButton}`}>
              <FaApple className={styles.socialIcon} />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className={styles.dividerContainer}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerText}>or</span>
            <span className={styles.dividerLine}></span>
          </div>

          {/* Form Fields */}
          <form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" placeholder="Enter your password" className={styles.input} />
            </div>

            {/* Remember Me / Forgot Password */}
            <div className={styles.extraOptions}>
              <div className={styles.rememberMe}>
                <input type="checkbox" id="rememberMe" className={styles.checkbox} />
                <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className={styles.link}>
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right Column - Info/Logo */}
      <div className={styles.rightColumn}>
        <div className={styles.rightContent}>
          <div className={styles.logoContainer}> {/* Renamed container class for clarity */}
            <Image
              src="/logo.png" // Use the logo image path
              alt="RecruitPilot AI Logo" // Update alt text
              width={400} // Use same dimensions as Sign Up page logo
              height={100} // Use same dimensions as Sign Up page logo
              className={styles.logoImage} // Use logo specific class
              priority
            />
          </div>
          <h2 className={styles.communityTitle}>Experience the Future</h2>
          <p className={styles.communityText}>
            Join thousands of users who trust our platform for their daily needs. Start your journey today.
          </p>
          <p className={styles.signUpText}>
            Don't have an account? <Link href="/signup" className={styles.signUpLink}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
