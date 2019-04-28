<style scoped lang="less">
@import "../../config/index.less";
.container {
  display: flex;
  flex-direction: row;
  .timeBox {
    width: 60%;
    padding: 0;
    margin: 0;
    padding-right: 10px;
    .date-picker {
      width: 100% !important;
    }
  }
  .hourBox {
    width: 40%;
    padding: 0;
    margin: 0;
  }
}
</style>
<template>
  <div class="container">
    <div class="timeBox">
      <Date-picker
        :placement="placement"
        class="date-picker"
        :disabled="dis"
        type="date"
        @on-change="changeTime"
        v-model="yearData"
        :placeholder="placeholder"
      ></Date-picker>
    </div>
    <div class="hourBox">
      <Select :disabled="dis" v-model="hourData" placeholder="请选择时间" @on-change="changeTypeValue">
        <Option
          :value="item.dataTime"
          v-for="item in dataList"
          :key="item.dataTime"
        >{{item.dataTime}}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
export default {
  name: "dataRange",
  data() {
    return {
      dataList: [],
      yearData: this.value ? this.value.slice(0, 10) : "",
      hourData: this.hour
    };
  },
  props: {
    value: {
      type: [String]
    },
    placement: {
      type: String,
      default: "bottom-start"
    },
    hour: {
      type: String,
      default: "00:00"
    },
    dis: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "开始时间"
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.yearData = this.value.slice(0, 10);
      } else {
        this.yearData = "";
      }
    }
  },
  created() {
    let str = ":00";
    for (let i = 0; i <= 24; i++) {
      let time = i < 10 ? "0" + i : i;
      time += str;
      this.dataList.push({ dataTime: time });
    }
  },
  methods: {
    changeTime(val) {
      if (val) {
        val = `${val} ${this.hourData}:00`;
      } else {
        val = "";
      }
      this.$emit("input", val);
    },
    changeTypeValue(val) {
      if (this.yearData) {
        let yearData = new Date(this.yearData).pattern("yyyy-MM-dd");
        val = `${yearData} ${val}:00`;
      } else {
        val = "";
      }
      this.$emit("input", val);
    }
  }
};
</script>