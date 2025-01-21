
const carUrlBack = 'http://localhost:9000/cars/'

export const getAllCars = async () => {
    //Peticion al back de todos los coches
    const response = await fetch(carUrlBack);
    const cars = await response.json();
    return cars;
};

//NOS DA UN COCHE POR ID
export const getCar = async (id) => {
    const response = await fetch(carUrlBack+id);
    const cars = await response.json();
    return cars
};

//PARA BORRAR UN COCHE DE LA BD
export const deleteCar = async (id) => {
    const response = await fetch(carUrlBack+id, {
        method: 'DELETE'
    })
    const carDelete = await response.json();
    if(carDelete.error) console.log(carDelete.error)
    console.log('Coche Borrado')
    return
};

//PARA ACTUALIZAR UN COCHE DE LA BD
export const updateCar = async (id, bodyParam) => {
    const response = await fetch(carUrlBack+id, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: bodyParam
    })
    const carUpdate = await response.json()
    if(carUpdate.error) console.log(carUpdate.error)
    console.log(carUpdate)
    return
};

//PARA CREAR COCHES
export const createCar = async (bodyParam) => {
    const response = await fetch(carUrlBack, {
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: bodyParam
    })
    const carCreated = await response.json()
    if(carCreated.error) console.log(carCreated.error)
    console.log(carCreated)
    return
};

//OBTENGO LOS COCHES FAVORITOS DEL USUARIO
export const getFavCarsByUser = async (userId, token) => {
    try {
      const response = await fetch(`${carUrlBack}${userId}/getFavCarByUserId`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Token para autenticación
        },
      });
  
      if (!response.ok) {
        console.error("Error al obtener los favoritos:", await response.text());
        throw new Error(`Error al obtener los coches favoritos: ${response.status}`);
      }
  
      const carsFav = await response.json();
      return carsFav;
    } catch (error) {
      console.error("Error de red o autenticación:", error);
      throw error;
    }
  };
  

//AGREGO COCHES A FAVORITOS DEL USUARIO
export const addCarToFav = async (carId, userId, token) => {
    try {
      const response = await fetch(`http://localhost:9000/cars/${carId}/addCarToFav`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Token en headers
        },
        body: JSON.stringify({ carId, userId }), // Solo enviar id y userId
      });
  
      if (!response.ok) {
        console.error("Error al añadir favorito:", await response.text());
        throw new Error(`Error al añadir el coche a favoritos: ${response.status}`);
      }
  
      const carAddFav = await response.json();
      return carAddFav;
    } catch (error) {
      console.error("Error de red o autenticación:", error);
      throw error;
    }
  };
  

//BORRAR COCHES DE FAVORITOS
export const removeCarFromFav = async (userId, carId, token) => {
    const response = await fetch(carUrlBack+carId+"/deleteCarToFav", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error("Error al eliminar el coche de favoritos.");
    }
    const carRemoveFav = await response.json();
    return carRemoveFav
}
    
