import { deleteCar, getCar } from '@/api/carsFetch';
import React, { useEffect, useState } from 'react';
import EditCarDetailsComponent from './EditCarDetailsComponent';
import styles from '@/styles/CarDetails.module.css';

export default function CarDetailsComponent(props) {
  const { id, closeCarDetails, setCarHasChanged, carHasChanged, userRole } = props;

  const [car, setCar] = useState(null); //Estado inicial null que indica que no se han cargado los datos aun
  const [isEditing, setIsEditing] = useState(false); //Indicamos si se esta actualizando coche

  //useEffect para cargar los datos del coche cuando cambia el ID
  useEffect(() => {
    const loadCar = async () => {
      try {
        console.log("Obteniendo datos del coche con ID:", id);
        const carAux = await getCar(id); //Llamamos a la API para obtener los detalles del coche
        console.log("Datos del coche recibidos:", carAux.data);
        setCar(carAux.data); //Seteamos los datos del coche
      } catch (error) {
        console.error("Error al cargar los detalles del coche:", error);
      }
    };
    loadCar();
  }, [id]); //Este useEffect depende de los datos del coche

  //Manejador para iniciar proceso de editar
  const initUpdateProcessCar = () => {
    setIsEditing(true);
  };

  //Manejador para iniciar el borrado de un coche
  const handlerDeleteCar = () => {
    deleteCar(id); //Llama a la API para borrar el coche del ID que le indiquemos
    setCarHasChanged(!carHasChanged); //Notifica el cambio al componente padre
  };

  return (
    <div className={styles.carDetailsContainer}>
      {car ? ( // Renderiza solo si `car` tiene datos
        !isEditing ? ( //Si no esta en modo edicion, muestra los detalles del coche
          <div>
            <h2 className={styles.carDetailsTitle}>{car.marca} {car.modelo}</h2>
            <div className={styles.carInfo}>
              <p>Marca: {car.marca}</p>
              <p>Modelo: {car.modelo}</p>
              <p>Año: {car.anio}</p>
              <p>Descripción: {car.descripcion}</p>
              <p>Precio: {car.precio}€</p>
              <img src={car.foto} alt="Foto del coche" />
            </div>
            <div className={styles.optionsContainer}>
              <h4 className={styles.optionsTitle}>Opciones</h4>
              <button onClick={initUpdateProcessCar}>Actualizar Coche</button>
              {userRole === "admin" && ( //Solo los admins pueden borrar coches
                <button onClick={handlerDeleteCar}>Borrar Coche</button>
              )}
              
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
      <button className={styles.closeButton} onClick={closeCarDetails}>
        Cerrar Detalles
      </button>
    </div>
  );
}
