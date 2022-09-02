<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

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