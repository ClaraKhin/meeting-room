import { useCallback, useMemo, useState } from "react";
import { UserContext } from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const readStoredUser = () => {
  const storedUser = localStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const readKnownUsers = () => {
  const storedUsers = localStorage.getItem("knownUsers");
  return storedUsers ? JSON.parse(storedUsers) : [];
};

function App() {
  const [currentUser, setCurrentUser] = useState(readStoredUser);
  const [knownUsers, setKnownUsers] = useState(readKnownUsers);

  const login = useCallback((user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }, []);

  const saveKnownUsers = useCallback((users) => {
    setKnownUsers((oldUsers) => {
      const userMap = new Map(oldUsers.map((user) => [user.id, user]));

      users.forEach((user) => {
        userMap.set(user.id, user);
      });

      const nextUsers = Array.from(userMap.values());
      localStorage.setItem("knownUsers", JSON.stringify(nextUsers));
      return nextUsers;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      knownUsers,
      login,
      logout,
      saveKnownUsers,
    }),
    [currentUser, knownUsers, login, logout, saveKnownUsers]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {currentUser ? <Dashboard /> : <Login />}
    </UserContext.Provider>
  );
}

export default App;
