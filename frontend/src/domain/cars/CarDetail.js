import React, { useState, useEffect } from 'react';

const CarDetail = ({ selectedCarId, onClose }) => {
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCar(selectedCarId)
  }, [selectedCarId]);

  if (!selectedCarId) return <div>No car details available</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!car) return <div>Loading...</div>;

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>{car.modelo}</h1>
        <p>Fabricante: {car.fabricante}</p>
        <p>Ano: {car.ano}</p>
        <p>Cor: {car.cor}</p>
        <p>Cavalos de Potência: {car.cavalosDePotencia}</p>
        <p>País: {car.pais}</p>
        <button type="button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default CarDetail;