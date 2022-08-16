import http from './request.js'
let path = {	
	goodsList:'index/list',						//插画列表
	getCate:'picture/getcate',					//获取所有插画分类列表
	painterIndex:'picture/pictureIndex',		//画库列表
	menuroleList:'menurole/list',				//角色列表
	menuroleEdit:'menurole/edit',				//编辑访问权限
	menuroleAdd:'menurole/add',					//添加访问权限
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
}









