import styles from "./Spinner.module.css";
/**
 * @param {{label?:string}} props
 
 */
export default function Spinner({ label = "Loading" }) {
  return (
    <div className={styles.overlay} role="status" aria-label={label}>
      <div className={styles.scene}>
        {/* this creates a glow */}
        <div className={styles.ringContainer} />

        {/* concenteric rings that spin */}
        <div className={styles.outerRing} />
        <div className={styles.midRing} />
        <div className={styles.innerRing} />

        {/* Orbiting highlight dot */}
        <div className={styles.orbiter} />

        {/* Central pulsing core */}
        <div className={styles.core} />
      </div>
      {/* Label */}
      <p className={styles.label}>
        {label}
        <span className={styles.dots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
}
//  for create react app
// npm install --save-dev @testing-library/react @testing-library/jest-dom

// for vite
// npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
