<template>
  <div class="other_container">
    <el-card class="box_card card_content">
      <el-form label-position="left" label-width="86px">
        <el-form-item label="角色名称:" :required="type != '2'">
          <el-input style="width:200px" type="text" placeholder="输入角色名称" size="small" v-model="name" :disabled="type == '2'">
          </el-input>
        </el-form-item>
        <el-form-item label="角色备注:" :required="type != '2'">
          <el-input style="width:220px" type="textarea" :rows="3" placeholder="输入备注..." size="small" v-model="remark"
            :disabled="type == '2'">
          </el-input>
        </el-form-item>
        <el-form-item label="权限配置:">
          <div class="menu_list_box" v-if="type == '2'">
            <div class="menu_item" v-for="(item,index) in menu_list" :key="index">
              <el-tree :data="item" ref="tree" node-key="menu_id" :props="props"></el-tree>
            </div>
          </div>
          <div class="menu_list_box" v-else>
            <div class="menu_item" v-for="(item,index) in menu_list" :key="index">
              <el-tree :data="item" ref="tree" node-key="menu_id" :default-checked-keys="checked_keys" :props="props"
                show-checkbox @check="checkChange"></el-tree>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="save" @click="saveFn" v-if="type != '2'">保存</div>
    </el-card>
  </div>
</template>
<script>
import resource from "../../api/resource.js";
export default {
  data() {
    return {
      type: "", //1:添加；2:查看；3:编辑
      id: "", //ID
      name: "", //角色名称
      remark: "", //角色备注
      menu_list: [], //功能列表（角色用）
      props: {
        label: "menu_name",
        children: "list",
      },
      checked_keys: [], //已选中的功能id集合
    };
  },
  created() {
    let query = this.$route.query;
    this.type = query.type;
    this.id = query.type == "1" ? "" : query.id;
    if (this.type == "1") {
      //添加
      //添加get
      this.menuroleAddGet();
    } else if (this.type == "2") {
      //查看
      //查看
      this.menuroleInfo();
    } else if (this.type == "3") {
      //编辑
      //编辑get
      this.menuroleEditGet();
    }
  },
  methods: {
    //查看
    menuroleInfo() {
      let arg = {
        role_id: this.id,
      };
      resource.menuroleInfo(arg).then((res) => {
        if (res.data.code == 1) {
          this.menu_list = res.data.data.list;
          this.name = res.data.data.menu_role_name; //角色名称
          this.remark = res.data.data.remark; //备注
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //添加get
    menuroleAddGet() {
      resource.menuroleAddGet().then((res) => {
        if (res.data.code == 1) {
          this.menu_list = res.data.data;
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //编辑get
    menuroleEditGet() {
      let arg = {
        role_id: this.id,
      };
      resource.menuroleEditGet(arg).then((res) => {
        if (res.data.code == 1) {
          this.menu_list = res.data.data.menu_list;
          this.checked_keys = res.data.data.selected_ids;
          this.name = res.data.data.menu_role_name; //角色名称
          this.remark = res.data.data.remark; //备注
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //点击某个功能选项
    checkChange(data, checked) {
      let tree_list = this.$refs.tree;
      let arr = [];
      tree_list.map((item) => {
        arr = [...arr, ...item.getCheckedKeys()];
      });
      this.checked_keys = arr;
    },
    //点击保存
    saveFn() {
      if (this.name == "") {
        this.$message.warning("请输入角色名称!");
        return;
      } else if (this.name.length > 20) {
        this.$message.warning("角色名称不能超过20个字!");
        return;
      } else if (this.remark == "") {
        this.$message.warning("请输入角色备注!");
        return;
      }
      let req = {
        name: this.name,
        ids: this.checked_keys.join(","),
        remark: this.remark,
      };
      if (this.type == "1") {
        //添加
        resource.menuroleAddPost(req).then((res) => {
          if (res.data.code == 1) {
            this.$message.success(res.data.msg);
            this.$router.go(-1);
          } else {
            this.$message.warning(res.data.msg);
          }
        });
      } else if (this.type == "3") {
        //编辑
        req.role_id = this.id;
        resource.menuroleEditPost(req).then((res) => {
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
.card_content {
  overflow-y: scroll;
  .menu_list_box {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .menu_item {
      width: 50%;
    }
  }
  .save {
    margin: 40rem auto;
    border-radius: 2rem;
    background-color: #f36478;
    width: 198rem;
    text-align: center;
    height: 32rem;
    line-height: 32rem;
    font-size: 14rem;
    color: #ffffff;
  }
}
</style>