
<style lang="less" scoped>
@import "../../../config/index.less";
#Main {
  padding: 15px;
}

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  overflow: hidden;
  .form-title {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    font-weight: 600;
    padding-left: 10px;
    border-left: 3px solid @primary-color;
    margin-bottom: 10px;
  }
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
// 陈列视频
// #displayViedo{
//     margin-top: 10px;
//     overflow: hidden;
//     .title{
//         display: inline-block;
//         float: left;
//         height: 150px;
//         line-height: 150px;
//     }

#imgBox {
  height: 150px;
  margin-right: 20px;
  display: table;
  float: left;
  .changeImg {
    width: 300px;
    height: 200px;

    display: table-cell;
    vertical-align: middle;
    border: 1px solid #efefef;
    img {
      width: 100%;
      height: 200px;
      display: block;
    }
  }
}
#container {
  // width: 100%;
  height: 200px;
  margin-right: 20px;
}
.img-span {
  display: inline-block;
  width: 210px;
  text-align: center;
  padding-top: 4px;
  margin-left: 20px;
}

// }
// 近期扫码量
#nearScanQuantity {
  margin-top: 10px;
  overflow: hidden;
  .title {
    display: inline-block;
    // float: left;
    height: 120px;
    line-height: 120px;
  }
  .scanbox {
    float: left;
    margin-left: 6px;
    .nearScan {
      overflow: hidden;
      .scan {
        float: left;
        width: 100px;
        height: 120px;
        text-align: center;
        margin: 10px;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
        .num {
          color: @primary-color;
          padding-top: 20px;
          font-size: 12px;
          font-weight: 600;
          height: 56px;
        }
        .month {
          padding-top: 30px;
          font-size: 16px;
        }
      }
      .scanCount {
        width: 130px;
      }
    }
  }
}
//店铺信息
#shopInfor {
  margin-top: 10px;
  overflow: hidden;
  .title {
    display: inline-block;
    height: 228px;
    line-height: 228px;
  }
  .child {
    width: 95%;
    float: left;
    margin-left: 20px;
    .Input {
      display: inline-block;
      .ivu-input {
        width: 300px;
        padding: 1px 7px;
        height: 52px;
        border-radius: 3px;
        text-align: center;
      }
    }
    .ivu-radio-group-vertical .ivu-radio-wrapper {
      display: inline;
    }
  }
  .ivu-form-item {
    margin-bottom: 0;
  }
  .clickPlay {
    color: @primary-color;
    cursor: pointer;
  }
}

//审核意见
#examine {
  margin-top: 10px;
  overflow: hidden;
  .title {
    width: 110px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
  #examine-left {
    width: 100%;
    .ivu-radio-group-vertical .ivu-radio-wrapper {
      display: inline;
      margin-left: 10px;
    }
  }

  #examine-right {
    margin: 4px;
    margin-top: 10px;
    margin-left: 20px;
    padding: 14px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    width: 400px;
    span {
      display: block;
    }
  }
  #displayMemo {
    margin-top: 20px;
    span {
      display: inline-block;
    }
  }
}

