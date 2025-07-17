import { useAuthStore } from '../context/AuthContext';

export default function ModeSwitch() {
    const { dark, setDark } = useAuthStore();
    const toggleTheme = () =>
        setDark(prev => !prev);

    return (
        <button
            onClick={toggleTheme}
            className='text-lg'
        >
            {dark ? '🌞' : '🌙'}
        </button>
    );
}