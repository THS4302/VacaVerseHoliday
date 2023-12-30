import React, { useEffect } from 'react';
import Head from 'next/head';
import google from "../../_assets/images/google-logo.png";
const GoogleSignIn: React.FC = () => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  const googleClientSecret=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '';

  useEffect(() => {
    // Load Google API script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Initialize 'gapi' after the script has loaded
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: googleClientId,
          // Remove client_secret from the client-side initialization
        })
        .then((auth2: any) => {
          // Handle initialization success
          console.log('Google API initialized', auth2);
        })
        .catch((error: any) => {
          // Handle initialization error
          console.error('Error initializing auth2', error);
        });
      });
    };

    script.onerror = () => {
      // Handle script loading error
      console.error('Error loading Google API script');
    };

    // Append the script to the document
    document.head.appendChild(script);

    // Clean up: remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [googleClientId]);

  const handleSignIn = async () => {
    alert("Button clicked");
    const auth2 = window.gapi.auth2.getAuthInstance();
  
    if (auth2) {
      try {
        const googleUser = await auth2.signIn();
        alert('Signed in successfully'+googleUser);
        // You can send the Google ID token to your server for further authentication
        // const idToken = googleUser.getAuthResponse().id_token;
        // Send idToken to your server...
      } catch (error) {
        // Handle the sign-in error
        console.error('Error signing in', error);
      }
    } else {
      console.error('Auth2 instance not available');
    }
  };
  
  

  return (
    <button
    onClick={handleSignIn}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "inline-block",
    }}
  >
    <img
      src={google.src}
      alt="Google"
      style={{
        width: "40px",
        height: "40px",
        marginRight: "10px",
      }}
    />
  </button>
  );
};

export default GoogleSignIn;
