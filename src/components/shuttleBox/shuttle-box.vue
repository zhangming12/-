// 穿梭框组件

<style lang="less" scoped>
.shuttle-box {
  display: block;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  .shuttle-left,
  .shuttle-right {
    width: 47%;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    .title {
      width: 80%;
      line-height: 24px;
      margin: 10px;
      font-size: 14px;
      border-bottom: 1px solid #e5e5e5;
      text-align: left;
    }
    .main-box {
      max-height: 200px;
      min-height: 200px;
      overflow-y: auto;
      .item {
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
    }
  }
}
</style>

<template>
  <div class="shuttle-box">
    <div class="shuttle-left">
      <div class="title">{{ leftWord }}</div>
      <div class="main-box">
        <template v-for="item in allDataList">
            <shuttleItem
            :key="item.id"
            v-if="!item.selected"
            :class="{'disabled':item.disabled}"
            @click.native="shuttleMethod(item)"
            >{{ item.name }}</shuttleItem>
        </template>
      </div>
    </div>
    <div class="shuttle-right">
      <div class="title">{{ rightWord }}</div>
      <div class="main-box">
        <template v-for="item in allDataList">
            <shuttleItem
            :key="item.id"
            v-if="item.selected"
            :class="{'disabled':item.disabled}"
            @click.native="shuttleMethod(item)"
            >{{ item.name }}</shuttleItem>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import shuttleItem from "./shuttle-item.vue";
export default {
  name: "shuttle-box",
  data() {
    return {};
  },
  components: {
    shuttleItem
  },
  computed:{

  },
  props: {
    leftWord: {
      type: String,
      default: "未选"
    },
    rightWord: {
      type: String,
      default: "已选"
    },
    allDataList: {
      type: Array,
      default() {
        return [
          {
            selected: true,
            // disabled: true,
            id: 1,
            name: "aaa"
          },
          {
            selected: true,
            // disabled: false,
            id: 2,
            name: "bbb"
          },
          {
            selected: false,
            // disabled: false,
            id: 3,
            name: "ccc"
          }
        ];
      }
    }
  },
  methods: {
    shuttleMethod(item) {
      this.$set(item, "selected", !item.selected);
      let data = this.arrangementData();
      this.$emit("getSelectedId", data);
    },
    //整理已选择的数据
    arrangementData() {
      let arr = [];
      this.allDataList.forEach(item => {
        if (item.selected) {
          arr.push(item.id);
        }
      });
      return arr;
    }
  }
};
</script>


