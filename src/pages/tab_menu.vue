<template>
  <div class="container">
    <div class="page_header">
      <div class="header_left">
        <img class="logo_icon" src="../static/logo_icon.png">
        <div class="tab_list">
          <div class="tab_item" :class="{'active_item':active_index == index}" v-for="(item,index) in menulist"
            @click="toPage(item.web_url,index)" :key="index">{{item.menu_name}} </div>
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
    <PageTitle :page_title="page_title" v-if="show_page_title" />
    <div class="content" :class="{'display':is_center == true}">
      <router-view></router-view>
    </div>
    <div class="page_foot"></div>
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
    overflow-y: scroll;
  }
  .page_foot {
    background-color: #ffffff;
    width: 100%;
    height: 70px;
  }
  .display {
    padding-top: 20rem;
    padding-bottom: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
<script>
import resource from "../api/resource";
import PageTitle from "../components/page_title.vue";
export default {
  data() {
    return {
      is_center: false,
      username: "", //用户名
      menulist: [], //导航列表
      active_index: 0, //当前选中的导航下标
      show_page_title: false,
      page_title: "", //页面标题
      list: [],
    };
  },
  watch: {
    $route(to, from) {
      let router = this.$route;
      let path = router.path;
      this.current_path = path;
      if (path != "/index") {
        this.is_center = true;
        // 权限
        if (path == "/role_setting") {
          if (router.query.type == "1") {
            //添加角色
            this.page_title = "添加角色";
          } else if (router.query.type == "2") {
            //查看权限
            this.page_title = "查看权限";
          } else if (router.query.type == "3") {
            //权限设置
            this.page_title = "权限设置";
          }
          this.show_page_title = true;
        } else if (path == "/user_list") {
          this.page_title = "角色数量";
          this.show_page_title = true;
        } else if (path == "/index_detail") {
          this.page_title = "查看插画";
          this.show_page_title = true;
        } else if (path == "/detail" || path == "/warehouse_detail") {
          this.page_title = "插画详情";
          this.show_page_title = true;
        } else if (path == "/master_add_edit") {
          if (router.query.type == "1") {
            //添加画师
            this.page_title = "上传画师资料";
          } else if (router.query.type == "2") {
            //编辑画师
            this.page_title = "编辑画师资料";
          }
          this.show_page_title = true;
        } else if (path == "/warehouse_add_edit") {
          if (router.query.type == "1") {
            //上传插画
            this.page_title = "上传插画";
          } else if (router.query.type == "2") {
            //编辑插画
            this.page_title = "编辑插画";
          }
          this.show_page_title = true;
        } else {
          this.show_page_title = false;
        }
      } else {
        this.is_center = false;
        this.show_page_title = false;
      }
    },
  },
  created() {
    // this.getUserInfo();
    this.getMenuList();
  },
  methods: {
    //页面切换
    toPage(web_url, index) {
      this.$router.push(web_url);
      localStorage.setItem("activeMenu", { url: web_url, index });
      this.active_index = index;
      console.log(this.active_index);
    },
    //获取菜单列表
    getMenuList() {
      resource.getMenu().then((res) => {
        if (res.data.code == 1) {
          this.menulist = res.data.data;
          //找到所有web_url
          this.findResult(this.menulist);
          localStorage.setItem("menulist", JSON.stringify(res.data.data));
          localStorage.setItem("pathlist", JSON.stringify(this.list));
          // this.toPage(this.menulist[0].web_url, 0);
          // if (localStorage.getItem("")) {
          //   this.toPage(this.menulist[0].web_url, 0);
          //   localStorage.setItem();
          // } else {
          // }
          const activeMenu = localStorage.getItem("activeMenu");
          this.menulist.map((item, index) => {
            if (activeMenu.indexOf(item.web_url) > -1) {
              this.active_index = index;
              console.log(index);
            }
          });
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
    //找到所有web_url
    findResult(menulist) {
      for (let index = 0; index < menulist.length; index++) {
        const element = menulist[index];
        this.list.push(element.web_url);
        if (element.list && element.list.length > 0) {
          this.findResult(element.list);
        }
      }
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















