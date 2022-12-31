import React from "react";
import { Link } from "react-router-dom";
import img from '../../src/images/btc.png'


function ListCoins({ coin }) {

  return ( 
    <div className="w-full">
      <Link to={`/${coin.id}`}>
        <div className="flex h-14 items-center justify-between mt-8 px-2 border-b-[1px] border-gray-300">

          
          <img className="w-10" src={coin.image} />
          {coin.name}

          <div className="flex w-auto justify-around"> 

          { coin.price === undefined ?   (
             <> </>           ) :  <img src={img} className="w-4 mr-2" />
           
           }
            {coin.price}</div>
        </div>
      </Link>
    </div>
         );
}

export default ListCoins;