footer {
  text-align: center;
  margin: 40px 0 20px;
  .btn-save {
    color: #fff;
    background-color: @primary-color;
    border-color: @primary-color;
    padding: 5px 15px;
    cursor: pointer;
  }
}
.groupStyle {
  color: @primary-color;
  span {
    font-size: 14px;
    font-weight: 600;
  }
}
.heightBox {
  padding-left: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-right: 40px;
  margin-bottom: 10px;
  overflow: auto;
}
.contentBox {
  overflow: hidden;
  .contentTitle {
    float: left;
    width: 100px;
  }
  .contentDesc {
    // float: left;
    margin-left: 100px;
  }
}
.color-orange {
  color: @primary-color;
}
textarea.ivu-input {
  height: 100px;
  min-height: 100px;
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title"  v-if=" examineType == 'director' ">初审查报详情</h2>
        <h2 class="Title" v-else-if=" examineType == 'department' ">复审查报详情</h2>         -->
        <div class="box">
            <!-- 店铺信息 -->
            <Form :model="formData" label-position="left" :label-width="90">
            <div class="form-title">基本信息</div>
            <div id="shopInfor">
                <div class='child'>                     
                    <Row>
                        <Col span="6">
                            <FormItem label="客户编号：">  
                                <span>{{formData.joinCode}}</span>
                            </FormItem>
                            
                                                                                                                                                                                        
                        </Col>
                        <Col span="6"  >
                            <FormItem label="客户姓名：">
                                <span>{{formData.name }}</span>
                            </FormItem> 
                            
                                                                                                                                                                                         
                        </Col>
                        <Col span="6">
                            <FormItem label="营业部：">  
                                <span>{{formData.busiDept}}</span>
                            </FormItem>                                                                                                                          
                        </Col>
                        <Col span="6"  >                            
                            <FormItem label="销售大区：">
                                <span>{{formData.salesRegion}}</span>
                            </FormItem>                                                                                           
                        </Col>                                                                 
                        <Col span="6"  >
                            <FormItem label="客户名称：">
                                <span>{{formData.name}}</span>
                            </FormItem>                            
                        </Col> 
                        <Col span="6"  >                            
                            <FormItem label="客户电话：">
                                <span>{{formData.phone | phoneFormat}}</span>
                            </FormItem> 
                        </Col>   
                        <Col span="12"  >
                            <FormItem label="地址详情：">
                                <span>{{formData.address}}</span>
                            </FormItem>                             
                        </Col> 
                        <Col span="6"  >
                            <FormItem label="地域性质：">
                                <span>{{formData.regionProp}}</span>
                            </FormItem> 
                            <FormItem label="客户状态：">
                                <span>{{formData.storeStatus | protocolStoreStatusFilters}}</span>
                            </FormItem>                                                          
                        </Col> 
                        <Col span="6"  >
                            <FormItem label="客户性质：">
                                <span>{{formData.storeNature}}</span>
                            </FormItem>   
                            <FormItem label="销售线路号：">
                                <span>{{formData.salesRoute}}</span>
                            </FormItem>                                                      
                        </Col> 
                        <Col span="6"  >
                            <FormItem label="BAP渠道：">
                                <span>{{formData.bapChannel}}</span>
                            </FormItem> 
                            <FormItem label="业代姓名：">
                                <span>{{formData.workerName}}</span>
                            </FormItem>                                                         
                        </Col> 
                        <Col span="6"  >
                            <FormItem label="子渠道：">
                                <span>{{formData.subChannel}}</span>
                            </FormItem> 
                            <FormItem label="业代手机：">
                                <span>{{formData.workerPhone | phoneFormat}}</span>
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
                            <Col span="6">
                                <div id="container" style="    margin-right: 20px;">
                                    
                                </div>
                                <span class="img-span">定位</span>
                            </Col>
                        </Col>                                                                                                            
                    </Row>                    
                </div>
            </div>
            <div class="form-title">协议内容</div>
            <div id="shopInfor">
                <div class='child'>                     
                    <Row>
                        <Col span="6">
                            <FormItem label="签约属性：">  
                                <span>{{formData.signAttr}}</span>
                            </FormItem>                                                                                                                                                                                         
                        </Col>
                        <Col span="6"  >
                            <FormItem label="协议类型：">
                                <span>{{formData.protClass}}</span>
                            </FormItem>                                                                                                                                                                                      
                        </Col>
                        <Col span="6">
                            <FormItem label="冷饮设备：">  
                                <span>{{formData.isCorpFreezer | protocolCorpFreezerFilters}}</span>                                
                            </FormItem>                                                                                              
                        </Col>
                        <Col span="6"  >
                            <FormItem label="考核冰柜：">
                                <span>{{formData.checkFreezer | protocolCheckFreezerFilters}}</span>
                            </FormItem>                                                               
                        </Col> 
                        <Col span="6"  >
                            <FormItem label="汽水授权销售：" :label-width="100">
                                <span>{{formData.isSodaSales | protocolIsSodaSalesFilters}}</span>
                            </FormItem>                                                               
                        </Col> 
                        <Col span="18">
                            <FormItem label="折扣门槛：" :label-width="80">
                                <span>{{awardPremise}}</span>
                            </FormItem>                                                               
                        </Col>                                                                                                         
                        <Col span="12" style="    padding-top: 10px;">
                            <!-- <FormItem label="三项协议：（合计：4项）" :label-width="100">                                   
                                <div class="heightBox" style="height: 98px;">
                                    <div>123</div>
                                </div>
                            </FormItem> -->
                            <div class="contentBox">
                                <div class="contentTitle">
                                    <div>三项协议：</div>
                                    <div>(合计：<span class="color-orange">{{protContentsCount?protContentsCount:0}}</span>项)</div>                                    
                                </div>
                                <div class="contentDesc">
                                    <div class="heightBox" style="height: 98px;">
                                        <div v-for="(value, key, index) in protContentsContent" key="index">{{value.indexNum}}：{{value.itemValue}}</div>
                                    </div>
                                </div>
                            </div>                                                        
                            <div class="contentBox">
                                <div class="contentTitle">
                                    <div>SKU铺货目标：</div>
                                    <div>(合计：<span class="color-orange">{{displaySignSkuRuleCount}}</span>个)</div>                                    
                                </div>
                                <div class="contentDesc">
                                    <div class="heightBox" style="height: 244px;">                                        
                                        <div v-for="(value, key, index) in displaySignSkuRuleContent" key="index">{{key}}：<span class="color-orange">{{value}}</span>  </div>
                                    </div>
                                </div>
                            </div> 
                            <FormItem label="客户货架排面及SKU数：" :label-width="100">                                   
                                <div class="heightBox" style="height: 96px;line-height: 25px;">{{faceRequire}}</div>
                            </FormItem>
                            <FormItem label="备注：" :label-width="100">                                   
                                <div class="heightBox" style="height: 100px;">
                                    <div>{{memo}}</div>
                                </div>
                            </FormItem>                                                                                                 
                        </Col> 
                        <Col span="12" style="padding-top: 10px;">
                            <FormItem label="二次陈列：" :label-width="100">                                   
                                <div class="heightBox" style="height: 44px;line-height: 42px;">
                                    <div>{{secondDisplay | protocolSecDisplayFilters}}</div>
                                </div>
                            </FormItem> 
                            <FormItem label="纯悦割箱数：" :label-width="100">                                   
                                <div class="heightBox" style="height: 44px;line-height: 42px;">                                    
                                    <div><span class="color-orange">{{iceDewNum}}</span>组</div>
                                </div>
                            </FormItem> 
                           
                            <div class="contentBox">
                                <div class="contentTitle">
                                    <div>月销售目标：</div>
                                    <div>(非水分品类)</div>
                                    <div>(合计：<span class="color-orange">{{salesTargetsCount}}</span>箱)</div>                                    
                                </div>
                                <div class="contentDesc">
                                    <div class="heightBox" style="height: 120px;">
                                        <div v-for="(value, key, index) in salesTargetsGoods" key="index">{{key | salesTargetsGoodsFilters}}：<span class="color-orange">{{value}}</span>  </div>                                        
                                    </div>
                                </div>
                            </div>                             
                            <div class="contentBox">
                                <div class="contentTitle">
                                    <div>奖励产品：</div>                                   
                                    <div>(合计：<span class="color-orange">{{signPresentCount}}</span>箱)</div>                                    
                                </div>
                                <div class="contentDesc">
                                    <div class="heightBox" style="height: 114px;">
                                        <div v-for="(value, key, index) in signPresentList" key="index">{{value.goodsName}}：<span class="color-orange">{{value.quantity}}</span>箱</div>
                                    </div>
                                </div>
                            </div> 
                            <FormItem label="第一陈列位置：" :label-width="100">                                   
                                <div class="heightBox" style="height: 98px;">
                                    <div>{{displayRequire}}</div>
                                </div>
                            </FormItem>                                                                                                
                        </Col>                                                       
                    </Row>                    
                </div>
            </div>             
            </Form>
            <!-- 陈列视频 -->
            <Row>
                <Col span="12">                     
                    <!-- 审核意见 -->
                    <div class="form-title">审核意见</div>
                    <div id="examine">
                        <div>
                            <span class="title"  style="width: 115px;">当前状态：</span>
                            <div id="examine-left"  style="height: 30px;line-height: 30px;">
                                {{currentState | protocolStatusFilters }}                           
                            </div>  
                        </div>
                        <div v-show="examineStatus !== 'look'">
                            <span class="title" >审核状态：</span>
                            <div id="examine-left">
                                <RadioGroup v-model="signCheckStatus" vertical class="radio" v-if="examineType == 'director'">
                                    <Radio label="1001">审核通过</Radio>
                                    <Radio label="3">退回重签</Radio>
                                    <Radio label="2">不通过</Radio>
                                </RadioGroup>
                                <RadioGroup v-model="signCheckStatus" vertical class="radio"  v-else-if=" examineType == 'department' ">
                                    <Radio label="1">审核通过</Radio>
                                    <Radio label="3">退回重签</Radio>
                                    <Radio label="2">不通过</Radio>
                                </RadioGroup>                            
                            </div>  
                        </div>
                                                                                              
                        <div id="displayMemo">
                            <span  style="width: 115px;">审核意见：</span>
                            <Input v-model="checkMessage" type="textarea" placeholder="请填写审核意见" :autosize="{minRows: 2,maxRows: 7}" style="width:380px"></Input>
                        </div>
                    </div>
                </Col>                 
            </Row>    
            <footer>
                <Button type="success" class="btn-back" @click="handleBack">返回</Button>
                <Button type="primary" class="btn-back"    v-show="examineStatus !== 'look'" @click="handlelevelExamine" style="margin-left:30px;">确定</Button>
            </footer>            
        </div>    
    </div>
</template>

<script>
import {
  getBrandStoreSignDetialInfo,
  brandStoreSignFirstAudit,
  brandStoreSignSecondAudit
} from "@/api/yellow-gold-protocol/protocol-examine.js";

import {
  protocolCheckFreezer, //冷饮设备
  protocolCorpFreezer, //考核冰柜
  protocolSecondDisplay, //三项协议5（二次陈列）
  salesTargetsGoods, //月销售目标
  protocolStatus,
  protocolStoreStatus, //客户状态
  protocolSecDisplay, //二次陈列
  protocolIsSodaSales //汽水销售权
} from "@/util/ENUMS.js";

export default {
  name:"protocol-report-examine",

  data() {
    return {
      vertical: 0,
      examineType: null,
      examineStatus: null,
      formData: {},
      currentState: "", //当前状态
      signCheckStatus: "", //审核状态
      checkMessage: "", //意见反馈
      protContentsContent: null, //三项协议内容
      protContentsCount: null, //三项协议项数量
      displaySignSkuRuleContent: null, //SKU铺货目标
      displaySignSkuRuleCount: null, //SKU铺货目标数量
      faceRequire: null, // 客户货架排面及SKU数
      memo: null, //备注
      secondDisplay: null, //二次陈列
      iceDewNum: null, //纯悦割箱数
      salesTargetsGoods: null, //月销售目标
      salesTargetsCount: null, //月销售目标数量
      displayRequire: null, //第一陈列集中位置
      signPresentList: null, //奖励产品
      signPresentCount: null, //奖励产品数量
      awardPremise: null, //奖励门槛
      storeImage: null //门头照
    };
  },
  created: function() {},
  mounted() {
    var examineType = this.$route.query.examineType; //审核级别 director主任一审  department二审
    var examineStatus = this.$route.query.examineStatus; //审核状态 look查看 examine审核
    this.examineType = examineType;
    this.examineStatus = examineStatus;
    var queryParams = this.$route.query;
    console.log(queryParams);
    var id = this.$route.query.id;
    if (id) {
      let params = {
        id
      };
      this.activityDetail(params);
    }
  },
  watch: {},
  methods: {
    mapLation(local, local1) {
      console.log(local, local1);
      var map = new BMap.Map("container"); // 创建地图实例
      // var point = new BMap.Point(30.263576483438225,120.14146936886479);  // 创建点坐标
      var point = new BMap.Point(local, local1); // 创建点坐标
      map.centerAndZoom(point, 15);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
    },
    activityDetail: function(queryParams) {
      if (queryParams) {
        getBrandStoreSignDetialInfo(queryParams).then(res => {
          if (res && res.status === 1) {
            this.formData = res.data;

            if (res.data.protList) {
              //三项协议
              this.protContentsContent = res.data.protList;
              this.protContentsCount = res.data.protCount;
            }
            if (res.data.displaySignSkuRule) {
              let displaySignSkuRule = res.data.displaySignSkuRule.list;
              for (const key in displaySignSkuRule) {
                displaySignSkuRule[key] = displaySignSkuRule[key].join("、");
              }
              this.displaySignSkuRuleContent = displaySignSkuRule;
              this.displaySignSkuRuleCount = res.data.displaySignSkuRule.count;
            }
            this.faceRequire =
              res.data.faceRequire && res.data.faceRequire.replace(/\|/g, "，"); //客户货架排面及SKU数
            this.memo = res.data.remarks;
            this.secondDisplay =
              res.data.secondDisplay &&
              protocolSecondDisplay[res.data.secondDisplay]; //二次陈列
            this.iceDewNum = res.data.iceDewNum; //    纯悦割箱数
            if (res.data.salesTargets) {
              //月销售目标
              this.salesTargetsGoods = res.data.salesTargets.goodsMap;
              this.salesTargetsCount = res.data.salesTargets.totalSales;
            }
            this.displayRequire =
              res.data.displayRequire &&
              res.data.displayRequire.replace(/\|/g, "，"); //第一陈列集中位置
            if (res.data.signPresentList) {
              //奖励产品
              this.signPresentList = res.data.signPresentList;
              let signPresentCount = 0;
              let signPresentList = res.data.signPresentList;

              for (const key of signPresentList) {
                signPresentCount += key.quantity;
              }
              this.signPresentCount = signPresentCount;
            }
            // this.currentState =JSON.parse(JSON.stringify(res.data.checkStatus))
            this.currentState = res.data.checkStatus; //当前状态
            this.checkMessage = res.data.checkMessage; //审核意见
            this.awardPremise = res.data.awardPremiseMap.message; //奖励门槛
            this.storeImage = res.data.storeImage; //门头照
            let location = res.data.locate && res.data.locate.split(","); //经纬度

            this.mapLation(location[1], location[0]);
          }
        });
      }
    },

    handlelevelExamine() {
      let objList = {
        id: this.formData.id,
        checkStatus: this.signCheckStatus,
        checkMessage: this.checkMessage
      };
      if (!this.signCheckStatus) {
        this.$Message.warning("请选择审核意见");
        return false;
      }
      if (this.signCheckStatus === "3" && !this.checkMessage) {
        this.$Message.warning("请填写审核意见");
        return false;
      }
      if (this.signCheckStatus === "2" && !this.checkMessage) {
        this.$Message.warning("请填写审核意见");
        return false;
      }

      if (this.examineType == "director") {
        //初审
        brandStoreSignFirstAudit(objList).then(res => {
          if (res.status == 1) {
            this.$Message.success("初审成功");
            this.$router.push({ path: "/examineDirector" });
          }
        });
      } else if (this.examineType == "department") {
        //复审
        brandStoreSignSecondAudit(objList).then(res => {
          if (res.status == 1) {
            this.$Message.success("复审成功");
            this.$router.push({ path: "/examineDepartment" });
          }
        });
      }
    },
    handleBack() {
      if (this.examineType == "director") {
        this.$router.push({ path: "/examineDirector" });
      } else if (this.examineType == "department") {
        this.$router.push({ path: "/examineDepartment" });
      }
    }
  },
  filters: {
    phoneFormat(val) {
      var reg = /^(\d{3})(\d{4})(\d{4})$/;
      var matches = reg.exec(val);
      if (matches) {
        return `${matches[1]}-${matches[2]}-${matches[3]}`;
      } else {
        return val;
      }
    },
    protocolCheckFreezerFilters(val) {
      //   考核冰柜
      return protocolCheckFreezer[val];
    },
    protocolCorpFreezerFilters(val) {
      //    冷饮设备
      return protocolCorpFreezer[val];
    },
    ThreeProtocolFilters(val) {
      //
      let ThreeProtocol = {
        "1": "协议一",
        "2": "协议二",
        "3": "协议三",
        "4": "协议四"
      };
      return ThreeProtocol[val];
    },
    salesTargetsGoodsFilters(val) {
      // let salesTargetsGoods={
      //     'Milk':'含乳饮品',
      //     'nutrient':'营养素饮料',
      //     'juice':'果汁',
      //     'soda':'汽水',
      // }
      return salesTargetsGoods[val];
    },
    protocolStatusFilters(val) {
      return protocolStatus[val];
    },
    protocolStoreStatusFilters(val) {
      return protocolStoreStatus[val];
    },
    protocolSecDisplayFilters(val) {
      return protocolSecDisplay[val];
    },
    protocolIsSodaSalesFilters(val) {
      if (!val) {
        return "否";
      }
      return protocolIsSodaSales[val];
    }
  }
};
</script>


