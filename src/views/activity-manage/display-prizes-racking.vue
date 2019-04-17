<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
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
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">陈列折扣使用情况跟踪-品牌及经销商</h2> -->
		<div class="box">
			<Form ref="form" :model="formData" :label-width="85">
				<Row>
					<Col span="7">
            <Form-item label="品牌名称:" prop="brandId">
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue" clearable>
                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="分组名称:" prop="presentId">
              <Select v-model="formData.presentId" placeholder="请选择" clearable>
                <Option :value="item.id" v-for="(item,index) in presentNameList" :key="index">{{ item.activityTag }}</Option>
              </Select>
            </Form-item>
					</Col>
					<Col span="7">
					<Form-item label="活动包名:" prop="groupId">
						<Select v-model="formData.groupId" placeholder="请选择" @on-change="getActivityList" clearable>
							<Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
						</Select>
					</Form-item>
					<Form-item label="折扣名称:" prop="goodsName">
						<Input v-model.trim="formData.goodsName" placeholder="请输入折扣名称"></Input>
					</Form-item>

					</Col>
					<Col span="7">
					<Form-item label="活动名称:" prop="activityId">
						<Select v-model="formData.activityId" placeholder="请选择" @on-change="getpresentList" clearable>
							<Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
						</Select>
					</Form-item>
          <Form-item label="线路编号:">
            <Input v-model.trim="formData.salesRoute" placeholder="请输入线路编号"></Input>
          </Form-item>
          <!-- <Form-item label="经销商名称:" prop="supervisorId">
            <Input v-model.trim="formData.supervisorId" placeholder="请输入经销商编号"></Input>
          </Form-item> -->
					</Col>
					<Col span='2' offset="1" style="margin-top:20px">
					<div class="searchBox">
						<Button @click="submit()" class="btn-search  search_btn" type="primary">查询</Button>
            <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-up" v-if="showQuery"></Button>
                <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-down" v-else></Button>
						</div>

					</Col>
				</Row>
				<transition name="fade">
					<Row v-if="showQuery">
						<Col span='7'>
            <Form-item label="业代编号:">
							<Input v-model.trim="formData.workerId" placeholder="请输入业代编号"></Input>
						</Form-item>
						</Col>
						<Col span='7'></Col>
						<Col span='7'></Col>
					</Row>
				</transition>
			</Form>
		</div>
		<div class="box" style='margin-top: 15px;overflow: hidden;'>
			<div class='contentTop'>
				<Button class="btn-export" icon="ios-download-outline" @click="exportExcel" type="primary">导出</Button>
			</div>
			<Table :columns="columns1" :data="pageData" disabled-hover></Table>

		</div>
		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page :total="pageNum" :current="page" @on-change="changePage"></Page>
			</div>
		</div>
		<!-- <Modal v-model="showVideoPlay" transfer class-name="vertical-center-modal" >
			<video :src="radioUrl" controls></video>
      <div slot="footer" style="display:none;"></div>
		</Modal> -->
	</div>
</template>

<script>
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_START_7AGOTIME
} from "@/util/index.js"; //搜索条件默认时间
import { monitorRecord } from "@/util/ENUMS.js";
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId, //根据活动包名ID获取陈列活动列表
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import { getDisplayActivityListDoQuery } from "@/api/common.js";
export default {
  name: "display-prizes-racking-keepAlive",
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
      showQuery: false,
      formData: {
        workerId: "",
        goodsName: "", //折扣名称
        salesRoute: "", //线路编号
        presentId: "", //分组id
        groupId: "", //活动包名ID
        brandId: "",
        activityId: "",
        storeId: "",
        joinCode: "" //客户编号
      },
      pageData: [],
      columns1: [
        {
          title: "选择",
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 120
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          width: 120
        },
        {
          title: "活动包名",
          key: "groupName",
          align: "center",
          width: 120
        },
        {
          title: "陈列活动",
          key: "activityName",
          align: "center",
          width: 120
        },
        {
          title: "分组名称",
          key: "presentName",
          align: "center",
          width: 120
        },
        {
          title: "折扣奖励",
          key: "goodsName",
          align: "center",
          width: 120
        },
        {
          title: "折扣数量",
          key: "amount",
          align: "center",
          width: 120
        },
        {
          title: "已提取使用",
          key: "recAmount",
          align: "center",
          width: 150
        },
        {
          title: "用户ID",
          key: "storeId",
          align: "center",
          width: 120
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          width: 120
        },
        {
          title: "线路编号",
          key: "salesRoute",
          align: "center",
          width: 120
        },
        {
          title: "店名",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          width: 120
        },
        {
          title: "手机",
          key: "phone",
          align: "center",
          width: 120
        },
        {
          title: "省",
          key: "provName",
          align: "center",
          width: 120
        },
        {
          title: "市",
          key: "cityName",
          align: "center",
          width: 120
        },
        {
          title: "区",
          key: "areaName",
          align: "center",
          width: 120
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          width: 120
        },
        {
          title: "门店状态",
          key: "status",
          align: "center",
          width: 100,
          render: (h, params) => {
            let str = "";
            switch (params.row.blackStatus) {
              case 0:
                str = "初始";
                break;
              case 1:
                str = "正常";
                break;
              case 2:
                str = "锁定";
                break;
              default:
                str = "";
                break;
            }
            return h("div", str);
          }
        },
        {
          title: "员工编号",
          key: "workerId",
          align: "center",
          width: 120
        },
        {
          title: "业代姓名",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "业代手机",
          key: "workerPhone",
          align: "center",
          width: 120
        },
        // {
        //   title: "经销商编号",
        //   key: "address",
        //   align: "center",
        //   width: 120
        // },
        // {
        //   title: "经销商名称",
        //   key: "address",
        //   align: "center",
        //   width: 120
        // },
        // {
        //   title: "经销商联系人",
        //   key: "address",
        //   align: "center",
        //   width: 120
        // },
        {
          title: "配送/核销员编号",
          key: "srcUserId",
          align: "center",
          width: 150
        },
        {
          title: "配送/核销员姓名",
          key: "srcUserName",
          align: "center",
          width: 150
        },
        {
          title: "配送/核销员手机",
          key: "srcUserPhone",
          align: "center",
          width: 150
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      presentNameList: [] //分组
    };
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 3, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  mounted() {},
  methods: {
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "goodsInfo/queryDisplayGoodsInfoListExport.json",
        data
      );
      window.open(url);
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost(
        "goodsInfo/queryDisplayGoodsInfoList.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
        }
      );
    },
    changeValue(value) {
      //根据品牌Id获取活动包名
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { activityType: 3, scope: "a", date: 7, brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId);
          }
        }
      );
    },
    getActivityList(value) {
      //根据活动包名Id获取活动
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    getpresentList(value) {
      //根据活动Id获取活动分组数据
      this.presentNameList = [];
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>