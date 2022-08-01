import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import '../style/UserDetails.css';

// confused about what I need back...user or email and attributes again...??
const UPDATE_USER = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      name
    }
  }
`;

const UserDetails = () => {
  const location = useLocation();
  const { name, email, role } = location.state;
  const [selected, setSelected] = useState(role);
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

  if (loading) return 'Loading...';
  if (error) return `Error Saving! ${error.message}`;

  let roleInput;

  function handleChange(event) {
    setSelected(event.target.value);
    roleInput = event.target.value;
  }

  let nameInput;

  return (
    <form
      className="userDetailsForm"
      onSubmit={(e) => {
        e.preventDefault();
        if (!nameInput.value.trim()) {
          return;
        }
        updateUser({
          variables: {
            email: email,
            newAttributes: { name: nameInput.value, role: roleInput.value },
          },
        });
        nameInput.value = '';
        roleInput.value = '';
      }}
    >
      <section className="heading">
        <h1 id="emailHeader">{email}</h1>
        <button type="submit" id="saveButton">
          Save
        </button>
      </section>
      <section className="nameSection">
        <label>Name</label>
        <input ref={(node) => (nameInput = node)} type="text" name="name" placeholder={name} />
      </section>
      <section className="roleSection">
        <p>Role</p>
        <input
          type="radio"
          value="ADMIN"
          checked={selected === 'ADMIN'}
          onChange={handleChange}
          ref={(node) => (roleInput = node)}
        />
        <label>Admin</label>
        <input
          type="radio"
          value="DEVELOPER"
          checked={selected === 'DEVELOPER'}
          onChange={handleChange}
          ref={(node) => (roleInput = node)}
        />
        <label>Developer</label>
        <input
          type="radio"
          value="APP_MANAGER"
          checked={selected === 'APP_MANAGER'}
          onChange={handleChange}
          ref={(node) => (roleInput = node)}
        />
        <label>App Manager</label>
        <input
          type="radio"
          value="MARKETING"
          checked={selected === 'MARKETING'}
          onChange={handleChange}
          ref={(node) => (roleInput = node)}
        />
        <label>Marketing</label>
        <input
          type="radio"
          value="SALES"
          checked={selected === 'SALES'}
          onChange={handleChange}
          ref={(node) => (roleInput = node)}
        />
        <label>Sales</label>
      </section>
    </form>
  );
};

export default UserDetails;
