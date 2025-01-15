import { useEffect, useState } from "react";
import { getAllCars, addCarToFav, removeCarFromFav, getFavCarsByUser } from "@/api/carsFetch";
import CarDetailsComponent from "@/components/CarsComponents/CarDetailsComponent";
import CreatedCarComponent from "@/components/CarsComponents/CreatedCarComponent";
import UserLoginComponent from "@/components/UsersComponents/UserLoginComponent";
import styles from "@/styles/Home.module.css";

export default function Home() {
  // Estados para los coches y favoritos
  const [cars, setCars] = useState([]);
  const [favCars, setFavCars] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [carId, setCarId] = useState(null);
  const [carHasChanged, setCarHasChanged] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Estados de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // Obtener valores de localStorage en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      const storedToken = localStorage.getItem("auth-token");
      const storedRole = localStorage.getItem("role");
      console.log("Datos recuperados de localStorage:", { storedToken, storedUserId, storedRole });
      if (storedUserId && storedToken && storedRole) {
        setUserId(storedUserId);
        setToken(storedToken);
        setUserRole(storedRole);
        setIsLoggedIn(true);
        fetchFavorites(storedUserId, storedToken);
      }
    }
  }, [isLoggedIn]);

  const handlerOnClickLogin = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    setToken(null);
  };

  const getAllCarsAux = async () => {
    const carsAux = await getAllCars();
    setCars(carsAux.data);
  };

  const fetchFavorites = async (userId, token) => {
    const cars = await getFavCarsByUser(userId, token);
    if (cars) {
      setFavCars(cars);
    }
  };

  const handleAddFav = async (carId) => {
    if (!token) {
      console.error(token, "No se encontró un token válido.");
      return;
    }
    const response = await addCarToFav(carId);
    if (response) {
      setFavCars([...favCars, response]);
      console.log("Respuesta del servidor al agregar favorito:", response);

    }
  };
  

  const handleRemoveFav = async (carId) => {
    const response = await removeCarFromFav(userId, carId, token);
    if (response) {
      setFavCars(favCars.filter((car) => car._id !== carId));
    }
  };

  useEffect(() => {
    getAllCarsAux();
  }, []);

  useEffect(() => {
    getAllCarsAux();
    setCarHasChanged(false);
    closeCarDetails();
  }, [carHasChanged]);

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

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

      {!isLoggedIn ? (
        <UserLoginComponent
          setIsLoggedIn={setIsLoggedIn}
          setUserRole={setUserRole}
          setUserId={setUserId}
          setToken={setToken}

        />
      ) : (
        <>
          <div className={styles.closeSesion}>
            <button className={styles.closeButton} onClick={handlerOnClickLogin}>
              Cerrar Sesión
            </button>
          </div>
          <div className={styles.homeActions}>
            {userRole === "admin" && (
              !isCreating ? (
                <button
                  className={styles.createButton}
                  onClick={handlerCreateCar}
                >
                  Crear Coche
                </button>
              ) : (
                <CreatedCarComponent
                  setCarHasChanged={setCarHasChanged}
                  carHasChanged={carHasChanged}
                  closeCarCreation={closeCarCreation}
                />
              )
            )}
            <hr />
          </div>

          <button className={styles.toggleButton} onClick={toggleShowFavorites}>
            {showFavorites ? "Mostrar Todos los Coches" : "Mostrar Favoritos"}
          </button>

          <div className={styles.carsList}>
            {(showFavorites ? favCars : cars).map((car, index) => (
              <div className={styles.carItem} key={index}>
                <img src={car.foto} alt="foto del coche" />
                <span>Marca: {car.marca} </span>
                <span>Modelo: {car.modelo} </span>
                <span>Año: {car.anio} </span>
                <span>Descripcion: {car.descripcion} </span>
                <span>Precio: {car.precio}€ </span>
                <button
                  className={styles.detailsButton}
                  onClick={() => handlerOnClick(car.id)}
                >
                  Ver Coche
                </button>
                {!showFavorites ? (
                  <button
                    className={styles.favButton}
                    onClick={() => handleAddFav(car.id)}
                  >
                    Añadir a Favoritos
                  </button>
                ) : (
                  <button
                    className={styles.unfavButton}
                    onClick={() => handleRemoveFav(car.id)}
                  >
                    Quitar de Favoritos
                  </button>
                )}
              </div>
            ))}
          </div>
          <hr />

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




