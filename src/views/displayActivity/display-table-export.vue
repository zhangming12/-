<style lang="less" scoped>
@import "../../config/index.less";
#display-table-export-Main {
  height: 100%;
  // min-width: 1166px;
  .main-container {
    position: relative;
    min-height: 100%;
    margin-left: 10px;
    margin-top: 5px;
    background: #ffffff;
    padding-top:10px; 
    padding-bottom: 60px;
    min-width: 1135px;
    .page-box {
      overflow: hidden;
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
    .contentTop {
      height: 40px;
      padding: 0 10px;
      line-height: 40px;
      margin-bottom: 0;
      min-width: 1135px;
      background-color: #ffffff;
      .numColor {
        color: @primary-color;
      }
    }
    .ivu-table-row {
      box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
      transform: translateY(0px);
    }
    .table-box {
      padding: 0 10px;
      width: 100%;

      overflow-x: auto;
      position: relative;
    }
    .searchBox {
      overflow: hidden;
      .search-left,
      .search-right {
        width: 48%;
      }
      .search-left {
        button {
          outline: none;
          border: none;
          width: 60px;
          height: 30px;
          line-height: 30px;
          background: #ffffff;
          margin-left: 8px;
          cursor: pointer;
          color: @primary-color;
        }
      }
      .search-right {
        width: 52%;
        img {
          cursor: pointer;
          margin-left: 6px;
        }
      }
    }
  }
}
.toLeft,
.toRight {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #7f7f7f;
  box-sizing: border-box;
  padding: 5px;
  cursor: pointer;
  top: 220px;
  z-index: 100;
  opacity: 0.8;
}
.toLeft {
  left: 20px;
}
.toRight {
  right: 20px;
  padding: 5px 0 0 15px;
}
</style>

<template>
  <div id="display-table-export-Main">
      <!-- <h2 class="Title">陈列统计表格导出</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="10" :rules="rule">
              <div class="container">
                <div class="btn-left w18">
                  <Form-item  required>
                      <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select> 
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="groupId" required>
                      <Select v-model="formData.groupId" placeholder="活动包名*" @on-change="getActivityList" clearable>
                          <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                      </Select>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item>                             
                      <Select v-model="formData.activityId" placeholder="活动名称" clearable>
                          <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                      </Select> 
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="queryStartTime" required>
                      <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="queryEndTime" required>
                      <data-range placeholder="结束时间" hour="24:00" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                  </Form-item>
                </div>
                
                <div class="btn-left w10">
                  <div class="searchBox">
                    <div class="btn-right search-right" @click="submit('form')">
                      <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                    </div>
                  </div>
                </div>
              </div>
          </Form>
        </div>
        <div class="contentTop">
              <span class="btn-left">此表共包含 <span class='numColor'>{{pageData.length}}</span> 条数据</span>
              <exportBtn  class="btn-right" @btnClick="exportExcel" />
            </div>
        <div class="table-box box" ref="tableBox">
            <hhTable  id="display-table-export" :columns="columns1" :pageData="pageData" :noneStatus = "noneStatus" disabled-hover></hhTable>
        </div>
         <!-- 左右按钮 -->
            <!-- <div class="toLeft" @click="toLeft">
                <Icon type="ios-arrow-dropleft"  size='20' color="#ffffff"/>
            </div>
            <div class="toRight" @click="toRight">
                <Icon type="ios-arrow-dropright" size='20' color="#ffffff"/>
            </div> -->
            <fieldNameDes/>
      </div>
  </div>
</template>

<script>
import dataRange from "../../components/data-rang.vue";
import exportBtn from "../../components/Button/export-btn.vue";
import detailBtn from "../../components/Button/detail-btn.vue";
import myModal from "../../components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name:"display-table-export-keepAlive",
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
      noneStatus:false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      columns1: [],
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: ""
      },
      rule: {
        // queryStartTime: [{ validator: validateStart }],
        // queryEndTime: [{ validator: validateEnd }]
      },
      defaultList: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "一级组织",
          width: 100,
          key: "oneLevel",
          align: "center",
          tooltip: true
        },
        {
          title: "二级组织",
          width: 100,
          key: "twoLevel",
          align: "center",
          tooltip: true
        },
        {
          title: "三级组织",
          width: 100,
          key: "threeLevel",
          align: "center",
          tooltip: true
        },
        {
          title: "四级组织",
          width: 100,
          key: "fourLevel",
          align: "center",
          tooltip: true
        }
      ],
      pageData: [],
      brandList: [],
      activityList: [],
      step:20
    };
  },
  components: { dataRange, exportBtn, detailBtn, myModal, hhTable,fieldNameDes },
  created() {
    this.columns1 = [].concat(this.defaultList);
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
  methods: {
    toLeft() {
      let dom = this.$refs.tableBox;
      let scrollLeft = dom.scrollLeft;
      this.timer = setInterval(() => {
        scrollLeft -= this.step;
        if (scrollLeft <= 0) {
          dom.scrollTo(0, 0);
          clearInterval(this.timer);
        }
        dom.scrollTo(scrollLeft, 0);
      }, 17);
    },
    toRight() {
      let dom = this.$refs.tableBox;
      let table = this.$refs.tableBox;
      let scrollLeft = dom.scrollLeft;
      console.log(dom.clientWidth)
      return
      let right = Math.abs(dom.clientWidth - table.clientWidth);
      this.timer = setInterval(() => {
        scrollLeft += this.step;
        if (scrollLeft >= right) {
          dom.scrollTo(right, 0);
          clearInterval(this.timer);
        }
        dom.scrollTo(scrollLeft, 0);
      }, 16);
    },
    exportExcel() {
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
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "uploadReport/newAndOldUsersDetailExport.json",
        data
      );
      window.open(url);
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
      if (!this.formData.groupId) {
        this.$Message.error("活动包名不能为空");
        return false;
      }
      // if (!this.formData.activityId) {
      //   this.$Message.error("活动不能为空");
      //   return false;
      // }

      this.init();
    },
    changePage(size) {
      this.init();
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
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "uploadReport/newAndOldUsersDetail.json",
        data,
        res => {
          
          let columns = [...this.defaultList];
          this.pageData = res;
          if (res.length) {
            let allUser = {
              title: "累计用户数",
              align: "center",
              children: []
            };
            let newUser = {
              title: "新用户数",
              align: "center",
              children: []
            };
            let totalUser = {
              title: "总用户数",
              align: "center",
              children: []
            };
            let keys = Object.keys(res[0].allUsers);

            for (let i = 0, len = keys.length; i < len; i++) {
              allUser.children.push({
                title: keys[i],
                width: 200,
                key: `all${i}`,
                align: "center",
                tooltip: true
              });
              newUser.children.push({
                title: keys[i],
                width: 200,
                key: `new${i}`,
                align: "center",
                tooltip: true
              });
              totalUser.children.push({
                title: keys[i],
                width: 200,
                key: `total${i}`,
                align: "center",
                tooltip: true
              });
            }
            columns.push(allUser);
            columns.push(newUser);
            columns.push(totalUser);
            for (let i = 0, len = res.length; i < len; i++) {
              for (let j = 0, lens = keys.length; j < lens; j++) {
                res[i][`all${j}`] = res[i]["allUsers"][keys[j]];
                res[i][`new${j}`] = res[i]["newUsers"][keys[j]];
                res[i][`total${j}`] = res[i]["totalUsers"][keys[j]];
              }
            }
            this.columns1 = columns;
          }
          this.noneStatus = true;
        }
      );
    },

    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
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
    }
  }
};
</script>


