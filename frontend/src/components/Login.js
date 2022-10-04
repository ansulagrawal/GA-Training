import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../helperFunction";

const Login = ({ isLogin, setIsLogin }) => {
  let navigate = useNavigate();
  useEffect(() => {
    isLogin === true ? navigate("/student") : navigate("/login");
  }, [isLogin]);
  const [passwordShow, setPasswordShow] = useState(false);
  const [valEmail, setValEmail] = useState("");
  const [valPassword, setValPassword] = useState("");

  const handleChange = (type, value) => {
    if (type === "email") {
      setValEmail(value);
    } else {
      setValPassword(value);
    }
  };
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  return (
    <div className="container p-5 d-flex justify-content-center flex-column mt-5  border">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={valEmail}
          onChange={(e) => {
            setValEmail(e.target.value);
          }}
        />
        <div id="emailHelp" className="form-text text-danger">
          {valEmail ? (validateEmail(valEmail) ? "" : "Email must contain a valid email address!") : ""}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <div className="input-group">
          <input
            type={passwordShow ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            value={valPassword}
            onChange={(e) => {
              handleChange("password", e.target.value);
            }}
          />
          <i className={`${passwordShow ? "bi bi-eye-slash" : "bi bi-eye"} input-group-text`} type="button" onClick={togglePassword}></i>
        </div>
        <div id="emailHelp" className="form-text mt-0 text-danger">
          {valPassword
            ? validatePassword(valPassword)
              ? ""
              : "At least 8 characters, A mixture of both uppercase and lowercase letters, A mixture of letters and numbers,Inclusion of at least one special character, e.g., ! @ # ? ]"
            : ""}
        </div>
      </div>
      <div className="button-container">
        <Link
          className={`btn ${validatePassword(valPassword) && validateEmail(valEmail) ? "notDisabled btn-primary " : "disabledCursor btn-light"}`}
          to="/student"
          onClick={() => {
            setIsLogin(true);
          }}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Login;
