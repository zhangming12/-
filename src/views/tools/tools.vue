<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  min-height: 100%;
  background: #ffffff;
  padding-left: 10px;
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
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.fotter {
  margin-top: 20px;
  button {
    margin-right: 30px;
  }
}
.upDate {
  cursor: pointer;
  text-align: center;
  border: 1px solid #aeaeae;
  padding: 2px 12px;
  margin-right: 10px;
  width: 150px;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">工具箱</h2> -->
    <div class="main-container">
      <Button type="primary" @click="createUrlShow = true">生成URL</Button>
      <Button type="primary" @click="createWeeksShow = true">生成周期</Button>
      <Button type="primary" @click="hebeiExport = true">客户资料导出</Button>
      <Button type="primary" @click="keziExport = true">多客户编号(客资导出)</Button>
      <Button type="primary" @click="exportExport = true">扫码量和用户数</Button>
      <Button type="primary" @click="releaseVideo">释放视频</Button>
    </div>
    <!-- 生成URL -->
    <myModal class="myModal" @close="closeModal" width="800" :modal="createUrlShow">
      <div slot="main" class="modal-main">
        <h3>生成URL</h3>
        <div class="modal-table">
          <Form ref="form" :model="formData" :label-width="88">
            <Form-item label="品牌名称" required>
              <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="活动包名" required>
              <Select v-model="formData.groupId" placeholder="活动包名*" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in groupList"
                  :key="index"
                >{{ item.groupName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="门店ID">
              <Input type="text" clearable v-model.trim="formData.storeId" placeholder="门店ID"></Input>
            </Form-item>
            <Form-item label="客户编号">
              <Input type="text" clearable v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
            </Form-item>
            <div class="fotter">
              <Button @click="submit" type="success">生成</Button>
              <span>生成的URL：{{url}}</span>
            </div>
          </Form>
        </div>
      </div>
    </myModal>
    <!-- 生成周期 -->
    <myModal class="myModal" @close="closeModal" :modal="createWeeksShow">
      <div slot="main" class="modal-main">
        <h3>生成周期</h3>
        <div class="modal-table">
          <Form ref="form" :model="formData" :label-width="88">
            <Form-item label="品牌名称" required>
              <Select v-model="weeksDate.brandId" placeholder="品牌名称*" @on-change="weexChangeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="活动包名">
              <Select
                v-model="weeksDate.groupId"
                placeholder="活动包名"
                @on-change="getWeexsActivityList"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in weexsGroupList"
                  :key="index"
                >{{ item.groupName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="活动名称">
              <Select v-model="weeksDate.activityId" placeholder="活动名称" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in weexsActivityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>

            <Form-item label="时间" required>
              <DatePicker
                type="date"
                style="width:100%;"
                v-model="weeksDate.date"
                :options="dateOptions"
                placeholder="选择周期开始时间"
              ></DatePicker>
            </Form-item>
            <Form-item label="门店ID">
              <Input type="text" clearable v-model.trim="weeksDate.storeId" placeholder="门店ID"></Input>
            </Form-item>
            <div class="fotter" style="text-align:center;">
              <Button @click="closeModal" type="primary">取消</Button>
              <Button @click="createNewWeexs" type="success">生成周期</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>
    <!-- 河北客户资料导出 -->
    <myModal class="myModal" @close="closeModal" :modal="hebeiExport">
      <div slot="main" class="modal-main">
        <h3>河北客户资料导出</h3>
        <div class="modal-table">
          <Form ref="form" :model="hebeiExportData" :label-width="88">
            <Form-item label="品牌名称" required>
              <Select v-model="hebeiExportData.brandId" placeholder="品牌名称*">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="客户编号">
              <Input
                type="text"
                clearable
                v-model.trim="hebeiExportData.joinCode"
                placeholder="客户编号"
              ></Input>
            </Form-item>
            <Form-item label="BAP渠道">
              <Input
                type="text"
                clearable
                v-model.trim="hebeiExportData.bapChannel"
                placeholder="BAP渠道"
              ></Input>
            </Form-item>
            <Form-item label="销售路线">
              <Input
                type="text"
                clearable
                v-model.trim="hebeiExportData.salesRoute"
                placeholder="销售路线"
              ></Input>
            </Form-item>
            <Form-item label="销售部">
              <Input
                type="text"
                clearable
                v-model.trim="hebeiExportData.salesDept"
                placeholder="销售部"
              ></Input>
            </Form-item>
            <Form-item label="销售大区">
              <Input
                type="text"
                clearable
                v-model.trim="hebeiExportData.salesRegion"
                placeholder="销售大区"
              ></Input>
            </Form-item>
            <Form-item label="营业部">
              <Input
                type="text"
                clearable
                v-model.trim="hebeiExportData.busiDept"
                placeholder="营业部"
              ></Input>
            </Form-item>
            <Form-item label="办事处">
              <Input
                type="text"
                clearable
                v-model.trim="hebeiExportData.busiOffice"
                placeholder="办事处"
              ></Input>
            </Form-item>
            <div class="fotter" style="text-align:center;">
              <Button @click="closeModal" type="primary">取消</Button>
              <Button @click="hebeiExportMethod" type="success">导出</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>
    <!-- 多客户编号(客资导出) -->
    <myModal class="myModal" @close="closeModal" :modal="keziExport">
      <div slot="main" class="modal-main">
        <h3>多客户编号(客资导出)</h3>
        <div class="modal-table">
          <Form ref="form" :label-width="88">
            <div style="overflow:hidden;">
              <div class="upDate">
                <Upload
                  :action="importUrl"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                >
                  <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                  <span>{{uploadText}}</span>
                </Upload>
              </div>
            </div>
            <div class="fotter" style="text-align:center;">
              <Button @click="closeModal" type="primary">取消</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>

    <!-- 扫码量和用户数 -->
    <myModal class="myModal" @close="closeModal" :modal="exportExport">
      <div slot="main" class="modal-main">
        <h3>扫码量和用户数</h3>
        <div class="modal-table">
          <Form ref="form" :model="formData" :label-width="88">
            <Form-item label="品牌名称" required>
              <Select
                v-model="exportExportData.brandId"
                placeholder="品牌名称*"
                @on-change="exportChangeValue"
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="活动包名" required>
              <Select
                v-model="exportExportData.groupId"
                placeholder="活动包名"
                @on-change="getExportActivityList"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in exportGroupList"
                  :key="index"
                >{{ item.groupName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="活动名称" required>
              <Select v-model="exportExportData.activityId" placeholder="活动名称" multiple clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in exportActivityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>

            <Form-item label="时间" required>
              <Row>
                <Col span="11">
                  <data-range
                    @dataChange="startTimeChange"
                    hour="00:00"
                    :time="exportExportData.queryStartTime"
                    placeholder="选择开始时间"
                    start
                  ></data-range>
                </Col>
                <Col span="11" offset="1">
                  <data-range
                    hour="24:00"
                    placeholder="结束时间"
                    @dataChange="endTimeChange"
                    :time="exportExportData.queryEndTime"
                  ></data-range>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="导出对象" required>
              <Select v-model="exportExportData.status" placeholder="导出对象*">
                <Option value="1">粤东</Option>
                <Option value="2">粤西</Option>
              </Select>
            </Form-item>
            <Form-item label="上传文件" required>
              <div style="overflow:hidden;">
                <div class="upDate">
                  <Upload
                    :action="importUrl"
                    :show-upload-list="false"
                    :on-success="exportHandleSuccess"
                    :on-error="handleError"
                  >
                    <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                    <span>{{exportExportData.uploadText}}</span>
                  </Upload>
                </div>
              </div>
            </Form-item>
            <div class="fotter" style="text-align:center;">
              <Button @click="closeModal" type="primary">取消</Button>
              <Button @click="exportExportMethod" type="success">导出</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>

    <!--导入内部员工 -->
    <myModal class="myModal" @close="closeModal" :modal="importEmployee">
      <div slot="main" class="modal-main">
        <h3>导入内部员工</h3>
        <div class="modal-table">
          <Form ref="form" :label-width="88">
            <div style="overflow:hidden;">
              <div class="upDate">
                <Upload
                  :action="importUrl"
                  :show-upload-list="false"
                  :on-success="emHandleSuccess"
                  :on-error="handleError"
                >
                  <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                  <span>{{ employeeData.uploadText }}</span>
                </Upload>
              </div>
            </div>
            <div class="fotter" style="text-align:center;">
              <Button @click="closeModal" type="primary">取消</Button>
              <Button @click="emExportMethod" type="success">导入</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import myModal from "@/components/Modal/my-modal.vue";
import dataRange from "@/components/data-rang.vue";
import PROJECT_CONFIG from "@/util/config.js";
import config from "@/util/config.js";
export default {
  name: "tools",
  components: { myModal, dataRange },
  data() {
    return {
      //生成URL数据
      createUrlShow: false,
      brandList: [],
      groupList: [],
      formData: {
        brandId: "",
        groupId: "",
        storeId: "",
        joinCode: ""
      },
      loadFilePath: "",
      keziExport: false,
      importUrl: config.uploadWorkerExcel,
      uploadText: "请选择上传文件",
      hebeiExportData: {
        joinCode: "",
        bapChannel: "",
        salesRoute: "",
        salesDept: "",
        salesRegion: "",
        busiDept: "",
        busiOffice: ""
      },
      hebeiExport: false,
      url: "",

      //生成周期数据
      createWeeksShow: false,
      //只有周一和周六可以选择
      dateOptions: {
        disabledDate(date) {
          let week = date.getDay();

          return date && week != 1 && week != 6;
        }
      },
      weeksDate: {
        brandId: "",
        groupId: "",
        activityId: "",
        date: "",
        storeId: ""
      },
      keziUrl: "",
      weexsActivityList: [],
      weexsGroupList: [],

      // 进货量导出数据
      exportExport: false,
      exportExportData: {
        brandId: "",
        groupId: "",
        activityId: [],
        queryStartTime: "",
        queryEndTime: "",
        status: "",
        loadFilePath: "",
        uploadText: "请选择上传文件"
      },
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: "",
        hour: "24:00"
      },
      exportGroupList: [],
      exportActivityList: [],
      //导入内部员工
      importEmployee: false,
      employeeData: {
        loadFilePath: "",
        uploadText: "请选择上传文件"
      }
    };
  },
  watch: {
    createUrlShow(val) {
      if (!val) {
        this.formData.joinCode = "";
        this.formData.storeId = "";
        this.url = "";
      }
    },
    createWeeksShow(val) {
      if (!val) {
        this.weeksDate.groupId = "";
        this.weeksDate.storeId = "";
        this.weeksDate.activityId = "";
        this.weeksDate.date = "";
      }
    },
    hebeiExport(val) {
      if (!val) {
        this.hebeiExportData.joinCode = "";
        this.hebeiExportData.bapChannel = "";
        this.hebeiExportData.salesRoute = "";
        this.hebeiExportData.salesDept = "";
        this.hebeiExportData.salesRegion = "";
        this.hebeiExportData.busiDept = "";
        this.hebeiExportData.busiOffice = "";
      }
    },
    exportExport(val) {
      if (!val) {
        this.exportExportData.groupId = "";
        this.exportExportData.activityId = [];
        this.exportExportData.status = "";
        this.exportExportData.uploadText = "请选择上传文件";
        this.exportExportData.loadFilePath = "";
        this.exportExportData.queryStartTime = "";
        this.exportExportData.queryEndTime = "";
      }
    },
    keziExport(val) {
      if (!val) {
        this.uploadText = "请选择上传文件";
        this.loadFilePath = "";
      }
    },
    keziUrl(val) {
      if (val) {
        this.$Modal.confirm({
          title: "警告",
          content: "确定导出？",
          onOk: () => {
            window.open(val);
          }
        });
      }
    },
    importEmployee(val) {
      if (!val) {
        this.employeeData.uploadText = "请选择上传文件";
        this.employeeData.loadFilePath = "";
      }
    }
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.weeksDate.brandId = this.brandList[0].id;
        this.exportExportData.brandId = this.brandList[0].id;
        this.changeValue(this.formData.brandId);
        this.weexChangeValue(this.weeksDate.brandId);
        this.exportChangeValue(this.exportExportData.brandId);
      }
    });
  },
  methods: {
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.loadFilePath = url;
        var urls = this.Global.getExportUrl(
          "tool/getHeibeStoreDataByExcel.json",
          { loadFilePath: this.loadFilePath }
        );

        this.keziUrl = urls;
        // window.open(urls);
      }
    },
    exportHandleSuccess(response, file, fileList) {
      this.exportExportData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.exportExportData.loadFilePath = url;
      }
    },
    emHandleSuccess(response, file, fileList) {
      this.employeeData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.employeeData.loadFilePath = url;
      }
    },
    hebeiExportMethod() {
      if (!this.hebeiExportData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      let data = this.Global.JsonChange(this.hebeiExportData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl("tool/getHebeiStoreData.json", data);
      window.open(url);
    },
    emExportMethod() {
      if (!this.employeeData.loadFilePath) {
        this.$Message.info("请选择上传文件");
        return false;
      }
      this.Global.doPost(
        "brandStaff/brandStaffImport.json",
        {
          loadFilePath: this.employeeData.loadFilePath
        },
        res => {
          this.$Message.success("导入成功");
          this.importEmployee = false;
        }
      );
    },
    closeModal() {
      this.createUrlShow = false;
      this.createWeeksShow = false;
      this.hebeiExport = false;
      this.keziExport = false;
      this.exportExport = false;
      this.importEmployee = false;
    },
    createNewWeexs() {
      if (!this.weeksDate.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.weeksDate.date) {
        this.$Message.error("时间不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.weeksDate);
      data["date"] = this.Global.createTime(this.weeksDate.date);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("tool/genDisplayCycle.json", data, res => {
        this.$Message.success("周期生成成功");
        this.closeModal();
      });
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("活动包名不能为空");
        return false;
      }
      if (!this.formData.storeId && !this.formData.joinCode) {
        this.$Message.error("门店ID和客户编号必填一个");
        return false;
      }
      this.init();
    },

    init() {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      this.url = "URL生成中,请稍后";
      //生成URL
      this.Global.doPost("tool/getUploadUrl.json", data, res => {
        this.url = res;
      });
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
          }
        }
      );
    },
    weexChangeValue(value) {
      this.weexsGroupList = [];
      this.weeksDate.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.weexsGroupList.push({
              id: Number(item[0]),
              groupName: item[1]
            });
          });
        }
      );
    },
    exportChangeValue(value) {
      this.exportGroupList = [];
      this.exportExportData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 1, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.exportGroupList.push({
              id: Number(item[0]),
              groupName: item[1]
            });
          });
        }
      );
    },
    getWeexsActivityList(value) {
      this.weexsActivityList = [];
      this.weeksDate.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.weexsActivityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    getExportActivityList(value) {
      this.exportActivityList = [];
      this.exportExportData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.exportActivityList.push({
              id: Number(item[0]),
              name: item[1]
            });
          });
        }
      );
    },
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.exportExportData.queryStartTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    endTimeChange(value) {
      this.end.hour = value.hour;
      this.end.time = value.time;
      if (value.hour == "24:00") {
        this.exportExportData.queryEndTime = value.time;
        return;
      }
      this.exportExportData.queryEndTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    exportExportMethod() {
      if (
        !this.exportExportData.brandId ||
        !this.exportExportData.groupId ||
        !this.exportExportData.activityId.length ||
        !this.exportExportData.status ||
        !this.exportExportData.loadFilePath ||
        !this.exportExportData.queryStartTime ||
        !this.exportExportData.queryEndTime
      ) {
        this.$Message.error("必选条件不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.exportExportData);
      data["oneLevel"] = this.exportExportData.activityId.join();
      delete data["activityId"];
      // delete data["groupId"];
      delete data["uploadText"];
      data["queryStartTime"] = this.Global.createTime(
        this.exportExportData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(
        this.exportExportData.queryEndTime
      );
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      var url = this.Global.getExportUrl("tool/queryScanInfo.json", data);
      window.open(url);
    },
    //释放视频
    releaseVideo() {
      this.$Modal.confirm({
        title: "警告",
        content: "确定释放视频？",
        onOk: () => {
          this.Global.doPost(
            "displayYxtg/deleteVideoOfBeCatch.json",
            "",
            res => {
              this.$Message.success("释放成功");
            }
          );
        }
      });
    }
  }
};
</script>