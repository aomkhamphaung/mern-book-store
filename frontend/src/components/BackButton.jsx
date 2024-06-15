import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({destinatin="/"}) => {
  return (
      <div className='flex'>
          <Link to={destinatin} className='bg-sky-700 text-white px-4 py-1 rounded-lg w-fit'>
              <BsArrowLeft className='text-2xl'/>
          </Link>
    </div>
  )
}

export default BackButton