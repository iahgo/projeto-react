import React from 'react';
import { useHistory } from 'react-router-dom';
import UserList from '../components/UserList';

const UserPage = () => {
  const history = useHistory();

  const handleNavigateToCars = () => {
    history.push('/cars');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  const classButton = 'p-2 bg-blue-500 text-white';

  return (
    <div style={{ paddingTop: '60px' }}>
      <button onClick={handleNavigateToCars}>
        Ver Carros
      </button>
      <button onClick={handleLogout}>
        Logout
      </button>
      <UserList />
    </div>
  );
};

export default UserPage;