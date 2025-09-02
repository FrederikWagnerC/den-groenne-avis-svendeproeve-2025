import { createContext, useContext, useEffect, useState } from "react";

// Opretter en Context, der kan deles på tværs af komponenter
export const AuthContext = createContext();

// Provider-komponent, der wrapper app'en og giver auth-data videre
export const AuthProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem("access_token");
            if (raw) { 
                setLoginData(JSON.parse(raw));
                
            }
        } catch (error) {
            console.error("Kunne ikke parse access_token fra sessionStorage", error);
            setLoginData(null);
        }
    }, [children]);

    return (
        <AuthContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);