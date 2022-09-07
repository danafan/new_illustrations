<template>
  <div class="other_container">
    <el-card class="box_card scroll_y">
      <TableTitle :title_text="title_text" />
      <div class="card_content">
        <el-form size="small" label-width="150px">
          <el-form-item label="插画标题：" required>
            <el-input size="small" clearable v-model="title" placeholder="插画标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="textarea" :rows="5" size="small" clearable v-model="introduction" placeholder="有了作品简历，大家对您的作品更感兴趣了">
            </el-input>
          </el-form-item>
          <el-form-item label="插画师：" required>
            <el-select v-model="painter_id" clearable :popper-append-to-body="false" placeholder="请选择插画师">
              <el-option v-for="item in painter_list" :key="item.painter_id" :label="item.painter_name" :value="item.painter_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="插画分类：">
            <div class="cate_list">
              <div class="cate_item" :class="{'active_cate':item.is_checked == true}" v-for="(item,index) in cate_list"
                @click="checkCate(index)" :key="index">{{item.cate_name}}</div>
            </div>
          </el-form-item>
          <el-form-item label="插画标签：">
            <div class="cate_list">
              <el-tag :key="tag" v-for="tag in labels" closable :disable-transitions="false" @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="is_input" v-model="input_value" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
            </div>
          </el-form-item>
          <el-form-item label="绑定商品编码：">
            <el-input type="textarea" :rows="5" placeholder="每输入一个商品编码要换行（每个商品编码占一行）" v-model="sku_id">
            </el-input>
          </el-form-item>
          <el-form-item label="上传源文件：" required>
            <UploadFile :is_all="true" @callbackFn="uploadAll" v-if="image == ''" />
            <div class="view_image" @mouseenter="show_img = true" @mouseleave="show_img = false" v-else>
              <img class="source_icon" src="../../static/source_icon.png">
              <div class="file_name">{{image}}</div>
              <div class="delete_all" v-if="show_img == true">
                <img class="delete_icon" src="../../static/delete_icon.png" @click="deleteAll">
              </div>
            </div>
          </el-form-item>
          <el-form-item label="上传图片：" required>
            <div class="cate_list">
              <div class="view_card_img" @mouseenter="item.show_icon = true" @mouseleave="item.show_icon = false"
                v-for="(item,index) in preview_images" :key="index">
                <img class="card_img" :src='item.domain + item.urls'>
                <div class="delete_img" v-if="item.show_icon == true">
                  <img class="delete_icon" src="../../static/delete_icon.png" @click="deleteFile(item.urls,index)">
                </div>
              </div>
              <UploadFile :is_multiple="true" :current_num="preview_images.length" :max_num="3" @callbackFn="callbackFn"
                v-if="preview_images.length < 3" />
            </div>
          </el-form-item>
          <el-form-item>
            <div class="toast bottom">请上传完整精选作品预览图</div>
            <div class="toast">请确保插画正版原创，以免引起诉讼。</div>
            <div class="toast">请确保图片清晰无误，以此提高运营的关注率</div>
          </el-form-item>
        </el-form>
        <div class="save" @click="saveFn">保存</div>
      </div>
    </el-card>
  </div>
