import React from 'react'
import './Register.css'

const Register = () => {
  return (
    <div className='container'>
        <form action="/">
            <label htmlFor="iname">
                Nome: 
            </label>
                <input type="text" id='iname' />
        </form>
    </div>
  )
}

export default Register