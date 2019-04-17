<style lang="less" scoped>
.shuttle-item {
  cursor: pointer;
  line-height: 24px;
  text-align: left;
  color: #666;
  padding-left: 20px;
  font-size: 14px;
  &:hover {
    color: red;
  }
  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
    &:hover {
      color: #666;
    }
  }
}
</style>

<template>
  <div class="shuttle-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "shuttle-item",
  data() {
    return {};
  },
  props: {},
  methods: {}
};
</script>


