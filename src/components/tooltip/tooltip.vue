// 二次封装iview的Tooltip组件，使用于审核页面的规则显示
<style lang="less" scoped>
.my_tooltip {
  display: inline-block;
  width: 20px;
  height: 20px;
  .my_p {
    //默认换行
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="my_tooltip">
    <Tooltip :max-width="maxWidth" transfer :placement="placement">
      <Icon type="md-help-circle" size="20"/>
      <div slot="content">
        <p class="my_p" v-for="v in APStr" :key="v">{{ v }}</p>
      </div>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: "my-tooltip",
  props: {
    auditPolicy: {
      //内容
      type: String,
      default: ""
    },
    placement: {
      //位置
      type: String,
      default: "right"
    },
    maxWidth: {
      //最大宽度
      type: [String, Number],
      default: 800
    }
  },
  data() {
    return {};
  },
  computed: {
    APStr() {
      let auditPolicy = this.auditPolicy;
      if (auditPolicy) {
        return auditPolicy.split("|");
      }
      return [];
    }
  }
};
</script>