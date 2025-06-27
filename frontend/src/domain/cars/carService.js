const BASE_URL = 'https://proven-promptly-chipmunk.ngrok-free.app/api/carros';

// Headers padrão para todas as requisições
const defaultHeaders = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
};

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
    const response = await fetch(BASE_URL, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Erro ao buscar todos os carros:', error);
    throw error;
  }
};

const getCarById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
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
      headers: defaultHeaders,
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
      headers: defaultHeaders,
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
      headers: defaultHeaders,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro ao deletar o carro com ID FRONT ${id}:`, error);
    throw error;
  }
};

const exportarCarros = async () => {
  try {
    const response = await fetch(`${BASE_URL}/export-cars`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao exportar carros');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'carros.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Erro ao exportar carros:', error);
    throw error;
  }
};

export { getAllCars, getCarById, createCar, updateCar, deleteCar, exportarCarros };