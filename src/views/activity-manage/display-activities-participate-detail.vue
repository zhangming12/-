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
//活动奖励
.activityPresent {
  overflow: hidden;
  p {
    float: left;
    margin-right: 10px;
  }
  input {
    float: left;
    width: 80px;
  }
  span {
    float: left;
    margin-left: 5px;
  }
}
.numberInput {
  border: 1px solid #dddee1;
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0 0 0 7px;
  text-align: left;
  outline: 0;
  -moz-appearance: textfield;
  color: #666;
  border-radius: 4px;
  transition: all 0.2s linear;
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
    <!-- <h2 class="Title">陈列推广活动参与明细</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="85">
        <Row>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId" required>
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="分组名称:" prop="presentId">
              <Select v-model="formData.presentId" placeholder="请选择" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in presentNameList"
                  :key="index"
                >{{ item.activityTag }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
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
            <Form-item label="用户ID:">
              <Input v-model.trim="formData.storeId" placeholder="请输入用户ID"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="活动名称:" prop="activityId">
              <Select
                v-model="formData.activityId"
                placeholder="请选择"
                @on-change="getpresentList"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item label="客户编号:" prop="joinCode">
              <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:20px">
            <div class="searchBox">
              <Button @click="submit('form')" class="btn-search search_btn" type="primary">查询</Button>
              <Button
                @click="showQuery=!showQuery"
                class="search_icon"
                type="primary"
                icon="ios-arrow-up"
                v-if="showQuery"
              ></Button>
              <Button
                @click="showQuery=!showQuery"
                class="search_icon"
                type="primary"
                icon="ios-arrow-down"
                v-else
              ></Button>
            </div>
          </Col>
        </Row>
        <transition name="fade">
          <Row v-if="showQuery">
            <Col span="7">
              <Form-item label="状态:">
                <Select v-model="formData.showStatus" placeholder="请选择" clearable>
                  <Option
                    :value="item.value"
                    v-for="(item,index) in statuList"
                    :key="index"
                  >{{ item.text }}</Option>
                </Select>
              </Form-item>
              <Form-item label="三级分类:">
                <Input v-model.trim="formData.busiOffice" placeholder="请输入三级分类"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="一级分类:">
                <Input v-model.trim="formData.salesDept" placeholder="请输入一级分类"></Input>
              </Form-item>
              <Form-item label="四级分类:">
                <Input v-model.trim="formData.busiDept" placeholder="请输入四级分类"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="二级分类:">
                <Input v-model.trim="formData.salesRegion" placeholder="请输入二级分类"></Input>
              </Form-item>
            </Col>
          </Row>
        </transition>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;overflow: hidden;">
      <div class="contentTop">
        <Button
          class="btn-export"
          icon="ios-download-outline"
          @click="exportExcel"
          type="primary"
        >导出</Button>
        <Button @click="importShow = true" class="btn-export" icon="android-add" type="info">导入</Button>
        <div class="demo" @click="dowland">
          <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
          <span>下载模版</span>
        </div>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
    </div>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
      </div>
    </div>
    <!-- //上传 -->
    <Modal v-model="importShow">
      <h2 style="text-align:center;">上传参与业代名单</h2>
      <i-Form>
        <Form-item label="品牌名称:" prop="brandId" :label-width="72">
          <Select v-model="importModelData.brandId" placeholder="请选择">
            <Option
              :value="item.id"
              v-for="(item,index) in brandList"
              :key="index"
            >{{ item.brandName }}</Option>
          </Select>
        </Form-item>
        <div
          class="upDate"
          style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;"
        >
          <Upload
            :action="url"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
          >
            <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
            {{ uploadText }}
          </Upload>
        </div>
      </i-Form>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="uploadExcel">确定</i-button>
      </div>
    </Modal>
    <!-- //修改 -->
    <Modal v-model="modifyShow">
      <h2 style="text-align:center;">修改活动</h2>
      <i-Form :label-width="88">
        <Form-item label="活动时间:" required>
          <Row>
            <Col span="8">
              <Form-item>
                <Date-picker type="datetime" placeholder="选择日期" v-model="modifyData.startTime"></Date-picker>
              </Form-item>
            </Col>
            <Col span="2" style="text-align:center">至</Col>
            <Col span="8">
              <Form-item>
                <Date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="modifyData.endTime"
                  @on-change="dataChange"
                ></Date-picker>
              </Form-item>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="活动折扣:" required>
          <span style="float:left;">产品规格名称</span>
          <input
            style="width:100px;float:left;"
            type="number"
            min="1"
            max="4999.99"
            class="numberInput"
            v-model.trim="modifyData.activityPresent"
          >
          <span style="float:left;">份</span>
        </Form-item>
      </i-Form>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="modifyTime">确定</i-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
export default {
  name: "display-activities-participate-detail-keepAlive",
  data() {
    return {
      importShow: false,
      showQuery: false,
      formData: {
        showStatus: "", //状态
        salesRoute: "", //线路编号
        brandId: "",
        activityId: "",
        storeId: "",
        checkStatus: "",
        joinCode: "",
        salesDept: "", //二级分类
        salesRegion: "", //一级分类
        busiDept: "", //四级分类
        busiOffice: "" //三级分类
      },
      statuList: [
        {
          text: "未开始",
          value: "1"
        },
        {
          text: "参与中",
          value: "3"
        },
        {
          text: "未参与",
          value: "4"
        },
        // {
        //   text: "已停止",
        //   value: "3"
        // },
        {
          text: "已结束",
          value: "2"
        }
      ],
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 120
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
          title: "姓名",
          key: "name",
          align: "center",
          width: 120
        },
        {
          title: "手机号",
          key: "storePhone",
          align: "center",
          width: 120
        },
        {
          title: "一级分类",
          key: "salesDept",
          align: "center",
          width: 120
        },
        {
          title: "二级分类",
          key: "salesRegion",
          align: "center",
          width: 120
        },
        {
          title: "三级分类",
          key: "busiOffice",
          align: "center",
          width: 120
        },
        {
          title: "四级分类",
          key: "busiDept",
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
          title: "活动名称",
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
          title: "状态",
          key: "showStatus",
          align: "center",
          width: 90,
          render: (h, params) => {
            let str = "";
            switch (params.row.showStatus) {
              case 1:
                str = "未开始";
                break;
              case 2:
                str = "已结束";
                break;
              case 3:
                str = "参与中";
                break;
              case 4:
                str = "未参与";
                break;
              default:
                str = "";
                break;
            }
            return h("div", str);
          }
        },
        {
          title: "折扣",
          key: "slackAmount",
          align: "center",
          width: 90,
          render: (h, params) => {
            let str = "";
            switch (params.row.presentType) {
              case 1:
                str = params.row.slackAmount + "份";
                break;
              case 2:
                str = params.row.slackAmount + "元";
                break;
              default:
                str = "";
                break;
            }
            return h("div", str);
          }
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      presentNameList: [], //分组
      uploadUrl: "",
      url: "",
      uploadText: "选择上传文件",
      importModelData: {
        brandId: ""
      },
      modifyShow: false,
      modifyData: {
        startTime: "",
        endTime: "",
        joinCode: "",
        brandId: "",
        presentCode: ""
      }
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
          this.importModelData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  mounted() {},

  methods: {
    modifyTime() {
      // 修改时间
      if (
        !this.modifyData.startTime ||
        !this.modifyData.endTime ||
        !this.modifyData.presentCode
      ) {
        this.$Message.error("时间,奖励不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.modifyData);
      this.Global.doPost(
        "displayYxtg/updateActivityCollectTime.json",
        data,
        res => {
          this.$Message.success("修改成功");
          this.init();
        }
      );
    },
    dataChange(val) {
      this.modifyData.queryEndTime = val.slice(0, 11) + "23:59:59";
    },
    modify(val) {
      //修改
      this.modifyShow = true;
      this.modifyData.brandId = val.brandId;
      this.modifyData.joinCode = val.joinCode;
      this.modifyData.presentCode = val.presentCode;
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.importModelData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }

      let data = {
        loadFilePath: this.uploadUrl,
        brandId: this.importModelData.brandId
      };
      this.Global.doPost(
        "basicData/brandStoreCollectInfoImport.json",
        data,
        () => {
          this.$Message.success("导入成功");
          this.init();
          this.importShow = false;
          this.uploadText = "上传参与业代名单";
        }
      );
    },
    cancel() {
      this.importShow = false;
      this.modifyShow = false;
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/collectTemplate.xlsx"
      );
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd");
    },
    changeValue(value) {
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
      this.presentNameList = [];
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "displayYxtg/queryDisplayStoreLoadInfoExport.json",
        data
      );
      window.open(url);
    },
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
    init() {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost(
        "displayYxtg/queryDisplayStoreLoadInfo.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
        }
      );
    },

    changePage(size) {
      this.page = size;
      this.init();
    }
  },
  filters: {}
};
</script>