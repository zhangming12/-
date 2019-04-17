<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.form {
  display: flex;
  position: relative;
  .container {
    width: 70%;
    margin: auto;
    .w18 {
      width: 25%;
      .container {
        width: 100%;
      }
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}

.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.table-box {
  padding: 0 10px;
  // min-height: 500px;/
  padding-bottom: 60px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
}

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 50%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 10px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      overflow-y: auto;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        .numColor {
          color: @primary-color;
        }
      }
    }
  }
}
.upDate {
  float: left;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding: 2px 12px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
}
.demo {
  float: left;
  margin-left: 10px;
  color: @primary-color;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
  span {
    text-decoration: underline;
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
#textarea {
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  display: block;
  width: 100%;
  text-indent: 10px;
}
#textarea::-webkit-input-placeholder {
  color: #c5c8ce;
}
#textarea:-moz-placeholder {
  color: #c5c8ce;
}
#textarea::-moz-placeholder {
  color: #c5c8ce;
}
#textarea:-ms-input-placeholder {
  color: #c5c8ce;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">品牌资金变动审核</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
            <div class="container">
              <div class="btn-left w18">
                <Form-item  required>
                  <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item  required>
                    <data-range hour="24:00" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range> 
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item  required>
                  <Select v-model="formData.brandId" placeholder="品牌名称*">
                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                  </Select> 
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item  prop="groupId">
                  <Select v-model="formData.reviewedStatus" placeholder="请选择状态" clearable>
                    <Option :value="1">通过</Option>
                    <Option :value="2">不通过</Option>
                    <Option :value="0">未审核</Option>
                  </Select>
                </Form-item>
              </div>
              
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-right search-right" @click="submit('form')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
        </Form>
      </div>
      <div class="table-box box">
        <Table ref="table" :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
      
    <!-- 审核 -->
    <myModal class="myModal"
        @close="closeModal"
        :modal="myModalisShow">
      <div slot="main" class="modal-main">
        <h3>审核</h3>
        <Form ref="formItem" :model="formItem" :label-width="88">
          <Form-item label="审核状态："  required>
              <RadioGroup v-model="formItem.reviewedStatus">
                    <Radio :label="1">
                        通过
                    </Radio>
                    <Radio :label="2">
                        不通过
                    </Radio>
                    <!-- <Radio :label="0">
                        未审核
                    </Radio> -->
              </RadioGroup>
          </Form-item>
          <Form-item label="审核意见：">
              <textarea v-model.trim="formItem.reviewedMemo" name="" id="textarea" placeholder="请输入审核意见"></textarea>
          </Form-item>
      </Form>
        <div class="maintain-footer">
          <Button type="text" @click="closeModal">取消</Button>
          <Button type="text" @click="sureMethod">确定</Button>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import dataRange from "../../components/data-rang.vue";
