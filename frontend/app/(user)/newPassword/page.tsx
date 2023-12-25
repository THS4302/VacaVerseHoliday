import React, { useState, FormEvent } from 'react';

interface SetNewPasswordPopupProps {
  onClose: () => void;
  onSetNewPassword: (newPassword: string) => void;
}

const SetNewPasswordPopup: React.FC<SetNewPasswordPopupProps> = ({ onClose, onSetNewPassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Error,setError]=useState('');

  const handleSetNewPassword = (event: FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
        setError('Passwords do not match. Please re-enter.');
        return;
      }
  
      // Reset error state
      setError('');
    // You can add validation logic if needed

    onClose();
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
        <form onSubmit={handleSetNewPassword}>
          <label>
            Enter New Password:
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <br />
          <label>
            Confirm New Password:
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <br />
          {Error && <p style={{ color: 'red' }}>{Error}</p>}
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
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPasswordPopup;
