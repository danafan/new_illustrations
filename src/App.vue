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
      let login_token = localStorage.getItem("login_token");
      if(login_token){
        //获取用户信息
        this.getUserInfo()
      }else{
        this.$router.push("/login");
      }
    },
    watch: {
      $route(to, from) {
        let router = this.$route;
        let path = router.path;
        localStorage.setItem("fullPath", router.fullPath);
        if (path != "/index") {
        // 权限
        if (path == "/role_setting") {
          if (router.query.type == "1") {
            //添加角色
            this.$store.commit("checkTitle", "添加角色");
          } else if (router.query.type == "2") {
            //查看权限
            this.$store.commit("checkTitle", "查看权限");
          } else if (router.query.type == "3") {
            //权限设置
            this.$store.commit("checkTitle", "权限设置");
          }
          this.$store.commit("checkStatus", true);
        } else if (path == "/user_list") {
          this.$store.commit("checkTitle", "角色数量");
          this.$store.commit("checkStatus", true);
        } else if (path == "/index_detail") {
          this.$store.commit("checkTitle", "查看插画");
          this.$store.commit("checkStatus", true);
        } else if (path == "/detail" || path == "/warehouse_detail") {
          this.$store.commit("checkTitle", "插画详情");
          this.$store.commit("checkStatus", true);
        } else if (path == "/master_add_edit") {
          if (router.query.type == "1") {
            //添加画师
            this.$store.commit("checkTitle", "上传画师资料");
          } else if (router.query.type == "2") {
            //编辑画师
            this.$store.commit("checkTitle", "编辑画师资料");
          }
          this.$store.commit("checkStatus", true);
        } else if (path == "/warehouse_add_edit") {
          if (router.query.type == "1") {
            //上传插画
            this.$store.commit("checkTitle", "上传插画");
          } else if (router.query.type == "2") {
            //编辑插画
            this.$store.commit("checkTitle", "编辑插画");
          }
          this.$store.commit("checkStatus", true);
        } else {
          this.$store.commit("checkStatus", false);
        }
      } else {
        this.$store.commit("checkStatus", false);
      }
    },
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