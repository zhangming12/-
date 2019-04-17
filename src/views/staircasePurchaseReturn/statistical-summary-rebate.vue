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
		<!-- <h2 class="Title">返利统计汇总</h2> -->
		<div class="box">
			<Form ref="form" :model="formData" :label-width="85">
				<Row>
					<Col span="7">
            <Form-item label="周期:"    >
                <Date-picker style="width:100%;" v-model="formData.cycle" type="month" placeholder="选择周期"></Date-picker>
            </Form-item>
            <Form-item label="用户ID:">
                  <Input v-model.trim="formData.storeId" placeholder="请输入用户ID"></Input>
              </Form-item>
            
					</Col>
					<Col span="7">
            <Form-item     label="品牌名称:" prop="brandId">
                <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue" clearable>
                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                </Select>
            </Form-item>
            <Form-item label="区域">
                <Cascader :data="areaData" v-model="formData.areaCode" change-on-select placeholder="请选择区域"></Cascader>
            </Form-item>
            
					</Col>
					<Col span="7">
            <Form-item     label="活动名称:" prop="activityId">
                <Select v-model="formData.activityId" placeholder="请选择活动" clearable>
                    <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                </Select>
            </Form-item>
            
					</Col>
					<Col span='2' offset="1" style="margin-top:20px">
            <Button @click="submit()" class="btn-search  search_btn" type="primary">查询</Button>
					

					</Col>
				</Row>
			</Form>
		</div>
		<div class="box" style='margin-top: 15px;overflow: hidden;padding-bottom:20px;'>
			<div class='contentTop'>
				<Button class="btn-export" icon="ios-download-outline" @click="exportExcel" type="primary">导出</Button>
			</div>
			<Table :columns="columns" :data="pageData" disabled-hover></Table>

		</div>
		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page :total="pageNum" :current="page" @on-change="changePage"></Page>
			</div>
		</div>
	</div>
</template>

