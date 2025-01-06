import { getAllCars } from "@/api/carsFetch";
import CreatedCarComponent from "@/components/CarsComponents/CreatedCarComponent";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState(null);
  const [carHasChanged, setCarHasChanged] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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
    <>
    <div className="home-container">
      <h1 className="home-title">APP COCHES</h1>
      <div className="home-actions">
        {!isCreating ? (
          <button className="create-button" onClick={handlerCreateCar}>
            Crear Coche
          </button>
        ): (
          <CreatedCarComponent
            setCarHasChanged={setCarHasChanged}
            carHasChanged={carHasChanged}
            closeCarCreation={closeCarCreation}
          />
        )}
        <hr />
      </div>
      <div className="cars-list">
        {cars &&
          cars.map((car, index) => {
            return (
              <div className="car-item" key={index}>
                <span>{car.id} | </span>
                <span>{car.marca} | </span>
                {/* <img src={car.foto} />    */}
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
}
