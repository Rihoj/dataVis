import Vuex from "vuex";
import CoinDesk from "./modules/CoinDesk";
// import thisismodule2 from "./modules/module2";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      CoinDesk: CoinDesk,
      // module2: thisismodule2

    }
  });
};

export default createStore;
