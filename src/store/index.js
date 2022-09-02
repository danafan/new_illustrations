import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    menu_list:[],           //所有菜单列表
  },
  mutations: {
    // 导航列表
    menuList (state, list) {  
      state.menu_list = list;
    },
  },
  actions: {
    
  }

})
export default store;