import exportBtn from "../../components/Button/export-btn.vue";
import detailBtn from "../../components/Button/detail-btn.vue";
import myModal from "../../components/Modal/my-modal.vue";
import importBtn from "../../components/Button/import-btn.vue";
import { bankList } from "@/util/ENUMS.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name:"audit-brand-capital-change-keepAlive",
  data() {
    const validateStart = (rule, value, callback) => {
      // 验证开始时间
      if (value == "") {
        callback(new Error("请输入开始时间"));
      } else {
        if (this.formData.queryEndTime !== "") {
          // 对结束时间单独验证
          this.$refs.form.validateField("queryEndTime");
        }
        callback();
      }
    };
    const validateEnd = (rule, value, callback) => {
      // 验证结束时间

      if (value == "") {
        callback(new Error("请输入结束时间"));
      } else {
        const str = new Date(this.formData.queryStartTime).getTime();
        const end = new Date(value).getTime();
        if (end < str) {
          // 判断开始时间是否大于结束时间
          callback(new Error("开始时间大于结束时间"));
        } else {
          callback();
        }
      }
    };
    return {
      myModalisShow: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        reviewedStatus: ""
      },
      formItem: {
        reviewedStatus: "",
        reviewedMemo: "",
        id: "",
        brandId: ""
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      columns1: [
        {
          title: "提交时间",
          key: "updateTime",
          minWidth: 160,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.updateTime));
          }
        },
        {
          title: "品牌名称",
          key: "brandName",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "转入/转出",
          minWidth: 100,
          key: "remitArrow",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = ["", "转入", "转出"];
            return h("div", str[Number(params.row.remitArrow)]);
          }
        },
        {
          title: "相关银行",
          minWidth: 150,
          key: "bankName",
          align: "center",
          tooltip: true
        },
        {
          title: "汇款单号",
          minWidth: 180,
          key: "remitNo",
          align: "center",
          tooltip: true
        },
        {
          title: "金额",
          minWidth: 120,
          key: "remitPrice",
          align: "center",
          tooltip: true
        },
        {
          title: "备注",
          minWidth: 120,
          key: "memo",
          align: "center",
          tooltip: true
        },
        {
          title: "操作人员",
          minWidth: 120,
          key: "reviewedUserName",
          align: "center",
          tooltip: true
        },
        {
          title: "状态",
          minWidth: 120,
          key: "reviewedStatus",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let obj = {
              "0": "未审核",
              "1": "审核通过",
              "2": "审核不通过"
            };
            return h("div", obj[params.row.reviewedStatus]);
          }
        },
        {
          title: "审核意见",
          key: "reviewedMemo",
          minWidth: 160,
          align: "center",
          tooltip: true
        },

        {
          title: "操作",
          minWidth: 80,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            var tag = [];
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    disabled: params.row.reviewedStatus != 0 ? true : false
                  },
                  on: {
                    click: () => {
                      this.formItem.id = params.row.id;
                      this.formItem.brandId = params.row.brandId;
                      this.myModalisShow = true;
                    }
                  }
                },
                "审核"
              )
            );
            return h("div", tag);
          }
        }
      ],
      pageData: [],
      brandList: []
    };
  },

  components: { dataRange, myModal },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      {},
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          
        }
      }
    );
  },
  watch: {
    myModalisShow(val) {
      if (!val) {
        this.formItem = {
          reviewedStatus: "",
          reviewedMemo: "",
          id: "",
          brandId: ""
        };
      }
    }
  },
  methods: {
    sureMethod() {
      if (!this.formItem.reviewedStatus) {
        this.$Message.error("审核状态不能为空");
        return false;
      }
      //当审核状态为不通过时，审核意见必填
      if (this.formItem.reviewedStatus == 2 && !this.formItem.reviewedMemo) {
        this.$Message.error("审核意见不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formItem);
      this.Global.deleteEmptyProperty(data);
      console.log(data);
      this.Global.doPost("brandAccount/fundAudit.json", data, res => {
        this.myModalisShow = false;
        this.$Message.success("审核成功");
        this.init();
      });
    },
    closeModal() {
      this.myModalisShow = false;
    },
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryStartTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    endTimeChange(value) {
      this.end.hour = value.hour;
      this.end.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryEndTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    submit(name) {
      if (!this.formData.queryStartTime) {
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.queryEndTime) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },

    getBrandName(id) {
      let brandName = "";
      this.brandList.forEach(item => {
        if (item.id == id) {
          brandName = item.brandName;
        }
      });
      return brandName;
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("brandAccount/queryTransferList.json", data, res => {
        this.pageData = res.datalist;
        for (let i = 0; i < res.datalist.length; i++) {
          let { bankCode, bankName, remitNo } = JSON.parse(
            res.datalist[i].offlinePayInfo
          );
          res.datalist[i].remitPrice = res.datalist[i].remitPrice
            ? res.datalist[i].remitPrice + "元"
            : "";
          res.datalist[i].remitNo = remitNo;
          res.datalist[i].brandName = this.getBrandName(
            res.datalist[i].brandId
          );
          res.datalist[i].bankName =
            res.datalist[i].remitArrow == 1 ? bankList[bankCode] : bankName;
        }
        this.pageNum = res.items;
        this.page = res.page;
      });
    }
  }
};
</script>


