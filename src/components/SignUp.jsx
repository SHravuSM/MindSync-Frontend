// import { useState } from "react";
// import styled from "styled-components";
// import useAuthStore from "../store/authStore";
// import axios from "axios";

// const Form = () => {
//   const signUp = useAuthStore((s) => s.signUp);
//   const [loading, setLoading] = useState(false);
//   const [details, setDetails] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, role, email, password, confirmPassword } = details;

//     if (!email || !password || !confirmPassword) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await signUp(name, role, email, password);

//       alert("Account created successfully 🥳");

//       setDetails({
//         name: "",
//         role: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       alert(`Failed to register: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const roles = ["Creator", "Investor"];

//   return (
//     <StyledWrapper>
//       <form onSubmit={handleSubmit} className="form">
//         <p className="text-shadow-md">
//           Welcome to
//           <span className="text-black">
//             Mano
//             <span className="text-blue-500">
//               Sangam<span className="text-orange-500">.</span>
//             </span>
//           </span>
//         </p>

//         {roles.map((r) => (
//           <button
//             key={r}
//             type="button"
//             className={`role-button ${details.role === r ? "active" : ""}`}
//             onClick={() => setDetails({ ...details, role: r })}
//           >
//             {r}
//           </button>
//         ))}

//         <input
//           type="text"
//           value={details.name}
//           onChange={(e) => setDetails({ ...details, name: e.target.value })}
//           placeholder="Enter your name"
//           required
//         />
//         <input
//           type="email"
//           value={details.email}
//           onChange={(e) => setDetails({ ...details, email: e.target.value })}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={details.password}
//           onChange={(e) => setDetails({ ...details, password: e.target.value })}
//           placeholder="Password"
//           required
//         />
//         <input
//           type="password"
//           value={details.confirmPassword}
//           onChange={(e) =>
//             setDetails({ ...details, confirmPassword: e.target.value })
//           }
//           placeholder="Confirm Password"
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Signing Up..." : "Sign Up"}
//         </button>
//       </form>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
//   min-height: 100vh;
//   background-color: #f0f0f0;

//   .form {
//     background: white;
//     padding: 2rem;
//     border: 2px solid #323232;
//     box-shadow: 4px 4px #323232;
//     border-radius: 5px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 1.5rem;
//     width: 100%;
//     max-width: 400px;
//   }

//   .form > p {
//     font-family: "Dela Gothic One", sans-serif;
//     text-align: center;
//   }

//   .form > p > span {
//     display: block;
//     margin-top: 0.25rem;
//     font-family: "Space Mono", monospace;
//     font-size: 1.7rem;
//   }

//   .role-container {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0.75rem;
//     justify-content: center;
//   }

//   .role-button {
//     padding: 0.5rem 1rem;
//     border: 2px solid #323232;
//     background-color: #fff;
//     font-weight: 600;
//     cursor: pointer;
//     border-radius: 5px;
//     transition: 0.3s;
//     box-shadow: 2px 2px #323232;
//   }

//   .role-button:hover,
//   .role-button.active {
//     background-color: #323232;
//     color: white;
//   }

//   .oauthButton {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     padding: 0.75rem 1.25rem;
//     border-radius: 5px;
//     border: 2px solid #323232;
//     background-color: #fff;
//     box-shadow: 4px 4px #323232;
//     font-size: 1rem;
//     font-weight: 600;
//     color: #323232;
//     cursor: pointer;
//     transition: all 250ms ease;
//     width: 100%;
//     max-width: 300px;
//   }

//   .oauthButton:hover {
//     background-color: #212121;
//     color: #fff;
//   }

//   .icon {
//     width: 1.5rem;
//     height: 1.5rem;
//   }

//   .startup-form {
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     width: 100%;
//     max-width: 300px;
//   }

//   .input-field {
//     padding: 0.6rem 1rem;
//     border: 2px solid #323232;
//     border-radius: 5px;
//     font-size: 1rem;
//   }

//   .submit-button {
//     background-color: #323232;
//     color: white;
//     padding: 0.75rem 1.25rem;
//     border: none;
//     border-radius: 5px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s ease;
//   }

//   .submit-button:hover {
//     background-color: #000;
//   }

//   @media (max-width: 480px) {
//     .form {
//       padding: 1.5rem;
//     }

