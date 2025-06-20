import { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../context/AuthContext';

const Form = () => {
  const { signUpWithGoogle, companyRegister } = useAuthStore();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    companyName: '',
    email: '',
    website: '',
    password: '',
    confirmPassword: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { companyName, email, website, password, confirmPassword } = details;

    if (!companyName || !email || !password || !confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const details = {
        companyName,
        email,
        website,
        password
      }
      await companyRegister(details);
      alert('Successfully registered!');
      setDetails({ companyName: '', email: '', website: '', password: '', confirmPassword: '' });
    } catch (error) {
      alert(`Failed to register: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const roles = ['Creator', 'Investor'];

  return (
    <StyledWrapper>
      <form className="form">
        <p className='text-shadow-md'>
          Welcome to<span className='text-black'>Mano<span className='text-blue-500'>Sangam<span className='text-orange-500'>.</span></span></span>
        </p>

        <div className="role-container">
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              className={`role-button ${role === r ? 'active' : ''}`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        {(role === 'Investor' || role === 'Creator') && (
          <button type="button" onClick={() => signUpWithGoogle(role)} className="oauthButton">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </button>
        )}

        {role === 'Startup/Company' && (
          <div className="startup-form">
            <input type="text" value={details.companyName} onChange={(e) => setDetails({ ...details, companyName: e.target.value })} placeholder="Company Name" className="input-field" />
            <input type="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} placeholder="Official Email" className="input-field" />
            <input type="text" value={details.website} onChange={(e) => setDetails({ ...details, website: e.target.value })} placeholder="Website (optional)" className="input-field" />

            {/* NEW Password Fields */}
            <input type="password" value={details.password} onChange={(e) => setDetails({ ...details, password: e.target.value })} placeholder="Set Password" className="input-field" />
            <input type="password" value={details.confirmPassword} onChange={(e) => setDetails({ ...details, confirmPassword: e.target.value })} placeholder="Confirm Password" className="input-field" />

            <button type="submit" disabled={loading} onClick={handleSubmit} className="submit-button">{loading ? 'Submitting...' : 'Submit'}</button>
          </div>
        )}


      </form>
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
    border-radius: 5px;
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

  .role-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
  }

  .role-button {
    padding: 0.5rem 1rem;
    border: 2px solid #323232;
    background-color: #fff;
    font-weight: 600;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
    box-shadow: 2px 2px #323232;
  }

  .role-button:hover,
  .role-button.active {
    background-color: #323232;
    color: white;
  }

  .oauthButton {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    border: 2px solid #323232;
    background-color: #fff;
    box-shadow: 4px 4px #323232;
    font-size: 1rem;
    font-weight: 600;
    color: #323232;
    cursor: pointer;
    transition: all 250ms ease;
    width: 100%;
    max-width: 300px;
  }

  .oauthButton:hover {
    background-color: #212121;
    color: #fff;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
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

    .oauthButton {
      font-size: 0.9rem;
    }

    .form > p {
      font-size: 1.25rem;
    }
  }
`;
export default Form;