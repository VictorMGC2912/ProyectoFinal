import { addCarToFav, getFavCarsByUser, removeCarFromFav } from '@/api/carsFetch';
import React, { useEffect, useState } from 'react'

export default function CarsFavoritesComponent(carId, userId, token) {
    const [favCars, setFavCars] = useState([]);

    useEffect(() => {
        //Obtener los coches favoritos al cargar el componente
        const fetchFavCars = async () => {
            const cars = await getFavCarsByUser(userId, token);
            if(cars) {
                setFavCars(cars);
            }
        };
        fetchFavCars();
    }, [userId, token]);

    //Manejador para agregar coches a favoritos
    const handleAddFav = async (carId) => {
        const response = await addCarToFav(carId, userId, token);
        if(response) {
            setFavCars([...favCars, response]);//Actualiza la lista de favoritos
        }
    };

    //Manejador para borrar coches de favoritos
    const handleRemoveFav = async (carId) => {
        const response = await removeCarFromFav(carId, userId, token);
        if(response) {
            setFavCars(favCars.filter((car) => car._id !== carId));//Elimina de la lista
        }
    }
  return (
    <div>
      <h2>Coches Favoritos</h2>
      <ul>
        {favCars.map((car) => (
          <li key={car._id}>
            {car.marca} {car.modelo}
            <button onClick={() => handleRemoveFav(car._id)}>
              Quitar de Favoritos
            </button>
          </li>
        ))}
      </ul>
      {/* Boton para añadir un coche */}
      <button onClick={() => handleAddFav(carId)}>
        Añadir Coche a Favoritos
      </button>
    </div>
  )
}
