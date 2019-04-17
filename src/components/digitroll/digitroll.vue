/* 数字滚动组件
    params:
        num:String,Number,显示的数字 required

**/

<style lang="less" scoped>
.my-skin {
  display: inline-block;
}
</style>

<template>
    <div>
        <div class="my-skin" >
            <div :style="numStyle" :id="id" class="myroll"></div>
        </div>
    </div>
</template>

<script>
import DigitRoll from "@/util/digitroll.js";
export default {
  props: {
    num: {
      type: [Number, String],
      required: true,
      default: 0
    },
    color: {
      type: String,
      default: "#f00"
    },
    fSize: {
      type: [Number, String],
      default: 32
    },
    height: {
      type: [Number, String],
      default: 40
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      dom: null
    };
  },
  computed: {
    numStyle() {
      return {
        color: this.color,
        "font-size": this.fSize + "px",
        height: this.height + "px",
        lineHeight: 1.5
      };
    }
  },
  watch: {
    num() {
      if (this.dom) this.dom.roll(this.num);
    }
  },
  mounted() {
    this.dom = new DigitRoll({
      container: `#${this.id}`
    });
    this.dom.roll(this.num);
  }
};
</script>