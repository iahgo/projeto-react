import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../domain/users/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
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
    <div>
      <h1>Lista de Usuários</h1>
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