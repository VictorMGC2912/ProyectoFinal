import { useEffect, useState } from "react";
import { getAllCars, addCarToFav, removeCarFromFav, getFavCarsByUser } from "@/api/carsFetch";
import CarDetailsComponent from "@/components/CarsComponents/CarDetailsComponent";
import CreatedCarComponent from "@/components/CarsComponents/CreatedCarComponent";
import UserLoginComponent from "@/components/UsersComponents/UserLoginComponent";
import styles from "@/styles/Home.module.css";
import EditUserDetailsComponent from "@/components/UsersComponents/EditUserDetailsComponent";

export default function Home() {
  // Estados para los coches y favoritos
  const [cars, setCars] = useState([]);
  const [favCars, setFavCars] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [carId, setCarId] = useState(null);
  const [carHasChanged, setCarHasChanged] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Estados de autenticación y perfil
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [userHasChanged, setUserHasChanged] = useState(false);
  const [isUserUpdating, setIsUserUpdating] = useState(false);


  // Obtener valores de localStorage en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("_id");
      const storedToken = localStorage.getItem("auth-token");
      const storedRole = localStorage.getItem("role");
      console.log("Datos recuperados de localStorage:", { storedToken, storedUserId, storedRole });
      if (storedUserId && storedToken && storedRole) {
        setUserId(storedUserId);
        setToken(storedToken);
        setUserRole(storedRole);
        setIsLoggedIn(true);
        
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

  //Mostrar array de coches favoritos
  const fetchFavorites = async (userId, token) => {
    if (!userId || !token) {
      console.error("No se encontró un userId o token válido.");
      return;
    }
    try {
      const response = await getFavCarsByUser(userId, token);
      if (response && Array.isArray(response.favCars)) {
        setFavCars(response.favCars);
      }else {
        console.warn("La respuesta no contiene coches favoritos validos", response);
        setFavCars([]);//Si no hay coches favoritos
      }
    } catch (error) {
      console.error("Error al cargar los favoritos:", error);
    }
  };
//Manejador para agregar a Favoritos
const handleAddFav = async (carId, userId, token) => {
  try {
    const carAdded = await addCarToFav(carId, userId, token);
    if (carAdded) {
      setFavCars([carAdded])
      setFavCars((prevFavCars) => [...prevFavCars, carAdded]); // Añadir el coche al estado de favoritos
      console.log("Coche añadido a favoritos:", carAdded);
    }
  } catch (error) {
    console.error("Error al añadir a favoritos:", error);
  }
};

  //Manejador para borrar de Favoritos
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

  const toggleShowFavorites = async () => {
    if (!showFavorites && userId && token) {
      // Solo cargar favoritos si el usuario está autenticado y activa la vista
      await fetchFavorites(userId, token);
    }
    setShowFavorites(!showFavorites);
  };
  
  //MANEJADORES DE COCHES
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

  //MANEJADORES DE USUARIOS
  const handlerUpdateUser = () => {
    setIsUserUpdating(true);
  }

  const closeUserUpdating = () => {
    setIsUserUpdating(false);
  }


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
          <div>
          {userId === userId && (
              !isUserUpdating ? (
                <button
                  className={styles.updateUserButton}
                  onClick={handlerUpdateUser}
                >
                  Ver Perfil
                </button>
              ) : (
                <EditUserDetailsComponent
                  id={userId}
                  setUserHasChanged={setUserHasChanged}
                  userHasChanged={userHasChanged}
                  closeUserUpdating={closeUserUpdating}
                />
              )
            )}

          </div>
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
            {(showFavorites ? favCars : cars)?.length > 0 ? (
              (showFavorites ? favCars : cars).map((car, index) => (
                <div className={styles.carItem} key={index}>
                  <img src={car.foto} alt="foto del coche" />
                  <span>Marca: {car.marca}</span>
                  <span>Modelo: {car.modelo}</span>
                  <span>Año: {car.anio}</span>
                  <span>Descripción: {car.descripcion}</span>
                  <span>Precio: {car.precio}€</span>
                  
                  <button
                    className={styles.detailsButton}
                    onClick={() => handlerOnClick(car.id)}
                  >
                    Ver Coche
                  </button>
                  {!showFavorites ? (
                    <button
                      className={styles.favButton}
                      onClick={() => handleAddFav(car.id, userId, token)}
                    >
                      Añadir a Favoritos
                    </button>
                  ) : (
                    <button
                      className={styles.favButton}
                      onClick={() => handleRemoveFav(car._id)}
                    >
                      Quitar de Favoritos
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>{showFavorites ? "No tienes coches favoritos." : "No hay coches disponibles."}</p>
            )}
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




