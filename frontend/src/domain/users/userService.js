const BASE_URL = 'https://proven-promptly-chipmunk.ngrok-free.app/api/usuarios';

// Headers padrão para todas as requisições
const defaultHeaders = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: defaultHeaders,
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
      headers: defaultHeaders,
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