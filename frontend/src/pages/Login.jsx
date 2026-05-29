import { useState } from "react";
import { useUser } from "../context/UserContext";
import { getErrorMessage, userApi } from "../services/api";

const demoUsers = [
  {
    id: import.meta.env.VITE_DEMO_ADMIN_ID,
    name: "Demo Admin",
    role: "admin",
  },
].filter((user) => user.id);

const mergeUsers = (firstUsers, secondUsers) => {
  const userMap = new Map();

  firstUsers.forEach((user) => userMap.set(user.id, user));
  secondUsers.forEach((user) => userMap.set(user.id, user));

  return Array.from(userMap.values());
};

const Login = () => {
  const { knownUsers, login, saveKnownUsers } = useUser();
  const savedUsers = knownUsers.filter(
    (user) =>
      user.id !== import.meta.env.VITE_DEMO_OWNER_ID &&
      user.id !== import.meta.env.VITE_DEMO_USER_ID &&
      user.name !== "Demo Owner" &&
      user.name !== "Demo User"
  );
  const loginUsers = mergeUsers(demoUsers, savedUsers);
  const [selectedUserId, setSelectedUserId] = useState(loginUsers[0]?.id || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginWithUserId = async (userId) => {
    if (!userId.trim()) {
      setError("User id is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await userApi.getById(userId.trim());
      const user = response.data.data;
      saveKnownUsers([user]);
      login(user);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-slate-100 px-3 py-6 sm:p-4"
      style={{ backgroundColor: "#d6e6f2" }}
    >
      <div
        className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-sm"
        style={{ backgroundColor: "#f7fbfc", padding: "1.5rem" }}
      >
        <h1
          className="text-2xl font-bold"
          style={{ color: "#1d4ed8", marginBottom: "1rem" }}
        >
          Login
        </h1>
        <p className="text-sm text-[#537ec5]">
          Choose a demo role to open the dashboard.
        </p>

        {error && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {demoUsers.length > 0 && (
          <div
            className="flex flex-col gap-2"
            style={{
              marginTop: "0.5rem",
            }}
          >
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => loginWithUserId(user.id)}
                disabled={loading}
                className="rounded border border-slate-200 text-left hover:bg-[#d6e6f2] cursor-pointer "
                style={{ padding: "0.5rem 1rem" }}
              >
                <span className="block font-semibold text-slate-900">
                  Login as {user.role}
                </span>
                <span className="text-sm text-slate-500">{user.name}</span>
              </button>
            ))}
          </div>
        )}

        {loginUsers.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <label
              className="mb-1 block text-sm font-medium text-[#537ec5]"
              style={{ marginBottom: "0.5rem" }}
              htmlFor="savedUser"
            >
              Saved Users
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                id="savedUser"
                value={selectedUserId}
                onChange={(event) => setSelectedUserId(event.target.value)}
                className="min-w-0 w-full rounded border border-slate-300 text-sm"
                style={{ padding: "0.5rem 1rem" }}
              >
                {loginUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
              <button
                onClick={() => loginWithUserId(selectedUserId)}
                disabled={loading}
                className="w-full rounded bg-[#6730ec] text-sm font-medium text-white hover:bg-[#7984ee] cursor-pointer sm:w-auto"
                style={{ padding: "0.5rem 1rem" }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
