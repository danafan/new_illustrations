import http from "./request.js";
let path = {
  getMenu: "access/mymenu", //获取菜单
  loginUser: "scancodes/getuserinfo", //获取登陆成功后的用户信息
  loginOut: "/loginquit", //退出登录
  getAppid: "scancodes/getappkey", //获取appkey
  goodsList: "index/list", //插画列表
  getCate: "picture/getcate", //获取所有插画分类列表
  pictureIndex: "picture/pictureIndex", //画库列表
  menuroleList: "menurole/list", //角色列表
  menuroleEdit: "menurole/edit", //编辑访问权限
  menuroleAdd: "menurole/add", //添加访问权限
  menuroleInfo: "menurole/info", //查看（获取详情）
  menuroleDel: "menurole/del", //删除角色
  menuroleUsers: "menurole/users", //角色对应用户列表
  userList: "user/list", //用户列表
  userAdd: "user/add", //添加用户
  userDel: "user/del", //删除用户
  userBinding: "user/binding", //绑定店铺
  userSet: "user/set", //权限设置
  accessList: "access/accesslist", //权限列表
  getMainMenus: "access/getmainmenus", //所有菜单列表
  getControllers: "access/getcontrollers", //获取所有控制器列表
  getMethods: "access/getmethods", //获取控制器下所有方法列表
  ajaxAccess: "access/ajaxaccess", //获取权限按钮列表
  accessAdd: "access/add", //添加权限
  accessInfo: "access/getinfo", //获取权限详情
  accessEdit: "access/edit", //编辑权限
  accessDel: "access/del", //删除权限
  recordList: "record/getlist", //选中记录列表
  bindingSku: "record/binding_sku", //绑定商品编码
  recordAgree: "record/agree", //同意
  recordRefuse: "record/refuse", //拒绝
  ajaxViewShop: "Common/ajaxViewShop", //获取所有店铺列表
  recordDetail: "record/record_detail", //选中记录详情接口
  sourceDown: "record/source_down", //下载源文件
  recordExport: "record/export", //选中记录列表导出
  painterIndex: "painter/painterIndex", //画师列表
  delPainter: "painter/delpainter", //删除画师
  uploadFile: "common/upload", //上传文件
  deleteFile: "common/del_file", //删除文件
  addPainter: "painter/addpainter", //上传/编辑画师
  getPainter: "painter/getpainter", //所有插画师列表
  addPicture: "picture/addpicture", //上传插画
  delPicture: "picture/delpicture", //删除插画
  soldoutPicture: "picture/soldoutpicture", //下架插画
  groundingPicture: "picture/groundingpicture", //上架插画
  picDetail: "index/pic_detail", //首页插画详情接口
  ajaxPurposes: "common/ajax_purposes", //获取插画用途列表
  indexSelect: "index/select", //提交创建插画接口
};
export default {
  //获取菜单
  getMenu(params) {
    return http.get(path.getMenu, params);
  },
  //获取登陆成功后的用户信息
  loginUser(params) {
    return http.post(path.loginUser, params);
  },
  //退出登录
  loginOut(params) {
    return http.get(path.loginOut, params);
  },
  //获取appkey
  getAppid(params) {
    return http.get(path.getAppid, params);
  },
  //插画列表
  goodsList(params) {
    return http.get(path.goodsList, params);
  },
  //获取所有插画分类列表
  getCate(params) {
    return http.get(path.getCate, params);
  },
  //画库列表
  pictureIndex(params) {
    return http.get(path.pictureIndex, params);
  },
  //角色列表
  menuroleList(params) {
    return http.get(path.menuroleList, params);
  },
  //编辑访问权限（get）
  menuroleEditGet(params) {
    return http.get(path.menuroleEdit, params);
  },
  //编辑访问权限（post）
  menuroleEditPost(params) {
    return http.post(path.menuroleEdit, params);
  },
  //添加访问权限（get）
  menuroleAddGet(params) {
    return http.get(path.menuroleAdd, params);
  },
  //添加访问权限（post）
  menuroleAddPost(params) {
    return http.post(path.menuroleAdd, params);
  },
  //查看（获取详情）
  menuroleInfo(params) {
    return http.get(path.menuroleInfo, params);
  },
  //删除角色
  menuroleDel(params) {
    return http.post(path.menuroleDel, params);
  },
  //角色对应用户列表
  menuroleUsers(params) {
    return http.get(path.menuroleUsers, params);
  },
  //用户列表
  userList(params) {
    return http.get(path.userList, params);
  },
  //添加用户（get）
  userAddGet(params) {
    return http.get(path.userAdd, params);
  },
  //添加用户（post）
  userAddPost(params) {
    return http.post(path.userAdd, params);
  },
  //删除用户
  userDel(params) {
    return http.post(path.userDel, params);
  },
  //绑定店铺（get）
  userBindingGet(params) {
    return http.get(path.userBinding, params);
  },
  //绑定店铺（post）
  userBindingPost(params) {
    return http.post(path.userBinding, params);
  },
  //权限设置（get）
  userSetGet(params) {
    return http.get(path.userSet, params);
  },
  //权限设置（post）
  userSetPost(params) {
    return http.post(path.userSet, params);
  },
  //权限列表
  accessList(params) {
    return http.get(path.accessList, params);
  },
  //所有菜单列表
  getMainMenus(params) {
    return http.get(path.getMainMenus, params);
  },
  //获取所有控制器列表
  getControllers(params) {
    return http.get(path.getControllers, params);
  },
  //获取控制器下所有方法列表
  getMethods(params) {
    return http.get(path.getMethods, params);
  },
  //获取权限按钮列表
  ajaxAccess(params) {
    return http.get(path.ajaxAccess, params);
  },
  //添加权限
  accessAdd(params) {
    return http.post(path.accessAdd, params);
  },
  //获取权限详情
  accessInfo(params) {
    return http.get(path.accessInfo, params);
  },
  //编辑权限
  accessEdit(params) {
    return http.post(path.accessEdit, params);
  },
  //删除权限
  accessDel(params) {
    return http.post(path.accessDel, params);
  },
  //选中记录列表
  recordList(params) {
    return http.get(path.recordList, params);
  },
  //绑定sku
  bindingSku(params) {
    return http.post(path.bindingSku, params);
  },
  //同意
  recordAgree(params) {
    return http.post(path.recordAgree, params);
  },
  //拒绝
  recordRefuse(params) {
    return http.post(path.recordRefuse, params);
  },
  //获取所有店铺
  ajaxViewShop(params) {
    return http.get(path.ajaxViewShop, params);
  },
  //选中记录详情接口
  recordDetail(params) {
    return http.get(path.recordDetail, params);
  },
  //下载源文件
  sourceDown(params) {
    return http.get(path.sourceDown, params);
  },
  //选中记录列表导出
  recordExport(params) {
    return http.post(path.recordExport, params);
  },
  //画师列表
  painterIndex(params) {
    return http.get(path.painterIndex, params);
  },
  //删除画师
  delPainter(params) {
    return http.post(path.delPainter, params);
  },
  //上传文件
  uploadFile(params) {
    return http.post(path.uploadFile, params);
  },
  //删除文件
  deleteFile(params) {
    return http.post(path.deleteFile, params);
  },
  //上传/编辑画师
  addPainterPost(params) {
    return http.post(path.addPainter, params);
  },
  //获取画师详情
  addPainterGet(params) {
    return http.get(path.addPainter, params);
  },
  //所有插画师列表
  getPainter(params) {
    return http.get(path.getPainter, params);
  },
  //上传/编辑插画
  addPicturePost(params) {
    return http.post(path.addPicture, params);
  },
  //获取插画详情
  addPictureGet(params) {
    return http.get(path.addPicture, params);
  },
  //删除插画
  delPicture(params) {
    return http.post(path.delPicture, params);
  },
  //下架插画
  soldoutPicture(params) {
    return http.post(path.soldoutPicture, params);
  },
  //上架插画
  groundingPicture(params) {
    return http.post(path.groundingPicture, params);
  },
  //首页插画详情接口
  picDetail(params) {
    return http.get(path.picDetail, params);
  },
  //获取插画用途
  ajaxPurposes(params) {
    return http.get(path.ajaxPurposes, params);
  },
  //提交创建插画接口
  indexSelect(params) {
    return http.post(path.indexSelect, params);
  },
};
