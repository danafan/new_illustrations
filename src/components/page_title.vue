<template>
  <div class="page_title_header">
    <div class="page_title_text">{{page_title}}</div>
    <div class="go_back" @click="$router.go(-1)">返回</div>
  </div>
</template>
<script>
export default {
  props: {
    page_title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="less" scoped>
.page_title_header {
  background: #ffffff;
  border-left: 3px solid #f36478;
  border-top: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  width: 100%;
  height: 54rem;
  padding-left: 32rem;
  padding-right: 32rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14rem;
  font-weight: 500;
  .page_title_text {
    color: #000000;
  }
  .go_back {
    font-weight: 500;
    color: #333333;
    cursor: pointer;
  }
}
</style>



