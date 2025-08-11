import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-black flex flex-col items-center gap-2 text-white py-16 pb-5 px-6 text-center">
        <h1 className="text-5xl font-normal mb-4">
          Mano<span className="text-blue-500">Sangam</span>
          <span className="text-orange-400">.</span>
        </h1>
        <p className="text-xl mb-8 italic">“The Gathering of Minds.”</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-6">
          {/* Register Button */}

          {/* Login with Google Button */}
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
            Register
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="py-16 pt-5 pb-0 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl mb-4 font-sans">What is ManoSangam ?</h2>
        <p className="text-lg text-gray-600">
          Welcome to a confluence of thinkers, dreamers, and doers. Share your
          ideas, explore perspectives, and ignite innovation — Where minds
          converge, creativity flows, and innovation begins.
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
