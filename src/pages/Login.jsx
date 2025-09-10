import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/estimate");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/estimate");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-card">
        <h2 className="auth-title">Login</h2>
        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        <button type="submit" className="auth-btn">Login</button>

        {/* ✅ Social Login Buttons */}
        <div className="social-login">
          <p className="auth-or">OR</p>
          <button type="button" className="google-login-btn" onClick={handleGoogleLogin}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="google-icon" />
            Continue with Google
          </button>
          {/* You can add GitHub, Facebook, etc. here later */}
        </div>

        <p className="auth-switch">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
