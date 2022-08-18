<template>
	<div class="container">
		<div class="page_header">
			<div class="header_left">
				<img class="logo_icon" src="../static/home_back.png">
				<div class="tab_list">
					<div class="tab_item" :class="{'active_item':active_index == index}" v-for="(item,index) in router_list" @click="toPage(item.path,index)">{{item.name}}</div>
				</div>
			</div>
			<div class="header_right">
				<div class="user_box">
					<img class="user_img" src="../static/home_back.png">
					<div class="user_name">佩洛西</div>
				</div>
				<div class="login_out">退出登录</div>
			</div>
		</div>
		<PageTitle :page_title="page_title" v-if="show_page_title"/>
		<div class="content" :class="{'display':is_center == true}">
			<router-view></router-view>
		</div>
		<div class="page_foot"></div>
	</div>
</template>
<style lang="less" scoped>
.container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.page_header{
		padding-left: 48px;
		padding-right: 28px;
		width: 100%;
		height: 70px;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.header_left{
			display: flex;
			align-items: center;
			.logo_icon{
				margin-right: 42px;
				width: 148px;
				height: 38px;
			}
			.tab_list{
				display: flex;
				align-items: center;
				.tab_item{
					margin-right: 34px;
					font-size: 18px;
					color: #333333;
					font-weight: 500;
				}
				.active_item{
					color: #F36478;
				}
			}
		}
		.header_right{
			display: flex;
			align-items: center;
			.user_box{
				display: flex;
				align-items: center;
				.user_img{
					border-radius: 50%;
					width: 42px;
					height: 42px;
				}
				.user_name{
					margin-left: 8px;
					font-size: 18px;
					color: #333333;
					font-weight: 500;
				}
			}
			.login_out{
				margin-left: 32px;
				font-size: 16px;
				color: #F36478;
			}
		}
	}
	.content{
		background-color: #F6F6F6;
		width: 100%;
		flex:1;
		overflow-y: scroll;
	}
	.page_foot{
		background-color: #ffffff;
		width: 100%;
		height: 70px;
	}
	.display{
		padding-top: 48rem;
		padding-bottom: 48rem;
		display: flex;
		align-items:center;
		justify-content: center;
	}
}
</style>
<script>
	import PageTitle from '../components/page_title.vue'
	export default{
		data(){
			return{
				is_center:false,
				router_list:[{
					name:'首页',
					path:'/index'
				},{
					name:'画库',
					path:'/draw_warehouse'
				},{
					name:'画师',
					path:'/draw_master'
				},{
					name:'选中',
					path:'/selected'
				},{
					name:'权限',
					path:'/permissions'
				}],									//导航列表
				active_index:0,						//当前选中的导航下标
				show_page_title:false,
				page_title:"",						//页面标题
			}
		},
		watch:{
			$route(to,from){
				let router = this.$route;
				let path = router.path;
				this.current_path = path;
				if(path != '/index'){
					this.is_center = true;
					// 权限
					if(path == '/role_setting'){
						if(router.query.type == '1'){	//添加角色
							this.page_title = '添加角色';
						}else if(router.query.type == '2'){	//查看权限
							this.page_title = '查看权限';
						}else if(router.query.type == '3'){	//权限设置
							this.page_title = '权限设置';
						}
						this.show_page_title = true;
					}else if(path == '/user_list'){
						this.page_title = '角色数量';
						this.show_page_title = true;
					}else if(path == '/detail'){
						this.page_title = '插画详情';
						this.show_page_title = true;
					}else if(path == '/master_add_edit'){
						if(router.query.type == '1'){	//添加画师
							this.page_title = '上传画师资料';
						}else if(router.query.type == '2'){	//编辑画师
							this.page_title = '编辑画师资料';
						}
						this.show_page_title = true;
					}else{
						this.show_page_title = false;
					}
				}else{
					this.is_center = false;
					this.show_page_title = false;
				}
			}
		},
		methods:{
			//页面切换
			toPage(path,index){
				this.$router.push(path);
				this.active_index = index;
				console.log(path)
			}
		},
		components:{
			PageTitle
		}
	}
</script>















