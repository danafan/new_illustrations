import http from './request.js'
let path = {	
	goodsList:'index/list',						//插画列表
	getCate:'picture/getcate',					//获取所有插画分类列表
	painterIndex:'picture/pictureIndex',		//画库列表
	menuroleList:'menurole/list',				//角色列表
	menuroleEdit:'menurole/edit',				//编辑访问权限
	menuroleAdd:'menurole/add',					//添加访问权限
	menuroleInfo:'menurole/info',				//查看（获取详情）
	menuroleDel:'menurole/del',					//删除角色
	menuroleUsers:'menurole/users',				//角色对应用户列表
	userList:'user/list',						//用户列表
	userAdd:'user/add',							//添加用户
	userDel:'user/del',							//删除用户
	userBinding:'user/binding',					//绑定店铺
	userSet:'user/set',							//权限设置
	accessList:'access/accesslist',				//权限列表
	getMainMenus:'access/getmainmenus',			//所有菜单列表
	getControllers:'access/getcontrollers',		//获取所有控制器列表
	getMethods:'access/getmethods',				//获取控制器下所有方法列表
	ajaxAccess:'access/ajaxaccess',				//获取权限按钮列表
	accessAdd:'access/add',						//添加权限
	accessInfo:'access/getinfo',				//获取权限详情
	accessEdit:'access/edit',					//编辑权限
	accessDel:'access/del',						//删除权限
}						
export default{
	//插画列表
	goodsList(params){
		return http.get(path.goodsList, params)
	},
	//获取所有插画分类列表
	getCate(params){
		return http.get(path.getCate, params)
	},
	//画库列表
	painterIndex(params){
		return http.get(path.painterIndex, params)
	},
	//角色列表
	menuroleList(params){
		return http.get(path.menuroleList, params)
	},
	//编辑访问权限（get）
	menuroleEditGet(params){
		return http.get(path.menuroleEdit, params)
	},
	//编辑访问权限（post）
	menuroleEditPost(params){
		return http.post(path.menuroleEdit, params)
	},
	//添加访问权限（get）
	menuroleAddGet(params){
		return http.get(path.menuroleAdd, params)
	},
	//添加访问权限（post）
	menuroleAddPost(params){
		return http.post(path.menuroleAdd, params)
	},
	//查看（获取详情）
	menuroleInfo(params){
		return http.get(path.menuroleInfo, params)
	},
	//删除角色
	menuroleDel(params){
		return http.post(path.menuroleDel, params)
	},
	//角色对应用户列表
	menuroleUsers(params){
		return http.get(path.menuroleUsers, params)
	},
	//用户列表
	userList(params){
		return http.get(path.userList, params)
	},
	//添加用户（get）
	userAddGet(params){
		return http.get(path.userAdd, params)
	},
	//添加用户（post）
	userAddPost(params){
		return http.post(path.userAdd, params)
	},
	//删除用户
	userDel(params){
		return http.post(path.userDel, params)
	},
	//绑定店铺（get）
	userBindingGet(params){
		return http.get(path.userBinding, params)
	},
	//绑定店铺（post）
	userBindingPost(params){
		return http.post(path.userBinding, params)
	},
	//权限设置（get）
	userSetGet(params){
		return http.get(path.userSet, params)
	},
	//权限设置（post）
	userSetPost(params){
		return http.post(path.userSet, params)
	},
	//权限列表
	accessList(params){
		return http.get(path.accessList, params)
	},
	//所有菜单列表
	getMainMenus(params){
		return http.get(path.getMainMenus, params)
	},
	//获取所有控制器列表
	getControllers(params){
		return http.get(path.getControllers, params)
	},
	//获取控制器下所有方法列表
	getMethods(params){
		return http.get(path.getMethods, params)
	},
	//获取权限按钮列表
	ajaxAccess(params){
		return http.get(path.ajaxAccess, params)
	},
	//添加权限
	accessAdd(params){
		return http.post(path.accessAdd, params)
	},
	//获取权限详情
	accessInfo(params){
		return http.get(path.accessInfo, params)
	},
	//编辑权限
	accessEdit(params){
		return http.post(path.accessEdit, params)
	},
	//删除权限
	accessDel(params){
		return http.post(path.accessDel, params)
	},
}









