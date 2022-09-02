<template>
  <div>
    <el-form :inline="true" size="mini" class="demo-form-inline" id="el_form">
      <el-form-item label="输入搜索:">
        <el-input style="width:200px" clearable v-model="search" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="query" @click="handleCurrentChange(1)">查询</el-button>
      </el-form-item>
    </el-form>
    <TableTitle title_text="数据列表" id="table_title">
      <div class="add_button" @click="createUser" v-if="button_list.add == 1">添加</div>
    </TableTitle>
    <el-table size="small" :data="dataObj.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4'}"
    :max-height="max_height" v-loading="loading">
    <el-table-column prop="main_dept_name" label="所属部门" show-overflow-tooltip align="center"></el-table-column>
    <el-table-column prop="binding_stores" label="绑定店铺" show-overflow-tooltip align="center"></el-table-column>
    <el-table-column label="是否查看记录" align="center" width="100">
      <template slot-scope="scope">
        <div>{{scope.row.view_type == 1?'否':'是'}}</div>
      </template>
    </el-table-column>
    <el-table-column prop="ding_user_name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
    <el-table-column prop="job_no" label="工号" show-overflow-tooltip align="center"></el-table-column>
    <el-table-column prop="position" label="岗位名称" show-overflow-tooltip align="center"></el-table-column>
    <el-table-column label="是否启用" align="center" width="100">
      <template slot-scope="scope">
        <div>{{scope.row.status == 1?'启用':'禁用'}}</div>
      </template>
    </el-table-column>
    <el-table-column prop="menu_role_name" label="所属角色" show-overflow-tooltip align="center"></el-table-column>
    <el-table-column label="操作" align="center" width="200" fixed="right">
      <template slot-scope="scope">
        <el-button class="button_theme" type="text" size="small" @click="bindStore(scope.row.user_id)"
        v-if="button_list.binding_store == 1">绑定店铺</el-button>
        <el-button class="button_theme" type="text" size="small" @click="userSet(scope.row.user_id)"
        v-if="button_list.setting == 1">权限设置</el-button>
        <el-button class="button_theme" type="text" size="small" @click="deleteUser(scope.row.user_id)"
        v-if="button_list.del == 1">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="page" id="el_pagination">
      <el-pagination
      small
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="10"
      layout="slot, prev, pager, next,jumper"
      :total="dataObj.total">
      <div class="page_row">共<div class="theme_page">{{total_pages}}</div>页/<div class="theme_page">{{dataObj.total}}</div>条数据</div>
    </el-pagination>
  </div>
  <!-- 添加成员 -->
  <el-dialog title="添加成员" center width="30%" :visible.sync="add_user_dialog" @close="closeDialog">
    <el-form>
      <el-form-item label="选择成员：" required>
        <el-select size="mini" v-model="user_id" clearable :popper-append-to-body="false" filterable placeholder="请选择成员">
          <el-option v-for="item in user_list" :key="item.user_id" :label="item.real_name" :value="item.user_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择角色：" required>
        <el-select size="mini" v-model="role_id" clearable :popper-append-to-body="false" filterable placeholder="请选择成员">
          <el-option v-for="item in role_list" :key="item.menu_role_id" :label="item.menu_role_name" :value="item.menu_role_id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="add_user_dialog = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="commitCreate">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 绑定店铺 -->
  <el-dialog title="绑定店铺" center width="30%" :visible.sync="binding_store_dialog">
    <el-form>
      <el-form-item label="店铺权限：">
        <el-radio-group v-model="is_all_stores">
          <el-radio :label="1">全部店铺权限</el-radio>
          <el-radio :label="0">设置店铺权限</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择部门：" required v-if="is_all_stores == 0">
        <el-select size="mini" v-model="dept_names" clearable :popper-append-to-body="false" multiple filterable collapse-tags
        placeholder="选择部门">
        <el-option v-for="item in dept_list" :key="item.dept_name" :label="item.dept_name" :value="item.dept_name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择店铺：" required v-if="is_all_stores == 0">
      <el-select size="mini" v-model="shop_codes" clearable :popper-append-to-body="false" multiple filterable collapse-tags
      placeholder="选择店铺">
      <el-option v-for="item in shop_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="是否查看记录：">
    <el-radio-group v-model="view_type">
      <el-radio :label="1">是</el-radio>
      <el-radio :label="0">否</el-radio>
    </el-radio-group>
  </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button size="mini" @click="binding_store_dialog = false">取 消</el-button>
  <el-button size="mini" type="primary" @click="commitBind">确 定</el-button>
</div>
</el-dialog>
<!-- 权限设置 -->
<el-dialog title="权限设置" center width="30%" :visible.sync="permission_dialog">
  <el-form>
    <el-form-item label="角色名称：" required>
      <el-select size="mini" v-model="menu_role_ids" clearable :popper-append-to-body="false" multiple filterable
      collapse-tags placeholder="选择角色">
      <el-option v-for="item in menu_role_list" :key="item.menu_role_id" :label="item.menu_role_name"
      :value="item.menu_role_id">
    </el-option>
  </el-select>
</el-form-item>
<el-form-item label="是否启用：">
  <el-switch v-model="status" :active-value="1" :inactive-value="0" active-color="#F36478" inactive-color="#778899">
  </el-switch>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button size="mini" @click="permission_dialog = false">取 消</el-button>
  <el-button size="mini" type="primary" @click="commitSetting">确 定</el-button>
