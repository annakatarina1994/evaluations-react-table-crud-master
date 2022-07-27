import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/UserTable.css';

const UserTable = ({ userData }) => {
  const navigate = useNavigate();

  function handleRowClick(user) {
    navigate(`/user/${user.email}`);
  }

  return (
    <>
      <h1>Users</h1>
      <button disabled>Delete</button>
      <table>
        <thead>
          <tr className="tableHeader">
            <th></th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        {userData.allUsers.map((user, index) => {
          return (
            <tbody>
              <tr key={index} className="tableRows">
                <Link to={user.name} state={user} >
                  <input type="checkbox" />
                  <td className="tableRows">{user.email}</td>
                  <td className="tableRows">{user.name}</td>
                  <td className="tableRows">{user.role}</td>
                </Link>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
};

export default UserTable;
