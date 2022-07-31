import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import '../style/UserTable.css';

const DELETE_USER = gql`
  mutation deleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails) {
      ID
    }
  }
`;

const UserTable = ({ userData }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

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
      setSelectedUsers([...selectedUsers, Number(e.target.value)]);
    } else {
      const activeUsers = selectedUsers.filter((x) => {
        if (x === Number(e.target.value)) return false;
        return true;
      });
      setSelectedUsers([...activeUsers]);
    }
  }

  return (
    <>
      <section className="tableHeadingSection">
        <h1 className="tableTitle">Users</h1>
        <button disabled className="deleteButton">
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
            <Link key={index} to={user.name} state={user} className="userRowLink">
              <input id="checkBox" type="checkbox" onChange={handleChange} value={user.email} />
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
