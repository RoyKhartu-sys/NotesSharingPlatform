import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const checkAuth = async () => {
        try {
            const response = await fetch("/me", {
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        checkAuth();
    }, []);
    const logout = async () => {
        try {
            const response = await fetch("/logout", {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                setUser(null);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                checkAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}