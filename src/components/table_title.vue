<template>
  <div class="table_title">
    <div class="title_text">{{title_text}}</div>
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.table_title {
  border: 1px solid #f0f0f0;
  background: #fafafa;
  width: 100%;
  height: 52rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 35rem;
  padding-right: 20rem;
  .title_text {
    color: #333333;
    font-size: 14rem;
    font-weight: 500;
  }
}
</style>
<script>
export default {
  props: {
    title_text: {
      type: String,
      default: "",
    },
  },
};
</script>