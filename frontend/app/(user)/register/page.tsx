// pages/register/index.tsx
"use client";
import React, { useState, useEffect } from 'react';

const Register = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');

  const [userToken, setUserToken] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    setEmailValid(isValidEmail);
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all the fields!");
      setShowVerificationPopup(false);
    } else if (!isValidEmail) {
      alert("Email should be in this format e.g.xxx@xxx.com");
      setShowVerificationPopup(false);
    } else if (password !== confirmPassword) {
      alert("Password and confirm password must be the same.");
      setShowVerificationPopup(false);
    } else {
      let token = generateRandomToken();
      setGeneratedToken(token.toString());

      try {
        const response = await fetch(`/api/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: email,
            subject: "Welcome to VacaVerse",
            text: `Your token is ${token}`,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert("email sent");
          await handleRegister();
        } else {
          console.error(
            "Email verification failed:",
            data.message || "Unknown error"
          );
          setShowVerificationPopup(true);
        }
      } catch (error) {
        console.error("Error during email verification:", error);
      }
    }
  };

  useEffect(() => {
    console.log('Generated Token:', generatedToken);
  }, [generatedToken]);

  const handleVerify = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      event.preventDefault();
    }

    if (userToken.trim() === generatedToken.toString()) {
      alert('yay its success');
      handleRegister();
    } else {
      alert('invalidToken' + userToken + generatedToken);
    }
  };

  const generateRandomToken = () => {
    let token = Math.floor(100000 + Math.random() * 900000);
    return token;
  };

  const handleRegister = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    let roleId = 1;
    setShowVerificationPopup(false);
    setEmailValid(isValidEmail);
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all the fields!");
      return;
    }
    if (!isValidEmail) {
      alert("Email should be in this format e.g.xxx@xxx.com");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and confirm password must be the same.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, roleId }),
      });

      const data = await res.json();

      if (
        data.message === "Email already has an account. Please login." ||
        data.message === "Username already exists. Please choose another."
      ) {
        alert(data.message);
      }

      if (data.message === "Register successful") {
        alert("Register Success");
        window.location.href = "/login";
      } else {
        console.error("Register failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during register:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/images/logo.png" alt="Vacaverse logo" width={100} height={100} />
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>REGISTER</div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <br />
          <button
            style={{
              background: '#0070f3',
              color: '#fff',
              padding: '10px',
              borderRadius: '4px',
              cursor: 'pointer',
              border: 'none',
              marginTop: '10px',
            }}
            name="Register"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <a href="/login" style={{ marginTop: '20px', color: '#0070f3', textDecoration: 'underline' }}>
        Already have an account? Login here.
      </a>
      {showVerificationPopup && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Enter Verification Token"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button
            onClick={(e) => handleVerify(e)}
            style={{ background: '#0070f3', color: '#fff', padding: '10px', borderRadius: '4px', cursor: 'pointer', border: 'none' }}
          >
            Verify
          </button>
          <button
            onClick={() => {
              setShowVerificationPopup(false);
              setGeneratedToken('');
            }}
            style={{ background: '#ff0000', color: '#fff', padding: '10px', borderRadius: '4px', cursor: 'pointer', border: 'none', marginLeft: '10px' }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
