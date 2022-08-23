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

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      component: login,
    },
    {
      path: "/",
      component: tab_menu,
      name: "导航页",
      children: [
        { path: "/index", name: "首页", component: index },
        {
          path: "/index_detail",
          name: "首页查看插画",
          component: index_detail,
        },
        { path: "/draw_warehouse", name: "画库", component: draw_warehouse },
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
        { path: "/draw_master", name: "画师", component: draw_master },
        {
          path: "/master_add_edit",
          name: "画师上传或编辑",
          component: master_add_edit,
        },
        { path: "/selected", name: "选中", component: selected },
        { path: "/detail", name: "选中详情", component: detail },
        { path: "/permissions", name: "权限", component: permissions },
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
        {
          path: "/user_list",
          name: "角色对应的用户列表",
          component: user_list,
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

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
