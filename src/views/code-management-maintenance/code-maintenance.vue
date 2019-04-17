<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  // margin: 0 auto 15px;
  // padding: 30px 20px 0;
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
  min-height: 400px;
  padding: 10px;
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
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">活动码包维护</h2> -->
    <div class="main-container">
      <div class="box">
          <Form ref="form" class="form" :model="formData" :label-width="10">
              <div class="container">
                  <div class="btn-left w18">
                      <Form-item prop="brandId" required>
                          <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                              <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                          </Select>
                      </Form-item>
                  </div>
                  <div class="btn-left w18">
                      <Form-item required>
                          <Select v-model="formData.groupId" placeholder="活动名称*" @on-change="getActivityList" clearable>
                              <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                          </Select>
                      </Form-item>
                  </div>
                  <div class="btn-left w18">
                      <Form-item required>
                          <Select v-model="formData.activityId" placeholder="子活动名*" clearable>
                              <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                          </Select>
                      </Form-item>
                  </div>
                  
              </div>
              <div class="btn-right w10">
                      <div class="searchBox">
                          <div class="btn-right search-right" @click="submit('form')">
                              <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                          </div>
                      </div>
                  </div>
          </Form>
      </div>
      <div class="box tableBox">
        <div class="contentTop">
            <span class="btn-left">此表共包含 <span class='numColor'>{{pageNum}}</span> 条数据</span>
            <addNewBtn  class="btn-right" @btnClick="newBuildModel=true;type='add'" />
        </div>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable> 
      </div>
      <div class="page-box">
          <div>
            <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
          </div>
        </div>
    </div>

    <Modal
      v-model="newBuildModel"
      width='900'>
      <h2 style="text-align:center;margin-bottom:20px;" v-if="type == 'look'">查看码包配置</h2>
      <h2 style="text-align:center;margin-bottom:20px;" v-if="type == 'modify'">修改码包配置</h2>
      <h2 style="text-align:center;margin-bottom:20px;" v-if="type == 'add'">新建活动码包设置</h2>
      <i-Form ref="form" :model="formItem" :label-width="88" :rules="rule">
          <Row>
              <Col span="8">
                    <Form-item label="品牌名称:" prop="brandId" required>
                        <Select v-if="type == 'add'" v-model="formItem.brandId" placeholder="请选择" :disabled="type == 'look' || type == 'modify'" @on-change="newChangeValue">
                            <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                        </Select>
                         <span v-else>{{formItem.brandName}}</span>
                    </Form-item>
                    <Form-item label="投放终端:" prop="qrUseType" required>
                        <Radio-group v-model="formItem.qrUseType" >
                            <Radio :disabled="type == 'look'" label='C'>消费者(C)</Radio>
                            <Radio :disabled="type == 'look'" label='B'>门店(B)</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="码长度:" prop="qrLen" required>
                        <Input-number v-model="formItem.qrLen" :readonly="type == 'look'" :max="50" :min="8" :value="1"></Input-number>
                    </Form-item>
                    <Form-item label="备注说明:" prop="memo">
                        <i-input v-model.trim="formItem.memo" :readonly="type == 'look'" placeholder="请输入备注说明"></i-input>
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="活动包名:" required>
                        <Select v-if="type == 'add'" v-model="formItem.groupId" placeholder="请选择" :disabled="type == 'look' || type == 'modify'" @on-change="newGetActivityList">
                          <Option :value="item.id" v-for="(item,index) in newGroupList" :key="index">{{ item.groupName }}</Option>
                        </Select>
                        <span v-else>{{formItem.groupName}}</span>
                    </Form-item>
                    <!-- 1 shi 0 fou -->
                    <Form-item label="识别明码:" prop="useMemoCode" required>
                        <Radio-group v-model="formItem.useMemoCode" :disabled="type == 'look'">
                            <Radio :disabled="type == 'look'" :label='1'>是</Radio>
                            <Radio :disabled="type == 'look'" :label='0'>否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="码包库位:" prop="brandId" required>
                        <Row>
                            <Col span="10">
                                <input type="number" v-model="formItem.beginDepot" :readonly="type == 'look'" :min="1" :max="10" class="numberInput">
                            </Col>
                            <Col span="2" style="text-align:center;">至</Col>
                            <Col span="10">
                                <input :readonly="type == 'look'" type="number" v-model="formItem.endDepot" :min="1" :max="10" class="numberInput">
                            </Col>
                        </Row>
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="活动名称:" prop="activityId" required>
                        <Select v-if="type == 'add'" v-model="formItem.activityId" placeholder="请选择" :disabled="type == 'look' || type == 'modify'">
                            <Option :value="item.id" v-for="(item,index) in newActivityList" :key="index">{{ item.name }}</Option>
                        </Select>
                        <!-- <Input readonly v-model="formItem.activityName" v-else></Input> -->
                        <span v-else>{{formItem.activityName}}</span>
                    </Form-item>
                    <!-- 1 shi 0 fou -->
                    <Form-item label="流水串号:" prop="flowingNum" required>
                        <Radio-group v-model="formItem.flowingNum">
                            <Radio :disabled="type == 'look'" :label='1'>是</Radio>
                            <Radio :disabled="type == 'look'" :label='0'>否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="流水线:" prop="pipeLine">
                        <i-input v-model.trim="formItem.pipeLine" placeholder="请输入流水线" :readonly="type == 'look'"></i-input>
                    </Form-item>
                </Col>
          </Row>
      </i-Form>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button v-if="type != 'look'" type="success" @click="sureCreate('form')">确定</i-button>
      </div>
    </Modal>
	</div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
