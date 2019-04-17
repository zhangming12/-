<style lang="less" scoped>
@import "../../config/index.less";
@border-color-split: #fd7a23;

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  button {
    margin-left: 10px;
  }
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
    margin-top: 4px;
    color: #333;
  }
  .demo {
    float: right;
    color: @primary-color;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
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

.area {
  border-radius: 4px;
  border: 1px solid #dddee1;
  height: 32px;
  padding: 4px 7px;
  line-height: 2;
  cursor: pointer;
  .TextOverflow();
}
</style>

<template>
  <div id="Main">
        <h2 class="Title">陈列上传监控</h2>           
        <div class="box">          
            <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span='7'>
                         <Form-item label="品牌名称" prop="brandId">
                          <Select v-model="formData.brandId" placeholder="河北中粮可口可乐" disabled>
                            <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                          </Select>
                        </Form-item>
                        
                        <Form-item label="销售部">
                          <Select v-model="formData.salesDept" clearable>
                            <Option v-for="(item, key, index) in protocolSalesDept" :value="key" :key="index">{{ item }}</Option>
                          </Select>
                        </Form-item>
                        
                    </Col>
                    <Col span='7' >  
                        <Form-item label="活动包名:" prop="groupId">
                          <Select v-model="formData.groupId" placeholder="请选择" disabled>
                            <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                          </Select>
                        </Form-item> 
                        <Form-item label="大区">
                          <Input v-model="formData.salesRegion"></Input>
                        </Form-item>                      
                    </Col>
                    <Col span='7'>
                        <Form-item label="上传周期:" prop="activityId">                        
                            <Date-picker style="width: 100%;" type="daterange" @on-change="changeDate" placeholder="选择日期" ></Date-picker> 
                        </Form-item>                          
                        <Form-item label="营业部">
                          <Input v-model="formData.busiDept"></Input>
                        </Form-item>
                    </Col>
                    
                    <Col span="2" offset="1">
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
                        <Form-item label="客户编号:">
                            <Input  v-model="formData.joinCode"></Input>                             
                        </Form-item>                 
                    </Col>
                    <Col span='7'>                                                 
                        <Form-item label="路线编号">
                            <Input v-model="formData.salesRoute"></Input>
                        </Form-item>
                    </Col>
                    <Col span='7'>                                                 
                        	<Form-item label="BAP渠道">                             
                                <Select v-model="formData.bapChannel" clearable>
                                    <Option v-for="(item, key, index) in protocolBapChannel" :value="item" :key="index">{{ item }}</Option>
                                </Select>
                            </Form-item>
                    </Col>                                   
                </Row>
                </transition>
            </Form>            
      </div>
      <div class="box" style="padding-bottom:20px">        
        <div class='contentTop'> 
            <Button class="btn-right" @click="exportExcel('form')"  type="primary" >导出</Button>     
        </div>
        <Table :columns="columns" :data="pageData" disabled-hover></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {
  protocolStatus,
  protocolCheckFreezer,
  protocolCorpFreezer,
  protocolSecondDisplay,
  salesTargetsGoods, //月销售目标
  protocolStoreStatus, //客户状态
  protocolBapChannel, //BAP渠道
  protocolSignAttr, //签约属性
  protocolSalesDept, //销售部
  protocolProtClass, //协议类型
  protocolIsSodaSales, //汽水销售权
  protocolIsSodaSalesZm // 汽水专卖
} from "@/util/ENUMS.js";

import {
  getDisplayActivityListDoQuery,
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId, //根据活动包名ID获取陈列活动列表
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";

import { gdDisplayClear } from "@/api/activity-manage/display-activity-manage.js";

import config from "@/util/config.js";

export default {
  name: "hbGoldCaterDisplayCycle-keepAlive",

  data() {
    return {
      formData: {
        joinCode: "",
        busiDept: "",
        salesDept: "",
        bapChannel: "",
        salesRoute: "",
        startTime: "",
        endTime: ""
      },
      protocolStatus,
      protocolBapChannel,
      protocolSignAttr, //签约属性
      protocolSalesDept, //销售部
      activityList: [],
      brandList: [],
      groupList: [],
      selectList: [],
      presentNameList: [],
      url: config.uploadWorkerExcel,
      page: 1,
      pageSize: 10,
      pageNum: 0,
      rule: {},
      columns: [
        {
          title: "周期",
          key: "week",
          minWidth: 170,
          align: "center"
        },
        {
          title: "客户编号",
          key: "joinCode",
          minWidth: 100,
          align: "center"
        },
        {
          title: "店铺名称",
          key: "storeName",
          minWidth: 200,
          align: "center"
        },
        {
          title: "销售部",
          key: "salesDept",
          minWidth: 100,
          align: "center"
        },
        {
          title: "大区",
          key: "salesRegion",
          minWidth: 120,
          align: "center"
        },
        {
          title: "营业部",
          key: "busiDept",
          minWidth: 120,
          align: "center"
        },
        {
          title: "客户性质",
          key: "storeNature",
          minWidth: 100,
          align: "center"
        },
        {
          title: "BAP渠道",
          key: "bapChannel",
          minWidth: 100,
          align: "center"
        },
        {
          title: "销售线路号",
          key: "salesRoute",
          minWidth: 120,
          align: "center"
        },
        {
          title: "业代姓名",
          key: "workerName",
          minWidth: 120,
          align: "center"
        },
        {
          title: "业代手机",
          key: "phone",
          minWidth: 120,
          align: "center"
        },
        {
          title: "签约属性",
          key: "signAttr",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolSignAttr[params.row.signAttr]);
          }
        },
        {
          title: "协议类型",
          key: "protClass",
          minWidth: 100,
          align: "center"
        },
        {
          title: "考核冰柜",
          key: "checkFreezer",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", protocolCheckFreezer[params.row.checkFreezer]);
          }
        },
        {
          title: "3月销量（PC）",
          minWidth: 100,
          align: "center",
          children: [
            {
              title: "目标",
              key: "salesTarget",
              minWidth: 100,
              align: "center"
            },
            {
              title: "销量",
              key: "sales",
              minWidth: 100,
              align: "center"
            },
            {
              title: "占比",
              key: "ratio",
              minWidth: 100,
              align: "center"
            }
          ]
        },
        {
          title: "专卖",
          minWidth: 100,
          align: "center",
          children: [
            {
              title: "汽水销售权",
              key: "isSodaSales",
              minWidth: 130,
              align: "center",
              render: (h, params) => {
                return h("div", protocolIsSodaSales[params.row.isSodaSales]);
              }
            }
          ]
        },
        {
          title: "汽水ZM",
          minWidth: 100,
          align: "center",
          children: [
            {
              title: "是否合格",
              key: "isSodaSales",
              minWidth: 130,
              align: "center",
              render: (h, params) => {
                return h("div", protocolIsSodaSalesZm[params.row.isSodaSales]);
              }
            }
          ]
        },
        {
          title: "铺货",
          minWidth: 100,
          align: "center",
          children: [
            {
              title: "必备包装",
              key: "neceSkuStatus",
              minWidth: 130,
              align: "center",
              render: (h, params) => {
                return h(
                  "div",
                  protocolIsSodaSalesZm[params.row.neceSkuStatus]
                );
              }
            },
            {
              title: "全部SKU数",
              key: "skuStatus",
              minWidth: 130,
              align: "center",
              render: (h, params) => {
                return h("div", protocolIsSodaSalesZm[params.row.skuStatus]);
              }
            },
            {
              title: "货架排面数",
              key: "faceStatus",
              minWidth: 130,
              align: "center",
              render: (h, params) => {
                return h("div", protocolIsSodaSalesZm[params.row.faceStatus]);
              }
            }
          ]
        },
        {
          title: "第一位置+排面",
          key: "firstPlace",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.firstPlace]);
          }
        },
        {
          title: "冰柜纯度",
          key: "freezerPurity",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.freezerPurity]);
          }
        },
        {
          title: "冰柜第一位置",
          key: "freezerFirst",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.freezerFirst]);
          }
        },
        {
          title: "货架",
          key: "goodsShelves",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.goodsShelves]);
          }
        },
        {
          title: "小方展架",
          key: "displayShelves",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.displayShelves]);
          }
        },
        {
          title: "果汁货架",
          key: "joiceShelves",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.joiceShelves]);
          }
        },
        {
          title: "纯悦割箱组数",
          key: "iceDewNum",
          minWidth: 120,
          align: "center"
        },
        {
          title: "带有价格提示的RB套餐牌",
          key: "rbmenu",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.rbmenu]);
          }
        },
        {
          title: "助销工具投放及使用",
          key: "hsTool",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.hsTool]);
          }
        },
        {
          title: "纯悦冰柜陈列",
          key: "dewFreezer",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSalesZm[params.row.dewFreezer]);
          }
        }
      ],

      pageData: [],

      showQuery: false
    };
  },
  created() {
    // this.init()
  },

  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("report/uploadMonitorReport.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    exportExcel: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = this.Global.JsonChange(this.formData);
          this.Global.deleteEmptyProperty(data);
          var url = this.Global.getExportUrl(
            "report/uploadMonitorReportExport.json",
            data
          );
          window.open(url);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changeDate(date) {
      this.formData.startTime = date[0];
      this.formData.endTime = date[1];
    }
  }
};
</script>