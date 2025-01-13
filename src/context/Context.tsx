import React from 'react';
import { ReactNode, createContext, useState, useContext } from 'react';

export interface ContextType {
  isInternetConnected: boolean;
  updateisInternetConnected: (
    value: ContextType['isInternetConnected'],
  ) => void;
}
const initialContextValue: ContextType = {
  isInternetConnected: false,
  updateisInternetConnected: () => {},
};

const userContext = createContext<ContextType>(initialContextValue);
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isInternetConnected, setisInternetConnected] = useState<
    ContextType['isInternetConnected']
  >(initialContextValue.isInternetConnected);
  const updateisInternetConnected = (
    state: ContextType['isInternetConnected'],
  ) => {
    setisInternetConnected(state);
  };

  return (
    <userContext.Provider
      value={{
        isInternetConnected,
        updateisInternetConnected,
      }}>
      {children}
    </userContext.Provider>
  );
};
export const UserContext = () => {
  const context = useContext(userContext);
  return context;
};
