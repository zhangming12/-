<style lang="less" scoped>
@import "../../config/index.less";
.form {
  display: flex;
  position: relative;
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
#Main {
  height: 100%;
}
.main-container {
  min-height: 100%;
  background: #ffffff;
}
.container {
  width: 52.5%;
  margin: auto;
  .w18 {
    width: 33.333%;
  }
}
.table-box {
  overflow: hidden;
  min-height: 600px;
  padding: 20px 10px;
  .left,
  .right {
    height: 100%;
    width: 47%;
    margin-left: 2%;
    .color1 {
      color: #666666;
    }
    .color2 {
      color: #333333;
    }
    .color3 {
      color: @font-color;
    }
    .color4 {
      color: @primary-color;
    }
    // height: 300px;
    .title {
      text-align: center;
      position: relative;
      font-weight: bold;
      font-size: 14px;
      .title-main {
        position: relative;
      }
    }
    .title-main::after,
    .title-main::before {
      content: "";
      width: 40px;
      height: 18px;
      display: inline-block;
      background-image: url("../../assets/image/areaTop.png");
      position: absolute;
      top: 0;
    }
    .title-main::before {
      background-position: 0 0;
      right: 100%;
    }
    .title-main::after {
      background-position: 36px 0;
      left: 100%;
    }
  }
  .left {
    border-right: 1px solid #e5e5e5;
    .left-top {
      display: flex;
      justify-content: space-between;
      padding-top: 30px;
      .code-box {
        width: 50%;
        height: 120px;
        .code-total {
          margin-top: 10px;
          span:first-child {
            margin-right: 2px;
          }
        }
      }
    }
    .left-bottom {
      margin-top: 20px;
      .left-bottom-main {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;

        div {
          width: 33.3333%;
          .code-total {
            margin-top: 10px;
            span:first-child {
              margin-right: 2px;
            }
          }
        }
      }
    }
  }
  .right {
    .right-top {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      .code-box {
        width: 50%;
        padding-left: 10%;
        height: 120px;
        p {
          span:first-child {
            margin-right: 5px;
          }
        }
        .code-total {
          margin-top: 10px;
          span:first-child {
            margin-right: 2px;
          }
        }
      }
    }
    .total-amount {
      margin: 40px 0;
    }
    .right-bottom {
      margin-top: 20px;
      .right-bottom-main {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;

        div {
          width: 33.3333%;
          .code-total {
            margin-top: 10px;
            span:first-child {
              margin-right: 2px;
            }
          }
        }
      }
    }
  }
}

