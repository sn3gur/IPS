import { createContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

//create the context (the memory)
export const AuthContext = createContext();

//create the provider (the factory that produces the memory)
export const AuthProvider = ({ children }) => {
    //if they are logged in, this will hold their data
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //global login function
    const login = (userData) => {
        setUser(userData);
    };

    //global logout function
    const logout = () => {
        setUser(null);
    };

    //update the user's balance in global memory after a trade
    const updateBalance = (newBalance) => {
        if (user) {
            setUser({ ...user, availableCash: newBalance });
        }
    };

    // Check if user is already logged in on page load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await apiClient.get('/api/users/me');
                if (res.status === 200) {
                    setUser(res.data.user);
                }
            } catch (error) {
                // If not logged in, error is expected (401)
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, updateBalance, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};