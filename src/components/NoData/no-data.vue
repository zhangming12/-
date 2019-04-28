<style lang="less" scoped>
.no-data {
  // font-size: 16px;
  margin-top: 30px;
  .no-data-main {
    text-align: center;
    padding-top: 180px;
    background: url("../../assets/image/noneData.png") center 10px no-repeat;
    background-size: auto 163px;
    &.noneData {
      background-image: url("../../assets/image/noneData.png");
    }
    &.noneSearch {
      background-image: url("../../assets/image/noneSearch.png");
    }
  }
}
</style>

<template>
  <div class="no-data">
    <div
      class="no-data-main"
      :class="{'noneData': noneStatus, 'noneSearch': !noneStatus}"
    >{{ noneStatus?'未搜索到您要的内容，请重新选择查询':'请选择您需要的搜索条件，点击查询' }}</div>
  </div>
</template>

<script>
export default {
  name: "no-data",
  props: {
    noneStatus: Boolean
  }
};
</script>

