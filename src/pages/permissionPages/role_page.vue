<template>
  <div>
    <el-form :inline="true" size="mini" class="demo-form-inline" id="el_form">
      <el-form-item label="输入搜索:">
        <el-input style="width:200px" clearable v-model="role_name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="query" @click="handleCurrentChange(1)">查询</el-button>
      </el-form-item>
    </el-form>
    <TableTitle title_text="数据列表" id="table_title">
      <div class="add_button" @click="roleSetting('1')" v-if="button_list.add == 1">添加</div>
    </TableTitle>
    <el-table size="small" :data="dataObj.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4'}"
      :max-height="max_height" v-loading="loading">
      <el-table-column prop="menu_role_name" label="角色名称" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="remark" label="角色备注" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="角色数量" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <el-button class="button_theme" type="text" size="small" @click="getNum(scope.row.menu_role_id)"
            v-if="button_list.view == 1">{{scope.row.num}}</el-button>
          <div v-else>{{scope.row.num}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" width="160" label="添加时间" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="是否启用" align="center" width="100">
        <template slot-scope="scope">
          <div>{{scope.row.status == 1?'启用':'禁用'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button class="button_theme" type="text" size="small" @click="roleSetting('2',scope.row.menu_role_id)"
            v-if="button_list.detail == 1">查看</el-button>
          <el-button class="button_theme" type="text" size="small" @click="roleSetting('3',scope.row.menu_role_id)"
            v-if="button_list.edit == 1">权限设置</el-button>
          <el-button class="button_theme" type="text" size="small" @click="deleteRole(scope.row.menu_role_id)"
            v-if="button_list.del == 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" id="el_pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :pager-count="11"
        :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="dataObj.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import resource from "../../api/resource.js";
import TableTitle from "../../components/table_title.vue";
export default {
  data() {
    return {
      to_path:"",
      max_height: 0, //表格最大高度
      loading: false,
      role_name: "",
      pagesize: 10,
      page: 1,
      dataObj: {},
      button_list: {},
    };
  },
  activated() {
    //获取列表
    this.getData();
  },
  created() {
    //获取列表
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
        let box_card_height = document.getElementById("menu_card").offsetHeight;
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
        role_name: this.role_name,
        pagesize: this.pagesize,
        page: this.page,
      };
      this.loading = true;
      resource.menuroleList(arg).then((res) => {
        if (res.data.code == 1) {
          this.loading = false;
          this.dataObj = res.data.data;
          this.button_list = this.dataObj.button_list;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //点击查看数量
    getNum(role_id) {
      this.$router.push(`/user_list?role_id=${role_id}`);
    },
    //点击添加/查看/编辑
    roleSetting(type, id) {
      //1:添加；2:查看；3:编辑
      this.$router.push(`/role_setting?type=${type}&id=${id}`);
    },
    //删除
    deleteRole(role_id) {
      this.$confirm("确认删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除
          this.commitDelete(role_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //删除
    commitDelete(role_id) {
      let arg = {
        role_id: role_id,
      };
      resource.menuroleDel(arg).then((res) => {
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
.button_theme {
  color: #f36478;
}
</style>






