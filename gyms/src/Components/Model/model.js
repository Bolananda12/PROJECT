import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
const Model = ({handleClose,Content,header}) => {
  return (
    <div className='w-full h-[100vh] fixed bg-black bg-opacity-50 text-black top-0 left-0 flex justify-center'>
     <div className='w-1/2 bg-white rounded-lg h-fit mt-32 p-5' >
      <div className='flex justify-between '>
        <div className='text-3xl font-bold text-gray-900 mb-6'> {header}</div>
         <div onClick={()=>handleClose()}><CloseIcon sx={{fontsize:"32px"}} /></div>
      </div>
      <div className ="mt-10">{Content}</div>
    </div>
    </div>
  )
}

export default Model
