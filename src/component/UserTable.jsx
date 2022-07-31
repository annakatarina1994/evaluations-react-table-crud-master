import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import '../style/UserTable.css';

const DELETE_USER = gql`
  mutation deleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

const RESET_USERS = gql`
  mutation resetUsers{
    resetUsers
  }
`;

// const DELETE_USER = gql`
//   mutation {
//     deleteUsers(emails: ) {
//       emails
//     }
//   }
// `;

const UserTable = ({ userData }) => {
  
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deleteUsers, { data, loading, error }] = useMutation(DELETE_USER);
  const [users, setUsers] = useState(userData);

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
      console.log('e.target.value: ', e.target.value);
      setSelectedUsers([...selectedUsers, e.target.value]);
    } else {
      const activeUsers = selectedUsers.filter((x) => {
        if (x === e.target.value) return false;
        return true;
      });
      setSelectedUsers([...activeUsers]);
    }
    console.log('Selected Users: ', selectedUsers);
  }

  return (
    <>
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
          <div className="userRows">
            <input id="checkBox" type="checkbox" onChange={handleChange} value={user.email} />
            <Link key={index} to={user.name} state={user} className="userRowLink">
              <p id="email">{user.email}</p>
              <p id="name">{user.name}</p>
              <p id="role">{capitalize(user.role)}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default UserTable;
