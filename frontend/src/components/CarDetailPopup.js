import React from 'react';

const CarDetailPopup = ({ carDetails, onClose }) => {
  if (!carDetails) return null;

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Detalhes do Carro</h2>
        <p>Modelo: {carDetails.modelo}</p>
        <p>Fabricante: {carDetails.fabricante}</p>
        <p>Ano: {carDetails.ano}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default CarDetailPopup;