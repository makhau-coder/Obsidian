import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

// Decode JWT payload without a library
function decodeToken(token) {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || null);
    const [currentUser, setCurrentUser]  = useState(() => {
        const t = localStorage.getItem("accessToken");
        return t ? decodeToken(t) : null;
    });

    // Persist token & decode user whenever it changes
    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            setCurrentUser(decodeToken(accessToken));
        } else {
            localStorage.removeItem("accessToken");
            setCurrentUser(null);
        }
    }, [accessToken]);

    const saveToken = useCallback((token) => {
        setAccessToken(token);
    }, []);

    const clearAuth = useCallback(() => {
        setAccessToken(null);
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, currentUser, saveToken, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
