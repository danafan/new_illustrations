<template>
  <div class="container">
    <div class="page_header">
      <div class="header_left">
        <img class="logo_icon" src="../static/logo_icon.png">
        <div class="tab_list">
          <div class="tab_item" :class="{'active_item':active_index == index}" v-for="(item,index) in menulist"
            @click="toPage(item.web_url,index)" :key="item.menu_name">{{item.menu_name}} </div>
        </div>
      </div>
      <div class="header_right">
        <div class="user_box">
          <img class="user_img" src="../static/user_img.png">
          <div class="user_name">{{username}}</div>
        </div>
        <div class="login_out" @click="loginOut">退出登录</div>
      </div>
    </div>
    <PageTitle :page_title="$store.state.page_title" v-if="$store.state.show_page_title" />
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="page_foot">
      <div class="line">网络文化经营许可证：浙网文[2013]0268-027号|增值电信业务经营许可证:浙B2-20080224|信息网络传播视听节目许可证:1109364号|互联网违法和不良信息举报电话:0571-81683755
        blxxjb@alibaba-inc.com
        网络文化经营许可证：浙网文[2013]0268-027号|增值电信业务经营许可证:浙B2-20080224|信息网络传播视听节目许可证:1109364号|互联网违法和不良信息举报电话:0571-81683755
        blxxjb@alibaba-inc.com</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .page_header {
    padding-left: 48px;
    padding-right: 28px;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header_left {
      display: flex;
      align-items: center;
      .logo_icon {
        margin-right: 25px;
        width: 134px;
        height: 48px;
      }
      .tab_list {
        display: flex;
        align-items: center;
        .tab_item {
          margin-right: 34px;
          font-size: 14px;
          color: #333333;
          font-weight: 500;
          cursor: pointer;
        }
        .active_item {
          color: #f36478;
        }
      }
    }
    .header_right {
      display: flex;
      align-items: center;
      .user_box {
        display: flex;
        align-items: center;
        .user_img {
          border-radius: 50%;
          width: 24px;
          height: 24px;
        }
        .user_name {
          margin-left: 8px;
          font-size: 14px;
          color: #333333;
          font-weight: 500;
          cursor: pointer;
        }
      }
      .login_out {
        margin-left: 32px;
        font-size: 14px;
        color: #f36478;
        cursor: pointer;
      }
    }
  }
  .content {
    background-color: #f6f6f6;
    width: 100%;
    flex: 1;
    position: relative;
  }
  .page_foot {
    background-color: #f6f6f6;
    width: 100%;
    height: 129rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      width: 1440rem;
      height: 40rem;
      border-top: 1px solid #dddddd;
      font-size: 12rem;
      color: #666666;
      line-height: 20rem;
    }
  }
}
</style>
<script>
import resource from "../api/resource";
import PageTitle from "../components/page_title.vue";
export default {
  data() {
    return {
      username: "", //用户名
    };
  },
  computed: {
    menulist() {
      return this.$store.state.menu_list;
    },
    active_index() {
      return this.$store.state.active_index;
    },
  },
  created() {
    this.username = localStorage.getItem("ding_user_name");
  },
  methods: {
    //页面切换
    toPage(web_url, index) {
      this.$router.push(web_url);
      this.$store.commit("setActiveIndex", index);
    },
    //退出登录
    loginOut() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          resource.loginOut({ id: this.id }).then((res) => {
            if (res.data.code == 1) {
              localStorage.clear();
              this.$message({
                type: "success",
                message: "已退出",
              });
              this.$router.replace("/login");
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },
  },
  components: {
    PageTitle,
  },
};
</script>















