import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, login as loginWithDummyJson } from "../api/authApi";

const AuthContext = createContext(null);
const TOKEN_KEY = "accessToken";

function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function saveToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // The session still works in memory when browser storage is unavailable.
  }
}

function withoutCredentials(user) {
  if (!user) return null;
  const { password, accessToken, refreshToken, ...safeUser } = user;
  return safeUser;
}

export default function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(getStoredToken);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    try {
      localStorage.removeItem("registeredUsers");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("user-data");
      localStorage.removeItem("user-data-starter-loaded");
    } catch {
      // Ignore storage cleanup failures; the app still works in memory.
    }
  }, []);

  useEffect(() => {
    if (!accessToken) {
      setLoggedInUser(null);
      setIsAuthLoading(false);
      return undefined;
    }

    let cancelled = false;
    setIsAuthLoading(true);

    getCurrentUser(accessToken)
      .then((user) => {
        if (!cancelled) setLoggedInUser(withoutCredentials(user));
      })
      .catch(() => {
        if (cancelled) return;
        saveToken(null);
        setAccessToken(null);
        setLoggedInUser(null);
      })
      .finally(() => {
        if (!cancelled) setIsAuthLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  async function logIn({ username, password }) {
    const response = await loginWithDummyJson(username.trim(), password);
    if (!response.accessToken) {
      throw new Error("DummyJSON did not return an access token.");
    }

    saveToken(response.accessToken);
    setAccessToken(response.accessToken);
    setLoggedInUser(withoutCredentials(response));
    return response;
  }

  function logOut() {
    saveToken(null);
    setAccessToken(null);
    setLoggedInUser(null);
    setIsAuthLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, loggedInUser, isAuthLoading, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }
  return context;
}