export default {
  name: "code-maintenance-keepAlive",
  data() {
    return {
      noneStatus: false,
      type: "add", //类型 add增加  look查看  modify修改
      newBuildModel: false,
      formData: {
        groupId: "", //活动包名ID
        brandId: "",
        activityId: ""
      },
      formItem: {
        qrRuleId: "",
        brandId: "",
        brandName: "",
        groupName: "",
        activityName: "",
        groupId: "",
        activityId: "",
        memo: "", //备注
        beginDepot: 1,
        endDepot: 10,
        useMemoCode: "", //识别明码
        qrUseType: "", //投放终端
        qrLen: 16, //码长度
        flowingNum: "", //流水串号
        pipeLine: ""
      },
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          //   width: 60,
          align: "center"
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center"
          //   width: 120
        },
        {
          title: "活动包名",
          key: "groupName",
          align: "center"
          //   width: 120
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center"
          //   width: 120
        },
        {
          title: "流水线",
          key: "pipeLine",
          align: "center"
          //   width: 120
        },
        {
          title: "生成码包数",
          key: "packageNum",
          align: "center"
          //   width: 120
        },
        {
          title: "生成码量",
          key: "codeNum",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 300,
          render: (h, params) => {
            var tag = [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let query = {
                        brandId: params.row.brandId,
                        groupId: params.row.groupId,
                        activityId: params.row.activityId,
                        qrRuleId: params.row.qrRuleId
                        // brandId: 1,
                        // groupId: 1,
                        // activityId: 1,
                        // qrRuleId: 1
                      };
                      this.$router.push({
                        path: "/activityCodeList",
                        query
                      });
                    }
                  }
                },
                "码包列表"
              )
            ];
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.getPackageInformation(params.row, "modify");
                    }
                  }
                },
                "修改"
              )
            );

            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.getPackageInformation(params.row, "look");
                    }
                  }
                },
                "查看"
              )
            );

            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该码包规则？",
                        onOk: () => {
                          let {
                            brandId,
                            activityId,
                            groupId,
                            qrRuleId
                          } = params.row;
                          let data = {
                            brandId,
                            activityId,
                            groupId,
                            qrRuleId
                          };
                          this.Global.doPost(
                            "codepackage/showinformation.json",
                            data,
                            res => {
                              let {
                                brandId,
                                activityId,
                                groupId,
                                qrUseType,
                                qrLen,
                                pipeLine,
                                memo,
                                flowingNum,
                                beginDepot,
                                endDepot,
                                useMemoCode
                              } = res;
                              let query = {
                                brandId,
                                activityId,
                                groupId,
                                qrUseType,
                                qrLen,
                                pipeLine,
                                memo,
                                flowingNum,
                                beginDepot,
                                endDepot,
                                useMemoCode
                              };
                              console.log(query);
                              this.Global.deleteEmptyProperty(query);
                              console.log(query);
                              this.Global.doPost(
                                "codepackage/deleterule.json",
                                query,
                                res => {
                                  console.log(res);
                                  this.$Message.success("删除成功");
                                  this.init();
                                }
                              );
                            }
                          );
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            );
            return h("div", tag);
          }
        }
      ],
      rule: {
        useMemoCode: [{ required: true, message: "请选择识别明码" }],
        qrUseType: [{ required: true, message: "请选择投放终端" }],
        qrLen: [{ required: true, message: "码长度不能为空" }],
        flowingNum: [{ required: true, message: "请选择流水串号" }],
        startNum: [{ required: true, message: "码包库位不能为空" }],
        endNum: [{ required: true, message: "码包库位不能为空" }]
      },
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      newGroupList: [],
      newActivityList: []
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
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  components: {
    hhTable,
    addNewBtn
  },
  watch: {
    newBuildModel(val) {
      if (!val) {
        this.resetFormItem();
      }
    }
  },
  methods: {
    sureCreate(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.save();
        } else {
          this.$Message.error("必选项不能为空!");
        }
      });
    },
    //新建修改码包
    save() {
      if (this.type == "add") {
        if (
          !this.formItem.brandId ||
          !this.formItem.groupId ||
          !this.formItem.activityId
        ) {
          this.$Message.error("必选项不能为空!");
        }
      }
      let str = this.type == "modify" ? "修改该码包?" : "新建该码包？";
      let api =
        this.type == "modify"
          ? "codepackage/updaterule.json"
          : "codepackage/newbuildrule.json";
      this.$Modal.confirm({
        title: "提示",
        content: str,
        onOk: () => {
          let {
            brandId,
            activityId,
            groupId,
            qrUseType,
            qrLen,
            pipeLine,
            memo,
            flowingNum,
            beginDepot,
            endDepot,
            useMemoCode,
            qrRuleId
          } = this.formItem;
          let data = {
            qrRuleId,
            brandId,
            activityId,
            groupId,
            qrUseType,
            qrLen,
            pipeLine,
            memo,
            flowingNum,
            beginDepot,
            endDepot,
            useMemoCode
          };
          this.Global.deleteEmptyProperty(data);
          this.Global.doPost(api, data, res => {
            this.$Message.success("保存成功");
            this.newBuildModel = false;
            this.init();
          });
        }
      });
    },
    //获取包信息
    getPackageInformation(row, type) {
      this.type = type;
      let { brandId, activityId, groupId, qrRuleId } = row;
      let data = {
        brandId,
        groupId,
        activityId,
        qrRuleId
      };
      this.formItem.brandId = brandId;
      this.formItem.groupId = groupId;
      this.formItem.activityId = activityId;
      this.newBuildModel = true;
      this.Global.doPost("codepackage/showinformation.json", data, res => {
        console.log(res);
        this.formItem = res;
      });
    },
    resetFormItem() {
      this.formItem = {
        brandName: "",
        groupName: "",
        activityName: "",
        brandId: "",
        groupId: "",
        activityId: "",
        memo: "", //备注
        beginDepot: 1,
        endDepot: 10,
        useMemoCode: "", //识别明码
        qrUseType: "", //投放终端
        qrLen: 16, //码长度
        flowingNum: "", //流水串号
        pipeLine: ""
      };
    },
    cancel() {
      this.newBuildModel = false;
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
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
    newChangeValue(value) {
      this.newGroupList = [];
      this.formItem.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 1, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.newGroupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.newGroupList && this.newGroupList.length) {
            this.formItem.groupId = this.newGroupList[0].id;
            this.newGetActivityList(this.formItem.groupId);
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
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    newGetActivityList(value) {
      this.newActivityList = [];
      this.formItem.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.newActivityList.push({ id: Number(item[0]), name: item[1] });
          });
          if (this.newActivityList && this.newActivityList.length) {
            this.formItem.activityId = this.newActivityList[0].id;
          }
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
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);

      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "displayYxtg/querySuperviseLogListExport.json",
        data
      );
      window.open(url);
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init() {
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("活动包名不能为空");
        return false;
      }
      if (!this.formData.activityId) {
        this.$Message.error("活动不能为空");
        return false;
      }
      let data = {
        brandId: this.formData.brandId,
        activityId: this.formData.activityId
        // groupId: this.formData.groupId
      };
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("codepackage/querycodepackage.json", data, res => {
        console.log(res);
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
        this.noneStatus = true;
      });
    }
  }
};
</script>