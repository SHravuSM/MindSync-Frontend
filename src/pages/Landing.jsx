// import { Link } from "react-router-dom";

// export default function Landing() {
//   return (
//     <div className="font-sans text-gray-800">
//       {/* Hero Section */}
//       <section className="bg-black flex flex-col items-center gap-2 text-white py-16 pb-5 px-6 text-center">
//         <h1 className="text-5xl font-normal mb-4">
//           Mano<span className="text-blue-500">Sangama</span>
//           <span className="text-orange-400">.</span>
//         </h1>
//         <p className="text-xl mb-8 italic">“The Gathering of Minds.”</p>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-6">
//           {/* Register Button */}

//           {/* Login with Google Button */}
//           <Link
//             to="/login"
//             className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-3 hover:bg-gradient-to-l rounded-full font-semibold hover:bg-gray-200 transition transform hover:rotate-3 motion-safe:animate-bounce"
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
//           >
//             Register
//           </Link>
//         </div>
//       </section>

//       {/* About */}
//       <section className="py-16 pt-5 pb-0 px-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-2xl mb-4 font-sans">What is ManoSangama ?</h2>
//         <p className="text-lg text-gray-600">
//           Welcome to a confluence of thinkers, dreamers, and doers. Share your
//           ideas, explore perspectives, and ignite innovation — Where minds
//           converge, creativity flows, and innovation begins.
//         </p>
//       </section>

//       {/* How It Works */}
//       <section className="py-16 px-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-2xl mb-6 font-sans">How It Works ?</h2>
//         <div className="grid sm:grid-cols-3 gap-6">
//           <div>
//             <h3 className="text-xl font-semibold">1. Drop Ideas</h3>
//             <p className="text-gray-600 mt-2">
//               Share 1 idea a day. Build a habit.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold">2. Collaborate</h3>
//             <p className="text-gray-600 mt-2">
//               Start threads. Invite others to co-build.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold">3. Get Discovered</h3>
//             <p className="text-gray-600 mt-2">
//               Investors, mentors, and the community engage.
//             </p>
//           </div>
//         </div>
//       </section>
//       {/* Footer */}
//       <footer className="bg-gray-900 text-white text-center py-4 px-4">
//         <p>
//           &copy; {new Date().getFullYear()} ManoSangama. Built for idea warriors.
//         </p>
//       </footer>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";
// import { useEffect } from "react";

// export default function Landing() {
//   useEffect(() => {
//     // 🔹 Update title & description dynamically
//     document.title = "ManoSangama - The Gathering of Minds";
//     const descTag = document.querySelector('meta[name="description"]');
//     if (descTag) {
//       descTag.setAttribute(
//         "content",
//         "Join ManoSangama - a confluence of thinkers, dreamers, and doers. Share your ideas, collaborate, and ignite innovation."
//       );
//     }

//     // 🔹 Add JSON-LD structured data for Google
//     const script = document.createElement("script");
//     script.type = "application/ld+json";
//     script.innerHTML = JSON.stringify({
//       "@context": "https://schema.org",
//       "@type": "WebSite",
//       name: "ManoSangama",
//       url: "https://manosangama.in",
//       description:
//         "The Gathering of Minds – a place where ideas meet collaboration and innovation.",
//       publisher: {
//         "@type": "Organization",
//         name: "ManoSangama",
//       },
//     });
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="font-sans text-gray-800">
//       {/* Hero Section */}
//       <section className="bg-black flex flex-col items-center gap-2 text-white py-16 pb-5 px-6 text-center">
//         <h1 className="text-5xl font-normal mb-4">
//           Mano<span className="text-blue-500">Sangama</span>
//           <span className="text-orange-400">.</span>
//         </h1>
//         <p className="text-xl mb-8 italic">“The Gathering of Minds.”</p>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-6">
//           {/* Login Button */}
//           <Link
//             to="/login"
//             className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-3 hover:bg-gradient-to-l rounded-full font-semibold hover:bg-gray-200 transition transform hover:rotate-3 motion-safe:animate-bounce"
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
//           >
//             Register
//           </Link>
//         </div>
//       </section>