.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 50%;
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
.contentTop {
  margin-bottom: 30px;
}
.p-title {
  img {
    vertical-align: middle;
    margin-right: 5px;
    width: 18px;
    height: 18px;
  }
  span {
    vertical-align: middle;
  }
}
.mt50 {
  margin-top: 50px;
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">扫码全程用码情况</h2> -->
      <div class="main-container">
          <div class="box">
            <Form ref="form" class="form" :model="formData" :label-width="10">
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
                    <Form-item required>
                          <Select v-model="formData.activityId" placeholder="活动名称" clearable>
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
      
          <div class="table-box box" ref="tableBox">
              <div class="contentTop">
                <exportBtn  class="btn-right" @btnClick="exportExcel" />
              </div>
              <div class="left btn-left">
                  <div class="title">
                    
                    <span class="title-main">生产计划</span>
                    <!-- <Icon type="ios-folder-outline"></Icon> -->
                  </div>
                  <div class="left-top">
                    <div class="code-box">
                      
                        <p class="text-center p-title"><img src="../../assets/image/littleCode.png"><span class=" fs12 color1 ">生成码量</span></p>
                        <p class="text-center code-total"><span class="fs28 color2">{{pageDate.planCodeQuantity}}</span><span class="fs-12">个</span></p>
                    </div>
                    <div class="code-box">
                        <p class="text-center p-title"><img src="../../assets/image/littleFile.png"><span class=" fs12 color1 ">生成码包数</span></p>
                        <p class="text-center code-total"><span class="fs28 color2">{{pageDate.planCodePackageQuantity}}</span><span class="fs-12">个</span></p>
                    </div>
                  </div>
                  <div class="title mt50">
                    <span class="title-main">实际生产</span>
                  </div>
                  <div class="left-bottom">
                      <h4 class="text-center p-title"><img src="../../assets/image/ying.png"><span>印刷厂</span></h4>
                      <div class="left-bottom-main">
                          <div>
                              <span class="text-center fs12 color1 block">已印刷码量</span>
                              <p class="text-center code-total"><span class="fs28 color2">{{pageDate.prodPrintCodeQuantity}}</span><span class="fs-12">个</span></p>
                          </div>
                          <div>
                              <span class="text-center fs12 color1 block">已印刷码包数</span>
                              <p class="text-center code-total"><span class="fs28 color2">{{pageDate.prodPrintCodePackageQuantity}}</span><span class="fs-12">个</span></p>
                          </div>
                          <div>
                              <span class="text-center fs12 color1 block">印刷耗损量</span>
                              <p class="text-center code-total"><span class="fs28 color3">{{pageDate.printScrapQuantity}}</span><span class="fs-12">个</span></p>
                          </div>
                      </div>
                  </div>
                  <div class="left-bottom">
                      <!-- <h4 class="text-center"><img src="../../assets/image/littleFile.png">罐装厂</h4> -->
                      <h4 class="text-center p-title"><img src="../../assets/image/guan.png"><span>罐装厂</span></h4>
                      <div class="left-bottom-main">
                          <div>
                              <span class="text-center fs12 color1 block">已包装码量</span>
                              <p class="text-center code-total"><span class="fs28 color2">{{pageDate.prodPackCodeQuantity}}</span><span class="fs-12">个</span></p>
                          </div>
                          <div>
                              <span class="text-center fs12 color1 block">已包装码包数</span>
                              <p class="text-center code-total"><span class="fs28 color2">{{pageDate.prodPackCodePackageQuantity}}</span><span class="fs-12">个</span></p>
                          </div>
                          <div>
                              <span class="text-center fs12 color1 block">包装耗损量</span>
                              <p class="text-center code-total"><span class="fs28 color3">{{pageDate.packScrapQuantity}}</span><span class="fs-12">个</span></p>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="right btn-left">
                  <div class="title">
                    <span class="title-main">活动情况</span>
                  </div>
                  <div class="right-top">
                      <div class="code-box">
                          <p class="p-title">
                              <img src="../../assets/image/5.png">
                              <span class="fs12 color1">已激活码量</span>
                              <span class="fs28 color2">{{pageDate.alreadyActivateCodeQuantity}}</span>
                              <span class="fs12 color1">个</span>
                          </p>
                          <p class="p-title">
                              <img src="../../assets/image/7.png">
                              <span class="fs12 color1">已激活码包数</span>
                              <span class="fs28 color2">{{pageDate.alreadyActivateCodePackageQuantity}}</span>
                              <span class="fs12 color1">个</span>
                          </p>
                          <p class="p-title">
                              <img src="../../assets/image/9.png">
                              <span class="fs12 color1">已扫码量</span>
                              <span class="fs28 color2">{{pageDate.alreadyScanQuantity}}</span>
                              <span class="fs12 color1">个</span>
                          </p>
                      </div>
                      <div class="code-box">
                          <p class="p-title">
                              <img src="../../assets/image/6.png">
                              <span class="fs12 color1">未激活码量</span>
                              <span class="fs28 color3">{{pageDate.notActivateCodeQuantity}}</span>
                              <span class="fs12 color1">个</span>
                          </p>
                          <p class="p-title">
                              <img src="../../assets/image/8.png">
                              <span class="fs12 color1">未激活码包数</span>
                              <span class="fs28 color3">{{pageDate.notyActivateCodePackageQuantity}}</span>
                              <span class="fs12 color1">个</span>
                          </p>
                          <p class="p-title">
                              <img src="../../assets/image/10.png">
                              <span class="fs12 color1">未扫码数量</span>
                              <span class="fs28 color3">{{pageDate.notScanQuantity}}</span>
                              <span class="fs12 color1">个</span>
                          </p>
                      </div>
                  </div>
                  <div class="title mt50">
                    <span class="title-main">累计提现金额</span>
                  </div>
                  <div class="total-amount text-center">
                      <span class="fs28 color4">{{pageDate.totalGet}}</span>
                      <span class="fs12 color1">元</span>
                  </div>
                  <div class="right-bottom">
                      <div class="right-bottom-main">
                          <div>
                            <p class="text-center p-title"><img src="../../assets/image/13.png"><span class=" fs12 color1 ">折扣总金额</span></p>
                              <p class="text-center code-total"><span class="fs28 color2">{{pageDate.totalDiscount}}</span><span class="fs-12">元</span></p>
                          </div>
                          <div>
                            <p class="text-center p-title"><img src="../../assets/image/14.png"><span class=" fs12 color1 ">待提现</span></p>
                              <p class="text-center code-total"><span class="fs28 color2">{{pageDate.waitGet}}</span><span class="fs-12">元</span></p>
                          </div>
                          <div>
                              <p class="text-center p-title"><img src="../../assets/image/15.png"><span class=" fs12 color1 ">提现中</span></p>
                              <p class="text-center code-total"><span class="fs28 color2">{{pageDate.geting}}</span><span class="fs-12">元</span></p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import exportBtn from "../../components/Button/export-btn.vue";
export default {
  name:"scavenging-code-condition-keepAlive",

  data() {
    return {
      formData: {
        brandId: "",
        groupId: "",
        activityId: ""
      },
      // pageDate: {
      //   alreadyActivateCodePackageQuantity: 0,
      //   alreadyActivateCodeQuantity: 0,
      //   alreadyScanQuantity: 0,
      //   geting: 0,
      //   notActivateCodeQuantity: 0,
      //   notScanQuantity: 0,
      //   notyActivateCodePackageQuantity: 0,
      //   packScrapQuantity: 0,
      //   planCodePackageQuantity: 0, //生成码包数
      //   planCodeQuantity: 0, //生成码量
      //   printScrapQuantity: 0,
      //   prodPackCodePackageQuantity: 0,
      //   prodPackCodeQuantity: 0,
      //   prodPrintCodePackageQuantity: 0,
      //   prodPrintCodeQuantity: 0,
      //   totalDiscount: 0,
      //   totalGet: 0,
      //   waitGet: 0
      // },
      pageDate: {
        alreadyActivateCodePackageQuantity: "计算中",
        alreadyActivateCodeQuantity: "计算中",
        alreadyScanQuantity: "计算中",
        geting: "计算中",
        notActivateCodeQuantity: "计算中",
        notScanQuantity: "计算中",
        notyActivateCodePackageQuantity: "计算中",
        packScrapQuantity: "计算中",
        planCodePackageQuantity: "计算中", //生成码包数
        planCodeQuantity: "计算中", //生成码量
        printScrapQuantity: "计算中",
        prodPackCodePackageQuantity: "计算中",
        prodPackCodeQuantity: "计算中",
        prodPrintCodePackageQuantity: "计算中",
        prodPrintCodeQuantity: "计算中",
        totalDiscount: "计算中",
        totalGet: "计算中",
        waitGet: "计算中"
      },
      brandList: [],
      groupList: [],
      activityList: [],
      once: false
    };
  },
  components: { exportBtn },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.once = true;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  methods: {
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      // showAllInformationExport
      var url = this.Global.getExportUrl(
        "codepackage/showAllInformationExport.json",
        data
      );
      window.open(url);
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
      this.page = 1;
      this.init();
    },

    init() {
      this.resetData();
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);

      //获取生产计划 活动情况数据
      this.Global.doPost("codepackage/queryCodePack.json", data, res => {
        this.pageDate.planCodeQuantity = res[0].planCodeQuantity || 0; //生成码量
        this.pageDate.planCodePackageQuantity =
          res[0].planCodePackageQuantity || 0; //生成码包数

        this.pageDate.alreadyActivateCodeQuantity =
          res[0].alreadyActivateCodeQuantity || 0; //已激活码量
        this.pageDate.alreadyActivateCodePackageQuantity =
          res[0].alreadyActivateCodePackageQuantity || 0; //已激活码报数
        // this.pageDate.alreadyScanQuantity = res[0].alreadyScanQuantity || 0; //已扫码量

        this.pageDate.notActivateCodeQuantity =
          res[0].notActivateCodeQuantity || 0; //未激活码量
        // this.pageDate.notScanQuantity = res[0].notScanQuantity || 0; //未扫码量
        this.pageDate.notyActivateCodePackageQuantity =
          res[0].notyActivateCodePackageQuantity || 0; //未激活码包数
      });
      // 已扫码量  为扫码量 接口
      this.Global.doPost(
        "codepackage/queryCodePackOfNotScan.json",
        data,
        res => {
          // console.log(res)
          this.pageDate.notScanQuantity = res.notScanQuantity || 0; //未扫码量
          this.pageDate.alreadyScanQuantity = res.alreadyScanQuantity || 0; //已扫码量
        }
      );
      // 实际生产印刷厂数据
      this.Global.doPost("codepackage/queryPrint.json", data, res => {
        this.pageDate.printScrapQuantity = res[0].printScrapQuantity || 0; //印刷耗损量
        this.pageDate.prodPrintCodePackageQuantity =
          res[0].prodPrintCodePackageQuantity || 0; //已印刷码包数
        this.pageDate.prodPrintCodeQuantity = res[0].prodPrintCodeQuantity || 0; //已印刷码量
      });
      //实际生产罐装厂数据
      this.Global.doPost("codepackage/queryPack.json", data, res => {
        this.pageDate.packScrapQuantity = res[0].packScrapQuantity || 0; //罐装耗损量
        this.pageDate.prodPackCodePackageQuantity =
          res[0].prodPackCodePackageQuantity || 0; //已包装码包数
        this.pageDate.prodPackCodeQuantity = res[0].prodPackCodeQuantity || 0; //已包装码量
      });
      //提现金额
      this.Global.doPost("codepackage/queryMoney.json", data, res => {
        this.pageDate.geting = res[0].geting || 0; //提现中
        this.pageDate.totalDiscount = res[0].totalDiscount || 0; //折扣总金额
        this.pageDate.totalGet = res[0].totalGet || 0; //累计提现金额
        this.pageDate.waitGet = res[0].waitGet || 0; //待提现
      });
    },
    resetData() {
      this.pageDate = {
        alreadyActivateCodePackageQuantity: "计算中",
        alreadyActivateCodeQuantity: "计算中",
        alreadyScanQuantity: "计算中",
        geting: "计算中",
        notActivateCodeQuantity: "计算中",
        notScanQuantity: "计算中",
        notyActivateCodePackageQuantity: "计算中",
        packScrapQuantity: "计算中",
        planCodePackageQuantity: "计算中", //生成码包数
        planCodeQuantity: "计算中", //生成码量
        printScrapQuantity: "计算中",
        prodPackCodePackageQuantity: "计算中",
        prodPackCodeQuantity: "计算中",
        prodPrintCodePackageQuantity: "计算中",
        prodPrintCodeQuantity: "计算中",
        totalDiscount: "计算中",
        totalGet: "计算中",
        waitGet: "计算中"
      };
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
            //只有当页面第一次进来的时候会调用
            if (this.once) {
              this.init();
              this.once = false;
            }
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
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    }
  }
};
</script>


