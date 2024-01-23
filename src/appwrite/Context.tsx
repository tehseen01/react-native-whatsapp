import React, {FC, PropsWithChildren} from 'react';
import AuthService from './auth';
import {Models} from 'appwrite';

type ContextProps = {
  appwrite: AuthService;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.User<Models.Preferences> | null;
  setUser: React.Dispatch<
    React.SetStateAction<Models.User<Models.Preferences> | null>
  >;
};

const AppwriteContext = React.createContext<ContextProps>({
  appwrite: new AuthService(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [user, setUser] =
    React.useState<Models.User<Models.Preferences> | null>(null);

  return (
    <AppwriteContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        appwrite: new AuthService(),
      }}>
      {children}
    </AppwriteContext.Provider>
  );
};

const useAppwrite = () => {
  const context = React.useContext(AppwriteContext);
  if (context === undefined) {
    throw new Error('useAppwrite must be used within a AppwriteProvider');
  }
  return context;
};

export {AppwriteProvider};
export default useAppwrite;
