import React from 'react'

const Message = ({children}) => {
    return (
        <div className=' bg-red-600 p-3 rounded-lg my-4 text-white font-bold text-center text-xl uppercase'>
            {children}
        </div>
    )
}

export default Message
