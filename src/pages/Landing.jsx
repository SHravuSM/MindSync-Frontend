// import { useAuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const Landing = () => {
//   const { user, loginWithGoogle } = useAuthContext();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white px-6 py-12 font-sans">
//       {/* Header */}
//       <header className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-3xl font-bold tracking-tight">
//           MINDSYNC<span className="text-blue-500">.</span>
//         </h1>
//         <div>
//           {user ? (
//             <Link
//               to="/dashboard"
//               className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
//             >
//               Go to Dashboard
//             </Link>
//           ) : (
//             // <button
//             //   onClick={loginWithGoogle}
//             //   className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
//             // >
//             //   Sign in with Google
//             // </button>
//             <></>
//           )}
//         </div>
//       </header>

//       {/* Hero */}
//       <section className="mt-24 text-center max-w-4xl mx-auto">
//         <h2 className="text-5xl font-extrabold leading-tight mb-6">
//           Unlock the Power of Connected Minds
//         </h2>
//         <p className="text-lg text-gray-300 mb-8">
//           MINDSYNC is your seamless entry point into a real-time,
//           cloud-connected platform powered by Firebase Auth and a secure Node.js
//           backend. Whether you're building ideas, managing users, or scaling
//           workflows — it starts here.
//         </p>
//         {!user && (
//           <button
//             onClick={loginWithGoogle}
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
//           >
//             Get Started with Google
//           </button>
//         )}
//       </section>

//       {/* Features */}
//       <section className="mt-32 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//         <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-blue-500/30 transition">
//           <h3 className="text-xl font-semibold mb-2 text-blue-400">
//             Firebase Auth
//           </h3>
//           <p className="text-gray-300">
//             Secure, scalable authentication with Google sign-in built-in.
//             Session handled automatically via interceptors.
//           </p>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-blue-500/30 transition">
//           <h3 className="text-xl font-semibold mb-2 text-blue-400">
//             Axios Interceptors
//           </h3>
//           <p className="text-gray-300">
//             Every request auto-includes a fresh Firebase ID token, keeping
//             things safe without redundant code.
//           </p>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-blue-500/30 transition">
//           <h3 className="text-xl font-semibold mb-2 text-blue-400">
//             Node.js Backend
//           </h3>
//           <p className="text-gray-300">
//             Built on Express with token validation, user sync, and extensible
//             APIs for full-stack integration.
//           </p>
//         </div>
//       </section>

//       {/* Tech Stack */}
//       <section className="mt-32 max-w-4xl mx-auto text-center">
//         <h3 className="text-2xl font-bold mb-6">Our Tech Stack</h3>
//         <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
//           <li className="bg-gray-800 px-4 py-2 rounded-full">React</li>
//           <li className="bg-gray-800 px-4 py-2 rounded-full">TailwindCSS</li>
//           <li className="bg-gray-800 px-4 py-2 rounded-full">Firebase Auth</li>
//           <li className="bg-gray-800 px-4 py-2 rounded-full">
//             Axios + Interceptors
//           </li>
//           <li className="bg-gray-800 px-4 py-2 rounded-full">
//             Express (Node.js)
//           </li>
//           <li className="bg-gray-800 px-4 py-2 rounded-full">
//             JWT Secured APIs
//           </li>
//         </ul>
//       </section>

//       {/* Footer */}
//       <footer className="mt-32 text-center text-gray-500 text-sm border-t border-gray-700 pt-8">
//         &copy; {new Date().getFullYear()} MINDSYNC. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Landing;

// import GoogleButton from "../components/GoogleButton";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useAuthContext } from "../context/AuthContext";

// const Landing = () => {
//   const { loginWithGoogle } = useAuthContext();
//   return (
//     <div>
//       <Navbar />
//       <section className="relative bg-gray-50 py-20 sm:py-20 lg:py-20">
//         {/* <HeroSection /> */}

//         <div className="max-w-3xl mx-auto flex flex-col items-center pb-4 px-6 sm:px-8 text-center">
//           <h1 className="text-xl sm:text-5xl md:text-6xl font-semibold text-gray-900 mb-5 leading-tight">
//             Welcome to <span className="text-red-500 text-[1.2em]">Yoga</span>{" "}
//             <br />
//             Wedding Invitations, Reimagined
//           </h1>

//           <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4 md:mb-5">
//             At <strong>Yoga</strong>, we help you design timeless, elegant
//             wedding invitations online and print your invitation — all from the
//             comfort of your home.
//           </p>

//           {/* <BrowseButton /> */}
//           <GoogleButton loginWithGoogle={loginWithGoogle} />
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default Landing;

import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Landing() {
  const { loginWithGoogle } = useAuthContext();
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-black flex flex-col items-center gap-2 text-white py-16 pb-10 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Mano<span className="text-blue-500">Sangam</span><span className="text-orange-400">.</span></h1>
        <p className="text-xl mb-8 italic">
          “The Gathering of Minds.”
        </p>
        {/* <button
          onClick={loginWithGoogle}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gradient-to-l transform hover:scale-110 hover:rotate-3 transition-all duration-300 ease-in-out shadow-lg relative overflow-hidden"
        >
          <span className="absolute inset-0 transition transform hover:scale-105 motion-safe:animate-bounce bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 opacity-30 animate-pulse rounded-full"></span>
          <span className="relative z-10">Drop your Idea ✨🚀</span>
        </button> */}
        <button
          onClick={loginWithGoogle}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-4 py-3 hover:bg-gradient-to-l rounded-full font-semibold hover:bg-gray-200 transition transform hover:rotate-3 motion-safe:animate-bounce"
        >
          Drop your Idea ✨
        </button>
      </section>

      {/* About */}
      <section className="py-16 pt-2 pb-0 px-6 max-w-4xl mx-auto text-center">
        <button className="px-4 py-1 my-5 border-2 rounded-sm"><Link to='/signup'>REGISTER</Link></button>
        <h2 className="text-2xl mb-4 font-sans">What is ManoSangam ?</h2>
        <p className="text-lg text-gray-600">
          Welcome to a confluence of thinkers, dreamers, and doers. Share your ideas, explore perspectives, and ignite innovation — Where minds converge, creativity flows, and innovation begins.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl mb-6 font-sans">How It Works ?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold">1. Drop Ideas</h3>
            <p className="text-gray-600 mt-2">
              Share 1 idea a day. Build a habit.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">2. Collaborate</h3>
            <p className="text-gray-600 mt-2">
              Start threads. Invite others to co-build.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">3. Get Discovered</h3>
            <p className="text-gray-600 mt-2">
              Investors, mentors, and the community engage.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 px-4">
        <p>
          &copy; {new Date().getFullYear()} ManoSangam. Built for idea warriors.
        </p>
      </footer>
    </div>
  );
}
