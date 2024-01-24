import React,{ useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
        
        const success = await response.json();
        sessionStorage.setItem('token', success.token);
        setToken(success.token);
        navigate("/", { replace: true });

        setSuccessMessage(success.message);
        setError('');

        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setSuccessMessage('');
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );

};
export default Login;
