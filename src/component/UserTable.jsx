import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../style/UserTable.style';

const UserTable = ({ userData }) => {
  const navigate = useNavigate();

  function handleRowClick() {
    navigate('/userDetails');
  }

  return (
    <>
      <h1>Users</h1>
      <button disabled>Delete</button>
      <Table>
        <tr>
          <th></th>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
        {userData.allUsers.map((user, index) => {
          return (
            <tr key={index} onClick={handleRowClick}>
              <input type="checkbox" />
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          );
        })}
      </Table>
    </>
  );
};

export default UserTable;
