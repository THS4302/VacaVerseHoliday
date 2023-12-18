"use client";
import React, { useState, useEffect, FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { Context } from "@/context";
const LoginForm: React.FC = () => {
  const contextValue = useContext(Context);

  // Check if contextValue is defined
  if (!contextValue) {
    // Handle the case when the context value is undefined
    return <div>Loading...</div>;
  }

  const { setUsername, setSecret } = contextValue;
  // const { username, setUsername, secret, setSecret } = useContext(Context);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedEmail && storedRememberMe === "true") {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

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

        // Store user ID in localStorage
        localStorage.setItem("userId", data.user.userid);
        localStorage.setItem("authToken", data.user.token);
        localStorage.setItem("roleid", data.user.roleid);
        setUsername(data.user.username);
        setSecret(data.user.password);
        if (data.user.roleid === 1) {
          router.push("/");
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
    <div className="frame">
      <div className="div">
        <div className="overlap">
          <div className="overlap-group">
            {/* <img className="vacaverse-logo" src={logo} alt="Vacaverse Logo" /> */}
            <div className="text-wrapper">LOGIN</div>
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
            <div className="overlap-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                className="password-field"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
            </div>

            <button className="overlap-2" name="login" type="submit">
              Login
            </button>

            <label className="overlap-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </form>
        </div>

        <Link href="/register">Don’t have an account? Sign up here.</Link>
      </div>
    </div>
  );
};

export default LoginForm;
