import React, { useState, useEffect } from 'react';

const EditCarModal = ({ car, onSave, onClose }) => {
  const [editedCar, setEditedCar] = useState(car);

  useEffect(() => {
    setEditedCar(car);
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCar({ ...editedCar, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedCar);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Editar Carro</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={editedCar.modelo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="fabricante"
            placeholder="Fabricante"
            value={editedCar.fabricante}
            onChange={handleChange}
          />
          <input
            type="number"
            name="ano"
            placeholder="Ano"
            value={editedCar.ano}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cor"
            placeholder="Cor"
            value={editedCar.cor}
            onChange={handleChange}
          />
          <input
            type="number"
            name="cavalosDePotencia"
            placeholder="Cavalos de Potência"
            value={editedCar.cavalosDePotencia}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pais"
            placeholder="País"
            value={editedCar.pais}
            onChange={handleChange}
          />
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditCarModal;