import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Forms from '../components/Forms'
import Spinner from '../components/Spinner';

const EditClient = () => {

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
        <div>
            {
            loading ? <Spinner/> : !client?.name ?  (
            <p 
                className=" bg-red-600 rounded-lg text-white text-center p-3 text-2xl uppercase font-bold">
                La pagina que estas visitando no es valida, por favor, introduzca una URL valida
            </p> 
            ) : (
            <>
                <h1 className=' font-black text-4xl text-indigo-600'>Editar Cliente</h1>
                <p className='mt-3'>Utiliza este Formulario para Editar tus datos</p>
                <Forms 
                    client={client}
                    loading={loading}
                />
            </>)}
        </div>
    )
}

export default EditClient
