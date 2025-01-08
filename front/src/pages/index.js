import { getAllCars } from "@/api/carsFetch";
import CarDetailsComponent from "@/components/CarsComponents/CarDetailsComponent";
import CreatedCarComponent from "@/components/CarsComponents/CreatedCarComponent";
import UserLoginComponent from "@/components/UsersComponents/UserLoginComponent";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  // Estados para gestionar los coches
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState(null);
  const [carHasChanged, setCarHasChanged] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Estado para el Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Funcion para manejar el cierre de sesion
  const handlerOnClickLogin = () => {
    setIsLoggedIn(false)
  }

  const getAllCarsAux = async () => {
    const carsAux = await getAllCars();
    console.log(carsAux);
    setCars(carsAux.data);
  };

  useEffect(() => {
    getAllCarsAux();
  }, []);

  useEffect(() => {
    getAllCarsAux();
    setCarHasChanged(false);
    closeCarDetails();
  }, [carHasChanged]);

  const handlerOnClick = (id) => {
    setCarId(id);
  };

  const closeCarDetails = () => {
    setCarId(null);
  };

  const handlerCreateCar = () => {
    setIsCreating(true);
  };

  const closeCarCreation = () => {
    setIsCreating(false);
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>APP COCHES</h1>

      {/* Mostrar LoginComponent si el usuario no ha iniciado sesión */}
      {!isLoggedIn ? (
        <UserLoginComponent setIsLoggedIn={setIsLoggedIn} />
        
      ) : (
        <>
          {/* Contenido principal de la página si el usuario ha iniciado sesión */}
          <div className={styles.closeSesion}>
            {/* Botón para cerrar sesión */}
            <button className={styles.closeButton} onClick={handlerOnClickLogin}>
              Cerrar Sesión
            </button>
          </div>
          <div className={styles.homeActions}>
            {!isCreating ? (
              <button className={styles.createButton} onClick={handlerCreateCar}>
                Crear Coche
              </button>
            ) : (
              <CreatedCarComponent
                setCarHasChanged={setCarHasChanged}
                carHasChanged={carHasChanged}
                closeCarCreation={closeCarCreation}
              />
            )}
            <hr />
          </div>

          {/* Listado de coches */}
          <div className={styles.carsList}>
            {cars &&
              cars.map((car, index) => {
                return (
                  <div className={styles.carItem} key={index}>
                    <img src={car.foto} alt="foto del coche" />
                    <span>Marca: {car.marca} </span>
                    <span>Modelo: {car.modelo} </span>
                    <span>Año: {car.anio} </span>
                    <span>Descripcion: {car.descripcion} </span>
                    <span>Precio: {car.precio}€ </span>
                    <button
                      className={styles.detailsButton}
                      onClick={() => {
                        handlerOnClick(car.id);
                      }}
                    >
                      Ver Coche
                    </button>
                  </div>
                );
              })}
          </div>
          <hr />

          {/* Mostrar detalles del coche seleccionado */}
          {carId && (
            <CarDetailsComponent
              id={carId}
              setCarHasChanged={setCarHasChanged}
              closeCarDetails={closeCarDetails}
              carHasChanged={carHasChanged}
            />
          )}
        </>
      )}
    </div>
  );
}


