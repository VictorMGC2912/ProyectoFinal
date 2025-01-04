
const carUrlBack = 'http://localhost:9000/cars'

export const getAllCars = async () => {
    //Peticion al back de todos los coches
    const response = await fetch(carUrlBack);
    const cars = await response.json();
    return cars;
};