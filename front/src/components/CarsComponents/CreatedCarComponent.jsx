import { createCar } from '@/api/carsFetch';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from 'react';
import { number, object, string } from 'yup';
import styles from "@/styles/CreatedCarComponent.module.css"; // Importa el CSS del componente

export default function CreatedCarComponent(props) {
  const { setCarHasChanged, carHasChanged, closeCarCreation } = props;

  const addCar = async (props) => {
    await createCar(JSON.stringify(props));
    setCarHasChanged(!carHasChanged);
    closeCarCreation();
  };

  const validationSchemaYup = object({
    marca: string().required(),
    modelo: string().required(),
    anio: string().required(),
    descripcion: string().required(),
    precio: number().required(),
    foto: string(),
  });

  return (
    <div className={styles.createCarContainer}>
      <h2 className={styles.title}>Crear Coche</h2>
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            marca: '',
            modelo: '',
            anio: '',
            descripcion: '',
            precio: '',
            foto: '',
          }}
          onSubmit={(values) => addCar(values)}
          validationSchema={validationSchemaYup}
        >
          {() => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Marca:</label>
                <Field
                  className={styles.input}
                  type="text"
                  name="marca"
                  placeholder="Marca..."
                />
                <ErrorMessage
                  name="marca"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Modelo:</label>
                <Field
                  className={styles.input}
                  type="text"
                  name="modelo"
                  placeholder="Modelo..."
                />
                <ErrorMessage
                  name="modelo"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Año:</label>
                <Field
                  className={styles.input}
                  type="text"
                  name="anio"
                  placeholder="Año..."
                />
                <ErrorMessage
                  name="anio"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Descripción:</label>
                <Field
                  className={styles.input}
                  type="text"
                  name="descripcion"
                  placeholder="Descripción..."
                />
                <ErrorMessage
                  name="descripcion"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Precio:</label>
                <Field
                  className={styles.input}
                  type="text"
                  name="precio"
                  placeholder="Precio..."
                />
                <ErrorMessage
                  name="precio"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>URL Foto:</label>
                <Field
                  className={styles.input}
                  type="text"
                  name="foto"
                  placeholder="URL Foto..."
                />
                <ErrorMessage
                  name="foto"
                  component="div"
                  className={styles.error}
                />
              </div>
              <button className={styles.submitButton} type="submit">
                Crear Coche
              </button>
              
              <button className={styles.submitButton} onClick={closeCarCreation}>
                Cerrar Creacion
              </button>
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

