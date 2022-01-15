import Forms from '../components/Forms'

const NewClient = () => {
    return (
        <>
            <h1 className=' font-black text-4xl text-indigo-600'>Nuevo Cliente</h1>
            <p className='mt-3'>Llena los siguientes campos para agregar un cliente</p>
            <Forms />
        </>
    )
}

export default NewClient
