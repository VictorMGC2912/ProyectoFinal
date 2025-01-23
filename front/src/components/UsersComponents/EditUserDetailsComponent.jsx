import { updateUser } from '@/api/userFetch';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/EditUserDetails.module.css'; // Asegúrate de que este archivo CSS exista

export default function EditUserDetailsComponent(props) {
  const { id, setUserHasChanged, userHasChanged, closeUserUpdating } = props;

  // Estados de los campos
  const [user, setUser] = useState(null); // Inicializamos como null
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await updateUser(id); // Cambia esta URL según tu backend
        const data = await response.json();
        setUser(data); // Guardo el usuario completo en el estado
        setName(data.name || ''); // Inicializo los valores de los inputs
        setEmail(data.email || '');
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      }
    };
    loadUser();
  }, [id]);

  // Manejadores de los campos
  const handlerOnChangedName = (e) => setName(e.target.value);
  const handlerOnChangedEmail = (e) => setEmail(e.target.value);
  const handlerOnChangedPassword = (e) => setPassword(e.target.value);

  // Guardamos los datos actualizados del usuario
  const saveUser = async () => {
    try {
      await updateUser(id, JSON.stringify({ name, email, password }));
      setUserHasChanged(!userHasChanged); // Notificamos el cambio
      closeUserUpdating(); // Cerramos el modal
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (!user) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className={styles['edit-user-container']}>
      <h2 className={styles['edit-user-title']}>Editar Usuario</h2>
      <div className={styles['edit-user-form']}>
        <div>
          <input
            value={name}
            onChange={handlerOnChangedName}
            placeholder={user.name || 'Nombre'}
          />
        </div>
        <div>
          <input
            value={email}
            onChange={handlerOnChangedEmail}
            placeholder={user.email || 'Email'}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={handlerOnChangedPassword}
            placeholder="Contraseña (opcional)"
          />
        </div>
        <button className={styles['save-button']} onClick={saveUser}>
          Guardar Usuario
        </button>
      </div>
    </div>
  );
}
