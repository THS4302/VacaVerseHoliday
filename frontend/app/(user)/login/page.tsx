"use client";
import React, { useState, useEffect, FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "../../../_assets/images/logo.png";
// import { Context } from "@/context";
import google from "../../../_assets/images/google-logo.png";
import facebook from "../../../_assets/images/facebook-logo.png";
import emaillogo from "../../../_assets/images/email-logo.png";
import ResetCodePopup from "../resetPassword/page";
import SetNewPasswordPopup from "../newPassword/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import GoogleSignIn from "@/components/SignIn/GoogleSignIn";

// Import statements remain the same

const LoginForm: React.FC = () => {
  // const contextValue = useContext(Context);

  // if (!contextValue) {
  //   return <div>Loading...</div>;
  // }
  const [showResetCodePopup, setShowResetCodePopup] = useState(false);
  const [showSetNewPasswordPopup, setShowSetNewPasswordPopup] = useState(false);
  // const { setUsername, setSecret } = contextValue;
  const [resetPassword, setResetPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [generatedToken, setGeneratedToken] = useState("");

  const [userToken, setUserToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedEmail && storedRememberMe === "true") {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const generateRandomToken = () => {
    let token = Math.floor(100000 + Math.random() * 900000);
    return token;
  };

  const handleForgotPassword = async () => {
    try {
      if (!email.trim()) {
        alert("Please enter your email address.");
        return;
      }

      const resetCode = generateRandomToken(); // Generate a reset code

      // Send reset code to the user's email
      const response = await fetch(
        `http://localhost:8081/api/send-reset-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: email, // Replace with the user's email
            subject: "Password Reset Code",
            text: `Your password reset code is: ${resetCode}`,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Once the email is sent successfully, show the reset code popup

        setShowResetCodePopup(true);
        setGeneratedToken(resetCode.toString()); // Save the reset code for verification
      } else {
        console.error("Failed to send reset code:", data.message);
        alert("Failed to initiate password reset. Please try again.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("Failed to initiate password reset. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      // You can add logic here to update the user's password with the new one
      // For demonstration purposes, let's just show an alert
      alert(`Password reset successful! New password: ${newPassword}`);
      setResetPassword(false);
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Login Success!");

        localStorage.setItem("userId", data.user.userid);
        localStorage.setItem("authToken", data.user.token);
        localStorage.setItem("roleid", data.user.roleid);
        // setUsername(data.user.username);
        // setSecret(data.user.password);

        if (data.user.roleid === 1) {
          router.push("/homepage");
        } else if (data.user.roleid === 2) {
          router.push("/admin");
        }
      } else {
        alert("Wrong email/password! Please enter again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        className="logo-container"
        style={{
          flex: "1",
          background: "#001F3F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo.src}
          alt="Vacaverse Logo"
          style={{ maxWidth: "50%", maxHeight: "50%", borderRadius: "8px" }}
        />
      </div>
      <div
        className="form-container"
        style={{
          flex: "1",
          padding: "20px",
          maxWidth: "400px",
          background: "#fff",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          alignItems: "center",
        }}
      >
        <div className="frame">
          <div className="div">
            <div className="overlap">
              <div className="overlap-group">
                <div
                  className="text-wrapper"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  LOGIN
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div className="group">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="email-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <br />
                </div>
                <div
                  className="overlap-wrapper"
                  style={{ position: "relative", marginBottom: "10px" }}
                >
                  <input
                    type={resetPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    className="password-field"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setResetPassword(!resetPassword)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {resetPassword ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </button>
                </div>

                <button
                  className="overlap-2"
                  name="login"
                  type="submit"
                  style={{
                    background: "#0070f3",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Login
                </button>

                <label
                  className="overlap-3"
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    style={{ marginRight: "5px" }}
                  />
                  Remember Me
                </label>
              </form>
              <div style={{ marginTop: "10px" }}>
                <a
                  onClick={handleForgotPassword}
                  style={{
                    cursor: "pointer",
                    color: "#0070f3",
                    textDecoration: "underline",
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              <div style={{ marginTop: "20px" }}>
                <p style={{ marginBottom: "10px", textAlign: "center" }}>
                  Login with:
                </p>
                <GoogleSignIn />

                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={facebook.src}
                    alt="Facebook"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={emaillogo.src}
                    alt="Email"
                    style={{ width: "40px", height: "40px" }}
                  />
                </button>
              </div>
            </div>

            <Link legacyBehavior href="/register">
              <a
                style={{
                  display: "block",
                  marginTop: "20px",
                  textAlign: "center",
                  color: "#0070f3",
                  textDecoration: "underline",
                }}
              >
                Don’t have an account? Sign up here.
              </a>
            </Link>
          </div>
        </div>
      </div>
      {showResetCodePopup && (
        <ResetCodePopup
          onClose={() => setShowResetCodePopup(false)}
          onVerify={(code) => {
            // Handle verification logic (e.g., send request to server to verify the code)
            // If verification is successful, proceed with the password reset process

            setShowResetCodePopup(false);
            setShowSetNewPasswordPopup(true);
            alert(`Code verified! Proceeding with password reset...`);
          }}
          generatedToken={generatedToken} // Pass the generatedToken prop
        />
      )}
      {/* New code for password reset popup */}
      {showSetNewPasswordPopup && (
        <SetNewPasswordPopup
          onClose={() => setShowSetNewPasswordPopup(false)}
          onSetNewPassword={(newPassword) => {
            // Handle setting the new password logic here
            alert(`New Password Set: ${newPassword}`);
          }}
          email={email} // Pass the email prop
        />
      )}
    </div>
  );
};

export default LoginForm;
