import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_USER = gql`
    mutation updateUser {
        email,
        newAttributes
    }
  `;

const UserDetails = () => {
  const location = useLocation();
  const { name, email, role } = location.state;
  const [selected, setSelected] = useState(role);
  const [updateUser, {data, loading, error}] = useMutation(UPDATE_USE);

  // not completed yet, revisit
  function handleChange(event) {
    setSelected(event.target.value);
    console.log("Selected?: ", selected);
  }

  return (
    <div>
      <section>
        <h1>{email}</h1>
        <button>Save</button>
      </section>
      <section className="nameSection">
        <label>Name</label>
        <input type="text" name="name" placeholder={name} />
      </section>
      <section className="roleSection">
        <p>Role</p>
        <input type="radio" value="Admin" checked={selected === 'ADMIN'} onChange={handleChange} />
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
        <input type="radio" value="Sales" checked={selected === 'SALES'} onChange={handleChange} />
        <label>Sales</label>
      </section>
    </div>
  );
};

export default UserDetails;
