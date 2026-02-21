// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Fake validation
//     if (username === "admin" && password === "1234") {
//       // localStorage.setItem("user", JSON.stringify({ name: "Admin" }));
//       // Store fake token
//       localStorage.setItem("token", "fake-token-123");
//       navigate("/products"); // go to products page
//     } else {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label>Username</label>
//         <input value={username} onChange={(e) => setUsername(e.target.value)} />

//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;

// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginPage.module.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Small artificial delay to simulate network (better UX feel)
    await new Promise((r) => setTimeout(r, 600));

    if (username.trim() === "admin" && password === "1234") {
      localStorage.setItem("token", "fake-token-123");
      navigate("/products", { replace: true });
    } else {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome back</h1>
          <p>Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="usernam"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className={styles.errorMessage} role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loading}>Signing in...</span>
            ) : (
              "Sign in"
            )}
          </button>

          {/* <div className={styles.footerLinks}>
            <a href="#" className={styles.link}>
              Forgot password?
            </a>
            <span className={styles.separator}>•</span>
            <a href="#" className={styles.link}>
              Contact support
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
