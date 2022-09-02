<template>
  <div class="other_container">
    <el-card class="box_card scroll_card">
      <TableTitle title_text="插画详情" />
      <div class="card_content">
        <div class="row">
          <div class="lable">插画标题：</div>
          <div class="value">{{recoedInfo.title}}</div>
        </div>
        <div class="row">
          <div class="lable">插画简介：</div>
          <div class="value">{{recoedInfo.introduction}}</div>
        </div>
        <div class="row">
          <div class="lable">插画师：</div>
          <div class="value">{{recoedInfo.painter_name}}</div>
        </div>
        <div class="row">
          <div class="lable">插画分类：</div>
          <div class="value">{{recoedInfo.cate_name}}</div>
        </div>
        <div class="row">
          <div class="lable">插画标签：</div>
          <div class="value">{{recoedInfo.labels}}</div>
        </div>
        <div class="row">
          <div class="lable">商品编码：</div>
          <div class="value">{{recoedInfo.sku_ids}}</div>
        </div>
        <div class="row">
          <div class="lable">源文件：</div>
          <div class="value down" @click="downFile">点击下载</div>
        </div>
        <div class="row">
          <div class="lable">图片：</div>
          <div class="image_list">
            <!-- <img class="image" :src="recoedInfo.domain + item" v-for="(item,index) in recoedInfo.preview_images" :key="index"> -->
            <el-image :src="recoedInfo.domain + item" v-for="(item,index) in recoedInfo.preview_images" :key="index"
              fit="contain"></el-image>
          </div>
        </div>
      </div>
      <TableTitle title_text="选中记录信息" />
      <div class="card_content">
        <div class="row">
          <div class="lable">店铺：</div>
          <div class="value">{{recoedInfo.shop_name}}</div>
        </div>
        <div class="row">
          <div class="lable">提交人：</div>
          <div class="value">{{recoedInfo.submit_user_name}}</div>
        </div>
        <div class="row">
          <div class="lable">插画用途：</div>
          <div class="value">{{recoedInfo.purpose_type}}</div>
        </div>
        <div class="row">
          <div class="lable">提交时间：</div>
          <div class="value">{{recoedInfo.add_time}}</div>
        </div>
        <div class="row">
          <div class="lable">插画使用时间：</div>
          <div class="value">{{recoedInfo.usage_time}}</div>
        </div>
        <div class="row">
          <div class="lable">选中备注：</div>
          <div class="value">{{recoedInfo.remark}}</div>
        </div>
      </div>
      <TableTitle title_text="当前状态" />
      <div class="card_content">
        <div class="row">
          <div class="lable">当前状态：</div>
          <div class="value" v-if="recoedInfo.status == 0">待处理</div>
          <div class="value" v-if="recoedInfo.status == 1">已同意</div>
          <div class="value" v-if="recoedInfo.status == 2">已拒绝</div>
        </div>
        <div class="row">
          <div class="lable">确认备注：</div>
          <div class="value">{{recoedInfo.audit_remark}}</div>
        </div>
        <div class="row">
          <div class="lable">提示：</div>
          <div class="value">如有需要，请重新提交</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import resource from "../../api/resource.js";
import TableTitle from "../../components/table_title.vue";
export default {
  data() {
    return {
      recoedInfo: {}, //详情
    };
  },
  created() {
    //获取详情
    this.recordDetail(this.$route.query.record_id);
  },
  methods: {
    //获取详情
    recordDetail(record_id) {
      let arg = {
        record_id: record_id,
      };
      resource.recordDetail(arg).then((res) => {
        if (res.data.code == 1) {
          this.recoedInfo = res.data.data;
          this.recoedInfo.sku_ids =
            this.recoedInfo.sku_ids.length > 0
              ? this.recoedInfo.sku_ids.join(",")
              : "无";
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    // 点击下载源文件
    downFile() {
      let record_id = this.recoedInfo.record_id;
      let admin_id = localStorage.getItem("admin_id");
      window.open(
        `${location.origin}/api/record/source_down?record_id=${record_id}&type=1`
      );
    },
  },
  components: {
    TableTitle,
  },
};
</script>
<style lang="less" scoped>
.scroll_card {
  overflow-y: scroll;
}
.card_content {
  display: flex;
  flex-direction: column;
  padding: 24rem 280rem 0 240rem;
  .row {
    margin-bottom: 24rem;
    display: flex;
    font-size: 14rem;
    .lable {
      width: 140rem;
      text-align: end;
      white-space: nowrap;
      color: #666666;
    }
    .value {
      flex: 1;
      color: #333333;
      word-break: break-word;
    }
    .down {
      color: #f36478;
      cursor: pointer;
    }
    .image_list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .image {
        margin-right: 24rem;
        margin-bottom: 24rem;
        width: 98rem;
        height: 98rem;
      }
    }
  }
}
.button_theme {
  color: #f36478;
}
</style>






