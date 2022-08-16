<template>
	<div class="other_container">
		<el-card class="box_card" id="box_card">
			<TableTitle id="table_title" title_text="数据列表">
			</TableTitle>
			<el-table size="small" :data="dataObj.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4'}" :max-height="max_height" v-loading="loading">
				<el-table-column prop="main_dept_name" label="所属部门" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column prop="ding_user_name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column prop="ding_user_id" label="工号" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column prop="position" label="岗位名称" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column prop="add_time" label="添加时间" show-overflow-tooltip align="center"></el-table-column>
				<el-table-column label="是否启用" align="center" width="100">
					<template slot-scope="scope">
						<div>{{scope.row.status == 1?'启用':'禁用'}}</div>
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
<script>
	import resource from '../../api/resource.js'
	import TableTitle from '../../components/table_title.vue'
	export default{
		data(){
			return{
				role_id:"",	
				pagesize:10,
				page:1,
				dataObj:{},
				max_height:0,
				loading:false
			}
		},
		created(){
			this.role_id = this.$route.query.role_id;
			//角色对应用户列表
			this.menuroleUsers();
		},
		mounted(){
			//获取表格最大高度
			this.onResize();
			window.addEventListener('resize',this.onResize())
		},
		destroyed() {
			window.removeEventListener("resize", ()=>{});
		},
		methods:{
			//监听屏幕大小变化
			onResize(){
				this.$nextTick(()=>{
					let box_card_height = document.getElementById("box_card").offsetHeight;
					let table_title_height = document.getElementById("table_title").offsetHeight;
					let el_pagination_height = document.getElementById("el_pagination").offsetHeight;
					this.max_height = box_card_height - table_title_height - el_pagination_height - 40 + 'px';
				})
			},
			//分页
			handleSizeChange(val) {
				this.pagesize = val;
				//获取列表
				this.menuroleUsers();
			},
			handleCurrentChange(val) {
				this.page = val;
				//获取列表
				this.menuroleUsers();
			},
			//角色对应用户列表
			menuroleUsers(){
				let arg = {
					role_id:this.role_id,
					pagesize:this.pagesize,
					page:this.page
				}
				this.loading = true;
				resource.menuroleUsers(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.dataObj = res.data.data;
					}else{
						this.$mesage.warning(res.data.msg);
					}
				})
			}
		},
		components:{
			TableTitle
		}
	}
</script>
<style lang="less" scoped>
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
</style>