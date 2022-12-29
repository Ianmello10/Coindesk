import React from "react";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import showStore from "../stores/showStore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";

function Show() {
  const store = showStore();

  const params = useParams();

  useEffect(() => {
    store.fetchData(params.id);

    return () => {
      store.reset();
    };
  }, []);

  if (!store.data) {
    return <></>;
  }

  const description = store.data.description;

  return (
    <>
      <Header />
      {store.data && (
        <>
          <header className="w-[90%] md:w-[50%] mx-auto flex flex-col  h-20 items-center  mt-10">
            <img className="w-32 mt-4" src={store.data.image.large} />

            <h2 className="text-2xl font-bold mt-8">
              {store.data.name} ({store.data.symbol})
            </h2>
          </header>

          <div className="w-[90%] md:w-[70%]  mx-auto  "> 
          <ResponsiveContainer   width="100%" height={400}> 

             <AreaChart
              className="mt-48 w-full"
              data={store.graphData}
              margin={{
                top: 10,
                right: 40,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Price"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
            </ResponsiveContainer> 

          </div>
          <div className="w-[90%]   md:w-[63%] mx-auto mt-10 mb-10 ">
            <h2 className="mb-2">
              <span className="text-lg font-bold">Market Cap</span> :{" "}
              {store.data.market_cap_rank}
            </h2>
            <h2 className="mb-2">
              <span className="text-lg font-bold">Total Suply</span> :{" "}
              {store.data.market_data.total_supply}
            </h2>
            <h2 className="mb-2">
              <span className="text-lg font-bold">Price </span> : $
              {store.data.market_data.current_price.usd}
            </h2>
            <h2>
              {" "}
              <span className="text-lg font-bold">Description </span>:{" "}
              {description.en}
            </h2>
          </div>
        </>
      )}
    </>
  );
}

export default Show;
