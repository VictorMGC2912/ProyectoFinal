import { updateCar } from '@/api/carsFetch';
import React, { useState } from 'react';
import styles from '@/styles/EditCarDetails.module.css';

export default function EditCarDetailsComponent(props) {
  const { id, car, setCarHasChanged, carHasChanged, closeCarDetails } = props;

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [foto, setFoto] = useState('');

  const handlerOnChangedMarca = (e) => setMarca(e.target.value);
  const handlerOnChangedModelo = (e) => setModelo(e.target.value);
  const handlerOnChangedAnio = (e) => setAnio(e.target.value);
  const handlerOnChangedDescripcion = (e) => setDescripcion(e.target.value);
  const handlerOnChangedPrecio = (e) => setPrecio(e.target.value);
  const handlerOnChangedFoto = (e) => setFoto(e.target.value);

  const saveCar = async () => {
    await updateCar(id, JSON.stringify({ marca, modelo, anio, descripcion, precio, foto }));
    setCarHasChanged(!carHasChanged);
    closeCarDetails();
  };

  return (
    <div className={styles['edit-car-container']}>
      <h2 className={styles['edit-car-title']}>Editar {car.marca} {car.modelo}</h2>
      <div className={styles['edit-car-form']}>
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
        <button className={styles['save-button']} onClick={saveCar}>
          Guardar Coche
        </button>
      </div>
    </div>
  );
}

