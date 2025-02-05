import { useEffect, useState } from "react";
import { getAllCars, addCarToFav, removeCarFromFav, getFavCarsByUser } from "@/api/carsFetch";
import CarDetailsComponent from "@/components/CarsComponents/CarDetailsComponent";
import CreatedCarComponent from "@/components/CarsComponents/CreatedCarComponent";
import UserLoginComponent from "@/components/UsersComponents/UserLoginComponent";
import styles from "@/styles/Home.module.css";
import UserDetailsComponent from "@/components/UsersComponents/UserDetailsComponent";

export default function Home() {
  // Estados para los coches y favoritos
  const [cars, setCars] = useState([]); //Lista de todos los coches
  const [favCars, setFavCars] = useState([]); //Lista de coches favoritos
  const [showFavorites, setShowFavorites] = useState(false); //Indicador si se estan mostrando los coches favoritos
  const [carId, setCarId] = useState(null); //Almacena el ID del coche seleccionado
  const [carHasChanged, setCarHasChanged] = useState(false); //Condicion para recargar coche si algo cambio en sus caracteristicas
  const [isCreating, setIsCreating] = useState(false); //Indica si se esta creando un coche

  // Estados de autenticación y perfil
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Indica si el usuario esta autenticado
  const [userRole, setUserRole] = useState(null); //Indica el role del usuario (admin/user)
  const [userId, setUserId] = useState(null); //ID del usuario
  const [token, setToken] = useState(null); //Token del usuario
  const [userHasChanged, setUserHasChanged] = useState(false); //Condicion para recargar usuario si algo cambio en sus caracteristicas
  const [isUserUpdating, setIsUserUpdating] = useState(false); //Indica si se esta actualizando un usuario


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
  
  //Nos traemos todos los coches del backend
  const getAllCarsAux = async () => {
    const carsAux = await getAllCars();
    setCars(carsAux.data);
  };

  useEffect(() => {
    getAllCarsAux();
  }, []);

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
        setFavCars([]);//Si no hay coches favoritos, establecemos un array vacio
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
      setFavCars((prevFavCars) => [...prevFavCars, carAdded]); // Actualizamos el estado de favoritos
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
      setFavCars(favCars.filter((car) => car._id !== carId)); //Eliminamos coche del estado de favoritos
    }
  };

  useEffect(() => {
    getAllCarsAux();
    setCarHasChanged(false);
    closeCarDetails();
  }, [carHasChanged]);

  //Aternamos entre mostrar favoritos y mostras todos los coches
  const toggleShowFavorites = async () => {
    if (!showFavorites && userId && token) {
      // Solo cargar favoritos si el usuario está autenticado y activa la vista
      await fetchFavorites(userId, token);
    }
    setShowFavorites(!showFavorites);
  };
  
  //MANEJADORES DE COCHES
  const handlerOnClick = (id) => {
    setCarId(id); //Guardamos el id del coche seleccionado
  };

  const closeCarDetails = () => {
    setCarId(null); //Cerramos los detalles del id coche seleccionado
  };

  const handlerCreateCar = () => {
    setIsCreating(true); //Abrimos formulario para crear coche
  };

  const closeCarCreation = () => {
    setIsCreating(false); //Cerramos formulario para crear coche
  };

  //MANEJADORES DE USUARIOS
  const handlerUpdateUser = () => {
    setIsUserUpdating(true); //Abrir la vista de actualizacion de usuario
  }

  const closeUserUpdating = () => {
    setIsUserUpdating(false); //Cerrar la lista de actualizacion de usuario
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
                <UserDetailsComponent
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
                  
                  {!showFavorites && ( //Mostrar botón de detalles solo si no se muestran favoritos
                    <button
                      className={styles.detailsButton}
                      onClick={() => handlerOnClick(car.id)}
                    >
                      Ver Coche
                    </button>
                  )}

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
              userRole={userRole}
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




