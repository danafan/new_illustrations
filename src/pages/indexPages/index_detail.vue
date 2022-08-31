<template>
  <div class="other_container row_style">
    <el-card class="left_card" id="left_card">
      <div class="title" id="title">{{detailInfo.title}}</div>
      <div class="img_list" :style="{height:list_height}">
        <el-image :src="detailInfo.domain + item" v-for="(item,index) in detailInfo.preview_images" :key="index" fit="contain">
        </el-image>
      </div>
    </el-card>
    <el-card class="righ_card">
      <div class="top_row">
        <img class="zheng_icon" src="../../static/zheng_icon.png">
      </div>
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
      <!-- <div class="row">
				<div class="lable">尺寸/分辨率：</div>
				<div class="value">{{detailInfo.picture_size}}</div>
			</div> -->
      <div class="row">
        <div class="lable">上传时间：</div>
        <div class="value">{{detailInfo.add_time}}</div>
      </div>
      <div class="selectFn" @click="show_dialog = true">立即选中</div>
    </el-card>
    <!-- 选中插画 -->
    <el-dialog title="选中信息" center width="50%" @close="closeDialog" :visible.sync="show_dialog" :close-on-click-modal="false">
      <el-form size="small" label-width="150px">
        <el-form-item label="店铺：" required>
          <el-select v-model="shop_code" style="width: 220px" clearable :popper-append-to-body="false" filterable
            placeholder="请选择店铺">
            <el-option v-for="item in store_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用时间：" required>
          <el-date-picker v-model="usage_time" type="date" clearable value-format="yyyy-MM-dd" placeholder="选择使用时间"
            :append-to-body="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="插画用途：" required>
          <el-select v-model="purpose_type" style="width: 220px" clearable :popper-append-to-body="false" filterable
            placeholder="请选择用途">
            <el-option v-for="item in purposes_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input style="width: 220px" type="textarea" :rows="5" placeholder="请输入备注" v-model="remark">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="show_dialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitFn">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import resource from "../../api/resource.js";
export default {
  data() {
    return {
      list_height: 0, //可滑动的高度
      detailInfo: {}, //详情
      show_dialog: false, //选中弹窗
      store_list: [], //店铺列表
      shop_code: "", //选中的店铺ID
      usage_time: "", //使用时间
      purposes_list: [], //插画用途列表
      purpose_type: "", //选中的插画用途
      remark: "", //备注
    };
  },
  created() {
    this.picture_id = this.$route.query.picture_id;
    //获取详情
    this.picDetail();
    //获取所有店铺列表
    this.ajaxViewShop();
    //插画用途
    this.ajaxPurposes();
  },
  mounted() {
    //获取表格最大高度
    this.onResize();
    window.addEventListener("resize", this.onResize());
  },
  destroyed() {
    window.removeEventListener("resize", () => {});
  },
  methods: {
    //监听屏幕大小变化
    onResize() {
      this.$nextTick(() => {
        let card_height = document.getElementById("left_card").offsetHeight;
        let title_height = document.getElementById("title").offsetHeight;
        this.list_height = card_height - title_height - 40 + "px";
      });
    },
    //获取详情
    picDetail() {
      let arg = {
        picture_id: this.picture_id,
      };
      resource.picDetail(arg).then((res) => {
        if (res.data.code == 1) {
          this.detailInfo = res.data.data;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //获取所有店铺列表
    ajaxViewShop() {
      resource.ajaxViewShop().then((res) => {
        if (res.data.code == 1) {
          this.store_list = res.data.data;
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //插画用途
    ajaxPurposes() {
      resource.ajaxPurposes().then((res) => {
        if (res.data.code == 1) {
          this.purposes_list = res.data.data;
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //关闭弹窗
    closeDialog() {
      this.shop_code = "";
      this.usage_time = "";
      this.purpose_type = "";
      this.remark = "";
    },
    //提交
    submitFn() {
      if (this.shop_code == "") {
        this.$message.warning("请选择店铺");
      } else if (!this.usage_time) {
        this.$message.warning("请选择使用时间");
      } else if (this.purpose_type == "") {
        this.$message.warning("请选择用途");
      } else {
        let shop_name = "";
        let select_store = this.store_list.filter((item) => {
          return item.shop_code == this.shop_code;
        });
        shop_name = select_store[0].shop_name;
        let arg = {
          picture_id: this.picture_id,
          shop_code: this.shop_code,
          shop_name: shop_name,
          usage_time: this.usage_time,
          purpose_type: this.purpose_type,
          remark: this.remark,
        };
        resource.indexSelect(arg).then((res) => {
          if (res.data.code == 1) {
            this.$message.success(res.data.msg);
            this.$router.go(-1);
          } else {
            this.$message.warning(res.data.msg);
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.row_style {
  display: flex;
  justify-content: space-between;
  .left_card {
    flex: 1;
    height: 100%;
    .title {
      padding-bottom: 32rem;
      font-size: 24rem;
      color: #000000;
      font-weight: 500;
    }
    .img_list {
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
    }
  }
  .righ_card {
    margin-left: 24rem;
    width: 380rem;
    height: 100%;

    .top_row {
      display: flex;
      justify-content: center;
      .zheng_icon {
        margin-bottom: 24rem;
        width: 46rem;
        height: 46rem;
      }
    }

    .row {
      margin-bottom: 24rem;
      display: flex;
      font-size: 16rem;
      color: #000000;
      .lable {
        white-space: nowrap;
      }
    }
    .selectFn {
      margin: 70rem auto;
      border-radius: 23rem;
      background: #f36478;
      width: 222rem;
      text-align: center;
      height: 46rem;
      line-height: 46rem;
      font-size: 18rem;
      color: #ffffff;
      font-weight: 500;
    }
  }
}
</style>










