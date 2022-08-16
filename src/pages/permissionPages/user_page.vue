<template>
	<div>
		<el-form :inline="true" size="mini" class="demo-form-inline" id="el_form">
			<el-form-item label="输入搜索:">
				<el-input style="width:200px" clearable v-model="search" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleCurrentChange(1)">查询</el-button>
			</el-form-item>
		</el-form>
		<TableTitle title_text="数据列表" id="table_title">
			<div class="add_button" @click="createUser">添加</div>
		</TableTitle>
		<el-table size="small" :data="dataObj.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4'}" :max-height="max_height" v-loading="loading">
			<el-table-column prop="main_dept_name" label="所属部门" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="ding_user_name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="job_no" label="工号" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="position" label="岗位名称" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column label="是否启用" align="center" width="100">
				<template slot-scope="scope">
					<div>{{scope.row.status == 1?'启用':'禁用'}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="menu_role_name" label="所属角色" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column label="操作" align="center" width="200" fixed="right">
				<template slot-scope="scope">
					<el-button class="button_theme" type="text" size="small" @click="roleSetting('2',scope.row.menu_role_id)">绑定店铺</el-button>
					<el-button class="button_theme" type="text" size="small" @click="roleSetting('3',scope.row.menu_role_id)">权限设置</el-button>
					<el-button class="button_theme" type="text" size="small" @click="deleteRole(scope.row.menu_role_id)">查看</el-button>
					<el-button class="button_theme" type="text" size="small" @click="deleteUser(scope.row.user_id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page" id="el_pagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :pager-count="11" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="dataObj.total">
			</el-pagination>
		</div>
		<!-- 添加成员 -->
		<el-dialog title="添加成员" :visible.sync="add_user_dialog" @close="closeDialog">
			<el-form>
				<el-form-item label="选择成员：" required>
					<el-select size="mini" v-model="user_id" clearable :popper-append-to-body="false" filterable placeholder="请选择成员">
						<el-option v-for="item in user_list" :key="item.user_id" :label="item.real_name" :value="item.user_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择角色：" required>
					<el-select size="mini" v-model="role_id" clearable :popper-append-to-body="false" filterable placeholder="请选择成员">
						<el-option v-for="item in role_list" :key="item.menu_role_id" :label="item.menu_role_name" :value="item.menu_role_id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="add_user_dialog = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="commitCreate">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import TableTitle from '../../components/table_title.vue'
	export default{
		data(){
			return{
				max_height:0,				//表格最大高度
				loading:false,
				search:"",	
				pagesize:10,
				page:1,
				dataObj:{},
				button_list:{},
				add_user_dialog:false,		//添加成员弹窗
				user_list:[],				//所有用户列表
				role_list:[],				//所有角色列表
				user_id:"",					//选中的用户ID
				role_id:"",					//选中的角色ID
			}
		},
		created(){
			//获取列表
			this.getData();
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
					let box_card_height = document.getElementById("menu_card").offsetHeight;
					let el_form_height = document.getElementById("el_form").offsetHeight;
					let table_title_height = document.getElementById("table_title").offsetHeight;
					let el_pagination_height = document.getElementById("el_pagination").offsetHeight;
					this.max_height = box_card_height - el_form_height - table_title_height - el_pagination_height - 40 + 'px';
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
					search:this.search,
					pagesize:this.pagesize,
					page:this.page
				}
				this.loading = true;
				resource.userList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.dataObj = res.data.data;
						this.button_list = this.dataObj.button_list;
					}else{
						this.$mesage.warning(res.data.msg);
					}
				})
			},
			//点击添加
			createUser(){
				resource.userAddGet().then(res => {
					if(res.data.code == 1){
						this.user_list = res.data.data.user_list;
						this.role_list = res.data.data.role_list;
						this.add_user_dialog = true;
					}else{
						this.$mesage.warning(res.data.msg);
					}
				})
			},
			//添加用户
			commitCreate(){
				if(this.user_id == ''){
					this.$message.warning('请选择成员');
				}else if(this.role_id == ''){
					this.$message.warning('请选择角色');
				}else{
					let arg = {
						user_id:this.user_id,
						role_id:this.role_id
					}
					resource.userAddPost(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.add_user_dialog = false;
							//获取列表
							this.getData();
						}else{
							this.$mesage.warning(res.data.msg);
						}
					})
				}
			},
			//删除
			deleteUser(user_id){
				this.$confirm('确认删除该用户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//删除
					this.commitDelete(user_id);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			},
			//删除
			commitDelete(user_id){
				let arg = {
					user_id:user_id
				}
				resource.userDel(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						//获取列表
						this.getData();
					}else{
						this.$mesage.warning(res.data.msg);
					}
				})
			},
			//弹窗关闭时的回调
			closeDialog(){
				this.user_id = '';
				this.role_id = '';
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
.button_theme{
	color: #F36478;
}
</style>






