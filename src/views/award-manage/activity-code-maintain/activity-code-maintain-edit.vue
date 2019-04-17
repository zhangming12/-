<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  .title {
    float: left;
    span {
      display: inline-block;
      height: 150px;
      line-height: 150px;
    }
  }
  .table {
    float: left;
    margin-left: 30px;
  }
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
footer {
  text-align: center;
  margin: 40px 0 20px;
  padding-bottom: 30px;
  button {
    margin-right: 20px;
  }
}
</style>

<template>
  <div id="Main">
      <h2 class="Title">活动码包-新增</h2>
      <div class="box">
            <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span='11'>   
                        <Form-item label="品牌名称" prop="brandId">
                            <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue" :disabled="isEdit">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>  
                        </Form-item>  
                        <Form-item label="活动名称" >
                            <Select v-model="formData.activityId" placeholder="请选择" @on-change="activityChangeValue" :disabled="isEdit">
                                <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                            </Select>  
                        </Form-item>          
                        <Form-item label="码包名称" >
                            <Input v-model="formData.ruleName"></Input> 
                        </Form-item>
                    </Col>
                    <Col span='11' offset="1">
                        <Form-item label="流水线" >
                            <Input v-model="formData.pipeLine" placeholder="请输入..."></Input> 
                        </Form-item>
                        <Form-item label="备注说明">
                            <Input v-model="formData.ruleBody" placeholder="请输入..." ></Input> 
                        </Form-item>  
                        <Form-item label="规则编码">
                            <Input v-model="formData.ruleCode" placeholder="请输入..." ></Input> 
                        </Form-item>               
                    </Col>
                </Row>
            </Form>
            <footer>
                <Button  type="info" @click='goBack'>取消</Button>
                <Button  type="success" @click="handleSave('form')">保存</Button>
                <Button  type="primary" @click="handleCreateCode" v-show="isEdit">生成并保持码包</Button>
            </footer>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name:"activity-code-maintain-edit-keepAlive",
  data() {
    return {
      formData: {
        brandId: "",
        brandName: "",
        activityId: "",
        activityName: "",
        pipeLine: "",
        ruleName: "",
        ruleBody: "",
        ruleCode: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
      },
      columns1: [
        {
          type: "selection",
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "加码名称",
          key: "ruleCode",
          align: "center"
        }
      ],
      pageData: [],
      type: null,
      brandList: [],
      activityList: [],
      isEdit: false
    };
  },
  created: function() {
    let that = this;
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
    });
    var type = this.$route.query.type;
    var id = this.$route.query.id;
    if (type) {
      this.type = type;
    }
    if (id) {
      this.Global.doPost("qrCodeRule/queryQrCodeRuleInfo.json", id, function(
        res
      ) {
        that.isEdit = true;
        that.formData.id = res.id;
        that.formData.brandId = res.brandId;
        that.formData.brandName = res.brandName;
        that.formData.activityId = res.activityId;
        that.formData.activityName = res.activityName;
        that.formData.ruleName = res.ruleName;
        that.formData.ruleBody = res.ruleBody; //备注
        that.formData.ruleCode = res.ruleCode;
        that.formData.pipeLine = res.pipeLine; //流水线
      });
    }
  },
  mounted: function() {},
  methods: {
    handleSave: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init: function(currentPage, pageSize) {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      let url;
      if (this.type == "add") {
        url = "qrCodeRule/doSave.json";
      } else if (this.type == "edit") {
        url = "qrCodeRule/doUpdate.json";
      }

      this.Global.doPost(url, data, function(res) {
        that.$router.push({ path: "/activityCodeMaintain" });
      });
    },
    goBack: function() {
      this.$router.back();
    },
    changeValue: function(value) {
      var that = this;
      this.activityList = [];
      for (var i = 0; i < this.brandList.length; i++) {
        if (this.brandList[i].id == value) {
          this.formData["brandName"] = this.brandList[i].brandName;
          this.formData["brandId"] = this.brandList[i].id;
          this.vendorName = this.brandList[i].vendorName;
          break;
        }
      }
      this.Global.getActivityList(value, function(res) {
        that.activityList = res.datalist;
      });
    },
    activityChangeValue(value) {
      for (var i = 0; i < this.activityList.length; i++) {
        if (this.activityList[i].id == value) {
          this.formData["activityName"] = this.activityList[i].name;
          this.formData["activityId"] = this.activityList[i].id;
          break;
        }
      }
    },
    handleCreateCode() {
      this.$router.push({ path: "/productDownloadCode" });
    }
  }
};
</script>