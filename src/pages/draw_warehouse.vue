<template>
  <div class="other_container">
    <el-card id="box_card" class="box_card">
      <el-form :inline="true" size="mini" class="demo-form-inline" id="el_form">
        <el-form-item label="输入搜索:">
          <el-input style="width:200px" clearable v-model="search" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="插画分类：">
          <el-select v-model="cate" clearable :popper-append-to-body="false" placeholder="全部">
            <el-option v-for="item in cate_list" :key="item.cate_id" :label="item.cate_name" :value="item.cate_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="query" @click="handleCurrentChange(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <TableTitle title_text="数据列表" id="table_title">
        <div class="add_button" @click="settingFn('1')">上传</div>
      </TableTitle>
      <el-table size="small" :data="dataObj.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4'}"
        :max-height="max_height" v-loading="loading">
        <el-table-column prop="picture_id" label="编号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column width="100" label="插画图片" align="center">
          <template slot-scope="scope">
            <img class="image" :src="scope.row.domain + scope.row.images[0]">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="插画标题" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="cate_id" label="插画分类" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="labels" label="插画标签" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="labels" label="插画师" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="download_num" label="下载量" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="add_time" label="上传时间" show-overflow-tooltip align="center" width="160"></el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button class="button_theme" type="text" size="small"
              @click="$router.push(`/warehouse_detail?id=${scope.row.picture_id}`)">查看</el-button>
            <el-button class="button_theme" type="text" size="small" @click="settingFn('2',scope.row.picture_id)">编辑</el-button>
            <el-button class="button_theme" type="text" size="small" @click="soldoutPicture(scope.row.picture_id)"
              v-if="scope.row.status == 1">下架</el-button>
            <el-button class="button_theme" type="text" size="small" @click="groundingPicture(scope.row.picture_id)"
              v-if="scope.row.status == 2">上架</el-button>
            <el-button class="button_theme" type="text" size="small" @click="delPicture(scope.row.picture_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page" id="el_pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
          :pager-count="11" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="dataObj.total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.image {
  width: 88px;
  height: 88px;
}
.query {
  border-radius: 2rem;
  background: #f36478;
  width: 64rem;
  text-align: center;
  height: 32rem;
  font-size: 14rem;
  color: #ffffff;
}
.add_button {
  border-radius: 2rem;
  background: #f36478;
  width: 64rem;
  text-align: center;
  height: 32rem;
  line-height: 32rem;
  font-size: 14rem;
  color: #ffffff;
}
.button_theme {
  color: #f36478;
}
</style>
<script>
import resource from "../api/resource.js";
import TableTitle from "../components/table_title.vue";
export default {
  data() {
    return {
      search: "", //输入的搜索内容
      cate_list: [], //插画分类列表
      cate: "", //选中的插画id
      pagesize: 10,
      page: 1,
      loading: false,
      max_height: 0,
      dataObj: {},
    };
  },
  created() {
    //获取插画分类列表
    this.getCate();
    //获取画库列表
    this.getData();
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
        let box_card_height = document.getElementById("box_card").offsetHeight;
        let table_title_height =
          document.getElementById("table_title").offsetHeight;
        let el_form_height = document.getElementById("el_form").offsetHeight;
        let el_pagination_height =
          document.getElementById("el_pagination").offsetHeight;
        this.max_height =
          box_card_height -
          el_form_height -
          table_title_height -
          el_pagination_height -
          40 +
          "px";
      });
    },
    //获取插画分类列表
    getCate() {
      resource.getCate().then((res) => {
        if (res.data.code == 1) {
          this.cate_list = res.data.data;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
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
    getData() {
      let arg = {
        search: this.search,
        cate: this.cate,
      };
      this.loading = true;
      resource.pictureIndex(arg).then((res) => {
        if (res.data.code == 1) {
          this.loading = false;
          let dataObj = res.data.data;
          dataObj.data.map((item) => {
            item.images = item.preview_images.split(",");
          });
          this.dataObj = dataObj;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //删除
    delPicture(id) {
      this.$confirm("确认删除该插画?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let arg = {
            id: id,
          };
          resource.delPicture(arg).then((res) => {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              //获取列表
              this.getData();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //下架插画
    soldoutPicture(id) {
      this.$confirm("确认下架该插画?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let arg = {
            id: id,
          };
          resource.soldoutPicture(arg).then((res) => {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              //获取列表
              this.getData();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //上架插画
    groundingPicture(id) {
      this.$confirm("确认上架该插画?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let arg = {
            id: id,
          };
          resource.groundingPicture(arg).then((res) => {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              //获取列表
              this.getData();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //点击上传或编辑
    settingFn(type, id) {
      if (type == "1") {
        this.$router.push(`/warehouse_add_edit?type=${type}`);
      } else {
        this.$router.push(`/warehouse_add_edit?type=${type}&id=${id}`);
      }
    },
  },
  components: {
    TableTitle,
  },
};
</script>










