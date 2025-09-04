import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    // Check for existing token on app initialization
    useEffect(() => {
        const storedToken = sessionStorage.getItem('access_token');
        if (storedToken) {
            try {
                const parsedToken = JSON.parse(storedToken);
                setLoginData(parsedToken);
            } catch (error) {
                console.error('Error parsing stored token:', error);
                sessionStorage.removeItem('access_token');
            }
        }
        setLoading(false);
    }, []);

    // Custom logout function that clears both state and storage
    const logout = () => {
        setLoginData(null);
        sessionStorage.removeItem('access_token');
    };

    const value = {
        loginData,
        setLoginData,
        logout,
        loading,
        isLoggedIn: !!loginData
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};