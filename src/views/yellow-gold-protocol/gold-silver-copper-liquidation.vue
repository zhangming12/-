<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.ivu-form-item {
  margin-bottom: 20px;
}
.contentTop {
  button {
    margin-left: 10px;
  }
}
.area {
  border-radius: 4px;
  border: 1px solid #dddee1;
  height: 32px;
  padding: 4px 7px;
  line-height: 2;
  cursor: pointer;
  .TextOverflow();
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
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">金银铜清算</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="88">
                <Row>
                    <Col span="7">
                        <Form-item label="品牌名称:" prop="brandId"    >
                            <Select v-model="formData.brandId"  placeholder="请选择" @on-change="changeValue">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select> 
                        </Form-item>                        
                        <Form-item label="结算周期:" prop="periodMonth">
                            <Select v-model="formData.periodMonth"  placeholder="请选择时间">
                                <Option :value="item.queryMonth" v-for="(item,index) in timeDataList" :key="index" >{{ item.queryMonth}}</Option>
                            </Select>
                        </Form-item>
                        
                        
                    </Col>
                    <Col span="7">
                        <Form-item label="活动包名:" prop="groupId"    >
                          <Select v-model="formData.groupId" placeholder="请选择" @on-change="getActivityList" clearable>
                            <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                          </Select>
                        </Form-item>
                        <Form-item label="客户编号:">
                             <Input v-model="formData.joinCode" placeholder="请输入客户编号"></Input>
                        </Form-item>
                        
                    </Col>
                    <Col span="7">
                    
                        <Form-item label="陈列活动:">
                             <Select v-model="formData.activityId" placeholder="请选择" @on-change="getActivityMonthDict">
                                <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                            </Select> 
                        </Form-item>                       
                        <Form-item label="门店名称:">
                             <Input v-model="formData.storeName" placeholder="请输入门店名称"></Input>
                        </Form-item>
                        
                    </Col>
                    <Col span='2' offset="1" style="margin-top:20px">
                        <div class="searchBox">
                          <Button @click="submit('form')" class="btn-search  search_btn" type="primary">查询</Button>
                          <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-up" v-if="showQuery"></Button>
                          <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-down" v-else></Button>  
                        </div>
                    </Col>
                </Row>
                <transition name="fade">
                  <Row v-if="showQuery">
                    <Col span='7'>
                        <Form-item label="分组名称:">
                             <Input v-model="formData.activityTag" placeholder="请输入分组名称"></Input>
                        </Form-item>
                        <Form-item label="用户ID:">
                             <Input v-model="formData.storeId" placeholder="请输入用户ID"></Input>
                        </Form-item>
                        <Form-item label="业代姓名:">
                             <Input v-model="formData.workerName" placeholder="请输入业代姓名"></Input>
                        </Form-item>
                    </Col>
                    <Col span='7'>
                        <Form-item label="业代手机:">
                             <Input v-model="formData.workerPhone" placeholder="请输入业代手机"></Input>
                        </Form-item>
                        <Form-item label="上传次数:">                            
                            <Col span="11">
                                <Select v-model="formData.uploadCountOper" >
                                    <Option value="<" label='<'></Option>
                                    <Option value="=" label='='></Option>
                                    <Option value=">" label='>'></Option>
                                </Select>                              
                            </Col>
                            <Col span="2" style="text-align: center">至</Col>
                            <Col span="11">
                                <Input v-model="formData.uploadCount" ></Input>
                            </Col>
                        </Form-item>
                  
                    </Col>
                    <Col span='7'>
                        <Form-item label="区域:">
                              <div @click='showTree' class='area'>{{areaName}}</div>
                              <!-- <Input v-model="formData.areaName" placeholder="请选择区域"></Input> -->
                        </Form-item>
                        <Form-item label="合格次数:">
                            
                             <Col span="11">
                                <Select v-model="formData.auditCountOper" >
                                    <Option value="<" label='<'></Option>
                                    <Option value="=" label='='></Option>
                                    <Option value=">" label='>'></Option>
                                </Select>                              
                            </Col>
                            <Col span="2" style="text-align: center">至</Col>
                            <Col span="11">
                                <Input v-model="formData.auditCount" ></Input>
                            </Col>
                        </Form-item>
                    </Col>
                    
                  </Row>
                </transition>
            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div class="contentTop">
            <Button @click="exportExcel" class="btn-right"  icon="ios-download-outline"  type="primary">导出</Button>
            <Button @click="handleAllAward" class="btn-right"   type="primary">全部发奖</Button>
            <Button @click="handleClearDisplayActivity" class="btn-right" type="primary">清算费用</Button>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
      <Modal v-model='treeShow' @on-ok="areaList">
            <div style='height: 400px; overflow-y:auto;'>
                <Tree :data="areaData" ref='tree' multiple show-checkbox></Tree>
            </div>
        </Modal>
  </div>
</template>

<script>
let auditCountQualified = {
  "1": "合格",
  "0": "不合格"
};
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
import area from "@/config/areaCode.js";
import {
  queryDisplayLiquidateRecord, //查询列表
  callLiquidateByActivityId, //清算费用
  callDisplayAwardPrice //全部发奖
} from "@/api/activity-manage/display-activity-manage.js";
import {
  getDisplayActivityListDoQuery, //陈列活动
  getActivityMonthDict //获取活动月序列表
} from "@/api/common.js";
import {
  mergeGiveAwardStatus,
  mergeGiveAwardCheckStatus,
  mergeGiveAwardRecStatus
} from "@/util/ENUMS.js";
export default {
  name:"gold-silver-copper-liquidation-keepAlive",

  data() {
    return {
      showQuery: false,
      groupList: [],
      treeShow: false,
      areaData: area,
      formData: {
        brandId: 8,
        periodMonth: "", //结算周期
        activityId: "",

        activityTag: "",
        joinCode: "",
        storeName: "",
        groupId: "",
        storeId: "",
        workerPhone: "",
        areaCode: "",

        workerName: "",
        uploadCount: "",
        uploadCountOper: "",
        auditCount: "",
        auditCountOper: ""
      },
      page: 1,
      pageNum: 0,

      columns1: [
        {
          title: "陈列活动",
          key: "activityName",
          width: 100,
          align: "center"
        },
        {
          title: "分组名称",
          width: 100,
          key: "activityTag",
          align: "center"
        },

        {
          title: "上传周期",
          width: 100,
          key: "uploadPeriod",
          align: "center"
        },
        {
          title: "结算周期",
          width: 100,
          key: "periodMonth",
          align: "center"
        },

        {
          title: "标准费用",
          width: 100,
          key: "periodAmount",
          align: "center"
        },
        {
          title: "用户ID",
          key: "storeId",
          width: 100,
          align: "center"
        },
        {
          title: "客户编号",
          key: "joinCode",
          width: 100,
          align: "center"
        },
        {
          title: "店名",
          key: "storeName",
          width: 100,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 100,
          align: "center"
        },
        {
          title: "手机",
          key: "phone",
          width: 100,
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          width: 100,
          align: "center"
        },
        {
          title: "业代姓名",
          key: "workerName",
          width: 100,
          align: "center"
        },
        {
          title: "业代手机",
          key: "workerPhone",
          width: 100,
          align: "center"
        },
        {
          title: "上传次数",
          key: "uploadCount",
          width: 100,
          align: "center"
        },
        {
          title: "合格次数",
          key: "auditCount",
          width: 100,
          align: "center"
        },
        {
          title: "不合格次数",
          width: 100,
          key: "",
          align: "center",
          render: (h, params) => {
            return params.row.uploadCount - params.row.auditCount;
          }
        },

        {
          title: "待审核数",
          key: "waitAuditCount",
          width: 100,
          align: "center"
        },
        {
          title: "待上传数",
          key: "waitUploadOpenCount",
          width: 100,
          align: "center"
        },
        {
          title: "上传关闭数",
          key: "waitUploadCloseCount",
          width: 100,
          align: "center"
        },
        {
          title: "合格情况",
          key: "auditCountQualified",
          width: 120,
          align: "center",
          render: (h, params) => {
            return auditCountQualified[params.row.auditCountQualified];
          }
        },

        {
          title: "目标进货量",
          width: 100,
          key: "periodJoinCountInfo",
          align: "center"
        },
        {
          title: "实际进货量",
          width: 100,
          key: "joinCountInfo",
          align: "center"
        },
        {
          title: "进货量达标情况",
          key: "joinCountQualified",
          width: 100,
          align: "center",
          render: (h, params) => {
            return auditCountQualified[params.row.joinCountQualified];
          }
        },

        {
          title: "折扣",
          width: 100,
          key: "liquidateAmount",
          align: "center"
        },
        {
          title: "清算状态",
          width: 100,
          key: "status",
          align: "center",
          render: (h, params) => {
            return mergeGiveAwardStatus[params.row.status];
          }
        },
        {
          title: "审查状态",
          width: 100,
          key: "checkStatus",
          align: "center",
          render: (h, params) => {
            //1正常 2异常
            return mergeGiveAwardCheckStatus[params.row.checkStatus];
          }
        },
        {
          title: "是否提现",
          width: 100,
          key: "recStatus",
          align: "center",
          render: (h, params) => {
            //1正常 2异常
            if (
              params.row.status == "4040" ||
              params.row.status == "9090" ||
              params.row.status == "-1"
            ) {
              return "无奖金";
            }
            return mergeGiveAwardRecStatus[params.row.recStatus];
          }
        }
      ],
      pageData: [],
      brandList: [],
      activityList: [],
      timeDataList: [],
      bizAreaList: "",
      areaName: "请选择区域"
    };
  },
  components: {},
  created: function() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 15, activityType: 3, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({id:Number(item[0]),brandName:item[1]})
        })
        this.formData.brandId = this.brandList[0].id
        this.changeValue(this.formData.brandId);
        
      }
    );
  },
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init: function(currentPage, pageSize) {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["areaCode"] = this.bizAreaList;
      this.Global.deleteEmptyProperty(data);
      console.log(data);
      queryDisplayLiquidateRecord(data).then(res => {
        if (res.status == 1) {
          this.pageNum = res.data.items;
          this.pageData = res.data.datalist;
          this.page = res.data.page;
        }
      });
    },
    exportExcel: function() {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      if (
        !this.formData.brandId ||
        !this.formData.activityId ||
        !this.formData.periodMonth
      ) {
        this.$Message.warning("品牌名称、陈列活动及结算周期不能为空");
        return;
      }
      this.Global.deleteEmptyProperty(data);
      console.log(data);
      var url = this.Global.getExportUrl(
        "display/queryDisplayLiquidateRecordExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.groupList = [];
      // queryActivityGroupVOByBrandId(value).then(res => {
      //   if (res && res.status == 1) {
      //     this.groupList = res.data;
      //   }
      // });
      this.Global.doPost(
        "displayYxtg/queryDisplayYxtgActivityGroupList.json",
        {
          brandId: value,
          groupType: 3
        },
        res => {
          this.groupList = res.datalist;
        }
      );
    },
    getActivityList(value) {
      this.activityList = [];
      //查询活动
      queryActivityVOByGroupId(value).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data;
        }
      });
      //查周期
      this.Global.doPost("liquidate/getActGroupMonthDict.json", value, res => {
        console.log(res);
        this.timeDataList = [];
        if (res) {
          let timeDataList = [];
          for (const key in res) {
            let item = {
              queryMonth: res[key]
            };
            timeDataList.push(item);
          }
          this.timeDataList = timeDataList;
        }
      });
    },
    getActivityMonthDict(val) {
      //   let params = {
      //     brandId: this.formData.brandId,
      //     activityId: val
      //   };
      //   getActivityMonthDict(params).then(res => {
      //     console.log(res);
      //     if (res && res.data) {
      //       let timeDataList = [];
      //       for (const key in res.data) {
      //         let item = {
      //           queryMonth: res.data[key]
      //         };
      //         timeDataList.push(item);
      //       }
      //       this.timeDataList = timeDataList;
      //     }
      //   });
    },
    handleClearDisplayActivity() {
      console.log(this.formData);
      if (
        !this.formData.brandId ||
        !this.formData.groupId ||
        !this.formData.periodMonth
      ) {
        this.$Message.warning("品牌名称、活动包名及结算周期不能为空");
        return;
      }
      let params = {
        brandId: this.formData.brandId,
        groupId: this.formData.groupId,
        activityId: this.formData.activityId,
        periodMonth: this.formData.periodMonth
      };
      this.Global.deleteEmptyProperty(params);
      this.Global.doPost("liquidate/doDisplayLiquidate.json", params, res => {
        console.log(res);
        this.$Modal.warning({
          content: "清算中，休息一下稍后查询"
        });
      });
    },
    handleAllAward() {
      if (
        !this.formData.brandId ||
        !this.formData.activityId ||
        !this.formData.periodMonth
      ) {
        this.$Message.warning("品牌名称、陈列活动及结算周期不能为空");
        return;
      }
      let params = {
        brandId: this.formData.brandId,
        activityId: this.formData.activityId,
        periodMonth: this.formData.periodMonth
      };
      this.$Modal.confirm({
        content: "确认发放折扣",
        onOk: () => {
          callDisplayAwardPrice(params).then(res => {
            if (res && res.data === 0) {
              this.$Message.warning("发放中");
            } else if (res && res.data === 1) {
              this.$Message.warning("发放成功");
            }
          });
        }
      });
    },
    showTree: function() {
      this.treeShow = !this.treeShow;
      var treeData = this.$refs.tree.getCheckedNodes();
      console.log(treeData);
      for (const key in treeData) {
        if (treeData[key].checked) {
          treeData[key].checked = false;
        }
      }
    },
    areaList() {
      var treeData = this.$refs.tree.getCheckedNodes();
      var arr = [];
      var areaName = "";
      for (var i = 0; i < treeData.length; i++) {
        arr.push(treeData[i].value);
        areaName += treeData[i].title + "/";
      }

      this.bizAreaList = arr.join();
      this.areaName = areaName;
    }
  }
};
</script>