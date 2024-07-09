import {createContext, useEffect, useState} from 'react';

export const AppContext = createContext({});
export const ContextProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    return () => {
      setUserInfo({});
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}>
      {children}
    </AppContext.Provider>
  );
};
