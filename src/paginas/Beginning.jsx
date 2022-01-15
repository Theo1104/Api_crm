import { useState, useEffect } from 'react'
import Client from '../components/Client'

const Beginning = () => {

    const [clients, setClients] = useState([])

    useEffect(() => {
        const getApiClients = async () =>{
            try {
                const url = "http://localhost:4000/clientes"
                const answer = await fetch(url)
                const result = await answer.json()

                setClients(result)

            } catch (error) {
                console.log(error)
            }
        }
        getApiClients()
    }, [])

    const handleRemove = async (id) =>{
        const  accept = confirm("¿Deseas Eliminar este Cliente?")
        if(accept){
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const answer = await fetch(url, {
                    method:"DELETE"
                })
                await answer.json()

                const clientsArray = clients.filter(client => client.id !== id)
                setClients(clientsArray)

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <h1 className=' font-black text-4xl text-indigo-600'>Clientes</h1>
            <p className='mt-3'>Administra tus clientes</p>

            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-indigo-700 text-white'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {clients.map(client => (
                        <Client 
                            key={client.id}
                            client={client}
                            handleRemove={handleRemove}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Beginning
