import { createCar } from '@/api/carsFetch';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from 'react'
import { object, string } from 'yup';

export default function CreatedCarComponent() {

    const { setCarHasChanged, carHasChanged, closeCarCreation } = props;

    const addCar = async (props) => {
        await createCar(JSON.stringify(props))
        setCarHasChanged(!carHasChanged)
        closeCarCreation()
    }

    const validationSchemaYup = object({
        marca: string().required(),
        modelo: string().required(),
        anio: number().required(),
        descripcion: string().required(),
        precio: string().required(),
        foto: string(),
    })

  return (
    <div>
      <h2>Crear Coche</h2>
      <div>
        <Formik
            initialValues={{
                marca: '',
                modelo: '',
                anio: '',
                descripcion: '',
                precio: '',
                foto: ''
            }}
            onSubmit={(values) => addCar(values)}validationSchema={validationSchemaYup}
        >
            {
                ({}) => (<Form>
                    <div>
                        <span>Marca</span>
                        <Field type='text' name='marca' placeholder='Marca...' />
                        <ErrorMessage name='marca' component='div' />
                    </div>
                    <div>
                        <span>Modelo</span>
                        <Field type='text' name='modelo' placeholder='Modelo...' />
                        <ErrorMessage name='modelo' component='div' />
                    </div>
                    <div>
                        <span>Año</span>
                        <Field type='text' name='año' placeholder='Año...' />
                        <ErrorMessage name='año' component='div' />
                    </div>
                    <div>
                        <span>Descrpcion</span>
                        <Field type='text' name='descripcion' placeholder='Descripcion...' />
                        <ErrorMessage name='descripcion' component='div' />
                    </div>
                    <div>
                        <span>Precio</span>
                        <Field type='text' name='precio' placeholder='Precio...' />
                        <ErrorMessage name='precio' component='div' />
                    </div>
                    <div>
                        <span>Url Foto</span>
                        <Field type='text' name='foto' placeholder='Url Foto...' />
                        <ErrorMessage name='foto' component='div' />
                    </div>
                    <button type='submit'>Crear Coche</button>
                </Form>)
            }
        </Formik>
      </div>
    </div>
  )
}
