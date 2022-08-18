<template>
	<div>
		<div class="all_container" :class="{'card_upload':is_card == true}" v-if="is_all">
			<div class="all_text">点击上传源文件</div>
			<input type="file" ref="imgUpload" class="upload_file" @change="uploadFn(0)">
		</div>
		<div class="upload_container" :class="{'card_upload':is_card == true}" v-else>
			<img class="upload_icon" src="../static/upload_icon.png">
			<div class="upload_text">点击上传</div>
			<input type="file" ref="imgUpload" class="upload_file" accept="image/*" :multiple="is_multiple" @change="uploadFn(1)">
		</div>
	</div>
</template>
<style lang="less" scoped>
.upload_container{
	width: 136rem;
	height: 136rem;
	border-radius: 2rem;
	border:1px solid #D9D9D9;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items:center;
	color: #666666;
}
.card_upload{
	width: 295rem;
	height: 188rem;
}
.all_container{
	border:1px solid #EFEFEF;
	flex:1;
	text-align: center;
	height: 66rem;
	line-height: 66rem;
	font-size: 14rem;
	color: #F36478;
}
.upload_icon{
	width: 40rem;
	height: 40rem;
}
.upload_text{
	margin-top: 16rem;
	font-size: 14rem;
}
.upload_file {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		props:{
			//是否是全部类型（上传插画源文件）
			is_all:{
				type:Boolean,
				default:false
			},
			//是否是身份证
			is_card:{
				type:Boolean,
				default:false
			},
			//图片类型（front：正面；back：）
			img_type:{
				type:String,
				default:''
			},
			//是否多选
			is_multiple:{
				type:Boolean,
				default:false
			},
			//多选已上传的数量
			current_num:{
				type:Number,
				default:0
			},
			//多选最多上传的数量
			max_num:{
				type:Number,
				default:99
			}
		},
		methods:{
			// 上传图片
			uploadFn(type){
				if (this.$refs.imgUpload.files.length > 0) {
					let files = this.$refs.imgUpload.files;
					//判断是否多选
					if(this.is_multiple == true){
						if(this.current_num + this.$refs.imgUpload.files.length > this.max_num){
							this.$refs.imgUpload.value = null;
							this.$message.warning(`图片最多不超过${this.max_num}张`);
							return;
						}
					}
					for(var i = 0;i < files.length;i ++){
						let arg = {
							file:files[i],
							type:type
						}
						resource.uploadFile(arg).then(res => {
							this.$refs.imgUpload.value = null;
							if(res.data.code == 1){
								this.$emit('callbackFn',{
									file:res.data.data,
									img_type:this.img_type
								});
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
				}
			}

		}
	}



</script>