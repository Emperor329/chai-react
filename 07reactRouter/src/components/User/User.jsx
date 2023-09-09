import React from 'react'
import  {useParams} from 'react-router-dom'
function User() {
    const {userid} = useParams()
  return (
    
    <div className='text-3xl p-4 bg-gray-700'>
      User:{userid}
    </div>
  )
}

export default User
