<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  padding: 15px;
}

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
  overflow: hidden;
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}

.select {
  background: @primary-color;
  color: #fff;
}

.Title {
  text-indent: 1%;
  padding-bottom: 15px;
  font-size: 16px;
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

footer {
  text-align: center;
  margin: 40px 0 20px;
  button {
    width: 70px;
  }
  .btn-next {
    margin-left: 20px;
  }
  .ivu-btn {
    line-height: 1;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">关联业代</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="5">
            <div style="line-height: 33px;">公司名称：{{ component }}</div>
          </Col>
          <Col span="6" offset="1">
            <Form-item label="业代姓名">
              <Input v-model="formData.workerName"></Input>
            </Form-item>
          </Col>
          <Col span="6" offset="1">
            <Form-item label="手机号码">
              <Input v-model="formData.phone"></Input>
            </Form-item>
          </Col>
          <Col span="2" offset="1">
            <Button @click="submit('form')" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;">
      <div class="contentTop">
        <Button @click="uploadExcel" class="btn-export" icon="android-add" type="primary">导入</Button>

        <!-- <div class='export'>
                     <div @click="uploadExcel"><Icon type="android-add" size="14"></Icon>导入</div>
        </div>-->
        <div class="upDate">
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
        <div class="demo" @click="dowland">
          <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
          <span>下载模版</span>
        </div>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <footer>
        <Button type="primary" @click="handleLastStep" v-show="isShowLastStep">上一步</Button>
        <Button type="success" class="btn-next" @click="handleClose">关闭</Button>
      </footer>
    </div>
  </div>
</template>

<script>
import config from "../../util/config.js";
export default {
  name: "salesman-next-keepAlive",

  data() {
    return {
      component: null,
      url: config.uploadWorkerExcel,
      uploadText: "上传参与业代名单",
      uploadUrl: "",
      formData: {
        workerName: "",
        phone: ""
      },
      rule: {},
      columns1: [
        {
          title: "业代姓名",
          key: "workerName",
          align: "center"
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center"
        },
        {
          title: "允许被扫码次数",
          key: "totalStores",
          align: "center"
        },
        {
          title: "超限提示",
          width: 360,
          key: "overrangeNotify",
          align: "center"
        }
      ],
      pageData: [],
      page: 1,
      pageNum: 0,
      pageSize: 10,
      activityData: null, //接受新增活动路由带过来参数
      isShowLastStep: true //上一步按钮跳转修改活动页面
    };
  },
  created() {
    var activityData = this.$route.query;
    this.activityData = activityData;
    if (activityData.lastStep) {
      //列表页面进来，不显示上一步按钮
      this.isShowLastStep = false;
    }
    this.component = activityData.vendorName;
    this.init();
  },
  methods: {
    submit: function(name) {
      this.page = 1;
      this.init();
    },
    userBlack(brandId, workerId) {
      this.Global.doPost(
        "worker/updateStatus.json",
        {
          brandId: brandId,
          workerId: workerId
        },
        () => {
          this.$Message.success("成功");
          this.init();
        }
      );
    },
    changePage: function(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.activityData.brandId; //品牌
      data["activityId"] = this.activityData.id; //活动
      this.Global.doPost("worker/queryWorkerList.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
      });
    },
    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      this.Global.doPost(
        "worker/uploadBrandWorker.json",
        {
          loadFilePath: this.uploadUrl,
          brandId: this.activityData.brandId,
          activityId: this.activityData.id,
          brandName: this.activityData.brandName
        },
        () => {
          this.init();
          this.uploadText = "上传参与业代名单";
        }
      );
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/workerInfo(%E5%93%81%E7%89%8C%E4%B8%9A%E5%8A%A1%E5%91%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF).xlsx"
      );
    },
    handleSuccess: function(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
        // this.uploadExcel()
      }
    },
    handleError() {},
    handleLastStep() {
      //上一步
      this.$router.push("/salesmanEdd?type=edd&id=" + this.activityData.id);
    },
    handleClose() {
      //关闭，返回
      this.$router.push({ path: "/salesman" });
    }
  }
};
</script>


