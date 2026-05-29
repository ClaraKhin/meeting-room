import { useState } from "react";

const UserTable = ({ users, currentUserId, onCreate, onDelete, onRoleChange }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreate({ name, role });
    setName("");
    setRole("user");
  };

  return (
    <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">User Management</h2>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-3">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="User name"
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          required
        />

        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="user">user</option>
          <option value="owner">owner</option>
          <option value="admin">admin</option>
        </select>

        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Create User
        </button>
      </form>

      <table className="mt-5 w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="border border-slate-200 p-3">Name</th>
            <th className="border border-slate-200 p-3">Role</th>
            <th className="border border-slate-200 p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-slate-200 p-3">{user.name}</td>

              <td className="border border-slate-200 p-3 capitalize">
                {user.role}
              </td>

              <td className="border border-slate-200 p-3">
                <select
                  value={user.role}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                  className="mr-2 rounded border border-slate-300 px-2 py-1"
                >
                  <option value="user">user</option>
                  <option value="owner">owner</option>
                  <option value="admin">admin</option>
                </select>

                <button
                  disabled={user.id === currentUserId}
                  onClick={() => onDelete(user.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
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
