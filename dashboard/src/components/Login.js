import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const shakeTimer = useRef(null);

  const showError = (message) => {
    setLoginError(message);
    setIsShaking(true);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    shakeTimer.current = setTimeout(() => setIsShaking(false), 400);
  };

  useEffect(() => {
    return () => {
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
    };
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username cannot be empty";
    } else if (values.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!values.password) {
      errors.password = "Password cannot be empty";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      setLoginError("");
      try {
        const res = await axios.post(
          "http://localhost:8080/login",
          values,
          {
            withCredentials: true,
          }
        );

        console.log(res.data);
        setTimeout(() => {
          navigate("/");
        }, 600);
      } catch (err) {
        console.log(err.response?.data);
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Username or password is incorrect";
        showError(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="signup-page">
      <div className="signup-intro">
        <h3>Login to your demat account</h3>
        <p>
          Start investing brokerage free and join a community of 1.6+ crore
          investors and traders
        </p>
      </div>

      <div className="signup-content">
        <div className="signup-illustration ms-5">
          <img
            src="/media/images/account_open.svg"
            alt="Account opening illustration"
          />
        </div>
        <div className="signup-form-section me-5">
          <form className={`signup-form ${isShaking ? "is-shaking" : ""}`} onSubmit={formik.handleSubmit} noValidate>
            <h2>Login to your account</h2>
            <p className="signup-subtitle">Welcome back.</p>

            {loginError && (
              <div className="login-error-popup" role="alert" aria-live="assertive">
                <span className="login-error-icon" aria-hidden="true">
                  !
                </span>
                <span className="login-error-message">{loginError}</span>
              </div>
            )}

            <div className="field-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                aria-invalid={Boolean(formik.errors.username)}
              />
              {formik.errors.username ? (
                <div className="error-text">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Enter password"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                aria-invalid={Boolean(formik.errors.password)}
              />
              {formik.errors.password ? (
                <div className="error-text">{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Signing in..." : "Submit"}
            </button>
            <p className="mt-3">Don't have an account? <Link to="/signup" style={{ textDecoration: "none" }}>Sign up</Link></p>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Login;