</template>
<script>
import resource from "../../api/resource.js";
import TableTitle from "../../components/table_title.vue";
import UploadFile from "../../components/upload_file.vue";
export default {
  data() {
    return {
      type: "", //1:添加；2:编辑
      title_text: "", //页面标题
      title: "", //插画标题
      introduction: "", //简介
      painter_list: [], //所有插画师列表
      painter_id: "", //插画师ID
      cate_list: [], //插画分类列表
      labels: [], //插画标签列表
      is_input: false, //是否显示输入框
      input_value: "", //输入框当前输入的内容
      sku_id: "", //商品编码
      image: "", //源文件
      picture_size: "", //文件大小
      show_img: false,
      preview_images: [], //已上传的图片列表
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.title_text = this.type == "1" ? "上传插画" : "编辑插画";
    //获取所有插画师列表
    this.getPainter();
    //获取插画分类列表
    this.getCate();
  },
  methods: {
    //获取所有插画师列表
    getPainter() {
      resource.getPainter().then((res) => {
        if (res.data.code == 1) {
          this.painter_list = res.data.data;
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //获取插画分类列表
    getCate() {
      resource.getCate().then((res) => {
        if (res.data.code == 1) {
          let cate_list = res.data.data;
          cate_list.map((item) => {
            item.is_checked = false;
          });
          this.cate_list = cate_list;
          if (this.type == "2") {
            //编辑
            this.id = this.$route.query.id;
            //获取详情
            this.addPictureGet();
          }
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //获取插画详情
    addPictureGet() {
      let arg = {
        id: this.id,
      };
      resource.addPictureGet(arg).then((res) => {
        if (res.data.code == 1) {
          let data = res.data.data;
          this.title = data.title;
          this.introduction = data.introduction;
          this.painter_id = data.painter_id == 0 ? "" : data.painter_id;
          if (data.cate_id != "") {
            this.cate_list.map((item) => {
              data.cate_id.map((i) => {
                if (item.cate_id == i) {
                  item.is_checked = true;
                }
              });
            });
          }
          this.picture_size = data.picture_size;
          this.labels = data.labels == "" ? [] : data.labels.split(",");
          this.sku_id = data.sku_id.join("\n");
          this.image = data.source_file;
          data.preview_images.map((item) => {
            let obj = {
              domain: data.domain,
            };
            obj.show_icon = false;
            obj.urls = item;
            this.preview_images.push(obj);
          });
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //切换选中的分类
    checkCate(index) {
      this.cate_list[index].is_checked = !this.cate_list[index].is_checked;
    },
    //删除标签
    handleClose(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
    },
    // 点击添加标签
    showInput() {
      this.is_input = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 添加标签
    handleInputConfirm() {
      let input_value = this.input_value;
      if (input_value) {
        this.labels.push(input_value);
      }
      this.is_input = false;
      this.input_value = "";
    },
    //上传图片回调
    callbackFn(v) {
      v.file.show_icon = false;
      this.preview_images.push(v.file);
    },
    //删除文件
    deleteFile(url, index) {
      let arg = {
        url: url,
      };
      resource.deleteFile(arg).then((res) => {
        if (res.data.code == 1) {
          this.preview_images.splice(index, 1);
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //上传源文件
    uploadAll(v) {
      this.image = v.file.urls;
      this.picture_size = v.file.size;
    },
    //删除源文件
    deleteAll() {
      let arg = {
        url: this.image,
      };
      resource.deleteFile(arg).then((res) => {
        if (res.data.code == 1) {
          this.image = "";
          this.picture_size = "";
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //点击保存
    saveFn() {
      if (this.title == "") {
        this.$message.warning("请输入插画标题");
      } else if (this.painter_id == "") {
        this.$message.warning("请选择插画师");
      } else if (this.image == "") {
        this.$message.warning("请上传源文件");
      } else if (this.preview_images.length == 0) {
        this.$message.warning("请上传图片");
      } else {
        //选中的分类
        let cate_ids = [];
        let cate_list = this.cate_list.map((item) => {
          if (item.is_checked) {
            cate_ids.push(item.cate_id);
          }
        });
        //绑定的商品编码
        let sku_ids = "";
        if (this.sku_id.indexOf("\n") > -1) {
          sku_ids = this.sku_id.replaceAll("\n", ",");
        } else if (this.sku_id.indexOf(" ") > -1) {
          sku_ids = this.sku_id.replaceAll(" ", ",");
        } else {
          sku_ids = this.sku_id;
        }
        //图片
        let preview_images = [];
        this.preview_images.map((item) => {
          preview_images.push(item.urls);
        });
        let arg = {
          title: this.title,
          introduction: this.introduction,
          painter_id: this.painter_id,
          cate_id: cate_ids.join(","),
          labels: this.labels.join(","),
          sku_id: sku_ids,
          source_file: this.image,
          picture_size: this.picture_size,
          preview_images: preview_images.join(","),
        };
        if (this.type == "1") {
          resource.addPicturePost(arg).then((res) => {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              this.$router.go(-1);
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        } else {
          //编辑
          arg.id = this.id;
          resource.editPicture(arg).then((res) => {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              this.$router.go(-1);
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        }
      }
    },
  },
  components: {
    TableTitle,
    UploadFile,
  },
};
</script>
<style lang="less" scoped>
.scroll_y {
  overflow-y: scroll;
}
.card_content {
  display: flex;
  flex-direction: column;
  padding: 24rem 280rem 0 240rem;
  .view_image {
    position: relative;
    border: 1px solid #efefef;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 66rem;
    .source_icon {
      width: 26rem;
      height: 28rem;
    }
    .file_name {
      font-size: 12rem;
      color: #555555;
    }
    .delete_all {
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      .delete_icon {
        width: 26rem;
        height: 26rem;
      }
    }
  }
  .cate_list {
    display: flex;
    flex-wrap: wrap;
    .cate_item {
      margin-right: 8rem;
      margin-bottom: 8rem;
      border: 1px solid #c0c0c0;
      border-radius: 14rem;
      padding-left: 20rem;
      padding-right: 20rem;
      height: 28rem;
      line-height: 26rem;
      font-size: 14rem;
      color: #333333;
    }
    .active_cate {
      border: 1px solid #f36478;
      background: #f36478;
      color: #ffffff;
    }
    .el-tag + .el-tag {
      margin-left: 10rem;
      margin-bottom: 10rem;
    }
    .button-new-tag {
      margin-left: 10rem;
      height: 32rem;
      line-height: 30rem;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90rem;
      margin-left: 10rem;
      vertical-align: bottom;
    }
    .view_card_img {
      margin-right: 26rem;
      margin-bottom: 26rem;
      border-radius: 2rem;
      position: relative;
      width: 136rem;
      height: 136rem;
      .card_img,
      .delete_img {
        border-radius: 2rem;
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .delete_img {
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        .delete_icon {
          width: 40rem;
          height: 40rem;
        }
      }
    }
  }
  .toast {
    font-size: 14rem;
    color: #f36478;
  }
  .bottom {
    margin-bottom: 24rem;
  }
  .save {
    margin: 0 auto;
    border-radius: 2rem;
    background: #f36478;
    width: 198rem;
    text-align: center;
    height: 32rem;
    line-height: 32rem;
    font-size: 14rem;
    color: #ffffff;
  }
}
</style>