<script>
import { monitorRecord } from "@/util/ENUMS.js";
import area from "@/config/china_code_data.js";
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包
  queryActivityVOByGroupId, //根据活动包ID获取陈列活动列表
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { getDisplayActivityListDoQuery } from "@/api/common.js";
export default {
  name:"statistical-summary-rebate-keepAlive",

  data() {
    return {
      showQuery: false,
      dataList: [],
      cycleData: [], //周期
      areaData: area,
      formData: {
        cycle: EDFAULT_ENDTIME,
        activityName: "", //活动名称
        salesRoute: "", //线路编号
        brandName: "", //品牌名称
        presentName: "", //分组名称
        presentId: "", //分组id
        groupId: "", //活动包ID
        brandId: "",
        activityId: "",
        areaCode: []
      },
      pageData: [],
      columns: [],
      defaultList: [
        {
          title: "序号",
          type: "index",
          align: "center",
          minWidth: 80
        },

        {
          title: "周期",
          key: "createTime",
          align: "center",
          minWidth: 150
          // render: (h, params) => {
          //   return h("div", this.formatYearMonth(params.row.createTime));
          // }
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          minWidth: 120
        },
        {
          title: "活动名称",
          key: "masterActivityName",
          align: "center",
          minWidth: 120
        },

        {
          title: "关联活动",
          key: "slaveActivityName",
          align: "center",
          minWidth: 120
        },
        {
          title: "用户ID",
          key: "storeId",
          align: "center",
          minWidth: 120
        },
        {
          title: "用户昵称",
          key: "wxNickName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },

        {
          title: "门店地址",
          key: "address",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "客户名称",
          key: "storeName",
          align: "center",
          minWidth: 120
        },
        {
          title: "省",
          minWidth: 100,
          key: "province",
          align: "center"
        },
        {
          title: "市",
          minWidth: 100,
          key: "city",
          align: "center"
        },
        {
          title: "区",
          minWidth: 100,
          key: "area",
          align: "center",
          render: (h, f) => {
            if (f.row.area == f.row.city) {
              return h("div", "");
            } else {
              return h("div", f.row.area);
            }
          }
        },
        {
          title: "当前扫码量",
          minWidth: 100,
          key: "countCode",
          align: "center"
        },
        {
          title: "奖励内容",
          minWidth: 100,
          key: "goodsName",
          align: "center",
          render: (h, f) => {
            let str = "";
            if (f.row.winType == 2) {
              str = "现金红包";
            } else {
              str = f.row.goodsName;
            }
            return h("div", str);
          }
        },
        {
          title: "累计返利奖励",
          key: "totalAmount",
          align: "center",
          minWidth: 120
        }
        // {
        //   title: "奖励内容",
        //   key: "goodsName",
        //   align: "center",
        //   width: 120
        // }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包
      activityList: [], //活动
      presentNameList: [] //分组
    };
  },
  created() {
    // cycleData周期
    let year = new Date().getFullYear();
    for (let i = 1; i < 13; i++) {
      let m = i < 10 ? "0" + i : i;
      this.cycleData.push({ month: `${year}-${m}` });
    }
    let month = new Date().getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    this.formData.cycle = `${year}-${month}`;
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 15, activityType: 4, scope: "a" },
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
    // 默认的表格条件
    this.columns = [...this.defaultList];
  },
  methods: {
    changeValue(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) {
        return;
      }
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 15, activityType: 4, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
          if (this.activityList.length) {
            this.formData.activityId = this.activityList[0].id;
          }
        }
      );
      // this.Global.doPost(
      //   "joinGoodsRebate/getRebateActivityList.json",
      //   value,
      //   res => {
      //     this.activityList = res;
      //     if (res && res.length) {
      //       this.formData.activityId = res[0].id;
      //     }
      //   }
      // );
    },
    getFormatTime(str) {
      let year = str.slice(0, 4);
      let month = Number(str.slice(5, 7));
      let m = "";
      if (month < 12) {
        m = month < 9 ? "0" + (month + 1) : month + 1;
        str = year + "-" + m + "-01 00:00:00";
      } else {
        year = Number(year) + 1;

        str = year + "-01-01 00:00:00";
      }
      return str;
    },
    getpresentList(value) {
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
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      if (!this.formData.cycle) {
        this.$Message.error("请选择周期");
        return false;
      }
      if (!this.formData.activityId) {
        this.$Message.error("请选择活动");
        return false;
      }

      // data['queryStartTime'] = `${this.formData.cycle}-01 00:00:00`;
      // data['queryEndTime'] = this.getFormatTime(this.formData.cycle);
      data["queryStartTime"] = `${this.Global.createTime(
        this.formData.cycle
      ).slice(0, 7)}-01 00:00:00`;
      data["queryEndTime"] = this.getFormatTime(
        this.Global.createTime(this.formData.cycle).slice(0, 7)
      );
      this.Global.deleteEmptyProperty(data);
      delete data["cycle"];
      console.log(data);
      var url = this.Global.getExportUrl(
        "joinGoodsRebate/joinGoodsRebateCountExport.json",
        data
      );
      window.open(url);
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init() {
      // console.log(this.Global.createTime(this.formData.cycle).slice(0,7))
      // return
      this.pageData = [];
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      if (!this.formData.cycle) {
        this.$Message.error("请选择周期");
        return false;
      }
      data["queryStartTime"] = `${this.Global.createTime(
        this.formData.cycle
      ).slice(0, 7)}-01 00:00:00`;
      data["queryEndTime"] = this.getFormatTime(
        this.Global.createTime(this.formData.cycle).slice(0, 7)
      );
      delete data["cycle"];
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost(
        "joinGoodsRebate/joinGoodsRebateCount.json",
        data,
        res => {
          console.log(res);
          this.columns = [];
          this.columns = [...this.defaultList];
          if (res.datalist && res.datalist.length > 0) {
            /* 
              jieTiName${item.minAmount}
              goodsName${item.minAmount}
              手动定义一个key
            */
            if (res.datalist[0].presentList) {
              res.datalist[0].presentList.forEach((item, index) => {
                let arr = [
                  {
                    title: item.activityTag,
                    // key: `jieTiName${item.minAmount}`,
                    key: `jieTiName${index}`,
                    align: "center",
                    minWidth: 120
                  },
                  {
                    title: "返利提取状态",
                    // key: `goodsName${item.minAmount}`,
                    key: `goodsName${index}`,
                    align: "center",
                    minWidth: 120
                  }
                ];
                this.columns.push(...arr);
              });
            }
            // res.datalist[0].presentList.forEach((item,index) => {
            //     let arr = [
            //       {
            //         title: item.activityTag,
            //         key: `jieTiName${item.minAmount}`,
            //         align: "center",
            //         minWidth: 120
            //       },
            //       {
            //         title: "返利提取状态",
            //         key: `goodsName${item.minAmount}`,
            //         align: "center",
            //         minWidth: 120
            //       }
            //     ]
            //     this.columns.push(...arr);
            // });
            /* 
              给手动定义的key  赋值
            */
            res.datalist.forEach((item, index) => {
              if (item.presentList) {
                item.presentList.forEach((i, j) => {
                  // item[`jieTiName${i.minAmount}`] =
                  //   i.recStatus === null ? "" : i.minAmount;
                  item[`jieTiName${j}`] =
                    i.recStatus === null ? "" : i.minAmount;
                  // item[`goodsName${i.minAmount}`] = (() => {
                  //   let str = "";
                  //   switch (i.recStatus) {
                  //     case 1:
                  //       str = "已领用";
                  //       break;
                  //     case 0:
                  //       str = "待领用";
                  //       break;
                  //     case 2:
                  //       str = "已收到";
                  //       break;
                  //     case 3:
                  //       str = "已退回";
                  //       break;
                  //     case -1:
                  //       str = "未清算";
                  //       break;

                  //     default:
                  //       "";
                  //       break;
                  //   }
                  //   return str;
                  // })();
                  item[`goodsName${j}`] = (() => {
                    let str = "";
                    switch (i.recStatus) {
                      case 1:
                        str = "已领用";
                        break;
                      case 0:
                        str = "待领用";
                        break;
                      case 2:
                        str = "已收到";
                        break;
                      case 3:
                        str = "已退回";
                        break;
                      case -1:
                        str = "未清算";
                        break;

                      default:
                        "";
                        break;
                    }
                    return str;
                  })();
                });
              }
            });
          }
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;

          for (let i = 0, len = res.datalist.length; i < len; i++) {
            res.datalist[i].createTime = this.Global.createTime(
              this.formData.cycle
            ).slice(0, 7);
          }
          console.log(this.pageData);
          console.log(this.columns);
        }
      );
    }
  }
};
</script>