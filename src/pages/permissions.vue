<template>
  <div class="other_container per_container">
    <div class="top_menu">
      <div class="menu_item" :class="{'active_style':active_index == index}" v-for="(item,index) in permissionLists"
        @click="active_index = index" :key="index">
        <div>{{item.menu_name}}</div>
        <div class="active_line" v-if="active_index == index"></div>
      </div>
    </div>
    <el-card id="menu_card" class="menu_card">
      <RolePage v-if="name == 'role'" />
      <UserPage v-if="name == 'members'" />
      <EntryPage v-if="name == 'entry'" />
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.per_container {
  display: flex;
  flex-direction: column;
}
.top_menu {
  height: 54rem;
  margin-bottom: 10rem;
  background: #ffffff;
  width: 100%;
  display: flex;
  padding-left: 30rem;
  .menu_item {
    position: relative;
    margin-right: 80rem;
    height: 54rem;
    line-height: 54rem;
    font-size: 14rem;
    color: #666666;
    font-weight: bold;
    cursor: pointer;
    .active_line {
      position: absolute;
      left: 0;
      bottom: 0;
      background: #f36478;
      width: 100%;
      height: 2px;
    }
  }
  .active_style {
    color: #f36478;
  }
}
.menu_card {
  width: 100%;
  flex: 1;
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
      active_index: 0, //当前选中的导航下标
      name: "",
    };
  },
  computed: {
    permissionLists() {
      let permission_menu = this.$store.state.permission_menu;
      if (permission_menu.length > 0) {
        this.name = this.$store.state.permission_menu[0].web_url;
      }
      return this.$store.state.permission_menu;
    },
  },
  watch: {
    active_index: function (n, o) {
      this.name = this.permissionLists[n].web_url;
    },
  },
  components: {
    RolePage,
    UserPage,
    EntryPage,
  },
};
</script>