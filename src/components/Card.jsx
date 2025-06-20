// import styled from 'styled-components';

// const Card = () => {
//     return (
//         <StyledWrapper>
//             <div className="card">
//                 <div className="body">
//                     <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In massa ipsum, laoreet quis mollis nec, feugiat in dui. Suspendisse et enim pretium, ullamcorper enim laoreet.</p><span className="username">from: @Yaya12085</span>
//                     <div className="footer">
//                         <div>
//                             <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z" /> </g></svg>18</div>
//                             <div><svg fill="#000000" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-2.5 0 32 32"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path fill="#000000" d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001zM1.729 10.039l6.032-6.033c0.385 1.122 0.090 2.319 0.086 2.334l-0.080 0.314 0.245 0.214c7.409 6.398 8.631 7.39 8.992 7.546l-0.002 0.006 0.195 0.058 0.185-0.087c2.257-1.079 4.903-1.378 7.343-0.836l-13.482 13.481c-0.55-2.47-0.262-5.045 0.837-7.342l0.104-0.218-0.098-0.221-0.031 0.013c-0.322-0.632-1.831-2.38-7.498-8.944l-0.185-0.215-0.282 0.038c-0.338 0.045-0.668 0.069-0.981 0.069-0.595 0-1.053-0.083-1.38-0.176z"> </path> </g></svg>7</div>
//                             <div><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path opacity="0.1" d="M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z" fill="#323232" /> <path opacity="0.1" d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" fill="#323232" /> <path opacity="0.1" d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z" fill="#323232" /> <path d="M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z" strokeWidth={2} /> <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" strokeWidth={2} /> <path d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z" strokeWidth={2} /> <path d="M8.7207 10.6397L15.0001 7.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M8.70605 13.353L15 16.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g></svg>2</div>
//                         </div>
//                         <div className="viewer">
//                             <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path strokeWidth={2} stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" /> <path strokeLinecap="round" strokeWidth={2} stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" /> </g></svg></span>
//                             <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path strokeWidth={2} stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" /> <path strokeLinecap="round" strokeWidth={2} stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" /> </g></svg></span>
//                             <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path strokeWidth={2} stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" /> <path strokeLinecap="round" strokeWidth={2} stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" /> </g></svg></span>
//                             <span>+20</span>
//                         </div>
//                     </div>
//                 </div></div>
//         </StyledWrapper>
//     );
// }

// const StyledWrapper = styled.div`
//   .card {
//     position: relative;
//     background-color: #30344c;
//     padding: 1em;
//     z-index: 5;
//     box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.3);
//     border-radius: 10px;
//     max-width: 300px;
//     transition: 200ms ease-in-out;
//   }

//   .username {
//     color: #C6E1ED;
//     font-size: 0.85em;
//     font-weight: 600;
//   }

//   .body {
//     display: flex;
//     flex-direction: column;
//   }

//   .body .text {
//     margin: 0 10px 0 0;
//     white-space: pre-line;
//     color: #c0c3d7;
//     font-weight: 400;
//     line-height: 1.5;
//     margin-bottom: 4px;
//   }

//   .footer {
//     position: relative;
//     width: 100%;
//     color: #9fa4aa;
//     font-size: 12px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border: none;
//     margin-top: 10px;
//   }

//   .footer div {
//     margin-right: 1rem;
//     height: 20px;
//     display: flex;
//     align-items: center;
//     cursor: pointer;
//   }

//   .footer svg {
//     margin-right: 5px;
//     height: 100%;
//     stroke: #9fa4aa;
//   }

//   .viewer span {
//     height: 20px;
//     width: 20px;
//     background-color: rgb(28, 117, 219);
//     margin-right: -6px;
//     border-radius: 50%;
//     border: 1px solid #fff;
//     display: grid;
//     align-items: center;
//     text-align: center;
//     font-weight: bold;
//     font-size: 8px;
//     color: #fff;
//     padding: 2px;
//   }

