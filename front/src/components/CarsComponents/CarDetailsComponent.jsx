import { deleteCar, getCar } from '@/api/carsFetch';
import React, { useEffect, useState } from 'react'
import EditCarDetailsComponent from './EditCarDetailsComponent';

export default function CarDetailsComponent(props) {

    const { id, closeCarDetails, setCarHasChanged, carHasChanged } = props;

    const [ car, setCar ] = useState([]);
    const [ isEditing, setIsEditing ] = useState(false);

    useEffect(() => {
        const loadCar = async () => {
            const carAux = await getCar(id);
            setCar(carAux.data)
        }
        loadCar()
    }, [id]);

    const initUpdateProcessCar = () => {
        setIsEditing(true)
    }

    const handlerDeleteCar = () => {
        deleteCar(id)
        setCarHasChanged(!carHasChanged)
    }

  return (
    <div>
        {
            !isEditing
            ?
                <div>
                    <h2>Car Details</h2>
                    <div>
                        <p>Marca: {car.marca}</p>
                        <p>Modelo: {car.modelo} </p>
                        <p>Anio: {car.anio} </p>
                        <p>Descripcion: {car.descripcion} </p>
                        <p>Precio: {car.precio} </p>
                        <img src= {car.foto} alt="" />
                    </div>
                    <div>
                        <h4>Opciones</h4>
                        <div>
                            <button onClick={initUpdateProcessCar}>Actualizar Coche</button>
                            <button onClick={handlerDeleteCar}>Borrar Coche</button>
                        </div>
                    </div>
                </div>
            :
            <EditCarDetailsComponent id={id} car={car} setCarHasChanged={setCarHasChanged} carHasChanged={carHasChanged} closeCarDetails={closeCarDetails} />
        }
        <hr />
        <div>
            <button onClick={closeCarDetails}>Cerrar Detalles</button>
        </div>
    </div>
  )
}
