// import useThemeStore from "../store/themeStore";
// import DarkModeToggle from "./DarkModeToggle";
// const Navbar = () => {
//   const dark = useThemeStore(e=>e.dark);
//   return (
//     <header
//       className={`${dark ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-between px-5 font-normal text-3xl lg:text-4xl w-full shadow-md`}
//     >
//       <div></div>
//       <h1 className="text-center p-3 pt-0">
//         Mano
//         <span className="text-blue-500">Sangam</span>
//         <span className="text-5xl text-orange-500">.</span>
//       </h1>
//       <DarkModeToggle />
//     </header>
//   );
// };

// export default Navbar;

import useThemeStore from "../store/themeStore";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const dark = useThemeStore((e) => e.dark);
  return (
    <header
      className={`${
        dark ? "bg-black text-white border-b-[0.1px] border-white/20" : "bg-white text-black border-none border-gray-200"
      } flex items-center justify-between px-5 text-3xl lg:text-4xl py-1 w-full lg:py-3 lg:pt-1 `}
    >
      <div className="w-16 flex justify-start">
        {/* Left spacer - adjust width as needed */}
      </div>

      <div className="flex-1 flex justify-center">
        <h1 className="text-center">
          Mano
          <span className="text-blue-500">Sangama</span>
          <span className="lg:text-4xl text-orange-500">.</span>
        </h1>
      </div>

      <div className="w-16 flex justify-end">
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
