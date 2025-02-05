import React, { useState, useEffect } from "react";
import { getUser } from "@/api/userFetch";
import EditUserDetailsComponent from "./EditUserDetailsComponent";
import styles from '@/styles/UserDetailsComponent.module.css';

export default function UserDetailsComponent(props) {
  const { id, closeUserUpdating, setUserHasChanged, userHasChanged } = props;

  const [user, setUser] = useState(null); //Estado inicial de user
  const [isEditing, setIsEditing] = useState(false); //COntrola si el usuario esta en modo edicion
  const [loading, setLoading] = useState(false);//Estado para manejar la carga de datos

  //Hook para la carga de datos del usuario
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true); //Cambiamos a true el indicador de carga
        const userAux = await getUser(id); //Llama a la API para cargar los datos del usuario por su ID
        setUser(userAux.data);
      } catch (error) {
        console.error("Error al cargar los detalles del usuario:", error);
      } finally {
        setLoading(false); //Desactiva el indicador de cargando
      }
    };
    loadUserProfile();
  }, [id]); //Se ejecuta cada vez que le pasamos el ID del usuario

  //Inicial el proceso de edicion
  const initUpdateProcessUser = () => setIsEditing(true);
  //Desactiva el proceso de edicion
  const exitUpdateProcessUser = () => setIsEditing(false);

  //Muestro mensaje de carga mientras se obtiene los datos del usuario
  if (loading) {
    return <p className={styles.loadingText}>Cargando datos del usuario...</p>;
  }

  return (
    <div className={styles.userDetailsContainer}>
      {user ? (
        isEditing ? ( //Muestra el componente de edicion si esta en modo edicion
          <EditUserDetailsComponent
            id={id}
            user={user}
            setUserHasChanged={setUserHasChanged}
            userHasChanged={userHasChanged}
            closeUserUpdating={exitUpdateProcessUser}
          />
        ) : (
          <div className={styles.userInfo}>
            <h2 className={styles.userTitle}>Perfil del Usuario</h2>
            <p className={styles.userText}><strong>Nombre:</strong> {user.name}</p>
            <p className={styles.userText}><strong>Email:</strong> {user.email}</p>
            <div className={styles.buttonGroup}>
              <button className={styles.editButton} onClick={initUpdateProcessUser}>
                Editar Usuario
              </button>
              <button className={styles.closeButton} onClick={closeUserUpdating}>
                Cerrar
              </button>
            </div>
          </div>
        )
      ) : (
        <p className={styles.errorText}>Error al cargar el perfil o usuario no encontrado.</p>
      )}
    </div>
  );
}
