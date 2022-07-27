import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/UserTable.css';

const UserTable = ({ userData }) => {

  return (
    <>
      <h1>Users</h1>
      <button disabled>Delete</button>
      <table className='userTable'>
        <thead>
          <tr className="tableHeader">
            <th></th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userData.allUsers.map((user, index) => {
            return (
              <Link key={index} to={user.name} state={user}>
                <tr key={index} className="tableRows">
                  <input type="checkbox" />
                  <td className="tableRows">{user.email}</td>
                  <td className="tableRows">{user.name}</td>
                  <td className="tableRows">{user.role}</td>
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
