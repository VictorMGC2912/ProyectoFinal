import { updateUser } from "@/api/userFetch";
import React, { useState } from "react";
import styles from "@/styles/EditUserDetails.module.css";

export default function EditUserDetailsComponent(props) {
  const { id, user, setUserHasChanged, userHasChanged, closeUserUpdating } = props;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  // Manejadores de los campos
  const handlerOnChangedName = (e) => setName(e.target.value);
  const handlerOnChangedEmail = (e) => setEmail(e.target.value);
  const handlerOnChangedPassword = (e) => setPassword(e.target.value);

  // Guardo los datos del usuario
  const saveUser = async () => {
    try {
      const updatedUser = { name, email };
      if (password) updatedUser.password = password;

      await updateUser(id, updatedUser);
      setUserHasChanged(!userHasChanged); // Notifico el cambio
      closeUserUpdating(); // Cerrar edicion despues de editar
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <div className={styles["edit-user-container"]}>
      <h2 className={styles["edit-user-title"]}>Editar Usuario</h2>
      <div className={styles["edit-user-form"]}>
        <div>
          <input
            value={name}
            onChange={handlerOnChangedName}
            placeholder="Nombre"
          />
        </div>
        <div>
          <input
            value={email}
            onChange={handlerOnChangedEmail}
            placeholder="Email"
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
        <button className={styles["save-button"]} onClick={saveUser}>
          Guardar Usuario
        </button>
        <button onClick={closeUserUpdating}>Cancelar</button>
      </div>
    </div>
  );
}
