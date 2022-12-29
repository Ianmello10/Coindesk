import create from "zustand";
import axios from "axios";
import debounce from "../helpers/debounce";

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: "",

  setQuery: (e) => {
    set({ query: e.target.value });

    homeStore.getState().searchCoins();
  },

  searchCoins: debounce( async () => {
    const { query, trending } = homeStore.getState();
 
    

    if (query.length > 3) {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );

      const coins = response.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      });

      set({ coins: coins });
    } else {
      set({ coins: trending });
    }
  }, 500),

  fetchCoins: async () => {
    const [response, btcRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/search/trending"),

      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
        `),
    ]);

    const btcPrice = btcRes.data.bitcoin.usd;

    const coins = response.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        price: coin.item.price_btc.toFixed(10),
        priceUsd: (coin.item.price_btc + btcPrice).toFixed(10),
      };
    });

    set({ coins: coins, trending: coins });
  },
}));

export default homeStore;
