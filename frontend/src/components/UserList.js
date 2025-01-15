import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import {getAllUsers, getUserByEmail} from '../domain/users/userService'
import './userList.css';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;

        const response = await getUserByEmail(email);
        setUser(response);
        
        const responseUsers = await getAllUsers();
        setUsers(responseUsers);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleUsers = () => {
    setShowUsers(!showUsers);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Meu Perfil</h1>
      {user && (
        <div className="profile">
          <img src={user.avatar} alt="Avatar" />
          <p>Nome: {user.nome}</p>
          <p>Email: {user.email}</p>
          <p>Cargo: {user.cargo}</p>
          <p>ID: {user.id}</p>
        </div>
      )}
      <button onClick={handleToggleUsers}>
        {showUsers ? 'Esconder usuários' : 'Ver usuários'}
      </button>
        {showUsers && (
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.nome}</li>
            ))}
          </ul>
        )}
    </div>
  );
};
export default UserList;