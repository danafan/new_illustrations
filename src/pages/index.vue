<template>
  <div class="index_container">
    <div class="home_banner">
      <img class="banner" src="../static/home_back.png">
      <div class="banner_content">
        <div class="input_box">
          <div class="box_left">
            <input class="search_input" v-model="search_value" @change="inputChange" placeholder="请输入您要查找的关键词">
          </div>
          <div class="search_button" @click="searchlist">搜索</div>
        </div>
        <div class="show_list">
          <div class="show_item" @click="btnClick(item)" v-for="(item,index) in cateList" :key="index">{{item.cate_name}}</div>
        </div>
      </div>
    </div>
    <div class="goods_list">
      <div class="goods_item" v-for="(item,index) in dataObj.data" @mouseenter="enter_index = index"
        @mouseleave="enter_index = null" :key="index">
        <img class="goods_item_icon" :src="item.domain + item.preview_images">
        <div class="look_button" v-if="enter_index == index" @click="$router.push(`/index_detail?picture_id=${item.picture_id}`)">
          查看</div>
      </div>
    </div>
    <div class="page index_page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :pager-count="11"
        :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="dataObj.total">
      </el-pagination>
    </div>
  </div>
</template>
<style lang="less" scoped>
.index_container {
  background: #ffffff;
  .home_banner {
    position: relative;
    width: 100%;
    height: 600rem;
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
        width: 1200rem;
        height: 80rem;
        display: flex;
        .box_left {
          background-color: #ffffff;
          border-radius: 40rem 0 0 40rem;
          padding-left: 48rem;
          padding-right: 48rem;
          flex: 1;
          height: 80rem;
          display: flex;
          align-items: center;
          justify-content: center;
          input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 24rem;
            color: #333333;
          }
        }
        .search_button {
          border-radius: 0 40rem 40rem 0;
          background-color: #f36478;
          width: 166rem;
          text-align: center;
          height: 80rem;
          line-height: 80rem;
          font-size: 24rem;
          color: #ffffff;
          font-weight: 500;
        }
      }
      .show_list {
        margin-top: 16rem;
        width: 1200rem;
        display: flex;
        .show_item {
          margin-right: 8px;
        }
        .show_item {
          border-radius: 15rem;
          height: 30rem;
          line-height: 30rem;
          background: rgba(0, 0, 0, 0.4);
          padding-left: 16rem;
          padding-right: 16rem;
          font-size: 14rem;
          color: #ffffff;
        }
      }
    }
  }
  .goods_list {
    background: #ffffff;
    padding: 60rem 24rem 0 48rem;
    display: flex;
    flex-wrap: wrap;
    .goods_item {
      margin-right: 24rem;
      margin-bottom: 36rem;
      position: relative;
      width: 345rem;
      height: 535rem;
      .goods_item_icon {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .look_button {
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
      }
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
      cateList: [], //分类列表
      search_value: "", //输入的搜索内容
      enter_index: null, //当前鼠标悬浮的下标
      page: 1,
      pagesize: 10,
      dataObj: {},
      cate_name: "",
      cate_id: "",
    };
  },
  created() {
    //获取列表
    this.getData();
    this.getCateList();
  },
  methods: {
    inputChange() {
      this.cate_id = null;
    },
    //获取分类列表
    getCateList() {
      resource.ajaxCates().then((res) => {
        if (res.data.code == 1) {
          this.cateList = res.data.data;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      //获取列表
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      //获取列表
      this.getData();
    },
    //获取列表
    getData() {
      let arg = {
        search: this.search_value,
        page: this.page,
        pagesize: this.pagesize,
      };
      resource.goodsList(arg).then((res) => {
        if (res.data.code == 1) {
          this.dataObj = res.data.data;
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    searchlist() {
      let obj = {};
      if (this.cate_id) {
        obj.cate_id = this.cate_id;
      } else {
        obj.search = this.search_value;
      }
      resource.goodsList(obj).then((res) => {
        if (res.data.code == 1) {
          console.log(res);
        } else {
          this.$mesage.warning(res.data.msg);
        }
      });
    },
    btnClick(text) {
      this.search_value = text.cate_name;
      this.cate_id = text.cate_id;
    },
  },
};
</script>











