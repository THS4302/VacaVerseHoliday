// ResetCodePopup.tsx
import React, { useState, FormEvent } from 'react';

interface ResetCodePopupProps {
  onClose: () => void;
  onVerify: (code: string) => void;
}


const ResetCodePopup: React.FC<ResetCodePopupProps> = ({ onClose, onVerify }) => {
  const [resetCode, setResetCode] = useState('');
  const [userToken, setUserToken] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const handlePopupVerify = () => {
    // Handle verification logic here
    if (userToken.trim() === generatedToken.toString()) {
      alert('Code verified! Proceeding with password reset...');
      // Implement the logic to allow the user to reset the password
      // You might want to redirect the user to a new password entry page
      // or show a password reset form here.
    } else {
      alert('Invalid reset code');
    }
  };


  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handlePopupVerify}>
          <label>
            Enter Reset Code:
            <input
        type="text"
        placeholder="Enter Verification Token"
        value={userToken}
        onChange={(e) => setUserToken(e.target.value)}
      />
          </label>
          <br />
          <br />
          <button
            type="submit"
            style={{
              background: '#0070f3',
              color: '#fff',
              padding: '10px',
              borderRadius: '4px',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetCodePopup;
