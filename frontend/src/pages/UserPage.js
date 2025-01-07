import React from 'react';
import { useHistory } from 'react-router-dom';
import UserList from '../components/UserList';

const UserPage = () => {
  const history = useHistory();

  const handleNavigateToCars = () => {
    history.push('/cars');
  };

  return (
    <div>
      <button onClick={handleNavigateToCars} style={{ position: 'absolute', top: 10, right: 10 }}>
        Ver Carros
      </button>
      <UserList />
    </div>
  );
};

export default UserPage;