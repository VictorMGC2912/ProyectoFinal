import React, { useState, useEffect } from "react";
import { getUser } from "@/api/userFetch";
import EditUserDetailsComponent from "./EditUserDetailsComponent";

export default function UserDetailsComponent(props) {
  const { id, closeUserUpdating, setUserHasChanged, userHasChanged } = props;

  const [user, setUser] = useState(null); // Estado del usuario
  const [isEditing, setIsEditing] = useState(false); // Controla de edición
  const [loading, setLoading] = useState(false); // Controla de estado de carga

  // Función para cargar datos del usuario al pulsar el botón "Ver Perfil"
  const loadUserProfile = async () => {
    try {
      setLoading(true); // Inicia el estado de carga
      console.log("Obteniendo datos del usuario con ID:", id);
      const userAux = await getUser(id);
      console.log("Datos del usuario recibidos:", userAux.data);
      setUser(userAux.data); // Guarda los datos del usuario
    } catch (error) {
      console.error("Error al cargar los detalles del usuario:", error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Ejecuta `loadUserProfile` al montar el componente
  useEffect(() => {
    loadUserProfile();
  }, []);

  // Manejador para iniciar la actualizacion de datos del usuario
  const initUpdateProcessUser = () => {
    setIsEditing(true);
  };

  // Manejador para dejar de editar
  const exitUpdateProcessUser = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div>
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
          <div>
            <h2>Perfil del Usuario</h2>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={initUpdateProcessUser}>Editar Usuario</button>
            <button onClick={closeUserUpdating}>Cerrar</button>
          </div>
        )
      ) : (
        <p>Error al cargar el perfil o usuario no encontrado.</p>
      )}
    </div>
  );
}
