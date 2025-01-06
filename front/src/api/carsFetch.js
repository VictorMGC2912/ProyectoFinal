
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
    
