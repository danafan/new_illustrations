import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    show_page_title: false, //是否展示页面返回标题
    page_title: "", //页面返回标题
  },
  mutations: {
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
