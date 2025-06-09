import { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../context/AuthContext';
import GoogleButton from './GoogleButton';

const LoginForm = () => {
  const { companyLogin } = useAuthStore(); // Make sure you have this function
  const [loading, setLoading] = useState(false);
  const { signUpWithGoogle } = useAuthStore();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      await companyLogin({ email, password });
      alert('Successfully logged in!');
      setCredentials({ email: '', password: '' });
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="form">
        <p className="text-shadow-md">
          Welcome back to<span className="text-black"> Mano<span className="text-blue-500">Sangam<span className="text-orange-500">.</span></span></span>
        </p>

        <GoogleButton />

        <form className="startup-form">
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            placeholder="Official Email"
            className="input-field"
          />
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="Password"
            className="input-field"
          />
          <button onClick={handleLoginSubmit} disabled={loading} className="submit-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f0f0f0;

  .form {
    background: white;
    padding: 2rem;
    border: 2px solid #323232;
    box-shadow: 4px 4px #323232;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 400px;
  }

  .form > p {
    font-family: 'Dela Gothic One', sans-serif;
    text-align: center;
  }

  .form > p > span {
    display: block;
    margin-top: 0.25rem;
    font-family: 'Space Mono', monospace;
    font-size: 1.7rem;
  }

  .startup-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
  }

  .input-field {
    padding: 0.6rem 1rem;
    border: 2px solid #323232;
    border-radius: 5px;
    font-size: 1rem;
  }

  .submit-button {
    background-color: #323232;
    color: white;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit-button:hover {
    background-color: #000;
  }

  @media (max-width: 480px) {
    .form {
      padding: 1.5rem;
    }

    .form > p {
      font-size: 1.25rem;
    }
  }
`;

export default LoginForm;