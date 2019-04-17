
<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  padding: 15px;
}
.footerBottun {
  position: fixed;
  bottom: 15px;
  width: 70%;
}
.box {
  // position: relative;
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
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">返利活动设置</h2> -->
        <div class="box">
            <!-- 店铺信息 -->
            <Form :model="formData" label-position="left" :label-width="72">
            <div class="form-title">店铺信息</div>
            <div id="shopInfor">
                <div class='child'>                     
                         <Row>
                            <Col span="6">
                                <FormItem label="客户编号：">
                                    <span>{{formData.joinCode}}</span>
                                </FormItem>  
                                <FormItem label="手机号码：">
                                    <span>{{formData.phone | phoneFormat}}</span>
                                </FormItem> 
                                <FormItem label="线路编号：">
                                     <span>{{formData.salesRoute}}</span>
                                </FormItem> 
                                                                                              
                            </Col>
                            <Col span="6"  >
                                <FormItem label="店铺ID：">  
                                    <span>{{formData.storeId}}</span>
                                </FormItem>
                                <FormItem label="地 址：">
                                    <span>{{formData.address}}</span>
                                </FormItem> 
                                                                                                                            
                            </Col>
                            <Col span="6">
                                <FormItem label="店铺名称：">
                                    <span>{{formData.storeName}}</span>
                                </FormItem>
                                <FormItem label="业代姓名：">
                                    <span>{{formData.workerName}}</span>
                                </FormItem>  
                                                                                               
                            </Col>
                            <Col span="6"  >
                                <FormItem label="姓名：">  
                                    <span>{{formData.name}}</span>
                                </FormItem>
                                <FormItem label="业代手机：">
                                    <span>{{formData.workerPhone | phoneFormat}}</span>
                                </FormItem>                              
                            </Col>                            
                        </Row>                    
                </div>
            </div>
            
            </Form>
        </div>    
    </div>
</template>

<script>
import upData from "../../assets/js/upload.js";
import PROJECT_CONFIG from "../../util/config.js";
export default {
  name:"rebate-setting-keepAlive",

  data() {
    return {
      formData: {
          
      },
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }]
      },
    };
  },
  created() {
  },
  mounted() {
  },
  watch: {
  },
  methods: {
  },
  filters: {
    statusFilter(val) {
      let statu = Number(val);
      if (statu == 0) {
        return "未审核";
      } else if (statu == 1 || statu == 1001 || statu == 2001) {
        return "通过";
      } else if (statu == 2 || statu == 1002) {
        return "不通过";
      } else if (statu == 3 || statu == 1003) {
        return "退回";
      }else if(statu == -1){
        return '未上传'
      }
    },
    phoneFormat(val) {
      var reg = /^(\d{3})(\d{4})(\d{4})$/;
      var matches = reg.exec(val);
      if (matches) {
        return `${matches[1]}-${matches[2]}-${matches[3]}`;
      } else {
        return val;
      }
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd");
    }
  }
};
</script>