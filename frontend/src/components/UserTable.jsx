import { useState } from "react";

const UserTable = ({
  users,
  currentUserId,
  onCreate,
  onDelete,
  onRoleChange,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreate({ name, role });
    setName("");
    setRole("user");
  };

  return (
    <section
      className="rounded border border-slate-200 bg-white shadow-sm"
      style={{ padding: "1rem" }}
    >
      <h2 className="text-lg font-bold text-[#1d4ed8]">User Management</h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:grid-cols-3"
        style={{ marginTop: "1rem" }}
      >
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="User name"
          className="min-w-0 rounded border border-slate-300 text-sm outline-none placeholder:text-[#537ec5]"
          style={{ padding: "0.5rem" }}
          required
        />

        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="min-w-0 rounded border border-slate-300 text-sm cursor-pointer outline-none"
          style={{ padding: "0.5rem" }}
        >
          <option value="user">user</option>
          <option value="owner">owner</option>
          <option value="admin">admin</option>
        </select>

        <button
          type="submit"
          className="rounded bg-[#6730ec] text-sm font-medium text-white hover:bg-[#7984ee] cursor-pointer"
          style={{ padding: "0.5rem 1rem" }}
        >
          Create User
        </button>
      </form>

      <table
        className="block w-full overflow-x-auto border-collapse text-sm md:table"
        style={{ marginTop: "1rem" }}
      >
        <thead>
          <tr className="bg-slate-100 text-left">
            <th
              className="border border-slate-200 text-[#1d4ed8]"
              style={{ padding: "1rem" }}
            >
              Name
            </th>
            <th
              className="border border-slate-200 text-[#1d4ed8]"
              style={{ padding: "1rem" }}
            >
              Role
            </th>
            <th
              className="border border-slate-200 text-[#1d4ed8]"
              style={{ padding: "1rem" }}
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td
                className="min-w-32 border border-slate-200 text-[#537ec5] font-medium md:w-100"
                style={{ padding: "0.5rem" }}
              >
                {user.name}
              </td>

              <td
                className="min-w-28 border border-slate-200 capitalize text-[#537ec5] font-medium md:w-100"
                style={{ padding: "0.5rem" }}
              >
                {user.role}
              </td>

              <td
                className="min-w-56 border border-slate-200 text-center md:w-100 "
                style={{ padding: "0.5rem" }}
              >
                <select
                  value={user.role}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                  className=" w-full rounded border border-slate-300 cursor-pointer outline-none sm:mb-0 sm:mr-4 sm:w-40"
                  style={{
                    padding: "1rem 0.5rem",
                    marginRight: "1rem",
                  }}
                >
                  <option value="user">user</option>
                  <option value="owner">owner</option>
                  <option value="admin">admin</option>
                </select>

                <button
                  disabled={user.id === currentUserId}
                  onClick={() => onDelete(user.id)}
                  className="w-full rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer sm:w-35"
                  style={{ padding: "1rem 0.5rem" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserTable;
