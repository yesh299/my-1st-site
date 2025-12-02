import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../components/FormElements/Input";
import Button from "../components/FormElements/Button";
import Card from "../../Places/components/UIElements/Card";
import "./Auth.css";

const Auth = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [localError, setLocalError] = useState(null);
  const [emailExists, setEmailExists] = useState(false);

  const inputHandler = (id, value) => {
    setFormState((prev) => ({ ...prev, [id]: value }));
    setLocalError(null);
    setEmailExists(false);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setLocalError(null);
    setEmailExists(false);

    try {
      if (isLoginMode) {
        if (!formState.email || !formState.password) {
          setLocalError("Please fill in all fields!");
          return;
        }
        const result = await authContext.login(formState.email, formState.password);
        if (result.success) {
          history.push("/");
        } else {
          setLocalError(result.error);
        }
      } else {
        if (!formState.name || !formState.email || !formState.password || !formState.passwordConfirm) {
          setLocalError("Please fill in all fields!");
          return;
        }
        if (formState.password !== formState.passwordConfirm) {
          setLocalError("Passwords do not match!");
          return;
        }
        const result = await authContext.signup(formState.email, formState.password, formState.name);
        if (result.success) {
          setFormState({ name: "", email: "", password: "", passwordConfirm: "" });
          setIsLoginMode(true);
          setLocalError(null);
          history.push("/");
        } else {
          if (result.error && result.error.includes("already registered")) {
            setEmailExists(true);
          } else {
            setLocalError(result.error);
          }
        }
      }
    } catch (err) {
      setLocalError(err.message || "An error occurred!");
    }
  };

  const toggleModeHandler = () => {
    setIsLoginMode((prev) => !prev);
    setFormState({ name: "", email: "", password: "", passwordConfirm: "" });
    setLocalError(null);
    setEmailExists(false);
  };

  const switchToLoginHandler = () => {
    setIsLoginMode(true);
    setFormState({ name: "", email: "", password: "", passwordConfirm: "" });
    setLocalError(null);
    setEmailExists(false);
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h2 className="auth-title">{isLoginMode ? "Login to Your Account" : "Create New Account"}</h2>
        {emailExists && (
          <div className="auth-warning">
            <h3>📧 Email Already Registered</h3>
            <p>This email is already associated with an account.</p>
            <p className="auth-warning-hint">If this is your account, please log in with your password.</p>
            <Button type="button" onClick={switchToLoginHandler} className="btn--switch">
              Go to Login
            </Button>
          </div>
        )}
        {(localError || authContext.error) && !emailExists && (
          <div className="auth-error">{localError || authContext.error}</div>
        )}
        {!emailExists && (
          <form onSubmit={authSubmitHandler} className="auth-form">
            {!isLoginMode && (
              <Input element="input" id="name" type="text" label="Full Name" placeholder="John Doe" onInput={inputHandler} />
            )}
            <Input element="input" id="email" type="email" label="Email Address" placeholder="your@email.com" onInput={inputHandler} />
            <Input element="input" id="password" type="password" label="Password" placeholder="••••••••" onInput={inputHandler} />
            {!isLoginMode && (
              <Input element="input" id="passwordConfirm" type="password" label="Confirm Password" placeholder="••••••••" onInput={inputHandler} />
            )}
            <div className="auth-actions">
              <Button type="submit" className="btn--primary" disabled={authContext.isLoading}>
                {authContext.isLoading ? "Loading..." : isLoginMode ? "LOGIN" : "SIGN UP"}
              </Button>
            </div>
          </form>
        )}
        {!emailExists && (
          <div className="auth-toggle">
            <p>{isLoginMode ? "Don't have an account?" : "Already have an account?"}</p>
            <Button type="button" onClick={toggleModeHandler} className="btn--toggle" disabled={authContext.isLoading}>
              {isLoginMode ? "SIGN UP" : "LOGIN"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Auth;
