import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const UserTable = ({ user }) => {
  const [users, setUsers] = useState(undefined);
  const getallUsers = async () => {
    const response = await axios.get(
      `https://food-truck-api.onrender.com/api/v1/user/allusers?id=${user._id}`
    );
    const res = response.data;
    setUsers(res.users);
  };
  useEffect(() => {
    getallUsers();
  }, []);
  return (
    <div className="container mx-auto mt-8">
      {users === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">{user.createdAt}</td>
                <td className="py-2 px-4 border-b">{user.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
