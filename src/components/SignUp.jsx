// import React from 'react';
// import styled from 'styled-components';

// const Form = () => {
//   return (
//     <StyledWrapper>
//       <form action className="form">
//         <p>
//           Welcome,<span>sign in to continue</span>
//         </p>
//         <button className="oauthButton">
//           <svg className="icon" viewBox="0 0 24 24">
//             <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//             <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//             <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
//             <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//             <path d="M1 1h22v22H1z" fill="none" />
//           </svg>
//           Continue with Google
//         </button>
//         <button className="oauthButton">
//           <svg className="icon" viewBox="0 0 24 24">
//             <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
//           </svg>
//           Continue with Github
//         </button>
//         <div className="separator">
//           <div />
//           <span>OR</span>
//           <div />
//         </div>
//         <input type="email" placeholder="Email" name="email" />
//         <button className="oauthButton">
//           Continue
//           <svg className="icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" /></svg>
//         </button>
//       </form>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   /* DEOXY Was Here */
//   .form {
//     --background: #d3d3d3;
//     --input-focus: #2d8cf0;
//     --font-color: #323232;
//     --font-color-sub: #666;
//     --bg-color: #fff;
//     --main-color: #323232;
//     padding: 20px;
//     background: var(--background);
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: center;
//     gap: 20px;
//     border-radius: 5px;
//     border: 2px solid var(--main-color);
//     box-shadow: 4px 4px var(--main-color);
//   }

//   .form > p {
//     font-family: var(--font-DelaGothicOne);
//     color: var(--font-color);
//     font-weight: 700;
//     font-size: 20px;
//     margin-bottom: 15px;
//     display: flex;
//     flex-direction: column;
//   }

//   .form > p > span {
//     font-family: var(--font-SpaceMono);
//     color: var(--font-color-sub);
//     font-weight: 600;
//     font-size: 17px;
//   }

//   .separator {
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 5px;
//   }

//   .separator > div {
//     width: 100px;
//     height: 3px;
//     border-radius: 5px;
//     background-color: var(--font-color-sub);
//   }

//   .separator > span {
//     color: var(--font-color);
//     font-family: var(--font-SpaceMono);
//     font-weight: 600;
//   }

//   .oauthButton {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 5px;
//       /* margin: 50px auto 0 auto; */
//     padding: auto 15px 15px auto;
//     width: 250px;
//     height: 40px;
//     border-radius: 5px;
//     border: 2px solid var(--main-color);
//     background-color: var(--bg-color);
//     box-shadow: 4px 4px var(--main-color);
//     font-size: 16px;
//     font-weight: 600;
//     color: var(--font-color);
//     cursor: pointer;
//     transition: all 250ms;
//     position: relative;
//     overflow: hidden;
//     z-index: 1;
//   }

//   .oauthButton::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 100%;
//     width: 0;
//     background-color: #212121;
//     z-index: -1;
//     -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
//     box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
//     transition: all 250ms;
//   }

//   .oauthButton:hover {
//     color: #e8e8e8;
//   }

//   .oauthButton:hover::before {
//     width: 100%;
//   }

//   .form > input {
//     width: 250px;
//     height: 40px;
//     border-radius: 5px;
//     border: 2px solid var(--main-color);
//     background-color: var(--bg-color);
//     box-shadow: 4px 4px var(--main-color);
//     font-size: 15px;
//     font-weight: 600;
//     color: var(--font-color);
//     padding: 5px 10px;
//     outline: none;
//   }

//   .icon {
//     width: 1.5rem;
//     height: 1.5rem;
//   }`;

// export default Form;


import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';

const Form = () => {
  const { signUpWithGoogle } = useAuthContext();
  const [role, setRole] = useState('');

  const roles = ['Creator', 'Investor'];

  return (
    <StyledWrapper>
      <form className="form">
        <p>
          Welcome,<span>Select your role to continue</span>
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

        <button onClick={() => signUpWithGoogle(role)} className="oauthButton">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Continue with Google
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
    font-weight: 700;
    font-size: 1.5rem;
    text-align: center;
    color: #323232;
  }

  .form > p > span {
    display: block;
    margin-top: 0.25rem;
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    color: #666;
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
