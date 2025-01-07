export const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    return response.json();
  };