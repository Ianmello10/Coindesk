import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return ( 
    <> 
      <header className='w-full'> 


        <div className='w-full   bg-gray-800 py-6 flex items-center justify-center'> 
            <h1 className='text-3xl text-yellow-300 font-bold'> <Link to='/'>CoinDesk</Link></h1>
        </div>
      </header>
     </>
  )
}

export default Header