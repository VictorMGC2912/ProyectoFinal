import React, { useState, useEffect } from "react";
import { getUser } from "@/api/userFetch";
import EditUserDetailsComponent from "./EditUserDetailsComponent";
import styles from '@/styles/UserDetailsComponent.module.css';

export default function UserDetailsComponent(props) {
  const { id, closeUserUpdating, setUserHasChanged, userHasChanged } = props;

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const userAux = await getUser(id);
        setUser(userAux.data);
      } catch (error) {
        console.error("Error al cargar los detalles del usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserProfile();
  }, [id]);

  const initUpdateProcessUser = () => setIsEditing(true);
  const exitUpdateProcessUser = () => setIsEditing(false);

  if (loading) {
    return <p className={styles.loadingText}>Cargando datos del usuario...</p>;
  }

  return (
    <div className={styles.userDetailsContainer}>
      {user ? (
        isEditing ? (
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
