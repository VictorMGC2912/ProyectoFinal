import axios from 'axios';
import React, { useState } from 'react'
import styles from "@/styles/UserLoginComponent.module.css"

const userUrlBack = 'http://localhost:9000/user/login';

export default function UserLoginComponent(setIsLoggedIn) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlerLogin = async(e) => {
        e.preventDefatul();

        try{

            const response = await axios.post(userUrlBack, {email, password});
            const {token} = response.data;

            //Guarda el token en el almacenamiento local del navegador
            localStorage.setItem('authToken', token)

            //Cambia el estado del Login
            setIsLoggedIn(true);

            alert('Login Exitoso');

        }catch(error) {
            console.error('Error en el login', error);
            setErrorMessage(error.response?.data?.message || 'Error en el servidor');

        }
    }

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
    </div>
  )
}