//   .viewer span svg {
//     stroke: #fff;
//   }`;

// export default Card;


// import styled from 'styled-components';

// const Card = () => {
//   return (
//     <StyledWrapper>
//       <div className="card">
//         <div className="body">
//           <p className="text">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. In massa ipsum, laoreet quis mollis nec, feugiat in dui. Suspendisse et enim pretium, ullamcorper enim laoreet.
//           </p>
//           <span className="username">from: @Yaya12085</span>
//           <div className="footer">
//             <div>
//               <div>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <g strokeWidth={0} id="SVGRepo_bgCarrier" />
//                   <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
//                   <g id="SVGRepo_iconCarrier">
//                     <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z" />
//                   </g>
//                 </svg>
//                 18
//               </div>
//               <div>
//                 <svg fill="#000000" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-2.5 0 32 32">
//                   <g strokeWidth={0} id="SVGRepo_bgCarrier" />
//                   <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
//                   <g id="SVGRepo_iconCarrier">
//                     <g id="icomoon-ignore"></g>
//                     <path fill="#000000" d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001zM1.729 10.039l6.032-6.033c0.385 1.122 0.090 2.319 0.086 2.334l-0.080 0.314 0.245 0.214c7.409 6.398 8.631 7.39 8.992 7.546l-0.002 0.006 0.195 0.058 0.185-0.087c2.257-1.079 4.903-1.378 7.343-0.836l-13.482 13.481c-0.55-2.47-0.262-5.045 0.837-7.342l0.104-0.218-0.098-0.221-0.031 0.013c-0.322-0.632-1.831-2.38-7.498-8.944l-0.185-0.215-0.282 0.038c-0.338 0.045-0.668 0.069-0.981 0.069-0.595 0-1.053-0.083-1.38-0.176z"></path>
//                   </g>
//                 </svg>
//                 7
//               </div>
//               <div>
//                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <g id="SVGRepo_bgCarrier" strokeWidth={0} />
//                   <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
//                   <g id="SVGRepo_iconCarrier">
//                     <path opacity="0.1" d="M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z" fill="#323232" />
//                     <path opacity="0.1" d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" fill="#323232" />
//                     <path opacity="0.1" d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z" fill="#323232" />
//                     <path d="M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z" strokeWidth={2} />
//                     <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" strokeWidth={2} />
//                     <path d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z" strokeWidth={2} />
//                     <path d="M8.7207 10.6397L15.0001 7.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                     <path d="M8.70605 13.353L15 16.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                   </g>
//                 </svg>
//                 2
//               </div>
//             </div>
//             <div className="viewer">
//               <span>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <g strokeWidth={0} id="SVGRepo_bgCarrier" />
//                   <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
//                   <g id="SVGRepo_iconCarrier">
//                     <path strokeWidth={2} stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" />
//                     <path strokeLinecap="round" strokeWidth={2} stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" />
//                   </g>
//                 </svg>
//               </span>
//               <span>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <g strokeWidth={0} id="SVGRepo_bgCarrier" />
//                   <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
//                   <g id="SVGRepo_iconCarrier">
//                     <path strokeWidth={2} stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" />
//                     <path strokeLinecap="round" strokeWidth={2} stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" />
//                   </g>
//                 </svg>
//               </span>
//               <span>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <g strokeWidth={0} id="SVGRepo_bgCarrier" />
//                   <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
//                   <g id="SVGRepo_iconCarrier">
//                     <path strokeWidth={2} stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" />
//                     <path strokeLinecap="round" strokeWidth={2} stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" />
//                   </g>
//                 </svg>
//               </span>
//               <span>+20</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </StyledWrapper>
//   );
// }

// // const StyledWrapper = styled.div`
// //   .card {
// //     position: relative;
// //     background-color: #30344c;
// //     padding: 1em;
// //     z-index: 5;
// //     box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.3);
// //     border-radius: 10px;
// //     max-width: 300px;
// //     transition: 200ms ease-in-out;
// //   }

