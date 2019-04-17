<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.form-title {
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 600;
  padding-left: 10px;
  border-left: 3px solid @primary-color;
  margin-bottom: 10px;
}

.class-btn {
  text-align: center;
  margin-bottom: 24px;
  overflow: hidden;
  Button {
    width: 70px;
  }
  .cancel {
    background-color: #ffffff;
    color: @primary-color;
  }
}

.ivu-form .ivu-form-item-label {
  padding-right: 4px;
}
#imgBox {
  height: 150px;
  display: table;
  line-height: 150px;
  padding-left: 20px;
  .changeImg {
    width: 210px;
    height: 150px;
    display: table-cell;
    vertical-align: middle;
    border: 1px solid #efefef;
    img {
      width: 210px;
      height: 150px;
      display: block;
    }
  }
}
//申请陈列活动图片
.applyDisplayAct {
  .applyActBox {
    overflow: hidden;
    .applyAct_L {
      min-width: 210px;
      width: 20%;
      float: left;
      #applyImgBox {
        margin-bottom: 10px;
        height: 170px;
        display: table;
        line-height: 170px;
        //padding-left: 20px;
        .changeImg {
          width: 210px;
          height: 170px;
          display: table-cell;
          vertical-align: middle;
          border: 1px solid #efefef;
          img {
            width: 210px;
            height: 170px;
            display: block;
          }
        }
      }
    }

    .applyAct_R {
      width: 80%;
      float: left;
    }
  }

  .ivu-form-item {
    margin-bottom: 0;
  }
}

