import React, { useState } from 'react'; 
import axios from 'axios';
import styles from "@/styles/UserLoginComponent.module.css"; 
import CreateUserComponent from './CreateUserComponent';

const userUrlBack = 'http://localhost:9000/user/login';

export default function UserLoginComponent({ setIsLoggedIn, setUserRole, setToken, setUserId }) {
    const [email, setEmail] = useState(''); //Estado para el correo electronico
    const [password, setPassword] = useState(''); //Estado para la contrase;a
    const [errorMessage, setErrorMessage] = useState(''); //Estado para errores
    const [showCreateUser, setShowCreateUser] = useState(false); //Estado para mostrar el formulario de creacion de usuario

    //Manejador de inicio de sesion
    const handlerLogin = async (e) => {
        e.preventDefault(); //Previene el comportamiento por defecto del formulario
      
        try {
            //Llamada al backend para autenticar al usuario
          const response = await axios.post(userUrlBack, { email, password });
          const { token, role, _id } = response.data;
            
          //Guarda los datos de autenticacion en el almacenamiento local
          localStorage.setItem("auth-token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("_id", _id);
      
          //Actualiza los estados para indicar que el usuario esta autenticado
          setIsLoggedIn(true);
          setUserRole(role);
          setUserId(_id);
          setToken(token);
      
          alert("Login Exitoso");
        } catch (error) {
          const statusCode = error.response?.status;
          const errorMessage = error.response?.data?.message || "Error desconocido";
      
          setErrorMessage(errorMessage);
      
          // Si el usuario no existe, muestra el formulario para crear usuario
          if (statusCode === 404) {
            setShowCreateUser(true);
          }
        }
    };
      

    //Manejo del evento despues de crear el usuario
    const handleUserCreated = () => {
        setShowCreateUser(false);
        setErrorMessage('Usuario creado con éxito. Ahora puedes iniciar sesión.');
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
            <form className={styles.loginForm} onSubmit={handlerLogin}>
                <div className={styles.formGroup}>
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
                <div className={styles.formGroup}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <button type="submit" className={styles.loginButton}>
                    Iniciar Sesión
                </button>
            </form>

            {/* Mostrar el componente para crear usuario si es necesario */}
            {showCreateUser && <CreateUserComponent onUserCreated={handleUserCreated} />}
        </div>
    );
}
