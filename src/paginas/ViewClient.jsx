import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from '../components/Spinner';

const ViewClient = () => {
    const {id} = useParams()
    const [client, setClient] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getClientAPI = async () =>{
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const answer = await fetch(url)
                const result = await answer.json()

                setClient(result)
                
            } catch (error) {
                console.log(error)
            }
            
            setLoading(!loading)

        }
        getClientAPI()
    }, [])

    return (
        loading ? <Spinner/> :
        Object.keys(client).length === 0 ? <p 
        className=" bg-red-600 rounded-lg text-white text-center p-3 text-2xl uppercase font-bold">
                La pagina que estas visitando no es valida, por favor, introduzca una URL valida
            </p> : (
        <div>
                    <h1 className=' font-black text-4xl text-indigo-600'>Estas viendo al cliente: {client.name}</h1>
                    <p className='mt-3'>Información mas detallada del cliente:</p>
                    <p className="text-4xl text-gray-600 mt-10">
                        <span className="uppercase font-bold text-gray-800">Cliente: </span> 
                        {client.name}
                    </p>
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="uppercase font-bold text-gray-800">Empresa: </span> 
                        {client.business}
                    </p>
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="uppercase font-bold text-gray-800">E-mail: </span> 
                        {client.email}
                    </p>
        
                    {client.phone ? (
                        <p className="text-2xl text-gray-600 mt-4">
                        <span className="uppercase font-bold text-gray-800">Telefono: </span> 
                        {client.phone}
                    </p>
                    ) :
                        null
                    }
        
                    {client.notes ? (
                        <p className="text-2xl text-gray-600 mt-4">
                        <span className="uppercase font-bold text-gray-800">Notas: </span> 
                        {client.notes}
                    </p>
                    ) :
                        null
                    }    
        </div>
        )
    )
}

export default ViewClient
