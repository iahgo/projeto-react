import React from 'react';

const CarForm = ({ newCar, setNewCar, handleCreateCar }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateCar();
      }}
    >
      <input
        type="text"
        placeholder="Modelo"
        value={newCar.modelo}
        onChange={(e) => setNewCar({ ...newCar, modelo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Fabricante"
        value={newCar.fabricante}
        onChange={(e) => setNewCar({ ...newCar, fabricante: e.target.value })}
      />
      <input
        type="number"
        placeholder="Ano"
        value={newCar.ano}
        onChange={(e) => setNewCar({ ...newCar, ano: e.target.value })}
      />
      <input
        type="text"
        placeholder="Cor"
        value={newCar.cor}
        onChange={(e) => setNewCar({ ...newCar, cor: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cavalos de Potência"
        value={newCar.cavalosDePotencia}
        onChange={(e) => setNewCar({ ...newCar, cavalosDePotencia: e.target.value })}
      />
      <input
        type="text"
        placeholder="País"
        value={newCar.pais}
        onChange={(e) => setNewCar({ ...newCar, pais: e.target.value })}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default CarForm;