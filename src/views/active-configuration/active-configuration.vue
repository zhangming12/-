<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  overflow: hidden;
}
nav {
  overflow: hidden;
  .children {
    float: left;
    line-height: 2;
    font-size: 16px;
    span {
      color: #666;
      display: block;
      cursor: pointer;
      float: left;
      user-select: none;
    }
    &:after {
      content: ">";
      color: #666;
      padding: 0 10px;
      float: left;
    }
    &:last-child {
      &:after {
        content: "";
      }
    }
  }
  .select {
    span {
      color: @primary-color;
      border-bottom: 1px solid @primary-color;
    }
  }
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">我的活动管理</h2> -->
      <div class="box">
          <nav>
              <div :class="['children',showStatus == item.status?'select':'']" @click="selectMenu(index,item.status)" v-for="(item,index) in Menu" :key="index">
                  <span>{{ item.name }}</span>
              </div>
          </nav>
          <activeBase v-show="showStatus == 'base'" ></activeBase>
          <activeLottery ref="activeLottery" v-show="showStatus == 'lottery'" ></activeLottery>
          <activeRules ref="activeRules" v-show="showStatus == 'rules'" ></activeRules>
          <activeErrorMsg ref="activeErrorMsg" v-show="showStatus == 'errorMsg'" ></activeErrorMsg>
          <activeRelation ref="activeErrorMsg" v-show="showStatus == 'relation'" ></activeRelation>
      </div>
  </div>
</template>

<script>
import activeBase from "@/components/activite-configuration/active-base";
import activeLottery from "@/components/activite-configuration/active-lottery";
import activeRules from "@/components/activite-configuration/active-rules";
import activeErrorMsg from "@/components/activite-configuration/active-errorMsg";
import activeRelation from "@/components/activite-configuration/active-relation";
export default {
  name: "active-configuration-keepAlive",
  data() {
    return {
      showStatus: "errorMsg",
      Menu: [
        {
          name: "活动内容",
          status: "base"
        },
        {
          name: "开奖页面",
          status: "lottery"
        },
        {
          name: "中奖页面",
          status: "winning"
        },
        {
          name: "活动规则",
          status: "rules"
        },
        {
          name: "异常提醒",
          status: "errorMsg"
        },
        {
          name: "其他信息",
          status: "other"
        },
        {
          name: "关联活动码",
          status: "relation"
        }
      ]
    };
  },
  created() {},
  methods: {
    selectMenu(index, status) {
      this.showStatus = status;
    },
    click() {
      this.$refs.activeLottery.changeUrl();
    }
  },
  components: {
    activeBase,
    activeLottery,
    activeRules,
    activeErrorMsg,
    activeRelation
  }
};
</script>


