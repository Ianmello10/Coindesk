import "../../src/App.css";

import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import homeStore from "../stores/homeStore";
import Header from "../components/Header";
import ListCoins from "../components/ListCoins";

function Home() {
  const store = homeStore();

  useEffect(() => {
    store.fetchCoins();
  }, []);

  return (
    <div className="App">
      <Header />
 
  <div className=" w-[90%] md:w-[40%] mt-6 mx-auto flex flex-col items-center"> 

      <h2 className="text-center text-2xl mt-8 mb-8 font-bold text-gray-800">
        Busque sua crypto !
      </h2>
      <input
        className="border-2 rounded-sm py-2 w- border-gray-600 w-full "
        placeholder="Busque..."
        type="text"
        value={store.query}
        onChange={store.setQuery}
      />
  </div>
      <div className="w-[90%] md:w-[40%] mx-auto mt-10 flex flex-col mb-10">
        {store.coins.map((coin) => {
          return <ListCoins key={coin.id} coin={coin} />;
        })}
      </div>
    </div>
  );
}

export default Home;
