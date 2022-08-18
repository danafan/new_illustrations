<template>
	<div class="other_container">
		<el-card class="box_card scroll_y">
			<TableTitle title_text="画师资料"/>
			<div class="card_content">
				<el-form size="small" label-width="150px">
					<el-form-item label="真实姓名：" required>
						<el-input size="small" clearable v-model="name" placeholder="请输入真实姓名"></el-input>
					</el-form-item>
					<el-form-item label="手机号码：" required>
						<el-input class="value" size="small" clearable v-model="phone" placeholder="请输入手机号码"></el-input>
					</el-form-item>
					<el-form-item label="联系微信：" required>
						<el-input class="value" size="small" clearable v-model="wechart_no" placeholder="请输入联系微信"></el-input>
					</el-form-item>
					<el-form-item label="联系邮箱：" required>
						<el-input class="value" size="small" clearable v-model="email" placeholder="请输入联系邮箱"></el-input>
					</el-form-item>
					<el-form-item label="支付宝账号：" required>
						<el-input class="value" size="small" clearable v-model="alipay_no" placeholder="请输入支付宝账号"></el-input>
					</el-form-item>
					<el-form-item label="身份证正面：" required>
						<UploadFile type="card" img_type="front" @callbackFn="callbackFn" v-if="card_front == ''"/>
						<div class="view_card_img" @mouseenter="front_del = true" @mouseleave="front_del = false" v-else>
							<img class="card_img" :src='domain + card_front'>
							<div class="delete_img" v-if="front_del == true">
								<img class="delete_icon" src="../../static/delete_icon.png" @click="deleteFile('card_front',card_front)">
							</div>
						</div>
					</el-form-item>
					<el-form-item label="身份证反面：" required>
						<UploadFile type="card" img_type="back" @callbackFn="callbackFn" v-if="card_back == ''"/>
						<div class="view_card_img" @mouseenter="back_del = true" @mouseleave="back_del = false" v-else>
							<img class="card_img" :src='domain + card_back'>
							<div class="delete_img" v-if="back_del == true">
								<img class="delete_icon" src="../../static/delete_icon.png" @click="deleteFile('card_back',card_back)">
							</div>
						</div>
					</el-form-item>
				</el-form>
				<div class="save" @click="saveFn">保存</div>
			</div>
		</el-card>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import TableTitle from '../../components/table_title.vue'
	import UploadFile from '../../components/upload_file.vue'
	export default{
		data(){
			return{
				type:"",			//1:添加；2:编辑
				name:"",			//真实姓名
				phone:"",			//手机号码
				wechart_no:"",		//联系微信
				email:"",			//联系邮箱
				alipay_no:"",		//支付宝账号
				domain:"",
				card_front:"",		//正面地址
				front_del:false,	
				card_back:"",		//反面地址
				back_del:false,	
			}
		},
		created(){
			this.type = this.$route.query.type;
			if(this.type == '2'){	//编辑
				this.id = this.$route.query.id;
				//获取详情
				this.addPainterGet();
			}
		},
		methods:{
			//上传图片回调
			callbackFn(v){
				this.domain = v.file.domain;
				if(v.img_type == 'front'){
					this.card_front = v.file.urls;
				}else if(v.img_type == 'back'){
					this.card_back = v.file.urls;
				}
			},
			//删除文件
			deleteFile(type,url){
				let arg = {
					url:url
				}
				resource.deleteFile(arg).then(res => {
					if(res.data.code == 1){
						if(type == 'card_front'){
							this.card_front = "";
						}
						if(type == 'card_back'){
							this.card_back = "";
						}
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取画师详情
			addPainterGet(){
				let arg = {
					id:this.id
				}
				resource.addPainterGet(arg).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.name = data.name;
						this.phone = data.phone;
						this.wechart_no = data.wechart_no;
						this.email = data.email;
						this.alipay_no = data.alipay_no;
						this.domain = data.domain;
						this.card_front = data.card_front;
						this.card_back = data.card_back;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击保存
			saveFn(){
				if(this.name == ''){
					this.$message.warning('请输入真实姓名');
				}else if(this.phone == ''){
					this.$message.warning('请输入手机号码');
				}else if(this.wechart_no == ''){
					this.$message.warning('请输入联系微信');
				}else if(this.email == ''){
					this.$message.warning('请输入联系邮箱');
				}else if(this.alipay_no == ''){
					this.$message.warning('请输入支付宝账号');
				}else if(this.card_front == ''){
					this.$message.warning('请上传身份证正面');
				}else if(this.card_back == ''){
					this.$message.warning('请上传身份证反面');
				}else{
					let arg = {
						name:this.name,
						phone:this.phone,
						wechart_no:this.wechart_no,
						email:this.email,
						alipay_no:this.alipay_no,
						card_front:this.card_front,
						card_back:this.card_back
					}
					if(this.type == '2'){		//编辑
						arg.id = this.id;
					}
					resource.addPainterPost(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.$router.go(-1);
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
				
			}
			//获取详情
			// recordDetail(record_id){
			// 	let arg = {
			// 		record_id:record_id
			// 	}
			// 	resource.recordDetail(arg).then(res => {
			// 		if(res.data.code == 1){
			// 			this.recoedInfo = res.data.data;
			// 			this.recoedInfo.sku_ids = this.recoedInfo.sku_ids.length > 0?this.recoedInfo.sku_ids.join(','):'无';
			// 		}else{
			// 			this.$message.warning(res.data.msg);
			// 		}
			// 	})
			// },
		},
		components:{
			TableTitle,
			UploadFile
		}
	}
</script>
<style lang="less" scoped>
.scroll_y{
	overflow-y: scroll;
}
.card_content{
	display: flex;
	flex-direction: column;
	padding: 24rem 280rem 0 240rem;
	.view_card_img{
		border-radius: 2rem;
		position: relative;
		width: 295rem;
		height: 188rem;
		.card_img,.delete_img{
			border-radius: 2rem;
			position: absolute;
			width: 100%;
			height: 100%;
		}
		.delete_img{
			background: rgba(0,0,0,0.4);
			display: flex;
			align-items: center;
			justify-content: center;
			.delete_icon{
				width: 40rem;
				height: 40rem;
			}
		}
	}
	.save{
		margin: 0 auto;
		border-radius: 2rem;
		background: #F36478;
		width: 198rem;
		text-align: center;
		height: 32rem;
		line-height: 32rem;
		font-size: 14rem;
		color: #ffffff;
	}
}
</style>






