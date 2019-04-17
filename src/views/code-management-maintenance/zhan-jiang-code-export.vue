<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  background: #fff;
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
.tableBox {
  position: relative;
  padding: 10px;
  .pages {
    position: absolute;
    bottom: 20px;
    right: 20px;
    // margin: 10px;
    overflow: hidden;
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
.form {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 52.5%;

    .w18 {
      width: 33.3333%;
      display: block;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
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
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">湛江太古码包回导</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
                <Form-item required prop="brandId">
                    <Select v-model="formData.brandId" placeholder="品牌名称" @on-change="changeValue">
                        <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                    </Select>
                    <!-- <Input value="湛江太古" readonly/> -->
                </Form-item>
            </div>    
            <div class="btn-left w18">
                <Form-item>
                    <Select v-model="formData.groupId" placeholder="活动包名*" @on-change="getActivityList" clearable>
                        <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                    </Select>
                </Form-item>
            </div>
            <div class="btn-left w18">
                <Form-item>
                    <Select v-model="formData.activityId" placeholder="活动名称*" clearable>
                        <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                    </Select>
                </Form-item>
            </div>
                
            </div>
            <div class="btn-left w10">
                    <div class="searchBox">
                        <div class="btn-right search-right" @click="submit('search')">
                            <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                        </div>
                    </div>
                </div>
        </Form>
      </div>
      <div class="box tableBox" >
        <div class="contentTop">
          <!-- <fieldNameDes class="btn-right" :nameList='nameList'/> -->
          <importBtn  class="btn-right" @btnClick="exportExport = true" />
          <div class="btn-right">
            <Tooltip class="btn-right" max-width="200" content="1.excle第一行是表头;2.文件名字是码包号;3.每一行数据只有二维码，并且在第一列;">
              <span style="margin-right:20px;color:red;font-weight:bolder;">注意</span>
            </Tooltip>
          </div>
          
        </div>
        <!-- <Table :columns="columns1" :data="pageData" disabled-hover></Table> -->
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable> 
      </div>
      <div class="page-box" >
        <div>
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes :nameList='nameList'/>
    </div>
    
    <myModal class="myModal"
            @close="closeModal"
            :modal="exportExport">
      <div slot="main" class="modal-main">
        <h3>导入</h3>
        <div class="modal-table">
            <Form ref="form" :model="formData" :label-width="88">
                <Form-item required prop="brandId" label="品牌名称">
                    <Select v-model="exportExportData.brandId" placeholder="品牌名称" @on-change="exportChangeValue">
                        <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                    </Select>
                    <!-- <Input value="湛江太古" readonly/> -->
                </Form-item>
                <Form-item required prop="groupId" label="活动包名">
                    <Select v-model="exportExportData.groupId" placeholder="活动包名" @on-change="exportGetActivityList" clearable>
                        <Option :value="item.id" v-for="(item,index) in exportGroupList" :key="index">{{ item.groupName }}</Option>
                    </Select>
                </Form-item>
                <Form-item required prop="activityId" label="活动名称" >
                    <Select v-model="exportExportData.activityId" placeholder="活动名称" clearable @on-change="getActivityName">
                        <Option :value="item.id" v-for="(item,index) in exportActivityList" :key="index">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item required prop="qrUseType" label="码使用类型" >
                    <Select v-model="exportExportData.qrUseType" placeholder="码使用类型" clearable>
                        <Option value="B">B端</Option>
                        <Option value="C">C端</Option>
                    </Select>
                </Form-item>
                <Form-item label="上传文件" required>
                  <div style="overflow:hidden;">
                    <div class='upDate' style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;">
                        <Upload :action="importUrl" 
                        :show-upload-list=false
                        :on-success='handleSuccess'
                        :on-error='handleError'
                        >
                        <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                        <span>{{exportExportData.uploadText}}</span>
                        </Upload>
                    </div>
                  </div>
                </Form-item>
                <!-- <div class='demo' @click='download'>
                  <Icon type="ios-paper-outline" size='14' color='@primary-color'></Icon>
                  <span>下载模版</span>
                </div> -->
                <div class="fotter" style="text-align:center;">
                    <Button @click="closeModal" type="primary">取消</Button>
                    <Button type="success" @click="uploadExcel">导入</Button>
                </div>
            </Form>
        </div>
      </div>
    </myModal>
	</div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import myModal from "@/components/Modal/my-modal.vue";
import importBtn from "../../components/Button/import-btn.vue";
import config from "@/util/config.js";
export default {
  name: "zhan-jiang-code-export-keepAlive",
  data() {
    return {
      nameList:[
        {
          title:'1',
          content:"excle第一行是表头"
        },
        {
          title:'2',
          content:"文件名字是码包号"
        },
        {
          title:'3',
          content:"每一行数据只有二维码，并且在第一列"
        },
      ],
      exportExportData: {
        uploadText: "选择上传文件",
        // brandId:18,
        // brandName:"湛江太古"
      },
      exportExport: false,
      noneStatus: false,
      newBuildModel: false,
      formData: {
        groupId: "", //活动包名ID
        brandId: 18,
        activityName: "",
        activityId: ""
      },
      importUrl: config.uploadWorkerExcel,
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          // tooltip: true,
          align: "center"
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          tooltip: true
        },
        {
          title: "码包号",
          key: "packageNo",
          tooltip: true,
          align: "center"
        },
        {
          title: "生成时间",
          key: "codeCrateTime",
          align: "center",
          render: (h, f) => {
            let str = "";
            if (f.row.codeCrateTime == null) {
              str = "";
            } else {
              str = this.Global.createTime(f.row.codeCrateTime);
            }
            return h("div", str);
          }
        },
        {
          title: "激活时间",
          key: "activateTime",
          align: "center",
          render: (h, f) => {
            let str = "";
            if (f.row.activateTime == null) {
              str = "";
            } else {
              str = this.Global.createTime(f.row.activateTime);
            }
            return h("div", str);
          }
        },
        {
          title: "码量",
          key: "planQuantity",
          tooltip: true,
          align: "center"
        },
        {
          title: "状态",
          key: "usableStatus",
          tooltip: true,
          align: "center",
          render: (h, f) => {
            let arr = ["未激活", "已激活"];
            return h("div", arr[f.row.usableStatus]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            var tag = [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该码包？",
                        onOk: () => {
                          this.Global.doPost(
                            "codepackage/deletePackage.json",
                            { batchId: params.row.batchId },
                            res => {
                              this.init();
                              this.$Message.success("删除成功");
                            }
                          );
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ];
            return h("div", tag);
          }
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      exportGroupList: [], //活动包名
      exportActivityList: [] //活动
    };
  },
  created() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.exportExportData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
        
      }
    );
    // this.changeValue(18);
    // this.exportChangeValue(18);
  },
  watch:{
    exportExport(val){
      if(!val){
        this.exportExportData = {
          uploadText: "选择上传文件",
          brandId:18,
          brandName:"湛江太古"
        };
      }
    }
  },
  components: {
    importBtn,
    myModal,
    hhTable,fieldNameDes
  },
  methods: {
    getActivityName(val) {
      this.exportExportData.activityName = "";
      if (!val) return;
      this.exportActivityList.forEach(item => {
        if (val == item.id) {
          this.exportExportData.activityName = item.name;
        }
      });
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.exportExportData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.exportExportData.loadFilePath = url;
      }
    },
    closeModal() {
      this.exportExport = false;
    },
    uploadExcel() {
      if (!this.exportExportData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.exportExportData.groupId) {
        this.$Message.error("活动包不能为空");
        return false;
      }
      if (!this.exportExportData.activityId) {
        this.$Message.error("活动不能为空");
        return false;
      }
      if (!this.exportExportData.qrUseType) {
        this.$Message.error("码使用类型不能为空");
        return false;
      }
      if (!this.exportExportData.loadFilePath) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let brandName = "";
      this.brandList.forEach(item => {
        if(item.id == this.exportExportData.brandId){
          brandName = item.brandName;
        }
      })
      let params = {
        loadFilePath: this.exportExportData.loadFilePath,
        brandId: this.exportExportData.brandId,
        activityId: this.exportExportData.activityId,
        brandName,
        activityName: this.exportExportData.activityName
      };
      //导入
      console.log(params);
      this.Global.doPost("codepackage/importPackage.json", params, res => {
        this.init();
        this.$Message.success("上传成功");
        this.exportExport = false;
      });
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryGroup.json",
        { date: 7, activityType: 1, scope: "a", brandId: value },
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
      this.Global.doPost(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    exportChangeValue(value) {
      this.exportGroupList = [];
      this.exportExportData.groupId = "";
      if (!value) return;
      this.brandList.forEach(item => {
        if (item.id == value) {
          this.exportExportData.brandName = item.brandName;
        }
      });
      this.Global.doPost(
        "condition/queryGroup.json",
        { date: 7, activityType: 1, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.exportGroupList.push({
              id: Number(item[0]),
              groupName: item[1]
            });
          });
          if (this.exportGroupList && this.exportGroupList.length) {
            this.exportExportData.groupId = this.exportGroupList[0].id;
            this.exportGetActivityList(this.exportExportData.groupId);
          }
        }
      );
    },
    exportGetActivityList(value) {
      this.exportActivityList = [];
      this.exportExportData.activityId = "";
      if (!value) return;

      this.Global.doPost(
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
    changePage(size) {
      this.page = size;
      this.init();
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd hh:mm:ss");
    },
    submit() {
      this.init(1);
    },
    init(size) {
      if (!this.formData.groupId) {
        this.$Message.info("活动包不能为空");
        return false;
      }
      if (!this.formData.activityId) {
        this.$Message.info("活动不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formData);
      // data['brandId'] = 18;
      data["currentPage"] = size ? size : this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost("codepackage/querycode.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
        this.noneStatus = true;
      });
    }
  }
};
</script>