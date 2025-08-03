import { useState } from "react";
import styled from "styled-components";
import useAuthStore from "../store/authStore";
import axios from "axios";

const Form = () => {
  const signUp = useAuthStore((s) => s.signUp);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = details;

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await signUp(details.role, details.email, details.password);

      alert("Account created successfully 🥳");

      setDetails({
        role: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(`Failed to register: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const roles = ["Creator", "Investor"];

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} className="form">
        <p className="text-shadow-md">
          Welcome to
          <span className="text-black">
            Mano
            <span className="text-blue-500">
              Sangam<span className="text-orange-500">.</span>
            </span>
          </span>
        </p>

        {roles.map((r) => (
          <button
            key={r}
            type="button"
            className={`role-button ${details.role === r ? "active" : ""}`}
            onClick={() => setDetails({ ...details, role: r })}
          >
            {r}
          </button>
        ))}

        <input
          type="email"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={details.password}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={details.confirmPassword}
          onChange={(e) =>
            setDetails({ ...details, confirmPassword: e.target.value })
          }
          placeholder="Confirm Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
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
    font-family: "Dela Gothic One", sans-serif;
    text-align: center;
  }

  .form > p > span {
    display: block;
    margin-top: 0.25rem;
    font-family: "Space Mono", monospace;
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
