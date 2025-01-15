import React, { useState } from 'react'; 
import axios from 'axios';
import styles from "@/styles/UserLoginComponent.module.css"; 
import CreateUserComponent from './CreateUserComponent';

const userUrlBack = 'http://localhost:9000/user/login';

export default function UserLoginComponent({ setIsLoggedIn, setUserRole, setToken, setUserId }) {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [showCreateUser, setShowCreateUser] = useState(false);

    const handlerLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post(userUrlBack, { email, password });
          const { token, role, _id } = response.data;
      
          localStorage.setItem("auth-token", token);
          localStorage.setItem("role", role);
      
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
      

    const handleUserCreated = () => {
        setShowCreateUser(false);
        setErrorMessage('Usuario creado con éxito. Ahora puedes iniciar sesión.');
    };

    return (
        <div className={styles['login-container']}>
            <h2 className={styles['login-title']}>Iniciar Sesión</h2>
            <form className={styles['login-form']} onSubmit={handlerLogin}>
                <div className={styles['form-group']}>
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
                <div className={styles['form-group']}>
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
                {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
                <button type="submit" className={styles['login-button']}>
                    Iniciar Sesión
                </button>
            </form>

            {/* Mostrar el componente para crear usuario si es necesario */}
            {showCreateUser && <CreateUserComponent onUserCreated={handleUserCreated} />}
        </div>
    );
}
