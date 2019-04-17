<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
.sGroup {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-end;
  width: 120px;
  height: 30px;
  position: relative;
  .sGroup-modal {
    position: absolute;
    top: 4px;
    transition: all 0.2s;
    position: relative;
    background: rgb(239, 239, 239);
    z-index: 1000;
    border-radius: 4px;
    width: 300px;
    left: -173px;
    .sGroup-main {
      max-height: 300px;
      overflow-y: auto;
    }
    p {
      text-indent: 20px;
      line-height: 30px;
      color: rgb(102, 102, 102);
      &.active {
        color: red;
      }
      .modal-title {
        font-weight: bold;
      }
    }
  }
}
.sGroup:hover .sGroup-modal {
  display: block;
}
</style>
<template>
  <div class="sGroup" v-clickoutside="handClose">
    <img
      src="../assets/presentationBoardImage/13.png"
      @click="imgClick"
      class="icon-modal-toas logBox"
    >
    <div class="sGroup-modal" v-show="showModal">
      <div class="sGroup-main" v-if="groupList.length">
        <p
          :class="{'active':item.id == id}"
          v-for="(item,index) in groupList"
          :key="index"
          @click="selectItem(item,index)"
        >{{ item.groupName }}</p>
      </div>
      <p v-else style="text-align:center;text-indent:0;">暂无活动</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "fieldNameDes",
  data() {
    return {
      id: this.groupId,
      showModal: false
    };
  },
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
  props: {
    groupList: {
      type: Array,
      default() {
        return [];
      }
    },
    groupId: {
      type: [Number, String],
      default: ""
    },
    width: {
      type: [Number, String],
      default: 200
    },
    height: {
      type: [Number, String],
      default: 30
    }
  },
  created() {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    imgClick() {
      this.showModal = !this.showModal;
    },
    selectItem(item, index) {
      this.id = item.id;
      this.$emit("getGroupId", item.id);
      this.showModal = false;
    },
    handClose() {
      this.showModal = false;
    }
  }
};
</script>