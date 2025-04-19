import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 md:pt-10 pt-0 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-44 pb-10 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Yoga</h3>
            <p className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              elegant wedding invitations online and print your invitation — all
              from the comfort of your home.
            </p>
          </div>

          <div className="flex justify-evenly md:gap-20 md:justify-evenly sm:justify-evenly lg:justify-evenly">
            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase">
                Follow Us
              </h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition text-lg"
                >
                  <FaFacebookF />
                </a>
                {/* <a href="#" className="text-gray-500 hover:text-blue-400 transition text-lg">
                <FaTwitter />
              </a> */}
                <a
                  href="#"
                  className="text-gray-500 hover:text-pink-500 transition text-lg"
                >
                  <FaInstagram />
                </a>
                {/* <a href="#" className="text-gray-500 hover:text-blue-700 transition text-lg">
                <FaLinkedinIn />
              </a> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-4 pb-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Yoga. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
