import React, { useState, useEffect } from 'react';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../domain/cars/carService';
import EditCarModal from '../domain/cars/EditCarModal';
import CarDetailPopup from './CarDetailPopup';
import CarDetail from '../domain/cars/CarDetail';

import '../styles/styles.css';

const CarComponent = () => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({});
  const [newCar, setNewCar] = useState({ modelo: '', fabricante: '', ano: '' });
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [carDetails, setCarDetails] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchCars = async () => {
    try {
      const data = await getAllCars();
      setCars(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCarById = async (id) => {
    try {
      const data = await getCarById(id);
      setCar(data);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error(`Erro ao buscar o carro com ID ${id}:`, error);
    }
  };

  const handleCreateCar = async () => {
    try {
      const data = await createCar(newCar);
      setCars([data, ...cars]);
      setNewCar({ modelo: '', fabricante: '', ano: '' });
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Erro ao criar carro: ' + error.message);
    }
  };

  const handleUpdateCar = async (updatedCar) => {
    try {
      const data = await updateCar(updatedCar.id, updatedCar);
      setCars(cars.map((c) => (c.id === updatedCar.id ? data : c)));
      setSelectedCarId(null);
      setCar({});
      setIsEditModalOpen(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Erro ao atualizar o carro com ID ${updatedCar.id}: ` + error.message);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((c) => c.id !== id));
      fetchCars();
      setCars((prevCars) => [...prevCars]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Erro ao deletar o carro com ID FRONT ${id}: ` + error.message);
    }
  };

  const handleDetailCar = async (id) => {
    try {
      const data = await getCarById(id);
      setCarDetails(data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error(`Erro ao buscar os detalhes do carro com ID ${id}:`, error);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCarDetails(null);
  };

  return (
    <div className="car-component">
      <h1>Cars</h1>
      <h2>Adicionar Novo Carro</h2>
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <div>Loading...</div>}
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.modelo} - {car.fabricante} - {car.ano}
            <br />
            <button onClick={() => fetchCarById(car.id)}>Editar</button>
            <button onClick={() => handleDeleteCar(car.id)}>Deletar</button>
            <button onClick={() => handleDetailCar(car.id)}>Detalhar</button>
          </li>
        ))}
      </ul>
      {isEditModalOpen && (
        <EditCarModal
          car={car}
          onSave={handleUpdateCar}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDetailModalOpen && (
        <CarDetail
          selectedCarId={carDetails}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CarComponent;
