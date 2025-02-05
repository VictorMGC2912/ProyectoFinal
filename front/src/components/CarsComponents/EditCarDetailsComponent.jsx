import { updateCar } from '@/api/carsFetch';
import React, { useState } from 'react';
import styles from '@/styles/EditCarDetails.module.css';

export default function EditCarDetailsComponent(props) {
  const { id, car, setCarHasChanged, carHasChanged, closeCarDetails } = props;

  const [marca, setMarca] = useState(''); //Valor del campo marca
  const [modelo, setModelo] = useState(''); //Valor del campo modelo
  const [anio, setAnio] = useState(''); //Valor del campo anio
  const [descripcion, setDescripcion] = useState(''); //Valor del campo descripcion
  const [precio, setPrecio] = useState(''); //Valor del campo precio
  const [foto, setFoto] = useState(''); //Valor del campo foto

  //Manejadores para agregar valores proveniente de los inputs
  const handlerOnChangedMarca = (e) => setMarca(e.target.value);
  const handlerOnChangedModelo = (e) => setModelo(e.target.value);
  const handlerOnChangedAnio = (e) => setAnio(e.target.value);
  const handlerOnChangedDescripcion = (e) => setDescripcion(e.target.value);
  const handlerOnChangedPrecio = (e) => setPrecio(e.target.value);
  const handlerOnChangedFoto = (e) => setFoto(e.target.value);

  //Guardamos los valores del coche
  const saveCar = async () => {
    await updateCar(id, JSON.stringify({ marca, modelo, anio, descripcion, precio, foto })); //Convertimos en JSON los valores antes de enviarlos
    setCarHasChanged(!carHasChanged);
    closeCarDetails();
  };

  return (
    <div className={styles.editCarContainer}>
      <h2 className={styles.editCarTitle}>Editar {car.marca} {car.modelo}</h2>
      <div className={styles.editCarForm}>
        <div>
          <input value={marca} onChange={handlerOnChangedMarca} placeholder={car.marca} />
        </div>
        <div>
          <input value={modelo} onChange={handlerOnChangedModelo} placeholder={car.modelo} />
        </div>
        <div>
          <input value={anio} onChange={handlerOnChangedAnio} placeholder={car.anio} />
        </div>
        <div>
          <input value={descripcion} onChange={handlerOnChangedDescripcion} placeholder={car.descripcion} />
        </div>
        <div>
          <input value={precio} onChange={handlerOnChangedPrecio} placeholder={car.precio} />
        </div>
        <div>
          <input value={foto} onChange={handlerOnChangedFoto} placeholder={car.foto} />
        </div>
        <button className={styles.saveButton} onClick={saveCar}>
          Guardar Coche
        </button>
      </div>
    </div>
  );
}

