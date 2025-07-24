import { useEffect, useState } from "react";

const useTheme = () => {
    const [darkMode, setDarkMode] = useState(()=>{
        return localStorage.getItem('theme') === 'dark'
    })
    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);
    return [darkMode, setDarkMode]
}
export default useTheme