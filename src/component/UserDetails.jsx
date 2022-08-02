import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import '../style/UserDetails.css';

// confused about what I need back...user or email and attributes again...??
const UPDATE_USER = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      email
      name
      role
    }
  }
`;

const UserDetails = () => {
  const location = useLocation();
  const { name, email, role } = location.state;
  const [selected, setSelected] = useState(role);
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    variables: {
      email: email,

    }
  });
  const navigate = useNavigate();

  if (loading) return 'Loading...';
  if (error) return `Error Saving! ${error.message}`;

  function handleChange(event) {
    setSelected(event.target.value);
    roleInput = event.target.value;
  }

  if(nameInput.value === ''){
    return name;
  }

  function updateCurrentUser(e) {
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
    roleInput.value = '';
    nameInput.value = '';
  }

  let roleInput;
  let nameInput;

  return (
    <form className="userDetailsForm" onSubmit={updateCurrentUser}>
      <section className="heading">
        <h1 id="emailHeader">{email}</h1>
        <button type="submit" id="saveButton">
          Save
        </button>
      </section>
      <div className="editSection">
        <section className="nameSection">
          <label>Name</label>
          <input ref={(node) => (nameInput = node)} type="text" name="name" placeholder={name} className='nameInput' />
        </section>
        <section className="roleSection">
          <p className='role'>Role</p>
          <div className='roleRadioButtons'>
            <input
              type="radio"
              value="ADMIN"
              checked={selected === 'ADMIN'}
              onChange={handleChange}
              ref={(node) => (roleInput = node)}
            />
            <label>Admin</label>
          </div>
          <div className='roleRadioButtons'>
            <input
              type="radio"
              value="DEVELOPER"
              checked={selected === 'DEVELOPER'}
              onChange={handleChange}
              ref={(node) => (roleInput = node)}
            />
            <label>Developer</label>
          </div>
          <div className='roleRadioButtons'>
            <input
              type="radio"
              value="APP_MANAGER"
              checked={selected === 'APP_MANAGER'}
              onChange={handleChange}
              ref={(node) => (roleInput = node)}
            />
            <label>App Manager</label>
          </div>
          <div className='roleRadioButtons'>
            <input
              type="radio"
              value="MARKETING"
              checked={selected === 'MARKETING'}
              onChange={handleChange}
              ref={(node) => (roleInput = node)}
            />
            <label>Marketing</label>
          </div>
          <div className='roleRadioButtons'>
            <input
              type="radio"
              value="SALES"
              checked={selected === 'SALES'}
              onChange={handleChange}
              ref={(node) => (roleInput = node)}
            />
            <label>Sales</label>
          </div>
        </section>
      </div>
    </form>
  );
};

export default UserDetails;
