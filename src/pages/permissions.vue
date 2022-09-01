<template>
  <div class="other_container row_style">
    <div class="left_menu">
      <div class="menu_item" :class="{'active_style':active_index == index}" v-for="(item,index) in permissionLists"
        @click="active_index = index" :key="index">{{item.menu_name}}</div>
    </div>
    <el-card id="menu_card" class="menu_card">
      <RolePage v-if="name == 'role'" />
      <UserPage v-if="name == 'members'" />
      <EntryPage v-if="name == 'entry'" />
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.row_style {
  display: flex;
  justify-content: space-between;
  .left_menu {
    margin-right: 36rem;
    border-top: 1px solid #dddddd;
    .menu_item {
      background: #ffffff;
      border-right: 1px solid #dddddd;
      border-left: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      width: 220rem;
      padding-left: 52rem;
      height: 54rem;
      line-height: 54rem;
      font-size: 18rem;
      color: #999999;
      font-weight: 500;
    }
    .active_style {
      border-left: 3px solid #f36478;
      color: #f36478;
    }
  }
  .menu_card {
    flex: 1;
    height: 100%;
  }
}
</style>
<script>
import resource from "../api/resource.js";
import RolePage from "./permissionPages/role_page.vue";
import UserPage from "./permissionPages/user_page.vue";
import EntryPage from "./permissionPages/entry_page.vue";
export default {
  data() {
    return {
      permissionLists: [], //左侧导航列表
      active_index: 0, //当前选中的导航下标
      name: "",
    };
  },
  watch: {
    active_index: function (n, o) {
      this.name = this.permissionLists[n].web_url;
    },
  },
  created() {
    const menulist = localStorage.getItem("menulist");
    let menulists = JSON.parse(menulist);

    menulists.map((item) => {
      if ((item.web_url = "permissions")) {
        this.permissionLists = item.list;
      }
    });
    this.name = this.permissionLists[0].web_url;
  },

  components: {
    RolePage,
    UserPage,
    EntryPage,
  },
};
</script>