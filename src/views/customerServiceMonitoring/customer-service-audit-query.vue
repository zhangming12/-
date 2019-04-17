
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  padding: 0 10px;
}
.form {
  position: relative;
  display: flex;
  .container {
    width: 17.5%;
    margin: auto;
    .w18 {
      width: 100%;
    }
  }
}
.tableBox {
  overflow: hidden;
  padding-bottom: 70px;
  min-height: 400px;
  margin-top: 15px;
  position: relative;
  .pageBox {
    position: absolute;
    bottom: 20px;
    right: 20px;
    overflow: hidden;
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">客服监控</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
                <Form-item required>
                  <Date-picker type="date" placeholder="选择日期" v-model="createTime"></Date-picker>
              </Form-item>
            </div>
          </div>
          <div class="btn-left w10">
            <div class="searchBox">
                <div class="btn-right search-right" @click="submit">
                    <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="box tableBox">
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
    </div>
	</div>
</template>

<script>
import { EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "customer-service-audit-query-keepAlive",
  data() {
    return {
      createTime: EDFAULT_ENDTIME,
      pageData: [],
      columns1: [
        {
          title: "日期",
          key: "date",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作人",
          key: "userName",
          align: "center",
          minWidth: 150
        },
        {
          title: "账户编号",
          key: "userId",
          align: "center",
          minWidth: 120
        },
        {
          title: "总数",
          key: "total",
          align: "center",
          minWidth: 120
        },
        {
          title: "初审通过",
          key: "onePass",
          align: "center",
          minWidth: 120
        },
        {
          title: "初审不通过",
          key: "oneNotPass",
          align: "center",
          minWidth: 120
        },
        {
          title: "初审退回",
          key: "oneReturn",
          align: "center",
          minWidth: 120
        },
        {
          title: "复审通过",
          key: "checkSecondPass",
          align: "center",
          minWidth: 120
        },
        {
          title: "复审不通过",
          key: "checkSecondNotPass",
          align: "center",
          minWidth: 120
        },

        {
          title: "复审退回",
          key: "checkSecondReturn",
          align: "center",
          minWidth: 120
        }
      ]
    };
  },
  methods: {
    submit() {
      this.init();
    },
    init() {
      if (!this.createTime) {
        this.$Message.error("请选择查询时间");
        return;
      }
      let data = {};
      data["createTime"] = this.Global.createTime(this.createTime).slice(0, 10);
      this.Global.doPost(
        "personnel/customerServiceCheckCountByUser.json",
        data,
        res => {
          this.pageData = res;
          res.forEach(item => {
            item.total =
              item.onePass +
              item.oneNotPass +
              item.oneReturn +
              item.checkSecondPass +
              item.checkSecondNotPass +
              item.checkSecondReturn;
          });
        }
      );
    }
  }
};
</script>