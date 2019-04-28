<style lang="less" scoped>
.audit-bar {
  width: 100%;
  height: 50px;
  line-height: 1;
  background-color: #e5e5e5;
  box-sizing: border-box;
  padding: 0 10px;
  .bar-item {
    line-height: 50px;
    span {
      font-size: 14px;
    }
  }
}
</style>

<template>
  <div class="audit-bar">
    <Row>
      <Col span="3" v-for="(item,key,index) in barData" :key="index">
        <div class="bar-item">
          <span>{{ item.title }} :</span>
          <span>{{ item.value ? item.value : 0 }}</span>
        </div>
      </Col>
      <Col span="2" offset="2">
        <div class="bar-item">
          <Button type="default" @click="batchPass">批量通过</Button>
        </div>
      </Col>
      <Col span="2">
        <div class="bar-item">
          <Button type="default" @click="batchNoPass">批量不通过</Button>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "audit-bar",
  props: {
    barData: {
      type: Array
    }
  },
  methods: {
    batchPass() {
      this.$emit("batchPass");
    },
    batchNoPass() {
      this.$emit("batchNoPass");
    }
  }
};
</script>


