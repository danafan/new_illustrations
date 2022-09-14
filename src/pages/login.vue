<template>
  <div>
    <div class="loginBox">
      <div class="main">
        <div class="main_left">
          <img class="main_img" src="../static/background_icon.png" alt="">
        </div>
        <div class="main_right">
          <div class="content">
            <div class="text">钉钉扫码一键登录</div>
            <div id="login_container"></div>
          </div>
        </div>
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
      let url = `${location.origin}/api/scancodes/ewmlogin`;
      // let url = "http://producttest.92nu.com/api/scancodes/ewmlogin";
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
          // console.log("loginTmpCode", loginTmpCode);
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
  background: url(../static/login_icon.png) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: 53rem;
  padding-bottom: 52rem;
  padding-left: 72rem;
  padding-right: 71rem;
  .main {
    width: 1777rem;
    height: 955rem;
    background-color: #ffffff;
    display: flex;
    border-radius: 39rem;
    .main_left {
      height: 955rem;
      background: url(../static/view_icon.png) no-repeat;
      .main_img {
        width: 1061rem;
        height: 855rem;
        margin-top: 100rem;
      }
    }
    .content {
      width: 400rem;
      height: 500rem;
      background: #ffffff;
      border-radius: 8rem;
      border: 1rem solid #ebebeb;
      margin-left: 138rem;
      margin-top: 212rem;
    }
    .text {
      width: 192rem;
      height: 33rem;
      font-size: 24rem;
      font-weight: 500;
      color: #f36478;
      line-height: 33rem;
      margin: 42rem auto 0rem auto;
    }
  }
}
</style>