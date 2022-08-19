<template>
	<div class="other_container row_style">
		<div class="left_menu">
			<div class="menu_item" :class="{'active_style':active_index == index}" v-for="(item,index) in menu_list" @click="active_index = index">{{item.name}}</div>
		</div>
		<el-card id="menu_card" class="menu_card">
			<RolePage v-if="active_index == 0"/>
			<UserPage v-if="active_index == 1"/>
			<EntryPage v-if="active_index == 2"/>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
.row_style{
	display: flex;
	justify-content: space-between;
	.left_menu{
		margin-right: 36rem;
		border-top: 1px solid #DDDDDD;
		.menu_item{
			background: #ffffff;
			border-right: 1px solid #DDDDDD;
			border-left: 1px solid #DDDDDD;
			border-bottom: 1px solid #DDDDDD;
			width: 220rem;
			padding-left: 52rem;
			height: 54rem;
			line-height: 54rem;
			font-size: 18rem;
			color: #999999;
			font-weight: 500;
		}
		.active_style{
			border-left: 3px solid #F36478;
			color: #F36478;
		}
	}
	.menu_card{
		flex:1;
		height: 100%;
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	import RolePage from './permissionPages/role_page.vue'
	import UserPage from './permissionPages/user_page.vue'
	import EntryPage from './permissionPages/entry_page.vue'
	export default{
		data(){
			return{
				menu_list:[{
					name:"角色管理",
					path:"role"
				},{
					name:"成员管理",
					path:"members"
				},{
					name:"权限录入",
					path:"entry"
				}],							//左侧导航列表
				active_index:0,				//当前选中的导航下标
			}
		},
		methods:{
			
		},
		components:{
			RolePage,
			UserPage,
			EntryPage
		}
	}
</script>