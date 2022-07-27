import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
  const location = useLocation();
  const { name, email, role} = location.state;

  return (
    <div>
      <section>
        <h1>{email}</h1>
        <button>Save</button>
      </section>
      <section className="nameSection">
        <label for="name">Name</label>
        <input type="text" name="name" />
      </section>
      <section className="roleSection">
        <p>Role</p>
        <input type="radio" />
        <label>Admin</label>
        <input type="radio" />
        <label>Developer</label>
        <input type="radio" />
        <label>App Manager</label>
        <input type="radio" />
        <label>Marketing</label>
        <input type="radio" />
        <label>Sales</label>
      </section>
    </div>
  );
};

export default UserDetails;