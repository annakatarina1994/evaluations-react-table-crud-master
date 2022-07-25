import React from 'react';

const UserTable = ({ userData }) => {
  return (
    <div>
      <table>
        <tr>
          <th></th>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
        {userData.allUsers.map((user, index) => {
          return (
            <tr key={index}>
              <input type="checkbox" />
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UserTable;
