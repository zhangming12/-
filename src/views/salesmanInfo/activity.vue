<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}
.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
}
.ivu-date-picker {
  display: block;
}
.ivu-radio-wrapper {
  margin-right: 30px;
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">业代关联活动统计</h2> -->
        <div class="box">
            <Form ref="form" :model="formData" :label-width="88" :rules="rules" >
                <Row>
                    <Col span='10'>
                        <Form-item label="截止时间" required prop='activityEndTime'>
                                <Date-picker type="datetime" format="yyyy-MM-dd" placeholder="选择时间" v-model="formData.activityEndTime"></Date-picker>
                        </Form-item>
                        <Form-item label='品牌名称' prop='brandId'>
                           <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index" >{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label='业代姓名' prop='workerName'>
                            <Input v-model='formData.workerName'></Input>
                        </Form-item>
                    </Col>
                    <Col span='10' offset='1'> 
                        <Form-item label='活动名称' prop='activityId'>
                           <Select v-model="formData.activityId" placeholder="请选择">
                                <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label='手机号码' prop='phone'>
                            <Input v-model='formData.phone' ></Input>
                        </Form-item>
                        <Form-item label='状态' prop='bindStatus'>
                           <Radio-group v-model="formData.bindStatus">
                                <Radio label=''>全部</Radio>
                                <Radio label='1'>已绑定</Radio>
                                <Radio label='0'>未绑定</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span='2' offset='1' style="margin-top: 58px;"> 
                        <Button @click="submit('form')" type='primary'    class="btn-search">查询</Button>   
                    </Col>
                </Row>
            </Form>           
        </div>
        <div class="box" style='margin-top: 15px;overflow: hidden;'>
            <div class='contentTop'>
                <Button @click="exportExcel" class="btn-export" icon="ios-download-outline" type='primary'>导出</Button>
            </div>
            <Table :columns="columns1"  :data="pageData" disabled-hover></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../../util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name:"activity-keepAlive",

  data() {
    const that = this;
    const validatePhone = (rule, value, callback) => {
      // 验证手机号码
      if (value == "") {
        callback(new Error("请输入手机号码"));
      } else {
        if (!this.Global.checkPhone(value)) {
          callback(new Error("请输入正确手机号码"));
        } else {
          callback();
        }
      }
    };
    return {
      formData: {
        activityEndTime: EDFAULT_ENDTIME,
        brandId: "",
        workerName: "",
        phone: "",
        activityId: "",
        bindStatus: ""
      },
      page: 1,
      rules: {},
      pageNum: 0,
      pageSize: 10,
      url: config.uploadWorkerExcel,
      columns1: [
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          width: 140
        },
        {
          title: "业代姓名",
          key: "workerName",
          width: 100,
          align: "center"
        },
        {
          title: "手机号码",
          key: "phone",
          width: 160,
          align: "center"
        },
        {
          title: "状态",
          key: "bindStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              that.Global.ENUMS.workerType[params.row.bindStatus]
            );
          }
        },
        {
          title: "活动名称",
          key: "activityName",
          width: 150,
          align: "center"
        },
        {
          title: "推广码总量",
          key: "codeTotal",
          width: 120,
          align: "center"
        },
        {
          title: "推广码使用量",
          key: "codeUse",
          width: 150,
          align: "center"
        },
        {
          title: "推广码余量",
          key: "codeAllowance",
          width: 120,
          align: "center"
        },
        {
          title: "累计门店数",
          key: "totalStores",
          align: "center",
          width: 120
        },
        {
          title: "累计扫码量",
          key: "totalScanCode",
          width: 120,
          align: "center"
        },
        {
          title: "今日门店数",
          key: "todayStores",
          width: 120,
          align: "center"
        },
        {
          title: "今日扫码量",
          key: "todayScanCode",
          width: 120,
          align: "center"
        }
      ],
      pageData: [],
      page: 1,
      pageNum: 0,
      brandList: [],
      activityList: []
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.init();
        this.changeValue(this.formData.brandId);
        setTimeout(() => {
          this.init();
        }, 1000);
      }
    });
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
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["activityEndTime"] = this.Global.formatYear(
        this.formData.activityEndTime
      );
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost(
        "worker/queryRelevanceActivityList.json",
        data,
        res => {
          this.pageNum = res.items;
          this.pageData = res.datalist;
          this.page = res.page;
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["activityEndTime"] = this.Global.formatYear(
        this.formData.activityEndTime
      );
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "worker/queryRelevanceActivityListExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.activityList = [];
      this.Global.getActivityList(value, res => {
        //    that.$nextTick(function(){
        this.activityList = res.datalist;
        //    })
        this.formData.activityId = res.datalist[0].id;
      });
    }
  }
};
</script>


