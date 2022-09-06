import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    menu_list:[],           //导航列表
    active_index:0,         //当前高亮的下标
    show_page_title: false, //是否展示页面返回标题
    page_title: "", //页面返回标题
  },
  mutations: {
    //设置导航列表
    setMenuList(state, menu_list) {
      state.menu_list = menu_list;
    },
    //设置当前高亮的下标
    setActiveIndex(state, index) {
      state.active_index = index;
    },
    // 是否展示页面返回标题
    checkStatus(state, status) {
      state.show_page_title = status;
    },
    // 页面返回标题
    checkTitle(state, title) {
      state.page_title = title;
    },
  },
  actions: {},
});
export default store;
