/**
* 复审，质检页面头部的显示条
 */
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
    height: 50px;
    overflow: hidden;
    span {
      font-size: 13px;
    }
  }
}
.audit-bar-modal {
  padding: 30px 10px 0;
  .bar-modal-head {
    display: flex;
    justify-content: space-between;
  }
  .bar-modal-main {
    margin-top: 10px;
  }
}
.bar-modal-footer {
  display: flex;
  padding: 0 80px;
  justify-content: space-between;
}
</style>

<template>
  <div class="audit-bar">
    <Row>
      <Col span="3" v-for="(item,key,index) in barData" :key="index">
        <div class="bar-item TextOverflow" :title="barDataKey[item.key]" :ref="'item' + index">
          <span>{{ item.title }} :</span>
          <span>{{ barDataKey[item.key] }}</span>
        </div>
      </Col>
      <Col span="2" offset="2">
        <div class="bar-item">
          <Button type="default" :disabled="barDataKey.isDis" @click="showPass=true">全部通过</Button>
        </div>
      </Col>
      <Col span="2">
        <div class="bar-item">
          <Button type="default" :disabled="barDataKey.isDis" @click="noPass">全部不通过</Button>
        </div>
      </Col>
    </Row>
    <Modal v-model="showNoPass" width="400">
      <div class="audit-bar-modal">
        <div class="bar-modal-head">
          <span>总数：{{ barDataKey['totalNum'] }}个</span>
          <span>{{ this.useType == 'twice' ? '复审率' : '抽检率'}}：{{ barDataKey['precent'] }}</span>
          <span>正确率：{{ barDataKey['correctPrecent'] }}</span>
        </div>
        <div class="bar-modal-main">
          <Input
            v-model="failOption"
            :autosize="false"
            :rows="5"
            type="textarea"
            placeholder="退回意见*"
          />
        </div>
      </div>
      <div slot="footer" class="bar-modal-footer">
        <Button type="default" @click="batchNoPass">退回重审</Button>
        <Button type="default" @click="showNoPass=false">再审审</Button>
      </div>
    </Modal>
    <Modal v-model="showPass" width="400">
      <div class="audit-bar-modal">
        <div class="bar-modal-head">
          <span>总数：{{ barDataKey['totalNum'] }}个</span>
          <span>{{ this.useType == 'twice' ? '复审率' : '抽检率'}}：{{ barDataKey['precent'] }}</span>
          <span>正确率：{{ barDataKey['correctPrecent'] }}</span>
        </div>
      </div>
      <div slot="footer" class="bar-modal-footer">
        <Button type="default" @click="batchPass">{{ this.useType == 'twice' ? '提交质检' : '提交客户'}}</Button>
        <Button type="default" @click="showPass=false">再审审</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "audit-bar",
  props: {
    barData: {
      type: Array
    },
    barDataKey: {
      type: Object
    },
    useType: {
      type: String,
      default: "twice"
    }
  },
  data() {
    return {
      showNoPass: false,
      showPass: false,
      failOption: "" //不通过意见
    };
  },
  watch: {
    showNoPass(val) {
      if (!val) {
        this.failOption = "";
      }
    }
  },
  methods: {
    //判断是否溢出
    judgeOverflow(index) {
      this.$nextTick(() => {
        let node = this.$refs[`item${index}`];
        let clientWidth = node.clientWidth;
        let scrollWidth = node.scrollWidth;
        console.log(clientWidth, scrollWidth);

        return clientWidth < scrollWidth;
      });
    },
    noPass() {
      this.showNoPass = true;
    },
    batchPass() {
      this.$emit("batchPass");
      this.showPass = false;
    },
    batchNoPass() {
      if (!this.failOption) {
        this.$Message.info("请填写退回意见");
        return false;
      }
      this.showNoPass = false;
      this.$emit("batchNoPass", this.failOption);
    }
  }
};
</script>