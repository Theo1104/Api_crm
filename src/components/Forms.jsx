import React from 'react'
import {Formik, Form, Field} from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import Message from './Message'
import Spinner from '../components/Spinner';

const Forms = ({client, loading}) => {

    const navigate = useNavigate()

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
                            .min(3,"El Nombre del cliente debe tener al menos 3 letras")
                                .max(10,"El Nombre del cliente debe tener menos de 10 letras")
                                    .required("El Nombre del cliente es Obligatorio"),
        business: Yup.string()
                                        .required("La Empresa del cliente es Obligatorio"),
        email: Yup.string()
                            .email("El Email no es valido")
                                .required("El Email es Obligatorio"),
        phone: Yup.number()
                            .integer("El Numero no es valido")
                                .positive("El Numero no es valido")
                                        .typeError("El Numero no es valido"),
        notes: ""
    })

    const handleSubmit = async (values)  =>{
        let answer
        try {
            //Edit Client
            if(client.id){
                const url = `http://localhost:4000/clientes/${client.id}`
                answer = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }else{
                //Create Client
                const url = "http://localhost:4000/clientes"
                answer = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }
            await answer.json()
            navigate("/clients")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        loading ? <Spinner/> :  (
        <div className=' bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className=' text-gray-600 font-bold text-xl uppercase text-center'>{client?.name ? "Editar Cliente" : "Agregar Cliente"}</h1>

            <Formik
                initialValues={{
                    name: client?.name ?? "",
                    business: client?.business ?? "",
                    email: client?.email ?? "",
                    phone: client?.phone ?? "",
                    notes: client?.notes ?? "",
                }}
                enableReinitialize={true}
                onSubmit={async (values, {resetForm}) =>{
                    await handleSubmit(values)

                    resetForm()
                }}
                validationSchema={newClientSchema}
            >
                {({errors, touched}) => {

                    return (

                
                <Form
                    className='mt-10'
                >
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='name'
                        >Nombre:</label>
                        <Field
                            id="name"                          
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Introduzca el Nombre del Cliente"
                            name="name"
                        />
                        {errors.name && touched.name ? (
                            <Message>{errors.name}</Message>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='empresa'
                        >Empresa:</label>
                        <Field
                            id="empresa" 
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Introduzca la Empresa del Cliente"
                            name="business"
                        />
                        {errors.business && touched.business ? (
                            <Message>{errors.business}</Message>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='email'
                        >E-mail:</label>
                        <Field
                            id="email" 
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Introduzca el E-mail del Cliente"
                            name="email"
                        />
                        {errors.email && touched.email ? (
                            <Message>{errors.email}</Message>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='telefono'
                        >Telefono:</label>
                        <Field
                            id="telefono" 
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Introduzca el Telefono del Cliente"
                            name="phone"
                        />
                        {errors.phone && touched.phone ? (
                            <Message>{errors.phone }</Message>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='notas'
                        >Notas:</label>
                        <Field
                            as="textarea"
                            id="notas" 
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Notas del Cliente"
                            name="notes"
                        />
                    </div>

                    <input 
                    type="submit"
                    value={client?.name ? "Editar Cliente" : "Agregar cliente"}
                    className='mt-5 w-full bg-indigo-800 p-3 text-white uppercase font-bold text-lg'
                     />

                </Form>
                )}}
            </Formik>
        </div>
        )
    )
}

Forms.defaultProps = {
    client: {},
    loading: false
}

export default Forms
