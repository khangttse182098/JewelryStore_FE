import { createContext, useState } from "react";

export const LoggedInUserContext = createContext({
  userId: 0,
  setUserId: () => {},
});

export const LoggedInUserProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const value = { userId, setUserId };

  return (
    <LoggedInUserContext.Provider value={value}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