// //   .username {
// //     color: #C6E1ED;
// //     font-size: 0.85em;
// //     font-weight: 600;
// //   }

// //   .body {
// //     display: flex;
// //     flex-direction: column;
// //   }

// //   .body .text {
// //     margin: 0 10px 0 0;
// //     white-space: pre-line;
// //     color: #c0c3d7;
// //     font-weight: 400;
// //     line-height: 1.5;
// //     margin-bottom: 4px;
// //   }

// //   .footer {
// //     position: relative;
// //     width: 100%;
// //     color: #9fa4aa;
// //     font-size: 12px;
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     border: none;
// //     margin-top: 10px;
// //   }

// //   .footer div {
// //     margin-right: 1rem;
// //     height: 20px;
// //     display: flex;
// //     align-items: center;
// //     cursor: pointer;
// //   }

// //   .footer svg {
// //     margin-right: 5px;
// //     height: 100%;
// //     stroke: #9fa4aa;
// //   }

// //   .viewer span {
// //     height: 20px;
// //     width: 20px;
// //     background-color: rgb(28, 117, 219);
// //     margin-right: -6px;
// //     border-radius: 50%;
// //     border: 1px solid #fff;
// //     display: grid;
// //     align-items: center;
// //     text-align: center;
// //     font-weight: bold;
// //     font-size: 8px;
// //     color: #fff;
// //     padding: 2px;
// //   }

// //   .viewer span svg {
// //     stroke: #fff;
// //   }
// // `;

// const StyledWrapper = styled.div`
//   .card {
//     position: relative;
//     background-color: #30344c;
//     padding: 1.25em 1em;           /* Slightly more padding */
//     z-index: 5;
//     box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.3);
//     border-radius: 10px;
//     max-width: 350px;              /* a bit wider on desktop */
//     width: 90vw;                  /* responsive width, max 350px */
//     margin: 1rem auto;            /* center horizontally with some vertical spacing */
//     transition: 200ms ease-in-out;
//   }

//   .username {
//     color: #C6E1ED;
//     font-size: 0.85em;
//     font-weight: 600;
//   }

//   .body {
//     display: flex;
//     flex-direction: column;
//   }

//   .body .text {
//     margin: 0 10px 0 0;
//     white-space: pre-line;
//     color: #c0c3d7;
//     font-weight: 400;
//     line-height: 1.5;
//     margin-bottom: 6px;
//     font-size: 1rem;
//     word-break: break-word;      /* wrap long text on mobile */
//   }

//   .footer {
//     width: 100%;
//     color: #9fa4aa;
//     font-size: 12px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-top: 12px;
//   }

//   .footer > div:first-child {
//     display: flex;
//     gap: 1.25rem;                /* space between icons/text groups */
//   }

//   .footer div > div {
//     display: flex;
//     align-items: center;
//     cursor: pointer;
//     height: 20px;
//     color: #9fa4aa;
//     font-size: 12px;
//   }

//   .footer svg {
//     margin-right: 6px;
//     height: 16px;
//     width: 16px;
//     stroke: #9fa4aa;
//     flex-shrink: 0;
//   }

//   .viewer {
//     display: flex;
//     align-items: center;
//   }

//   .viewer span {
//     height: 20px;
//     width: 20px;
//     background-color: rgb(28, 117, 219);
//     margin-right: -6px;
//     border-radius: 50%;
//     border: 1px solid #fff;
//     display: grid;
//     place-items: center;
//     font-weight: bold;
//     font-size: 8px;
//     color: #fff;
//     padding: 2px;
//     flex-shrink: 0;
//   }

//   .viewer span svg {
//     stroke: #fff;
//     height: 12px;
//     width: 12px;
//   }

//   /* === Responsive adjustments === */

