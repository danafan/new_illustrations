<template>
  <div class="other_container">
    <el-card class="box_card scroll_card">
      <TableTitle title_text="插画详情" />
      <div class="card_content">
        <div class="row">
          <div class="lable">插画标题：</div>
          <div class="value">{{detailInfo.title}}</div>
        </div>
        <div class="row">
          <div class="lable">插画简介：</div>
          <div class="value">{{detailInfo.introduction}}</div>
        </div>
        <div class="row">
          <div class="lable">插画师：</div>
          <div class="value">{{detailInfo.painter_name}}</div>
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
          <div class="lable">商品编码：</div>
          <div class="value">{{detailInfo.sku_id}}</div>
        </div>
        <div class="row">
          <div class="lable">源文件：</div>
          <div class="value down" @click="downFile">点击下载</div>
        </div>
        <div class="row">
          <div class="lable">图片：</div>
          <div class="image_list">
            <!-- <img class="image" :src="detailInfo.domain + item" v-for="(item,index) in detailInfo.preview_images" :key="index"> -->
            <el-image :src="detailInfo.domain + item" v-for="(item,index) in detailInfo.preview_images" :key="index"
              fit="contain"></el-image>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import resource from "../../api/resource.js";
import TableTitle from "../../components/table_title.vue";
import http from "../../api/request.js";
export default {
  data() {
    return {
      id: "",
      detailInfo: {}, //详情
    };
  },
  created() {
    this.id = this.$route.query.id;
    //获取详情
    this.getDetail();
  },
  methods: {
    //获取详情
    getDetail() {
      let arg = {
        id: this.id,
      };
      resource.addPictureGet(arg).then((res) => {
        if (res.data.code == 1) {
          this.detailInfo = res.data.data;
          this.detailInfo.cate_name =
            this.detailInfo.cate_name.length == 0
              ? ""
              : this.detailInfo.cate_name.join(",");
          this.detailInfo.sku_id =
            this.detailInfo.sku_id.length == 0
              ? ""
              : this.detailInfo.sku_id.join(",");
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    // 点击下载源文件
    downFile() {
      let params = {
        type: 2,
        record_id: this.id,
      };
      http.downLoad("record/source_down", params);
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






