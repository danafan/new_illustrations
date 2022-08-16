<template>
	<div class="other_container row_style">
		<div class="left_menu">
			<div class="menu_item" :class="{'active_style':active_index == index}" v-for="(item,index) in menu_list">{{item.name}}</div>
		</div>
		<el-card id="menu_card" class="menu_card">
			<el-form :inline="true" size="mini" class="demo-form-inline" id="el_form">
				<el-form-item label="输入搜索:">
					<el-input style="width:200px" clearable v-model="role_name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleCurrentChange(1)">查询</el-button>
				</el-form-item>
			</el-form>
			<TableTitle title_text="数据列表">
				<div class="add_button" @click="roleSetting('1')">添加</div>
			</TableTitle>
			<el-table size="small" :data="dataObj.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4'}" :max-height="max_height" v-loading="loading">
				<el-table-column prop="menu_role_name" label="角色名称" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column prop="remark" label="角色备注" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column prop="num" label="角色数量" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column prop="create_time" width="160" label="添加时间" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column label="是否启用" align="center" width="100">
					<template slot-scope="scope">
						<div>{{scope.row.status == 1?'启用':'禁用'}}</div>
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="200" fixed="right">
				<template slot-scope="scope">
					<el-button class="button_theme" type="text" size="small" @click="roleSetting('2',scope.row.menu_role_id)">查看</el-button>
					<el-button class="button_theme" type="text" size="small" @click="roleSetting('3',scope.row.menu_role_id)">权限设置</el-button>
					<el-button class="button_theme" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page" id="el_pagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :pager-count="11" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="dataObj.total">
			</el-pagination>
		</div>
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
.add_button{
	border-radius: 2rem;
	background: #F36478;
	width: 64rem;
	text-align: center;
	height: 32rem;
	line-height: 32rem;
	font-size: 14rem;
	color: #FFFFFF;
}
.button_theme{
	color: #F36478;
}
</style>
<script>
	import resource from '../api/resource.js'
	import TableTitle from '../components/table_title.vue'
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
				max_height:0,				//表格最大高度
				loading:false,
				role_name:"",	
				pagesize:10,
				page:1,
				dataObj:{},
			}
		},
		created(){
			//获取列表
			this.getData();
		},
		mounted(){
			//获取表格最大高度
			this.onResize();
			window.addEventListener('resize',() => {
				this.onResize();
			})
		},
		methods:{
			//监听屏幕大小变化
			onResize(){
				this.$nextTick(()=>{
					let box_card_height = document.getElementById("menu_card").offsetHeight;
					let el_form_height = document.getElementById("el_form").offsetHeight;
					let el_pagination_height = document.getElementById("el_pagination").offsetHeight;
					this.max_height = box_card_height - el_form_height - el_pagination_height - 40 + 'px';
				})
			},
			//分页
			handleSizeChange(val) {
				this.pagesize = val;
				//获取列表
				this.getData();
			},
			handleCurrentChange(val) {
				this.page = val;
				//获取列表
				this.getData();
			},
			//获取列表
			getData(){
				let arg = {
					role_name:this.role_name
				}
				this.loading = true;
				resource.menuroleList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.dataObj = res.data.data;
					}else{
						this.$mesage.warning(res.data.msg);
					}
				})
			},
			//点击添加/查看/编辑
			roleSetting(type,id){	//1:添加；2:查看；3:编辑
				this.$router.push(`/role_setting?type=${type}&id=${id}`);
			}
		},
		components:{
			TableTitle
		}
	}
</script>