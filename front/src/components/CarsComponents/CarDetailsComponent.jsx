import { deleteCar, getCar } from '@/api/carsFetch';
import React, { useEffect, useState } from 'react';
import EditCarDetailsComponent from './EditCarDetailsComponent';
import styles from '@/styles/CarDetails.module.css';

export default function CarDetailsComponent(props) {
  const { id, closeCarDetails, setCarHasChanged, carHasChanged } = props;

  const [car, setCar] = useState(null); // Cambiar estado inicial a null
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadCar = async () => {
      try {
        console.log("Obteniendo datos del coche con ID:", id);
        const carAux = await getCar(id);
        console.log("Datos del coche recibidos:", carAux.data);
        setCar(carAux.data); //Seteamos los datos del coche
      } catch (error) {
        console.error("Error al cargar los detalles del coche:", error);
      }
    };
    loadCar();
  }, [id]);

  //Manejador para iniciar proceso de editar
  const initUpdateProcessCar = () => {
    setIsEditing(true);
  };

  const handlerDeleteCar = () => {
    deleteCar(id);
    setCarHasChanged(!carHasChanged);
  };

  return (
    <div className={styles['car-details-container']}>
      {car ? ( // Renderiza solo si `car` tiene datos
        !isEditing ? (
          <div>
            <h2 className={styles['car-details-title']}>{car.marca} {car.modelo}</h2>
            <div className={styles['car-info']}>
              <p>Marca: {car.marca}</p>
              <p>Modelo: {car.modelo}</p>
              <p>Año: {car.anio}</p>
              <p>Descripción: {car.descripcion}</p>
              <p>Precio: {car.precio}€</p>
              <img src={car.foto} alt="Foto del coche" />
            </div>
            <div className={styles['options-container']}>
              <h4 className={styles['options-title']}>Opciones</h4>
              <button onClick={initUpdateProcessCar}>Actualizar Coche</button>
              <button onClick={handlerDeleteCar}>Borrar Coche</button>
            </div>
          </div>
        ) : (
          <EditCarDetailsComponent
            id={id}
            car={car}
            setCarHasChanged={setCarHasChanged}
            carHasChanged={carHasChanged}
            closeCarDetails={closeCarDetails}
          />
        )
      ) : ( // Muestro un mensaje mientras se cargan los datos
        <p>Cargando detalles del coche...</p>
      )}
      <hr />
      <button className={styles['close-button']} onClick={closeCarDetails}>
        Cerrar Detalles
      </button>
    </div>
  );
}
