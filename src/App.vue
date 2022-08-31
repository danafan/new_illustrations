<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import resource from "./api/resource";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  // watch: {
  //   $route(newVal, oldVal) {
  //     console.log(this.$route);
  //     localStorage.setItem("routeNow", this.$route.path);
  //   },
  // },
  created() {
    this.getUserInfo();
    // this.$router.push({ path: localStorage.getItem("routeNow") });
  },
  methods: {
    //单独页面刷新
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
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
          // this.$router.push("/tab_menu");
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
  },
};
</script>