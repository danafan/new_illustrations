import http from './request.js'
let path = {	
	goodsList:'index/list',						//插画列表
	getCate:'picture/getcate',					//获取所有插画分类列表
	painterIndex:'picture/pictureIndex',		//画库列表
	menuroleList:'menurole/list',				//角色列表
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
}









