import useThemeStore from "../store/themeStore";
import DarkModeToggle from "./DarkModeToggle";
const Navbar = () => {
  const dark = useThemeStore(e=>e.dark);
  return (
    <header
      className={`${dark ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-between px-5 font-normal text-3xl lg:text-4xl w-full shadow-md`}
    >
      <div></div>
      <h1 className="text-center p-3 pt-0">
        Mano
        <span className="text-blue-500">Sangam</span>
        <span className="text-5xl text-orange-500">.</span>
      </h1>
      <DarkModeToggle />
    </header>
  );
};

export default Navbar;
