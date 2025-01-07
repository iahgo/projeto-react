const BASE_URL = '/api/carros';

const handleResponse = async (response) => {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || response.statusText);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return null;
  };

const getAllCars = async () => {
  try {
    const response = await fetch(BASE_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error('Erro ao buscar todos os carros:', error);
    throw error;
  }
};

const getCarById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro ao buscar o carro com ID ${id}:`, error);
    throw error;
  }
};

const createCar = async (car) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    throw error;
  }
};

const updateCar = async (id, car) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro ao atualizar o carro com ID ${id}:`, error);
    throw error;
  }
};

const deleteCar = async (id) => {  
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Erro ao deletar o carro com ID FRONT ${id}:`, error);
      throw error;
    }
  };

export { getAllCars, getCarById, createCar, updateCar, deleteCar };