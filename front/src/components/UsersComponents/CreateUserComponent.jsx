import React, { useState } from 'react';
import styles from "@/styles/CreateUser.module.css";

const CreateUserComponent = ({ onUserCreated }) => {
    const [name, setName] = useState(''); //Valor del nombre
    const [email, setEmail] = useState(''); //Valor del email
    const [password, setPassword] = useState(''); //Valor del password
    const [errorMessage, setErrorMessage] = useState(''); //Posibles errores
    const [successMessage, setSuccessMessage] = useState(''); //Mensaje de exito

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/user/signup', { //Hacemos fetch a la funcion del back de darse de alta
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }), //Convertimos los valores a JSON antes de enviarlos
            });
            const data = await response.json();

            if (data.error) {
                setErrorMessage(data.error);
            } else {
                setSuccessMessage('Usuario creado exitosamente.');
                onUserCreated(); // Notifica al componente padre que el usuario ha sido creado
            }
        } catch (error) {
            setErrorMessage('Error al crear el usuario.');
            console.error('Error en el registro:', error);
        }
    };

    return (
      <div className={styles.createUserContainer}>
      <h2 className={styles.createUserTitle}>Crear Usuario</h2>
      <form className={styles.createUserForm} onSubmit={handleCreateUser}>
        {/* Campo para el nombre */}
        <div className={styles.createUserFormGroup}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        {/* Campo para el correo */}
        <div className={styles.createUserFormGroup}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        {/* Campo para la contraseña */}
        <div className={styles.createUserFormGroup}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crea una contraseña"
            required
          />
        </div>
        {/* Mensajes de error y éxito */}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {/* Botón para crear usuario */}
        <button type="submit" className={styles.createUserButton}>
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default CreateUserComponent;
