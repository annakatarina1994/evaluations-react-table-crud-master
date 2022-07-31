import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import '../style/UserDetails.css';

// confused about what I need back...user or email and attributes again...??
const UPDATE_USER = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      User {
        name
      }
    }
  }
`;

const UserDetails = () => {
  const location = useLocation();
  const { name, email, role } = location.state;
  const [selected, setSelected] = useState(role);
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
  let input;

  if (loading) return 'Loading...';
  if (error) return `Error Saving! ${error.message}`;

  // not completed yet, revisit
  function handleChange(event) {
    setSelected(event.target.value);
    console.log('Selected?: ', selected);
  }

  return (
      <form
      className='userDetailsForm'
        onSubmit={(e) => {
          updateUser({ variables: { email: email, newAttributes: input.value } });
          input.value = '';
        }}
      >
        <section className='heading'>
          <h1 id="emailHeader">{email}</h1>
          {/* add an onsubmit to this button, where i think we'd want to call our mutation? maybe? */}
          <button type="submit" id="saveButton">Save</button>
        </section>
        <section className="nameSection">
          <label>Name</label>
          <input
            ref={(node) => {
              input = node;
            }}
            type="text"
            name="name"
            placeholder={name}
          />
        </section>
        <section className="roleSection">
          <p>Role</p>
          <input
            type="radio"
            value="Admin"
            checked={selected === 'ADMIN'}
            onChange={handleChange}
          />
          <label>Admin</label>
          <input
            type="radio"
            value="Developer"
            checked={selected === 'DEVELOPER'}
            onChange={handleChange}
          />
          <label>Developer</label>
          <input
            type="radio"
            value="App Manager"
            checked={selected === 'APP_MANAGER'}
            onChange={handleChange}
          />
          <label>App Manager</label>
          <input
            type="radio"
            value="Marketing"
            checked={selected === 'MARKETING'}
            onChange={handleChange}
          />
          <label>Marketing</label>
          <input
            type="radio"
            value="Sales"
            checked={selected === 'SALES'}
            onChange={handleChange}
          />
          <label>Sales</label>
        </section>
      </form>
  );
};

export default UserDetails;