//       {/* About */}
//       <section className="py-16 pt-5 pb-0 px-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-2xl mb-4 font-sans">What is ManoSangama ?</h2>
//         <p className="text-lg text-gray-600">
//           Welcome to a confluence of thinkers, dreamers, and doers. Share your
//           ideas, explore perspectives, and ignite innovation — Where minds
//           converge, creativity flows, and innovation begins.
//         </p>
//       </section>

//       {/* How It Works */}
//       <section className="py-16 px-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-2xl mb-6 font-sans">How It Works ?</h2>
//         <div className="grid sm:grid-cols-3 gap-6">
//           <div>
//             <h3 className="text-xl font-semibold">1. Drop Ideas</h3>
//             <p className="text-gray-600 mt-2">
//               Share 1 idea a day. Build a habit.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold">2. Collaborate</h3>
//             <p className="text-gray-600 mt-2">
//               Start threads. Invite others to co-build.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold">3. Get Discovered</h3>
//             <p className="text-gray-600 mt-2">
//               Investors, mentors, and the community engage.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white text-center py-4 px-4">
//         <p>
//           &copy; {new Date().getFullYear()} ManoSangama. Built for idea warriors.
//         </p>
//       </footer>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Landing() {
  useEffect(() => {
    // 🔹 Update title & description dynamically
    document.title = "ManoSangama - The Gathering of Minds";
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute(
        "content",
        "Share ideas, collaborate with innovators, and build solutions together. Join India's community of creators and entrepreneurs."
      );
    }

    // 🔹 Add JSON-LD structured data for Google
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ManoSangama",
      url: "https://manosangama.in",
      description:
        "The Gathering of Minds – where ideas meet collaboration and innovation.",
      publisher: {
        "@type": "Organization",
        name: "ManoSangama",
      },
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-black flex flex-col items-center gap-2 text-white py-16 pb-5 px-6 text-center">
        <h1 className="text-5xl font-normal mb-4">
          Mano<span className="text-blue-500">Sangama</span>
          <span className="text-orange-400">.</span>
        </h1>
        <p className="text-xl mb-8 italic">"The Gathering of Minds."</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-6">
          {/* Login Button */}
          <Link
            to="/login"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-3 hover:bg-gradient-to-l rounded-full font-semibold hover:bg-gray-200 transition transform hover:rotate-3 motion-safe:animate-bounce"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="py-16 pt-5 pb-0 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl mb-4 font-sans">What is ManoSangama ?</h2>
        <p className="text-lg text-gray-600">
          A platform where innovators share ideas, find collaborators, and build
          solutions together. Connect with entrepreneurs, creators, and thinkers
          across industries to turn concepts into reality.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl mb-6 font-sans">How It Works ?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold">1. Share Ideas</h3>
            <p className="text-gray-600 mt-2">
              Post your ideas and get feedback from the community. Build a habit
              of daily innovation.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">2. Collaborate</h3>
            <p className="text-gray-600 mt-2">
              Find co-founders, partners, and team members. Work together on
              projects that matter.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">3. Get Noticed</h3>
            <p className="text-gray-600 mt-2">
              Connect with investors, mentors, and customers. Turn your ideas
              into successful ventures.
            </p>
          </div>
        </div>
      </section>

      {/* Why ManoSangama */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl mb-6 font-sans">Why ManoSangama ?</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3">Build Faster</h3>
            <p className="text-gray-600">
              Validate ideas quickly with community feedback. Skip the guesswork
              and build what people want.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3">Find Your Team</h3>
            <p className="text-gray-600">
              Connect with complementary skills. Technical, business, and
              creative minds working together.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3">Get Funding</h3>
            <p className="text-gray-600">
              Access investors and mentors actively looking for innovative
              solutions and promising teams.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3">Join Community</h3>
            <p className="text-gray-600">
              Be part of India's growing innovation ecosystem. Learn, share, and
              grow with fellow entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="py-16 px-6 max-w-4xl mx-auto text-center bg-gray-50">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">500+</div>
            <div className="text-gray-600">Ideas Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">50+</div>
            <div className="text-gray-600">Startups Launched</div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 px-4">
        <p>
          &copy; {new Date().getFullYear()} ManoSangama. Built for innovators.
        </p>
      </footer>
    </div>
  );
}
