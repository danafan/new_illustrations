<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
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
  created() {
    // this.$router.push("/tab_menu");

    resource.loginUser().then((res) => {
      if (res.data.code == "1") {
        this.$router.push("/index");
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    //单独页面刷新
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>