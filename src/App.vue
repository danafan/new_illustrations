<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
 <style lang="less" scoped>
/deep/ .el-pagination {
  color: #666666;
}
/deep/ .el-pager li:not(.disabled).active {
  color: #f36478;
}
/deep/ .el-pager li:hover {
  color: #666666;
}
/deep/ .el-pagination__total {
  color: #666666;
}
/deep/ .el-pagination__jump {
  color: #666666;
}
</style>
<script>
import resource from "./api/resource";
export default {
  created() {
    this.getUserInfo();
    // this.$router.push("/tab_menu");
  },
  watch: {
    $route(to, from) {
      let router = this.$route;
      let path = router.path;
      localStorage.setItem("activeMenu", path);
    },
  },
  methods: {
    //获取用户信息
    getUserInfo() {
      resource.loginUser().then((res) => {
        if (res.data.code == 1) {
          this.username = res.data.data.ding_user_name;
          this.id = res.data.data.ding_user_id;
          localStorage.setItem("ding_user_id", res.data.data.ding_user_id);
          localStorage.setItem("ding_user_name", res.data.data.ding_user_name);
          localStorage.setItem("secret_key", res.data.data.secret_key);
          localStorage.setItem("login_token", res.data.data.login_token);
          const activeMenu = localStorage.getItem("activeMenu");
          if (!activeMenu) {
            this.$router.push("/login");
          } else {
            this.$router.push("/tab_menu");
          }
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
  },
};
</script>