<template>
  <div class="other_container">
    <el-card class="box_card" id="box_card">
      <el-form :inline="true" size="mini" class="demo-form-inline" id="el_form">
        <el-form-item label="输入搜索:">
          <el-input style="width:200px" clearable v-model="name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="query" @click="handleCurrentChange(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <TableTitle title_text="数据列表" id="table_title">
        <div class="add_button" @click="masterSetting('1')" v-if="button_list.add==1">添加</div>
      </TableTitle>
      <el-table size="small" :data="dataObj.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4'}"
      :max-height="max_height" v-loading="loading">
      <el-table-column prop="name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号码" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="wechart_no" label="联系微信" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="alipay_no" label="支付宝账号" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="email" label="联系邮箱" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="身份证正面" width="120" align="center">
        <template slot-scope="scope">
          <el-image class="card_img" :src="scope.row.front_arr[0]" fit="contain" :preview-src-list="scope.row.front_arr">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="身份证反面" width="120" align="center">
        <template slot-scope="scope">
          <el-image class="card_img" :src="scope.row.back_arr[0]" fit="contain" :preview-src-list="scope.row.back_arr">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="上传时间" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button class="button_theme" type="text" size="small" @click="masterSetting('2',scope.row.id)"
          v-if="button_list.edit==1">编辑</el-button>
          <el-button class="button_theme" type="text" size="small" @click="deleteMaster(scope.row.id)"
          v-if="button_list.delete==1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" id="el_pagination">
      <el-pagination small @current-change="handleCurrentChange" :current-page="page" :page-size="10"
      layout="slot, prev, pager, next,jumper" :total="dataObj.total">
      <div class="page_row">共<div class="theme_page">{{total_pages}}</div>页/<div class="theme_page">{{dataObj.total}}</div>条数据
    </div>
  </el-pagination>
</div>
</el-card>
</div>
</template>
<script>
  import resource from "../api/resource.js";
  import TableTitle from "../components/table_title.vue";
  export default {
    data() {
      return {
      max_height: 0, //表格最大高度
      loading: false,
      name: "",
      pagesize: 10,
      page: 1,
      total_pages: 0,
      dataObj: {},
      button_list: {},
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/master_add_edit") {
      from.meta.isBack = true;
    } else {
      from.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.page = 1;
      this.name = "";
      //获取列表
      this.getData();
    } else {
      this.getData();
    }
    this.$route.meta.isBack = false;
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
        let el_form_height = document.getElementById("el_form").offsetHeight;
        let table_title_height =
        document.getElementById("table_title").offsetHeight;
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
    handleCurrentChange(val) {
      this.page = val;
      //获取列表
      this.getData();
    },
    //获取列表
    getData() {
      let arg = {
        name: this.name,
        pagesize: this.pagesize,
        page: this.page,
      };
      this.loading = true;
      resource.painterIndex(arg).then((res) => {
        if (res.data.code == 1) {
          this.loading = false;
          this.dataObj = res.data.data;
          this.dataObj.data.map((item) => {
            let front_arr = [];
            let back_arr = [];
            front_arr.push(item.domain + item.card_front);
            back_arr.push(item.domain + item.card_back);
            item.front_arr = front_arr;
            item.back_arr = back_arr;
          });
          this.total_pages =
          this.dataObj.total && this.dataObj.total % 10 == 0
          ? parseInt(this.dataObj.total / 10)
          : parseInt(this.dataObj.total / 10) + 1;
          this.button_list = res.data.data.button_list;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //点击添加/编辑
    masterSetting(type, id) {
      //1:添加；2:编辑
      if (type == "1") {
        this.$router.push(`/master_add_edit?type=${type}`);
      } else {
        this.$router.push(`/master_add_edit?type=${type}&id=${id}`);
      }
    },
    //删除
    deleteMaster(id) {
      this.$confirm("确认删除该画师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
          //删除
          this.commitDelete(id);
        })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
        });
      });
    },
    //删除
    commitDelete(id) {
      let arg = {
        id: id,
      };
      resource.delPainter(arg).then((res) => {
        if (res.data.code == 1) {
          this.$message.success(res.data.msg);
          //获取列表
          this.getData();
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
  },
  components: {
    TableTitle,
  },
};
</script>
<style lang="less" scoped>
.query {
  border-radius: 2rem;
  background: #f36478;
  text-align: center;
  font-size: 14rem;
  color: #ffffff;
  border: none;
}
.add_button {
  border-radius: 2rem;
  background: #f36478;
  min-width: 64rem;
  text-align: center;
  min-height: 32rem;
  line-height: 32rem;
  font-size: 14rem;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.card_img {
  width: 110px;
  height: 70px;
}
.button_theme {
  color: #f36478;
}
</style>






