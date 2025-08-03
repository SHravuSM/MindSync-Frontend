import useThemeStore from "../store/themeStore";

export default function ModeSwitch() {
  
  const dark = useThemeStore((s) => s.dark);
  const setDark = useThemeStore((s) => s.setDark);
  const toggleTheme = () => setDark();

  return (
    <button onClick={toggleTheme} className="text-lg">
      {dark ? "🌞" : "🌙"}
    </button>
  );
}
