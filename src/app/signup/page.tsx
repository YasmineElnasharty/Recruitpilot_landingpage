import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaApple } from 'react-icons/fa'; // Assuming react-icons is installed
import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Left Column - Form */}
      <div className={styles.leftColumn}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>
            Join our community and start exploring all the features we offer.
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
            <div className={styles.nameFields}>
              <div className={styles.fieldGroup}>
                <label htmlFor="firstName" className={styles.label}>First Name</label>
                <input type="text" id="firstName" placeholder="Enter first name" className={styles.input} />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="lastName" className={styles.label}>Last Name</label>
                <input type="text" id="lastName" placeholder="Enter last name" className={styles.input} />
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" className={styles.input} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" placeholder="Create a password" className={styles.input} />
            </div>

            {/* Agreement Checkbox */}
            <div className={styles.agreement}>
              <input type="checkbox" id="agreeTerms" className={styles.checkbox} />
              <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
                I agree to the <Link href="/terms" className={styles.link}>Terms of Service</Link> and <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              Create Account
            </button>
          </form>
        </div>
      </div>

      {/* Right Column - Info/Logo */}
      <div className={styles.rightColumn}>
        <div className={styles.rightContent}>
          <div className={styles.logoContainer}>
            <Image
              // Use the logo image specifically for the signup page
              src="/logo.png" // Place this image in /public
              alt="RecruitPilot AI Logo"
              width={400} // Adjust width as needed
              height={100} // Adjust height as needed
              className={styles.logoImage}
              priority
            />
          </div>
          <h2 className={styles.communityTitle}>Join Our Community</h2>
          <p className={styles.communityText}>
            Be part of our growing community and discover endless possibilities.
          </p>
          <p className={styles.signInText}>
            Already have an account? <Link href="/get-started" className={styles.signInLink}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;