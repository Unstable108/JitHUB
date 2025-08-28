import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from "react";

// 1. Create Context
export const AuthContext = createContext({});

// 2. Custom Hook for consuming
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Provider for wrapping components
// export const AuthProvider = AuthContext.Provider;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUser(userId);
    }
  }, []);

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
