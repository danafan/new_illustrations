<template>
	<div class="other_container row_style">
		<el-card class="left_card" id="left_card">
			<div class="title" id="title">{{detailInfo.title}}</div>
			<div class="img_list" :style="{height:list_height}">
				<el-image
				 :src="detailInfo.domain + item" v-for="item in detailInfo.preview_images"
				 fit="fill"></el-image>
			</div>
		</el-card>
		<el-card class="righ_card">
			<img class="zheng_icon" src="../../static/zheng_icon.png">
			<div class="row">
				<div class="lable">插画简介：</div>
				<div class="value">{{detailInfo.introduction}}</div>
			</div>
			<div class="row">
				<div class="lable">插画编号：</div>
				<div class="value">{{detailInfo.picture_id}}</div>
			</div>
			<div class="row">
				<div class="lable">插画分类：</div>
				<div class="value">{{detailInfo.cate_name}}</div>
			</div>
			<div class="row">
				<div class="lable">插画标签：</div>
				<div class="value">{{detailInfo.labels}}</div>
			</div>
			<div class="row">
				<div class="lable">插画师：</div>
				<div class="value">{{detailInfo.painter_name}}</div>
			</div>
			<div class="row">
				<div class="lable">文件大小：</div>
				<div class="value">{{detailInfo.picture_size}}</div>
			</div>
			<div class="row">
				<div class="lable">尺寸/分辨率：</div>
				<div class="value">{{detailInfo.picture_size}}</div>
			</div>
			<div class="row">
				<div class="lable">上传时间：</div>
				<div class="value">{{detailInfo.add_time}}</div>
			</div>
		</el-card>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				list_height:0,			//可滑动的高度
				detailInfo:{},			//详情
			}
		},
		created(){
			this.picture_id = this.$route.query.picture_id;
			//获取详情
			this.picDetail();
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
					let card_height = document.getElementById("left_card").offsetHeight;
					let title_height = document.getElementById("title").offsetHeight;
					this.list_height = card_height - title_height - 40 + 'px';
				})
			},
			//获取详情
			picDetail(){
				let arg = {
					picture_id:this.picture_id
				}
				resource.picDetail(arg).then(res => {
					if(res.data.code == 1){
						this.detailInfo = res.data.data;
					}else{
						this.$mesage.warning(res.data.msg);
					}
				})
			}
			
		}
	}
</script>
<style lang="less" scoped>
.row_style{
	display: flex;
	justify-content: space-between;
	.left_card{
		flex:1;
		height: 100%;
		.title{
			height: 56rem;
			font-size: 24rem;
			color: #000000;
			font-weight: 500;
		}
		.img_list{
			overflow-y: scroll;
			display: flex;
			flex-direction: column;
		}
	}
	.righ_card{
		margin-left: 24rem;
		width: 380rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.zheng_icon{
			margin-bottom: 24rem;
			width: 46rem;
			height: 46rem;
		}
		.row{
			margin-bottom: 24rem;
			display: flex;
			font-size: 16rem;
			color: #000000;
			.lable{
				white-space:nowrap;
			}
		}
	}
}
</style>