.img-span {
  display: inline-block;
  width: 210px;
  text-align: center;
  padding-top: 4px;
  margin-left: 20px;
}
//近期扫码量
.nearScanBox {
  overflow: hidden;
  .nearScan {
    float: left;
    margin-left: 20px;
    .scanBox {
      width: 100px;
      height: 120px;
      text-align: center;
      margin: 4px;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
      .num {
        color: @primary-color;
        padding-top: 20px;
        font-size: 15px;
        font-weight: 600;
        height: 56px;
      }
      .month {
        padding-top: 30px;
        font-size: 16px;
      }
    }
  }
}
.customerInfor {
  .ivu-form-item {
    margin-bottom: 0;
  }
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">审核详情</h2> -->
      <div class="box"> 
            <Form ref="formData" :label-width="1" :model="formData"> 
                <Row>                
                    <Col span='24' class="customerInfor">
                        <div class="form-title">客户信息</div>
                        <Row>
                            <Col span="4">
                                <FormItem>
                                    <span>客户ID :</span>
                                    <span>{{formData.storeId}}</span>
                                </FormItem>                                
                            </Col>
                            <Col span="4">
                                <FormItem>
                                  <span>姓名 :</span>                                    
                                  <span>{{formData.name}}</span>
                                </FormItem>                                
                            </Col>
                            <Col span="4">
                                <FormItem>
                                    <span>店铺名称 :</span>
                                    <span>{{formData.storeName}}</span>
                                </FormItem>
                            </Col>
                            <Col span="4">
                                <FormItem>
                                  <span>手机号 :</span>
                                    <span>{{formData.phone}}</span>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem>
                                  <span>地址 :</span>
                                    <span>{{formData.address}}</span>
                                </FormItem>
                            </Col>
                            <Col span="6" offset="6">
                                <div id="imgBox">
                                    <div class="changeImg">
                                        <img :src="storeImage" v-if="storeImage">
                                        <img src="../../../assets/image/imgBg.png"  v-else>
                                    </div>  
                                </div>
                                <span class="img-span">门头照</span>
                            </Col>
                            <Col span="12">
                                <div id="imgBox">
                                    <div class="changeImg">
                                        <img :src="businessLicense"  v-if="businessLicense">
                                        <img src="../../../assets/image/imgBg.png"  v-else>
                                    </div>
                                </div>
                                <span class="img-span">营业执照</span>
                            </Col>                            
                        </Row>
                    </Col>
                    <Col span='24'  class="applyDisplayAct">
                        <div class="form-title">申请陈列活动</div>
                        <div class="applyActBox">
                            
                            <div class="applyAct_R">
                                <Row> 
                                    <Col span="6" >
                                        <FormItem>
                                          <span>活动时间 :</span>
                                            <span>{{activityData.activityTime}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6" >
                                        <FormItem>
                                          <span>陈列活动 :</span>                               
                                            <span>{{activityData.activityName}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6" >
                                        <FormItem>
                                          <span>陈列折扣 :</span>
                                            <span v-if="activityData.presentAmount&&activityData.presentType == 1">{{activityData.presentAmount}} 份</span>
                                            <span v-if="activityData.presentAmount&&activityData.presentType == 2">{{activityData.presentAmount}} 元</span>
                                            <span v-if="!activityData.presentAmount">无</span>
                                        </FormItem>                                    
                                    </Col>
                                    <Col span="6" >
                                        <FormItem>
                                          <span>分组名称 :</span>
                                            <span>{{activityData.presentName}}</span>
                                        </FormItem>
                                    </Col>
                                    
                                    <Col span="24">
                                        <div style="width:100%;height:320px;">
                                            <div id="textbox" style="height:300px;"></div>
                                        </div>
                                    </Col>
                                    <Col span="12" style="margin-top:20px;">
                                        <FormItem label="特殊说明：" :label-width="80">                                           
                                            <!-- <div v-for="(item,index) in activityData.specialRemarks" :key="index">{{index+1}}、{{item}}</div> -->
                                            {{activityData.specDesc}}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>   
                    <Col span='11' >
                        <div class="form-title">审核意见</div>
                        <FormItem :label-width="10" prop="displayAuditOpinion">
                            <Input type="textarea" placeholder="请输入意见" v-model="formData.displayApplyAuditOpinion" :rows="5" ></Input>
                        </FormItem>
                    </Col>
                    <Col span="22" class="class-btn" style="padding-top: 24px;">
                        <Button  type="info"   @click="handleCancel">返回</Button>
                        <Button  type="success" style="margin-left:30px" @click="handleDisAgree('formData')" v-if="displayActCategory != 'look'">不同意</Button>
                        <Button  type="primary" style="margin-left:30px" @click="handleAgree" v-if="displayActCategory != 'look'">同意</Button>
                    </Col>
                </Row>
            </Form>
      </div>
      
  </div>
</template>

<script>
import { displayApplyAudit } from "@/api/activity-manage/display-apply-examine.js";
import E from "wangeditor";
export default {
  data() {
    const that = this;
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
      formData: {
        createTime: "",
        goodsName: "",
        userId: "",
        phone: "",
        expressName: "",
        id: "",
        activityName: "",
        winAmount: "",
        realName: "",
        recStatus: "",
        expressNumber: "",
        displayApplyAuditOpinion: "",
        name: ""
      },
      activityData: {},
      page: 1,
      pageNum: 0,
      rule: {
        displayAuditOpinion: [{ required: true, message: "请填写审核意见" }]
      },
      storeImage: "", //门店门头照
      businessLicense: "", //营业执照
      logoUrl: "",
      nearScanNumList: {
        monthScanCode: null,
        oneMonthScanCode: null,
        twoMonthScanCode: null
      }, //近期扫码量
      activityPresentVO: {
        activityTime: "", //活动时间
        activityName: "", //陈列活动
        displayAward: "", //陈列奖励
        displayGroup: "", //分组名称
        ruleText: "", //陈列要求
        displayRule: "", //陈列规则
        specialRemarks: "" //特殊说明
      }, //申请陈列活动
      displayActCategory: null,
      joinTime: "",
      editor: "",
      content: ""
    };
  },
  created() {
    let { activityId, id, storeId } = this.$route.query;
    let queryParams = { activityId, id, storeId };
    if (queryParams) {
      this.activityDetail(queryParams);
    }
    var displayActCategory = this.$route.query.displayActCategory;
    this.displayActCategory = displayActCategory;
   
  },
  mounted() {
    //生成富文本框
    this.$nextTick(() => {
      this.editor = new E("#textbox");
      this.editor.create();
      
      this.editor.txt.html(this.content);
    });
  },
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("表单验证成功!");
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    handleCancel() {
      this.$router.push("/displayApply");
    },
    activityDetail(queryParams) {
      var that = this;
      if (queryParams) {
        this.Global.doPost(
          "display/getDisplayActivityInfo.json",
          queryParams,
          res => {
            that.formData = res;
            this.content = res.content;
            this.editor.txt.html(this.content);
            this.activityData.activityName = res.activityName;
            this.activityData.presentName = res.presentName;
            this.activityData.presentType = res.presentType;
            this.activityData.presentAmount = res.presentAmount;
            this.activityData.activityTime =
              this.Global.formatYearMonth(res.startTime) +
              "-" +
              this.Global.formatYearMonth(res.endTime); //活动时间
            this.activityData.specDesc = res.specDesc;
            // if (res.activityPresentVO) {
            //   that.activityPresentVO.activityTime =
            //     that.Global.formatYearMonth(res.activityPresentVO.startTime) +
            //     "-" +
            //     that.Global.formatYearMonth(res.activityPresentVO.endTime); //活动时间
            //   that.activityPresentVO.activityName = res.activityName; //陈列活动
            //   let winFreq = res.activityPresentVO.winFreq;
            //   let dayCount_DayCount = winFreq.split("-");
            //   let weekName; //周期
            //   if (
            //     dayCount_DayCount[0] == "day" &&
            //     dayCount_DayCount[1] == "7"
            //   ) {
            //     weekName = "周";
            //   } else if (dayCount_DayCount[0] == "month") {
            //     weekName = "月";
            //   } else {
            //     weekName = "天";
            //   }
            //   let minAmount = res.activityPresentVO.minAmount; //最小金额
            //   that.activityPresentVO.displayAward = `${minAmount}元/${weekName}`; //陈列奖励
            //   that.activityPresentVO.displayGroup =
            //     res.activityPresentVO.activityTag; //分组名称
            //   //let ruleTextArrList = res.activityPresentVO.ruleText.split('|');//陈列要求
            //   let ruleTextArrList = res.activityPresentVO.ruleText.replace(
            //     /\|/g,
            //     "\n"
            //   ); //陈列要求

            //   let displayRule = res.activityPresentVO.displayRule.split("|"); //陈列规则
            //   let specialRemarks = res.summary
            //     ? JSON.parse(res.summary).specialRemarks
            //     : "";
            //   specialRemarks = specialRemarks.split("|"); //特殊说明

            //   that.activityPresentVO.ruleText = ruleTextArrList; //陈列要求
            //   that.activityPresentVO.displayRule = displayRule; //陈列要求
            //   that.activityPresentVO.specialRemarks = specialRemarks; //特殊说明
            // }
            this.storeImage = res.storeImage; //门头照
            this.businessLicense = res.businessLicense; //营业执照
            this.logoUrl = res.logoUrl;
            //近期扫码量list
            //that.nearScanNumList.monthScanCode = res.monthScanCode>0?res.monthScanCode:0;//当月
            //that.nearScanNumList.oneMonthScanCode = res.oneMonthScanCode>0?res.oneMonthScanCode:0;//上月
            //that.nearScanNumList.twoMonthScanCode = res.twoMonthScanCode>0?res.twoMonthScanCode:0;//上上月

            this.nearScanNumList.monthScanCode = scanCode(
              res.scanCodeQuantities.monthMap
            );
            this.nearScanNumList.oneMonthScanCode = scanCode(
              res.scanCodeQuantities.oneMonthMap
            );
            this.joinTime = res.scanCodeQuantities.joinTime
              ? this.Global.formatYear(res.scanCodeQuantities.joinTime)
              : null;

            function scanCode(monthMap) {
              if (!monthMap instanceof Object) {
                return "";
              }
              let title = "";
              for (var key in monthMap) {
                if (monthMap[key]) {
                  let joinClass = monthMap[key][0].joinClass;
                  let joinCount = monthMap[key][0].joinCount;
                  let classUnit = monthMap[key][0].classUnit;
                  title += joinClass + joinCount + classUnit + " ";
                }
              }
              title = !!title ? title : 0;
              return title;
            }
          }
        );
      }
    },
    handleAgree(name) {
      let params = {
        displayApplyStatus: 1,
        activityId: this.formData.activityId,
        brandId: this.formData.brandId,
        storeId: this.formData.storeId,
        id: this.formData.id,
        displayAuditOpinion: this.formData.displayApplyAuditOpinion
      };
      displayApplyAudit(params).then(res => {
        if (res.status == 1) {
          this.$router.push({ path: "/displayApply" });
        }
      });
    },
    handleDisAgree(name) {
      let params = {
        displayApplyStatus: 2,
        activityId: this.formData.activityId,
        brandId: this.formData.brandId,
        id: this.formData.id,
        storeId: this.formData.storeId,
        displayAuditOpinion: this.formData.displayApplyAuditOpinion
      };

      if (this.formData.displayApplyAuditOpinion) {
        displayApplyAudit(params).then(res => {
          if (res.status == 1) {
            this.$router.push({ path: "/displayApply" });
          }
        });
      } else {
        this.$Message.error("请填写审核意见!");
      }
    }
  }
};
</script>