<template>
  <div class="index_container">
    <div class="home_banner">
      <img class="banner" src="../static/home_back.png">
      <div class="banner_content">
        <div class="input_box">
          <div class="box_left">
            <input class="search_input" autofocus v-model="search_value" placeholder="请输入您要查找的关键词" @keyup.enter="searchlist()">
            <img class="search_delete" @click="search_value = ''" src="../static/search_delete.png" v-if="search_value != ''" />
          </div>
          <div class="search_button" @click="searchlist">搜索</div>
        </div>
      </div>
    </div>
    <div class="cate_row">
      <div class="cate_item" :class="{'active_cate':active_index === index}" v-for="(item,index) in cateList" :key="index"
        @click="active_index = index">
        <div class="cate_icon_box" :class="{'active_cate_icon_box':active_index === index}">
          <img class="cate_icon" src="../static/logo_icon.png">
        </div>
        <div class="cate_name">{{item.cate_name}}</div>
      </div>
    </div>
    <div v-loading="loading">
      <div class="goods_list" v-if="dataObj.total > 0">
        <div class="goods_item" v-for="(item,index) in dataObj.data" @mouseenter="enter_index = index"
          @mouseleave="enter_index = null" :key="index">
          <div class="img_box" :class="{'active_img':enter_index == index}">
            <el-image :src="item.domain + item.preview_images" fit="contain"></el-image>
          </div>
          <img class="shadow_top" src="../static/shadow_top.png">
          <img class="shadow_bottom" src="../static/shadow_bottom.png">
          <div class="title">{{item.title}}</div>
          <div class="look_button" v-if="enter_index == index && button_list.detail==1"
            @click="$router.push(`/index_detail?picture_id=${item.picture_id}&select=${button_list.select}`)">查看</div>
        </div>
      </div>
      <div class="page index_page" v-if="dataObj.total > 0">
        <el-pagination small @current-change="handleCurrentChange" :current-page="page" :page-size="10"
          layout="slot, prev, pager, next,jumper" :total="dataObj.total">
          <div class="page_row">共<div class="theme_page">{{total_pages}}</div>页/<div class="theme_page">{{dataObj.total}}</div>条数据
          </div>
        </el-pagination>
      </div>
      <div class="null_list" v-if="dataObj.total === 0">
        <img class="null_image" src="../static/list_null.png" />
        <div class="null_text">什么都没有哦~</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.index_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow-y: scroll;
  .home_banner {
    position: relative;
    width: 100%;
    height: 360rem;
    .banner {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .banner_content {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .input_box {
        width: 520rem;
        height: 60rem;
        display: flex;
        justify-content: center;
        .box_left {
          width: 446rem;
          background-color: #ffffff;
          border-radius: 30rem 0 0 30rem;
          padding-left: 28rem;
          padding-right: 28rem;
          flex: 1;
          height: 60rem;
          display: flex;
          align-items: center;
          justify-content: center;
          input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 18rem;
            color: #333333;
          }
          .search_delete {
            margin-left: 28rem;
            width: 18rem;
            height: 18rem;
          }
        }
        .search_button {
          border-radius: 0 30rem 30rem 0;
          background-color: #f36478;
          width: 80rem;
          text-align: center;
          height: 60rem;
          line-height: 60rem;
          font-size: 18rem;
          color: #ffffff;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
  }
  .cate_row {
    border-bottom: 1px solid #e8e8e8;
    width: 100%;
    height: 68rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 48rem;
    padding-right: 48rem;
    .cate_item {
      background: #fafafa;
      border-radius: 24rem;
      width: 240rem;
      height: 48rem;
      display: flex;
      align-items: center;
      .cate_icon_box {
        border-radius: 24rem;
        width: 48rem;
        height: 48rem;
        background: #ffffff;
        box-shadow: 0px 2rem 8rem 0rem #e9e9e9;
        display: flex;
        align-items: center;
        justify-content: center;
        .cate_icon {
          width: 33rem;
          height: 33rem;
        }
      }
      .active_cate_icon_box {
        box-shadow: 0px 2rem 8rem 0rem #fab8c1;
      }
      .cate_name {
        flex: 1;
        text-align: center;
        height: 48rem;
        line-height: 48rem;
        font-size: 20rem;
        color: #666666;
        font-weight: 500;
        cursor: pointer;
      }
    }
    .active_cate {
      background: #ffebee;
    }
  }
  .goods_list {
    background: #ffffff;
    padding: 60rem 24rem 0 48rem;
    display: flex;
    flex-wrap: wrap;
    .goods_item {
      background: #f9f8f9;
      margin-right: 24rem;
      margin-bottom: 36rem;
      position: relative;
      width: 344rem;
      height: 535rem;
      .img_box {
        background: #ffffff;
        margin: 64rem auto 0;
        width: 280rem;
        height: 452rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .active_img {
        box-shadow: 0 5rem 19rem 0 #bfbdbe, 0 5rem 19rem 0 #bfbdbe;
      }
      .shadow_top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 123rem;
      }
      .shadow_bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 158rem;
      }
      .title {
        position: absolute;
        top: 24rem;
        left: 50%;
        transform: translate(-50%);
        width: 280rem;
        text-align: center;
        font-size: 22rem;
        font-weight: 500;
        color: #ffffff;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .look_button {
        border: 2px solid #ffffff;
        border-radius: 27rem;
        background: #f36478;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        bottom: 30rem;
        width: 238rem;
        text-align: center;
        height: 54rem;
        line-height: 54rem;
        color: #ffffff;
        font-size: 24rem;
        cursor: pointer;
      }
    }
  }
  .null_list {
    height: 1175rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .null_image {
      width: 546rem;
      height: 360rem;
    }
    .null_text {
      margin-top: 24rem;
      font-size: 12rem;
      color: #999999;
    }
  }
  .index_page {
    padding-right: 48rem;
  }
}
</style>
<script>
import resource from "../api/resource.js";
export default {
  data() {
    return {
      loading: false,
      cateList: [], //分类列表
      active_index: 0,
      search_value: "", //输入的搜索内容
      enter_index: null, //当前鼠标悬浮的下标
      page: 1,
      pagesize: 10,
      total_pages: 0,
      dataObj: {
        total: null,
      },
      cate_name: "",
      cate_id: "",
      button_list: {},
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/index_detail") {
      from.meta.isBack = true;
    } else {
      from.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.page = 1;
      this.cate_id = "";
      this.active_index = 0;
      this.search_value = "";
      this.getCateList();
    } else {
      //返回之后重新调接口
      this.getData();
    }
    this.$route.meta.isBack = false;
  },
  watch: {
    active_index: function (n, o) {
      this.page = 1;
      this.cate_id = n === null ? "" : this.cateList[n].cate_id;
      if (n !== null) {
        this.search_value = "";
      }
      this.getData();
    },
  },
  methods: {
    //回车或点击搜索
    searchlist() {
      this.page = 1;
      this.active_index = null;
      this.cate_id = "";
      this.getData();
    },
    //获取分类列表
    getCateList() {
      resource.ajaxCates().then((res) => {
        if (res.data.code == 1) {
          this.cateList = res.data.data;
          this.cate_id = this.cateList[0].cate_id;
          //获取列表
          this.getData();
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      //获取列表
      this.getData();
    },
    //获取列表
    getData() {
      let obj = {
        page: this.page,
        pagesize: this.pagesize,
      };
      if (this.search_value != "") {
        obj.search = this.search_value;
      } else {
        obj.cate_id = this.cate_id;
      }
      this.loading = true;
      resource.goodsList(obj).then((res) => {
        if (res.data.code == 1) {
          this.loading = false;
          this.dataObj = res.data.data;
          this.total_pages =
            this.dataObj.total && this.dataObj.total % 10 == 0
              ? parseInt(this.dataObj.total / 10)
              : parseInt(this.dataObj.total / 10) + 1;
          this.button_list = res.data.data.button_list;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
  },
};
</script>











