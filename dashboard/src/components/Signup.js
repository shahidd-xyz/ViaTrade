import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username cannot be empty";
    } else if (values.username.length < 8) {
      errors.username = "Must be greater than 8";
    } else if (!values.email) {
      errors.email = "Email cannot be empty";
    } else if (!values.password) {
      errors.password = "Email cannot be empty";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("https://viatrade.onrender.com/signup", values, {
          withCredentials: true,
        });

        console.log(res.data);

        alert("Registration Successful");

        // Redirect to login page
        navigate("/login");
      } catch (err) {
        console.log(err.response?.data);
        alert(err.response?.data?.message || "Registration Failed");
      }
    },
  });

  return (
    <div className="signup-page">
      <div className="signup-intro">
        <h3>Open a free demat and trading account online</h3>
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
          <form className="signup-form" onSubmit={formik.handleSubmit}>
            <h2>Create your account</h2>
            <p className="signup-subtitle">Start investing in minutes.</p>

            <div className="field-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username ? (
                <div className="error-text">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="field-group">
              <label htmlFor="email">Email Address</label>
              <input
                placeholder="Enter email"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <div className="error-text">{formik.errors.email}</div>
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
              />
              {formik.errors.password ? (
                <div className="error-text">{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit">Submit</button>
            <p className="mt-3">Already have an account? <Link to="/login" style={{textDecoration: "none"}}>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
