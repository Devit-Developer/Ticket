import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [roles, setRoles] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleRegister = async () => {

    if (!username.trim() || !roles.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, roles, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 400) {
          setSuccessMessage('');
          setError(errorData.error);
        } else {
          setSuccessMessage('');
          setError('An error occurred during registration.');
        }
      } else {
        setError('');
        setUsername('');
        setRoles('');
        setPassword('');
        const successData = await response.json();
        setSuccessMessage(successData.message);
        // Do something for a successful registration, e.g., redirect to another page
      }
    } catch (error) {
      setSuccessMessage('');

      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      {/* Your form inputs go here */}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" value={roles} onChange={(e) => setRoles(e.target.value)} />

      {/* Display error message */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      {/* Submit button */}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;