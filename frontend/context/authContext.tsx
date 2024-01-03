// import React, {
//   createContext,
//   useEffect,
//   useReducer,
//   ReactNode,
//   Dispatch,
//   useContext,
// } from "react";
// import AuthReducer from "./authReducer";

// import { User } from "../types/interfaces"; // Adjust the path as needed

// interface AuthState {
//   user: User | null;
//   isFetching: boolean;
//   error: boolean;
// }

// interface AuthContextProps {
//   user: User | null;
//   isFetching: boolean;
//   error: boolean;
//   dispatch: Dispatch<{ type: string; payload?: any }>;
// }

// interface AuthContextProviderProps {
//   children: ReactNode;
// }

// const userFromLocalStorage = localStorage.getItem("user");
// let user = null;

// try {
//   user = userFromLocalStorage
//     ? (JSON.parse(userFromLocalStorage) as User)
//     : null;
// } catch (error) {
//   console.error("Error parsing user data from localStorage:", error);
//   // You can choose to handle the error in a way that makes sense for your application
// }

// const INITIAL_STATE: AuthState = {
//   user,
//   isFetching: false,
//   error: false,
// };

// export const AuthContext = createContext<AuthContextProps | undefined>(
//   undefined
// );

// export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
//   children,
// }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.user));
//   }, [state.user]);

//   const contextValue: AuthContextProps = {
//     user: state.user,
//     isFetching: state.isFetching,
//     error: state.error,
//     dispatch,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };
"use client";
import { User } from "../types/interfaces"; // Adjust the path as needed
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextProps {
  user: User; // Adjust the type according to your user data structure
}
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const authenticatedUser = localStorage.getItem("authenticatedUser");

    setUser(authenticatedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
