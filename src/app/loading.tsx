import React from 'react'
import { ClipLoader } from 'react-spinners'

const loading = () => {
  return (
    <>
      <div className="flex items-center content-center">
        <ClipLoader color="#36d7b7" size={60}/>
      </div>
    </>
  )
}

export default loading