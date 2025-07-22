import { useEffect, useState } from "react";

const useTheme = () => {
    const [darkMode, setDarkMode] = useState(()=>{
        return localStorage.getItem('theme') === 'dark'
    })
    useEffect(()=>{
        const root = document.documentElement;
        if(darkMode){
            root.classList.add('dark')
        }else{
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])
    return [darkMode, setDarkMode]
}
export default useTheme