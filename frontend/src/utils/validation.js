export const validateCar = (car) => {
    const errors = {};
    if (!car.modelo) errors.modelo = 'Modelo é obrigatório';
    if (!car.fabricante) errors.fabricante = 'Fabricante é obrigatório';
    if (!car.ano) errors.ano = 'Ano é obrigatório';
    return errors;
  };