//     .oauthButton {
//       font-size: 0.9rem;
//     }

//     .form > p {
//       font-size: 1.25rem;
//     }
//   }
// `;
// export default Form;

import { useState } from "react";
import styled from "styled-components";
import useAuthStore from "../store/authStore";
import api from "../utils/api2";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate()
  const signUp = useAuthStore((s) => s.signUp);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [details, setDetails] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
  });

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    if (!details.email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      let res = await api.post("/sendverificationcode", {
        email: details.email,
      });
      setOpen(true);
      setVerified(true);
    } catch (error) {
      alert(
        `Failed to send verification code: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerified = async (e) => {
    e.preventDefault();
    if (verificationCode.length == 6) {
      const res = await api.post("/verifyverificationcode", {
        email: details.email,
        code: verificationCode,
      });
      console.log(res.data.status);
      setStatus(res.data.status);
    }
  };

  // Verify the code and proceed with registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, role, email, password } = details;

    if (!verificationCode) {
      alert("Please enter the verification code.");
      return;
    }

    if (!name || !role || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await signUp(name, role, email, password);
      alert("Account created successfully 🥳");
      // Reset form
      setDetails({
        name: "",
        role: "",
        email: "",
        password: "",
      });
      setVerificationCode("");
      navigate('/login')
    } catch (error) {
      alert(
        `Failed to register: ${error.response?.data?.message || error.message}`
      );
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

        <div className="flex">
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
        </div>

        <input
          type="text"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          placeholder="Enter your name"
          required
        />

        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-4 py-2 border-none rounded-xl shadow-sm focus:outline-none text-sm"
          />
        </div>

        <input
          type="password"
          value={details.password}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          placeholder="Password"
          required
        />

        {open && (
          <div className="flex items-center w-full gap-0.5 justify-between">
            <input
              type="text"
              className="w-6/12"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              required
            />
            {status ? (
              <ShieldCheck
                className="size-7 w-3/12 rounded-sm text-blue-500"
                size={20}
              />
            ) : (
              <button
                className="w-3/12 border p-[0.75rem] rounded-sm"
                onClick={handleVerified}
              >
                Verify
              </button>
            )}
            <button
              className="w-3/12 border p-[0.75rem] rounded-sm"
              onClick={handleEmailVerification}
            >
              Resend
            </button>
          </div>
        )}

        {!verified ? (
          <button
            onClick={handleEmailVerification}
            disabled={loading}
            className="submit-button w-full"
          >
            {loading ? "Sending Code..." : "Send email verification code"}
          </button>
        ) : status ? (
          <button
            type="submit"
            disabled={loading}
            className="w-full submit-button"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        ) : (
          <button
            disabled={loading}
            className="w-full bg-[#323232]/30 rounded-sm text-white px-[0.70rem] py-[.75rem] cursor-pointer text-[1rem]"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
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
    font-family: "Dela Gothic One", sans-serif;
    text-align: center;
  }

  .form > p > span {
    display: block;
    margin-top: 0.25rem;
    font-family: "Space Mono", monospace;
    font-size: 1.7rem;
  }

  .form h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #323232;
  }

  .step-description {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
    margin: 0;
  }

  .form input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #323232;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .form input:focus {
    outline: none;
    border-color: #0066cc;
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
    margin: 0 0.5rem;
  }

  .role-button:hover,
  .role-button.active {
    background-color: #323232;
    color: white;
  }

  .form button[type="submit"] {
    width: 100%;
    background-color: #323232;
    color: white;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }

  .form button[type="submit"]:hover:not(:disabled) {
    background-color: #000;
  }

  .form button[type="submit"]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    width: 100%;
  }

  .back-button {
    flex: 1;
    padding: 0.75rem 1.25rem;
    border: 2px solid #323232;
    background-color: white;
    color: #323232;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }

  .back-button:hover {
    background-color: #f0f0f0;
  }

  .submit-button {
    flex: 2;
    background-color: #323232;
    color: white;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }

  .submit-button:hover:not(:disabled) {
    background-color: #000;
  }

  .submit-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    .form {
      padding: 1.5rem;
    }

    .form > p {
      font-size: 1.25rem;
    }

    .button-group {
      flex-direction: column;
    }

    .back-button,
    .submit-button {
      flex: none;
    }
  }
`;

export default Form;
