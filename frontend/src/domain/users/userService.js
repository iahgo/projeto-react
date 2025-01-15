const BASE_URL = 'https://trabalho-final-react-noite-9088f5955205.herokuapp.com/api/usuarios';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Erro ao obter todos os usuários');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const getUserByEmail = async (email) => {
  try {
    const users = await getAllUsers();
    const user = users.find(user => user.email === email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  } catch (error) {
    throw error;
  }
};
