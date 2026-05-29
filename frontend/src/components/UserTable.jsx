import React from "react";

const UserTable = ({ users, onDelete, onRoleChange }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.name}</td>

              <td className="p-2 border">{user.role}</td>

              <td className="p-2 border space-x-2">
                <select
                  value={user.role}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                  className="border p-1"
                >
                  <option>user</option>
                  <option>owner</option>
                  <option>admin</option>
                </select>

                <button
                  onClick={() => onDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
