<style scoped lang="less">
.zm-date-picker {
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
  <div class="zm-date-picker">
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
        <Option :value="item" v-for="item in dataList" :key="item">{{item}}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
export default {
  name: "dataRange",
  data() {
    return {
      dataList: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00"
      ],
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