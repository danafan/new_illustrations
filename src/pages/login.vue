<template>
  <div>
    <div class="loginBox">
      <img src="../static/home_back.png" />
      <div class="content">
        <div class="text">钉钉扫码一键登录</div>
        <div id="login_container" style="transform: scale(1.0)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import resource from "../api/resource";
export default {
  data() {
    return {};
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.getAppids();
  },
  methods: {
    getAppids() {
      resource.getAppid().then((res) => {
        if (res.data.code == "1") {
          let appKey = res.data.data.appkey;
          this.ddLoginInit(appKey);
        } else {
          this.$message({
            message: res.data.message,
            type: "warning",
          });
        }
      });
    },
    ddLoginInit(appKey) {
      //钉钉扫码流程：扫码成功登录后会自动跳到这个url页面，url路径会携带code，你拿到这个code，调用登录接口成功就跳转。
      // let url = `${location.origin}/api/scancodes/ewmlogin`;
      let url = "http://producttest.92nu.com/api/scancodes/ewmlogin";
      // appid 找后端要
      // let appid = "dingkqqsqmlpwlffofe2";
      // let appid = appKey;
      const goto = encodeURIComponent(
        `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appKey}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
      );
      window.DDLogin({
        id: "login_container",
        goto: goto,
        style: "border:none;background-color:#FFFFFF;margin:0 auto;",
        width: "100%", //官方参数 365
        height: "350", //官方参数 400
      });
      let handleMessage = (event) => {
        let origin = event.origin;
        if (origin == "https://login.dingtalk.com") {
          //判断是否来自ddLogin扫码事件。
          const loginTmpCode = event.data;
          //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          console.log("loginTmpCode", loginTmpCode);
          //此步拿到临时loginTmpCode换取正式code
          window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appKey}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`;
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", handleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", handleMessage);
      }
    },
    getUserInfo() {
      resource.loginUser().then((res) => {
        if (res.data.code == 1) {
          this.username = res.data.data.ding_user_name;
          this.id = res.data.data.ding_user_id;
          localStorage.setItem("ding_user_id", res.data.data.ding_user_id);
          localStorage.setItem("ding_user_name", res.data.data.ding_user_name);
          localStorage.setItem("secret_key", res.data.data.secret_key);
          localStorage.setItem("login_token", res.data.data.login_token);
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loginBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .content {
    position: absolute;
    top: 20%;
    left: 60%;
    width: 477px;
    height: 532px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #ebebeb;
  }
  .text {
    width: 192px;
    height: 33px;
    font-size: 24px;
    font-weight: 500;
    color: #f36478;
    line-height: 33px;
    margin: 42px auto 0px auto;
  }
}
</style>