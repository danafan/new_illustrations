<template>
  <div id="app">
    <router-view></router-view>
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
  },
  methods: {
    //获取用户信息
    getUserInfo() {
      resource.loginUser().then((res) => {
        if (res.data.code == 1) {
          localStorage.setItem("ding_user_id", res.data.data.ding_user_id);
          localStorage.setItem("ding_user_name", res.data.data.ding_user_name);
          localStorage.setItem("secret_key", res.data.data.secret_key);
          localStorage.setItem("login_token", res.data.data.login_token);
          const fullPath = localStorage.getItem("fullPath");
          if (!fullPath) {
            this.$router.push("/tab_menu");
          } else {
            this.$router.push(fullPath);
          }
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
  },
};
</script>