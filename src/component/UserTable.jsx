import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import '../style/UserTable.css';

const DELETE_USER = gql`
  mutation deleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

// Leaving reset users mutation for when I need to reset users
// const RESET_USERS = gql`
//   mutation resetUsers{
//     resetUsers
//   }
// `;

const UserTable = ({ userData }) => {
  
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deleteUsers] = useMutation(DELETE_USER);

  // const [resetUsers, {data, loading, error}] = useMutation(RESET_USERS);

  function removeUsers() {
    deleteUsers({ variables: { emails: selectedUsers } });
  }

  // function resetTheUsers(){
  //   resetUsers();
  // }

  function capitalize(str) {
    str = str
      .toLowerCase()
      .split('_')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return str;
  }

  function handleChange(e) {
    if (e.target.checked === true) {
      setSelectedUsers([...selectedUsers, e.target.value]);
    } else {
      const activeUsers = selectedUsers.filter((x) => {
        if (x === e.target.value) return false;
        return true;
      });
      setSelectedUsers([...activeUsers]);
    }
  }

  return (
    <div className='userTable'>
      <section className="tableHeadingSection">
        <h1 className="tableTitle">Users</h1>
        <button onClick={removeUsers} className="deleteButton">
          Delete
        </button>
      </section>
      <section className="tableHeadersSection">
        <p id="checkBoxColumn"></p>
        <p id="emailColumn">Email</p>
        <p id="nameColumn">Name</p>
        <p id="roleColumn">Role</p>
      </section>
      {userData.allUsers.map((user, index) => {
        return (
          <div key={index} className="userRows">
            <input id="checkBox" type="checkbox" onChange={handleChange} value={user.email} />
            <Link to={user.name} state={user} className="userRowLink">
              <p id="email">{user.email}</p>
              <p id="name">{user.name}</p>
              <p id="role">{capitalize(user.role)}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default UserTable;
