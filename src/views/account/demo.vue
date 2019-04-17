<style lang="less" scoped>
// @import "../../config/index.less";
</style>
<template>
  <!-- <Tree :data="data5" show-checkbox :render="renderContent"></Tree> -->
  <div id="Main">
    <div class="main-container">
      <my-tooltip :auditPolicy="auditPolicy"/>
    </div>
    <Button type="primary" @click="show">显示</Button>
  </div>
</template>
<script>
import myTooltip from "@/components/tooltip/tooltip.vue";
export default {
  data() {
    return {
      isShow: false,
      auditPolicy: ""
    };
  },
  components: { myTooltip },
  mounted() {},
  methods: {
    show() {
      this.isShow = true;
    }
  }
};
</script>