'use client'
import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextProps {
  children: ReactNode;
}

interface ContextValue {
  username: string | undefined;
  setUsername: Dispatch<SetStateAction<string | undefined>>;
  secret: string | undefined;
  setSecret: Dispatch<SetStateAction<string | undefined>>;
}

export const Context = createContext<ContextValue | undefined>(undefined);

export const ContextProvider: React.FC<ContextProps> = (props) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [secret, setSecret] = useState<string | undefined>(undefined);

  const value: ContextValue = {
    username,
    setUsername,
    secret,
    setSecret,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
