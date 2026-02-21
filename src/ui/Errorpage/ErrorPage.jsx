// src/components/ErrorPage.jsx
import React from "react";
import styles from "./ErrorPage.module.css";

const ErrorPage = ({
  error,
  resetErrorBoundary,
  title = "Oops! Something went wrong",
  message = "We're having trouble loading this page. Please try again or return home.",
}) => {
  const handleRetry = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary(); // Best: resets error boundary state (if using react-error-boundary)
    } else {
      window.location.reload(); // Fallback: full page reload
    }
  };

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.illustration}>
          {/* <div className={styles.circle}> */}
          {/* <svg
              className={styles.exclamation}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg> */}
          {/* </div> */}
        </div>

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.message}>
          {message}
          {error && (
            <span className={styles.errorHint}> ({error.message})</span>
          )}
        </p>

        <div className={styles.buttonGroup}>
          <button
            onClick={handleRetry}
            className={`${styles.btn} ${styles.btnPrimary}`}
            aria-label="Try reloading the page"
          >
            Retry
          </button>

          <button
            onClick={goHome}
            className={`${styles.btn} ${styles.btnSecondary}`}
            aria-label="Return to homepage"
          >
            Back to Home
          </button>
        </div>

        <p className={styles.support}>
          If the issue persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
