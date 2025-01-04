import { getAllCars } from "@/api/carsFetch";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [cars, setCars] = useState([]);

  const getAllCarsAux = async () => {
    const carsAux = await getAllCars();
    console.log(carsAux);
    setCars(carsAux.data);
  };

  useEffect(() => {
    getAllCarsAux();
  }, []);

  return (
    <>
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
    </>
  );
}
