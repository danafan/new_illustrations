import Vue from "vue";
import Router from "vue-router";

const tab_menu = (resolve) => require(["@/pages/tab_menu"], resolve);
const login = (resolve) => require(["@/pages/login"], resolve);
const index = (resolve) => require(["@/pages/index"], resolve);
const index_detail = (resolve) =>
require(["@/pages/indexPages/index_detail"], resolve);
const draw_warehouse = (resolve) =>
require(["@/pages/draw_warehouse"], resolve);
const warehouse_add_edit = (resolve) =>
require(["@/pages/warehousePages/warehouse_add_edit"], resolve);
const warehouse_detail = (resolve) =>
require(["@/pages/warehousePages/detail"], resolve);
const draw_master = (resolve) => require(["@/pages/draw_master"], resolve);
const master_add_edit = (resolve) =>
require(["@/pages/masterPages/master_add_edit"], resolve);
const selected = (resolve) => require(["@/pages/selected"], resolve);
const detail = (resolve) => require(["@/pages/selectedPages/detail"], resolve);
const permissions = (resolve) => require(["@/pages/permissions"], resolve);
const role_setting = (resolve) =>
require(["@/pages/rolePages/role_setting"], resolve);
const user_list = (resolve) =>
require(["@/pages/rolePages/user_list"], resolve);
const notfound = (resolve) => require(["@/pages/notfound"], resolve);
const role_page = (resolve) =>
require(["@/pages/permissionPages/role_page"], resolve);
const user_page = (resolve) =>
require(["@/pages/permissionPages/user_page"], resolve);
const entry_page = (resolve) =>
require(["@/pages/permissionPages/entry_page"], resolve);

Vue.use(Router);

const router = new Router({
  routes: [
  {
    path: "/login",
    component: login,
  },
  {
    path: "/notfound",
    component: notfound,
  },
  {
    path: "/tab_menu",
    component: tab_menu,
    name: "导航页",
    children: [
    {
      path: "/index",
      name: "首页",
      component: index,
      meta: {
        keepAlive: true,
        isBack: false,
      },
    },
    {
      path: "/index_detail",
      name: "首页查看插画",
      component: index_detail,
    },
    {
      path: "/draw_warehouse",
      name: "/画库",
      component: draw_warehouse,
      meta: {
        keepAlive: true,
        isBack: false,
      },
    },
    {
      path: "/warehouse_add_edit",
      name: "画库上传或编辑",
      component: warehouse_add_edit,
    },
    {
      path: "/warehouse_detail",
      name: "插画详情",
      component: warehouse_detail,
    },
    {
      path: "/draw_master",
      name: "画师",
      component: draw_master,
      meta: {
        keepAlive: true,
        isBack: false,
      },
    },
    {
      path: "/master_add_edit",
      name: "画师上传或编辑",
      component: master_add_edit,
    },
    {
      path: "/selected",
      name: "选中",
      component: selected,
      meta: {
        keepAlive: true,
        isBack: false,
      },
    },
    { path: "/detail", name: "选中详情", component: detail },
    {
      path: "/permissions",
      name: "权限",
      component: permissions,
      meta: {
        keepAlive: true,
        isBack: false,
      },
    },
    {
      path: "/role_setting",
      name: "创建/编辑/查看权限",
      component: role_setting,
    },
    {
      path: "/user_list",
      name: "角色对应的用户列表",
      component: user_list,
    },
    ],
  },
  ],
});

router.beforeEach((to, from, next) => {
  const login_token = localStorage.getItem("login_token");
  if (!login_token) {
    next("/login");
  }else{
    const pathlist = localStorage.getItem("pathlist");
    if (JSON.parse(pathlist) != null && JSON.parse(pathlist).indexOf(to.path.split("/")[1]) > -1
      ) {
      next();
  } else if (to.path == "/") {
    let menulist = localStorage.getItem("menulist");
    next(`/${JSON.parse(menulist)[0].web_url}`);
  } else if (to.path == "/login") {
    next();
  } else if (to.path == "/notfound") {
    next();
  } else {
    next("/notfound");
  }
}


});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
