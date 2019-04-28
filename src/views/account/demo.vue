<style lang="less" scoped>
// @import "../../config/index.less";
</style>
<template>
  <div id="Main">
    <audit-bar :barData="barData"></audit-bar>
    <Badge text="new">
      <a href="#" class="demo-badge">ceshi</a>
    </Badge>
    <no-data :noneStatus="noneStatus"/>
    <upload-file/>
  </div>
</template>
<script>
import noData from "@/components/NoData/no-data.vue";
import uploadFile from "@/components/uploadFile/upload-file.vue";
import auditBar from "@/components/auditItem/audit-bar.vue";
export default {
  data() {
    return {
      barData: [
        {
          name: "总数",
          value: 1
        },
        {
          name: "已审核",
          value: "12"
        },
        {
          name: "通过数",
          value: "12"
        },
        {
          name: "不通过",
          value: "12"
        },
        {
          name: "通过率",
          value: "12"
        }
      ],
      noneStatus: true,
      time: ""
    };
  },
  components: { auditBar, noData, uploadFile },
  mounted() {},
  methods: {}
};
</script>