import React from 'react';
import { useHistory } from 'react-router-dom';
import CarList from '../components/CarList';

const CarPage = () => {
  const history = useHistory();

  const handleNavigateToUsers = () => {
    history.push('/users');
  };

  const handleLogout = () => { // falta fazer isso funcionar
    localStorage.removeItem('token');
    this.props.history.push('/login');
  };

  const classButton = 'p-2 bg-blue-500 text-white';

  return (
    <div>
      <button onClick={handleNavigateToUsers} style={{ position: 'absolute', top: 10, right: 10 }}>
        Ver Usuários
      </button>
      <button onClick={handleLogout} className={ classButton }>
          Logout
        </button>
      <h1>Gerenciamento de Carros</h1>
      <CarList />
    </div>
  );
};

export default CarPage;