//   @media (max-width: 600px) {
//     .card {
//       max-width: 95vw;
//       padding: 1em 0.75em;
//     }

//     .body .text {
//       font-size: 0.9rem;
//       margin-right: 0;
//     }

//     .footer {
//       font-size: 11px;
//       flex-direction: column;
//       align-items: flex-start;
//       gap: 8px;
//     }

//     .footer > div:first-child {
//       gap: 0.75rem;
//       margin-bottom: 6px;
//     }

//     .footer div > div {
//       font-size: 11px;
//       height: 18px;
//     }

//     .footer svg {
//       height: 14px;
//       width: 14px;
//       margin-right: 4px;
//     }

//     .viewer {
//       justify-content: flex-start;
//       gap: 4px;
//     }

//     .viewer span {
//       height: 18px;
//       width: 18px;
//       font-size: 7px;
//       margin-right: -5px;
//       padding: 1.5px;
//     }

//     .viewer span svg {
//       height: 10px;
//       width: 10px;
//     }
//   }

//   @media (min-width: 1024px) {
//     .card {
//       max-width: 400px;
//       padding: 1.5em 1.25em;
//     }

//     .body .text {
//       font-size: 1.1rem;
//     }

//     .footer {
//       font-size: 13px;
//     }

//     .footer div > div {
//       height: 22px;
//       font-size: 13px;
//     }

//     .footer svg {
//       height: 18px;
//       width: 18px;
//       margin-right: 7px;
//     }

//     .viewer span {
//       height: 22px;
//       width: 22px;
//       font-size: 9px;
//       padding: 3px;
//       margin-right: -7px;
//     }

//     .viewer span svg {
//       height: 14px;
//       width: 14px;
//     }
//   }
// `;

// export default Card;

const Card = () => {
  return (
    <div className="max-w-sm w-full mb-4">
      <div
        className="relative text-[#2e2e2f] bg-white p-4 rounded-lg shadow hover:shadow-md border-3 border-dashed border-transparent hover:border-[#a2b3cf33] cursor-move"
        draggable="true"
      >
        {/* Tags & Options */}
        <div className="flex items-center justify-between w-full">
          <span className="rounded-full px-3 py-1 text-xs text-white bg-blue-500">Draggable</span>
          <button className="bg-transparent border-0 text-gray-400 text-lg">
            <svg viewBox="0 0 41.915 41.916" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-[#9fa4aa]">
              <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585 C8.705,15.371,11.214,17.874,11.214,20.956z" />
              <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585 C24.056,15.371,26.564,17.874,26.564,20.956z" />
              <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585 C39.406,15.371,41.915,17.874,41.915,20.956z" />
            </svg>
          </button>
        </div>

        {/* Text */}
        <p className="text-sm mt-4 mb-4">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web
          designs. The passage is attributed to an unknown
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-[#9fa4aa]">
          <div className="flex gap-4">
            <div className="flex items-center cursor-pointer">
              <svg className="w-4 h-4 mr-1 stroke-[#9fa4aa]" viewBox="0 0 24 24" fill="none">
                <path d="M12 8V12L15 15" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
              </svg>
              Feb 24
            </div>

            <div className="flex items-center cursor-pointer">
              <svg className="w-4 h-4 mr-1 stroke-[#9fa4aa]" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              18
            </div>

            <div className="flex items-center cursor-pointer">
              <svg className="w-4 h-4 mr-1" viewBox="-2.5 0 32 32" fill="#000000">
                <path d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001z" />
              </svg>
              7
            </div>
          </div>

          {/* Viewers */}
          <div className="flex items-center">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <span
                  key={idx}
                  className="h-[30px] w-[30px] rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold border border-white -mr-2"
                >
                  <svg
                    className="w-4 h-4 stroke-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                      strokeWidth="2"
                    />
                    <path
                      d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ))}
            <span className="h-[30px] w-[30px] rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold border border-white">
              +20
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