</div>
</el-dialog>
</div>
</template>
<script>
  import resource from "../../api/resource.js";
  import TableTitle from "../../components/table_title.vue";
  export default {
    data() {
      return {
      max_height: 0, //表格最大高度
      loading: false,
      search: "",
      pagesize: 10,
      page: 1,
      total_pages:0,
      dataObj: {},
      button_list: {},
      add_user_dialog: false, //添加成员弹窗
      user_list: [], //所有用户列表
      role_list: [], //所有角色列表
      user_id: "", //选中的用户ID
      role_id: "", //选中的角色ID
      binding_store_dialog: false, //绑定店铺弹窗
      shop_list: [], //店铺列表
      shop_codes: [], //选中的店铺列表
      dept_list: [], //部门列表
      dept_names: [], //选中的部门列表
      is_all_stores: 1, //店铺权限
      view_type: 1, //是否查看记录
      select_user_id: "", //当前点击的用户ID
      permission_dialog: false, //权限设置弹窗
      menu_role_list: [], //所有权限列表
      menu_role_ids: [], //已选中的权限列表
      status: 0, //是否启用
    };
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
    handleCurrentChange(val) {
      this.page = val;
      //获取列表
      this.getData();
    },
    //获取列表
    getData() {
      let arg = {
        search: this.search,
        pagesize: this.pagesize,
        page: this.page,
      };
      this.loading = true;
      resource.userList(arg).then((res) => {
        if (res.data.code == 1) {
          this.loading = false;
          this.dataObj = res.data.data;
          this.total_pages = this.dataObj.total && this.dataObj.total%10 == 0?parseInt(this.dataObj.total/10):parseInt(this.dataObj.total/10) + 1;
          this.button_list = this.dataObj.button_list;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //点击添加
    createUser() {
      resource.userAddGet().then((res) => {
        if (res.data.code == 1) {
          this.user_list = res.data.data.user_list;
          this.role_list = res.data.data.role_list;
          this.add_user_dialog = true;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //添加用户
    commitCreate() {
      if (this.user_id == "") {
        this.$message.warning("请选择成员");
      } else if (this.role_id == "") {
        this.$message.warning("请选择角色");
      } else {
        let arg = {
          user_id: this.user_id,
          role_id: this.role_id,
        };
        resource.userAddPost(arg).then((res) => {
          if (res.data.code == 1) {
            this.$message.success(res.data.msg);
            this.add_user_dialog = false;
            //获取列表
            this.getData();
          } else {
            this.$mesage.warning(res.data.msg);
          }
        });
      }
    },
    //删除
    deleteUser(user_id) {
      this.$confirm("确认删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
          //删除
          this.commitDelete(user_id);
        })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
        });
      });
    },
    //提交删除
    commitDelete(user_id) {
      let arg = {
        user_id: user_id,
      };
      resource.userDel(arg).then((res) => {
        if (res.data.code == 1) {
          this.$message.success(res.data.msg);
          //获取列表
          this.getData();
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //点击绑定店铺
    bindStore(user_id) {
      this.select_user_id = user_id;
      let arg = {
        user_id: this.select_user_id,
      };
      resource.userBindingGet(arg).then((res) => {
        if (res.data.code == 1) {
          this.shop_list = res.data.data.shop_list;
          this.shop_codes = res.data.data.selected_shops;
          this.dept_list = res.data.data.dept_list;
          this.dept_names = res.data.data.selected_depts;
          this.is_all_stores = res.data.data.is_all_stores;
          this.view_type = res.data.data.view_type;
          this.binding_store_dialog = true;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //绑定店铺
    commitBind() {
      let arg = {
        user_id: this.select_user_id,
        is_all_stores: this.is_all_stores,
        view_type: this.view_type,
      };
      if (this.is_all_stores == 0) {
        if (this.dept_names.length == 0) {
          this.$message.warning("请选择部门!");
          return;
        } else if (this.shop_codes.length == 0) {
          this.$message.warning("请选择店铺!");
          return;
        } else {
          arg.dept_names = this.dept_names.join(",");
          arg.shop_codes = this.shop_codes.join(",");
        }
      }
      resource.userBindingPost(arg).then((res) => {
        if (res.data.code == 1) {
          this.$message.success(res.data.msg);
          this.binding_store_dialog = false;
          //获取列表
          this.getData();
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //权限设置
    userSet(user_id) {
      this.select_user_id = user_id;
      let arg = {
        user_id: this.select_user_id,
      };
      resource.userSetGet(arg).then((res) => {
        if (res.data.code == 1) {
          this.menu_role_list = res.data.data.menu_role_list;
          this.menu_role_ids = res.data.data.info.menu_role_ids;
          this.status = res.data.data.info.status;
          this.permission_dialog = true;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //提交权限设置
    commitSetting() {
      if (this.menu_role_ids.length == 0) {
        this.$message.warning("请选择角色！");
        return;
      }
      let arg = {
        user_id: this.select_user_id,
        menu_role_id: this.menu_role_ids.join(","),
        status: this.status,
      };
      resource.userSetPost(arg).then((res) => {
        if (res.data.code == 1) {
          this.$message.success(res.data.msg);
          this.permission_dialog = false;
          //获取列表
          this.getData();
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //弹窗关闭时的回调
    closeDialog() {
      this.user_id = "";
      this.role_id = "";
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






