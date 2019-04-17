<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  // margin: 0 auto 15px;
  // padding: 30px 20px 0;
  background: #fff;
  h3 {
    margin-bottom: 15px;
  }
}

.ivu-radio-wrapper {
  margin-right: 30px;
}

.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;
      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    color: #333;
    cursor: pointer;
  }
  .demo {
    float: right;
    color: @primary-color;
    line-height: 24px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}

.vertical-center-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .ivu-modal {
    top: 0;
  }
  video {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}

.searchBox {
  overflow: hidden;
  .search_btn {
    float: left;
    width: 50px;
    padding: 5px 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search_icon {
    float: left;
    padding: 5px 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.showRadio {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -250px;
  // border: 1px solid black;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #f5f7f9;
  border-radius: 5px;
  .close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
}
.tableBox {
  position: relative;
  // min-height: 270px;
  // padding-bottom: 70px;
  padding: 10px;
  margin-top: 15px;
  overflow: hidden;
  .pages {
    position: absolute;
    bottom: 20px;
    right: 20px;
    // margin: 10px;
    overflow: hidden;
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">单码使用查询</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="85">
          <Row>
            <Col span="10">
              <Form-item label="二维码:" prop="qrSeqNo">
                  <i-input v-model.trim="formData.qrSeqNo" placeholder="请输入二维码"></i-input>
              </Form-item>
            </Col>
            <Col span="10">
              <Form-item label="明码:" prop="memo">
                  <i-input v-model.trim="formData.memo" placeholder="请输入明码"></i-input>
              </Form-item>
            </Col>
            <Col span='2' offset="1">
                <Button @click="submit" class="btn-search  search_btn" type="primary">查询</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="box tableBox">
          <h3>基本信息</h3>
          <Form :label-width="85">
            <Row>
              <Col span="6">
                <Form-item label="品牌名称:">
                  {{baseInformationData.brandName}}
                </Form-item>
                <Form-item label="码包号:">
                  {{baseInformationData.packageNo}}
                </Form-item>

              </Col>
              <Col span="6">
                  <Form-item label="活动包名:">
                    {{baseInformationData.groupName}}
                  </Form-item>
                  <Form-item label="生成时间:">
                    <span v-if="baseInformationData.createTime">{{baseInformationData.createTime }}</span>
                  </Form-item>

              </Col>
              <Col span="6">
                  <Form-item label="活动名称:">
                    {{baseInformationData.activityName}}
                  </Form-item>
                  <Form-item label="激活时间:">
                    <span v-if="baseInformationData.activateTime">{{baseInformationData.activateTime }}</span>
                  </Form-item>

              </Col>
              <Col span="6">
                  <Form-item label="二维码状态:">
                    {{baseInformationData.usableStatus | statusFilter}}
                  </Form-item>
                  <Form-item label="流水线:">
                    {{baseInformationData.pipeLine}}
                  </Form-item>

              </Col>
            </Row>
          </Form>
      </div>
      <div class="box tableBox">
        <h3>使用记录</h3>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable> 
      </div>
    </div>
	</div>
</template>

<script>
import { monitorRecord } from "@/util/ENUMS.js";
import hhTable from "@/components/table/table.vue";
import { getDisplayActivityListDoQuery } from "@/api/common.js";
export default {
  name:"single-code-query-keepAlive",

  data() {
    return {
      noneStatus:false,
      baseInformationData: {},
      formData: {
        qrSeqNo: "", //二维码
        memo: "" //明码
      },

      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "用户ID",
          key: "targeId",
          align: "center"
        },
        {
          title: "扫码时间",
          key: "riskTime",
          align: "center",
          render: (h, f) => {
            let str = "";
            if (!f.row.riskTime) {
              str = "";
            } else {
              str = this.Global.createTime(f.row.riskTime);
            }
            return h("div", str);
          }
        },
        {
          title: "扫码地点",
          key: "areaName",
          align: "center"
        },
        {
          title: "扫码结果",
          key: "result",
          align: "center"
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10 //每页数据条数，默认10条
    };
  },
  components: {
    hhTable
  },
  methods: {
    sureCreate() {},

    changePage(size) {
      this.page = size;
      this.init();
    },
    formatYearMonth(time) {
      return this.Global.createTime(time);
    },
    submit() {
      this.init();
    },
    init() {
      this.baseInformationData = {};
      this.pageData = [];
      if (!this.formData.qrSeqNo && !this.formData.memo) {
        this.$Message.info("至少输入一个查询条件");
        return false;
      }
      var data = this.Global.JsonChange(this.formData);

      this.Global.deleteEmptyProperty(data);

      this.Global.doPost("codepackage/querycoderecord.json", data, res => {
        this.pageData = res.datalist;

        if (res.datalist && res.datalist.length) {
          this.baseInformationData = res.datalist[0];
          this.baseInformationData.activateTime = this.baseInformationData
            .activateTime
            ? this.Global.createTime(this.baseInformationData.activateTime)
            : "";
          this.baseInformationData.createTime = this.baseInformationData
            .createTime
            ? this.Global.createTime(this.baseInformationData.createTime)
            : "";
        }
        this.noneStatus = true;
      });
    }
  },
  filters: {
    formateTime(val) {
      return new Date(Number(val)).pattern("yyyy-MM-dd hh:mm:ss");
    },
    statusFilter(val) {
      let str = "";
      switch (val) {
        case 0:
          str = "未激活";
          break;
        case 1:
          str = "已激活";
          break;
        default:
          str = "";
          break;
      }
      return str;
    }
  }
};
</script>