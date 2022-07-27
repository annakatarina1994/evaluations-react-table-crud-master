import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserTable from './component/UserTable';
import UserDetails from './component/UserDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const App = () => {
  const { loading, error, data: userData } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTable userData={userData} />}/>
        <Route path="/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
