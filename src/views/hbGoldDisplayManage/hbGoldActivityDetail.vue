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
.ivu-date-picker {
  display: block;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">河北金银铜活动上传明细</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="12">
            <Form-item label="时间" required>
              <Row>
                <Col span="11">
                  <Form-item>
                    <data-range hour="00:00" v-model="formData.startTime"></data-range>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center;">至</Col>
                <Col span="11">
                  <Form-item>
                    <data-range hour="24:00" placeholder="结束时间" v-model="formData.endTime"></data-range>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>

            <Form-item label="活动包名:" prop="groupId">
              <Select
                v-model="formData.groupId"
                placeholder="请选择"
                @on-change="getActivityList"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in groupList"
                  :key="index"
                >{{ item.groupName }}</Option>
              </Select>
            </Form-item>

            <Form-item label="区域" prop="areaCode">
              <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
            </Form-item>
          </Col>
          <Col span="8" offset="1">
            <Form-item label="品牌名称" prop="brandId">
              <Select
                v-model="formData.brandId"
                placeholder="请选择"
                @on-change="changeValue"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="活动名称" prop="brandId">
              <Select v-model="formData.activityId" placeholder="请选择" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:58px">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div class="contentTop">
        <Button @click="exportExcel" class="btn-right" icon="ios-download-outline" type="primary">导出</Button>
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
import area from "@/config/china_code_data.js";
import dataRange from "@/components/data-range/data-range.vue";
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则
export default {
  name: "hbGoldActivityDetail-keepAlive",
  data() {
    return {
      formData: {
        activityId: "",
        startTime: EDFAULT_STARTTIME,
        endTime: EDFAULT_ENDTIME,
        areaCode: [],
        brandId: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        startTime: [{ validator: validateStart }],
        endTime: [{ validator: validateEnd }]
      },
      brandList: [],
      groupList: [],
      columns: [],
      defaultList: [
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          minWidth: 140
        },
        {
          title: "分组名称",
          key: "presentName",
          width: 90,
          align: "center"
        },
        {
          title: "1级分类",
          key: "salesDept",
          align: "center",
          minWidth: 80
        },
        {
          title: "2级分类",
          key: "salesRegion",
          align: "center",
          minWidth: 120
        },
        {
          title: "3级分类",
          key: "busiDept",
          align: "center",
          minWidth: 120
        },
        {
          title: "门店编号",
          key: "storeId",
          align: "center",
          minWidth: 100
        },
        {
          title: "门店名称",
          key: "storeName",
          align: "center",
          minWidth: 120
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          minWidth: 130
        }
      ],
      pageData: [],
      areaData: area,
      activityList: []
    };
  },
  created() {
    this.columns = [...this.defaultList];
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
    });
  },
  components: {
    dataRange
  },
  methods: {
    changeValue(value) {
      this.groupList = [];
      queryActivityGroupVOByBrandId(value).then(res => {
        if (res && res.status == 1) {
          this.groupList = res.data || [];
        }
      });
    },
    getActivityList(value) {
      this.activityList = [];
      queryActivityVOByGroupId(value).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data || [];
        }
      });
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage(size) {
      this.init(size, 10);
    },
    createTime(val) {
      var time = this.Global.createTime(val);
      return time;
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("report/displayUploadDetail.json", data, res => {
        this.columns = [];
        this.columns = [...this.defaultList];
        if (res && res.length > 0) {
          for (let j = 0; j < res[0].perList.length; j++) {
            let arr = [
              {
                title: "周期" + res[0].perList[j].period,
                key: res[0].perList[j].period,
                align: "center",
                minWidth: 100
              }
            ];
            this.columns.push(...arr);
          }
          for (let index = 0; index < res.length; index++) {
            for (let j = 0; j < res[index].perList.length; j++) {
              res[index][res[index].perList[j].period] =
                hbDisplayCheckStatus[res[index].perList[j].checkStatus];
            }
          }
        }

        this.pageData = res || [];
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["userType"] = "C";
      var url = this.Global.getExportUrl(
        "report/displayUploadDetailExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>