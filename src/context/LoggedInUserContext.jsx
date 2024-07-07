import { createContext, useState } from "react";

export const LoggedInUserContext = createContext({
  userId: 0,
  setUserId: () => {},
  userRole: "",
  setUserRole: () => {},
});

export const LoggedInUserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(localStorage.getItem("roleCode"));
  const value = { userId, setUserId, userRole, setUserRole };

  return (
    <LoggedInUserContext.Provider value={value}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
