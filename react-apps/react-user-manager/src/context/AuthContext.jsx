
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

const USERS_KEY = "registeredUsers";
const SESSION_KEY = "loggedInUser";

export default function AuthContextProvider({ children }) {
    const [registeredUser, setRegisteredUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        } catch {
            return [];
        }
    });

    const [loggedInUser, setLoggedInUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        localStorage.setItem(USERS_KEY, JSON.stringify(registeredUser));
    }, [registeredUser]);
    
    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(loggedInUser)
            );
        } else {
            localStorage.removeItem(SESSION_KEY);
        }
    }, [loggedInUser]);

    function addUser(user) {
        const exists = registeredUser.some(
            (val) =>
                val.email.toLowerCase() === user.email.trim().toLowerCase()
        );

        if (exists) {
            return {
                success: false,
                message: "An account with this email already exists.",
            };
        }

        const newUser = {
            ...user,
            email: user.email.trim().toLowerCase(),
        };

        setRegisteredUser((prev) => [...prev, newUser]);

        return {
            success: true,
            message: "Registration successful.",
        };
    }

    function logIn(user) {
        const email = user.email.trim().toLowerCase();

        const foundUser = registeredUser.find(
            (val) => val.email.toLowerCase() === email
        );

        if (!foundUser) {
            return {
                success: false,
                message: "No account found with this email.",
            };
        }

        if (foundUser.password !== user.password) {
            return {
                success: false,
                message: "Incorrect password.",
            };
        }

        // Do not put the password in the logged-in session
        const safeUser = {
            name: foundUser.name,
            email: foundUser.email,
        };

        setLoggedInUser(safeUser);

        return {
            success: true,
            message: "Login successful.",
        };
    }

    function logOut() {
        setLoggedInUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                registeredUser,
                loggedInUser,
                addUser,
                logIn,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthContextProvider"
        );
    }

    return context;
}
