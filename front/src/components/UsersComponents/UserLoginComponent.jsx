import axios from 'axios'; // Importo axios para peticiones HTTP
import React, { useState } from 'react'; 
import styles from "@/styles/UserLoginComponent.module.css"; 

// URL del backend para la ruta de login del usuario
const userUrlBack = 'http://localhost:9000/user/login';

export default function UserLoginComponent({ setIsLoggedIn, setUserRole }) {
    // Estados para manejar el formulario y los errores
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    // Función manejadora del login
    const handlerLogin = async (e) => {
        e.preventDefault(); // Evita la recarga de la página al enviar el formulario

        try {
            // Realizo la solicitud POST al backend
            const response = await axios.post(userUrlBack, { email, password });

            // Verifico si la respuesta tiene el token, lo que significa que el login fue exitoso
            const { token, role } = response.data;

            // Si no hay token, lanzamos un error
            if (!token) {
                throw new Error('Login fallido: Token no recibido.');
                
            }

            // Guardo el token en el almacenamiento local del navegador
            localStorage.setItem('authToken', token);

            // Cambio el estado para indicar que el usuario ha iniciado sesión correctamente
            setIsLoggedIn(true);
            setUserRole(role); //Asigna el rol del usuario

            // Muestro un mensaje de éxito
            alert('Login Exitoso');
            
        } catch (error) {
            // Si ocurre un error, muestro un mensaje de error
            console.error('Error en el login:', error);

            // Obtengo el mensaje de error del servidor o mostramos un mensaje genérico
            setErrorMessage(
                error.response?.data?.message || 'Credenciales inválidas o error en el servidor'
            );
        }
    };

    return (
        <div className={styles['login-container']}>
            {/* Contenedor principal del formulario */}
            <h2 className={styles['login-title']}>Iniciar Sesión</h2>
            <form className={styles['login-form']} onSubmit={handlerLogin}>
                {/* Campo para el correo electrónico */}
                <div className={styles['form-group']}>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email" // Campo de tipo correo
                        id="email"
                        value={email} // Valor del estado
                        onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado al escribir
                        placeholder="Ingresa tu correo"
                        required
                    />
                </div>
                {/* Campo para la contraseña */}
                <div className={styles['form-group']}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password" // Campo de tipo contraseña
                        id="password"
                        value={password} // Valor del estado
                        onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado al escribir
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>
                {/* Mensaje de error (si ocurre) */}
                {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
                {/* Botón para enviar el formulario */}
                <button type="submit" className={styles['login-button']}>
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

