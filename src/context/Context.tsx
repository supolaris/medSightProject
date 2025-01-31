import React from 'react';
import { ReactNode, createContext, useState, useContext } from 'react';

export interface ContextType {
  isInternetConnected: boolean;
  userProfileData: {
    displayName: string;
    email: string;
    photo: string;
  };
  updateUserProfileData: (data: ContextType['userProfileData']) => void;
  updateisInternetConnected: (
    value: ContextType['isInternetConnected'],
  ) => void;
}
const initialContextValue: ContextType = {
  isInternetConnected: false,
  userProfileData: {
    displayName: '',
    email: '',
    photo: '',
  },
  updateUserProfileData: () => {},
  updateisInternetConnected: () => {},
};

const userContext = createContext<ContextType>(initialContextValue);
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isInternetConnected, setisInternetConnected] = useState<
    ContextType['isInternetConnected']
  >(initialContextValue.isInternetConnected);

  const [userProfileData, setUserProfileData] = useState<
    ContextType['userProfileData']
  >(initialContextValue.userProfileData);

  const updateUserProfileData = (data: ContextType['userProfileData']) => {
    setUserProfileData(data);
  };

  const updateisInternetConnected = (
    state: ContextType['isInternetConnected'],
  ) => {
    setisInternetConnected(state);
  };

  return (
    <userContext.Provider
      value={{
        isInternetConnected,
        userProfileData,
        updateUserProfileData,
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
