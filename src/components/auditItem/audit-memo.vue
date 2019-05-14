<style lang="less" scoped>
.audit-memo {
  display: inline-block;
  position: relative;
  cursor: pointer;
  .audit-input-box {
    position: absolute;
    top: 20px;
    left: 10px;
    width: 250px;
    z-index: 100;
    display: flex;
    input {
      flex: 1;
    }
    button {
      width: 50px;
      border: none;
    }
  }
}
</style>
<template>
  <div v-clickoutside="handClose" class="audit-memo" @click="show">
    备注
    <div class="audit-input-box" v-if="showInput">
      <Input v-model.trim="memo" placeholder="请输入备注" clearable/>
      <Button type="default" @click.stop="sendMemo">保存</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "audit-memo",
  directives: {
    clickoutside: {
      bind: (el, binding, vnode) => {
        function documentHandle(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueclickoutside__ = documentHandle;
        document.addEventListener("click", documentHandle, false);
      },
      unbind: (el, binding) => {
        document.removeEventListener("click", el.__vueclickoutside__);
        delete el.__vueclickoutside__;
      }
    }
  },
  data() {
    return {
      showInput: false,
      memo: this.value
    };
  },
  props: {
    value: {
      type: String
    }
  },
  watch: {
    value(val) {
      this.memo = val;
    }
  },
  methods: {
    handClose() {
      this.showInput = false;
    },
    show() {
      this.showInput = true;
    },
    sendMemo() {
      console.log(this.memo);
      this.$emit("input", this.memo);
      this.showInput = false;
    }
  }
};
</script>