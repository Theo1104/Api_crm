import { useNavigate } from "react-router-dom"

const Client = ({client, handleRemove}) => {

    const navigate = useNavigate()

    const {name, business, email, phone, notes, id} = client

    return (
        <tr className='border hover:bg-gray-100'>
            <td className='p-3'>{name}</td>
            <td className='p-3'>
                <p><span className=' text-gray-800 uppercase font-bold'>E-mail: </span>{email}</p>
                {phone ? (
                    <p><span className=' text-gray-800 uppercase font-bold'>Tel: </span>{phone}</p>
                ) :
                    null
                }
            </td>
            <td className='p-3'>{business}</td>
            <td className='p-3'>

            <button
                    type='button'
                    className='bg-green-600 hover:bg-green-800 p-2 block w-full text-white uppercase font-bold text-xs'
                    onClick={() => navigate(`/clients/${id}`)}
                >Ver</button>

                <button
                    type='button'
                    className='bg-indigo-600 hover:bg-indigo-800 p-2 block w-full mt-3 text-white uppercase font-bold text-xs'
                    onClick={() => navigate(`/clients/edit/${id}`)}
                >Editar</button>

                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-800 p-2 block w-full mt-3 text-white uppercase font-bold text-xs'
                    onClick={() => handleRemove(id)}
                >Eliminar</button>

            </td>
        </tr>
    )
}

export default Client
