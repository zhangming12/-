<style lang="less" scoped>
@import "../../config/index.less";
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
.export {
  height: 24px;
  position: relative;
  div {
    border: 1px solid @primary-color;
    padding: 3px 12px;
    float: right;
    border-bottom: 0;
    position: absolute;
    right: 1px;
    bottom: -1px;
    color: @primary-color;
    cursor: pointer;
    i {
      margin-right: 2px;
    }
  }
}
//下载二维码
.qrCode {
  position: absolute;
  padding: 20px 20px 5px;
  right: -20px;
  top: 40px;
  border: 1px solid #cccccc;
  background: white;
  border-radius: 8px;
  z-index: 1000;
  width: 160px;
  .brandBox {
    width: 100%;
    margin-bottom: 10px;
  }
  div#img {
    display: block;
    width: 120px;
    height: 120px;
  }
  span {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    border-radius: 50%;
    top: 0;
    right: 0;
    border: 1px solid black;
    text-align: center;
    background: #666666;
    cursor: pointer;
  }
  a {
    display: block;
    width: 100%;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background: #00cc66;
    color: white;
    font-size: 16px;
    margin-top: 15px;
    border-radius: 4px;
  }
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">工厂人员二维码绑定操作</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="80">
                <Row>
                    <Col span="21"> 
                      <Row>
                        <Col span="14">
                          <Form-item label="绑定时间:">
                            <Row>
                              <Col span="11">
                                  <Form-item prop="queryStartTime">
                                    <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                                  </Form-item>
                              </Col>
                              <Col span="2" style="text-align: center;">至</Col>
                              <Col span="11">
                                  <Form-item prop="queryEndTime">
                                      <data-range placeholder="结束时间" hour="24:00" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                                  </Form-item>
                              </Col>
                            </Row>
                          </Form-item>
                          <Form-item label="昵称:" prop="wxNickName">
                            <Input v-model.trim="formData.wxNickName" placeholder="请输入昵称"></Input>
                          </Form-item>
                        </Col> 
                        <Col span="9">
                            <Form-item label="品牌名称:" prop="brandId" >
                                <Select v-model="formData.brandId" placeholder="请选择">
                                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                                </Select>
                            </Form-item>
                        </Col> 
                      </Row>                      
                        
                    </Col>
                    
                    <Col span='2' offset='1'>
                        <Button @click="submit" type="primary" style="margin-left:20px;">查询</Button>
                        <Button @click="showCode" type="info" style="margin:10px 20px;" v-if="!qrCodeIsShow">查看二维码</Button>
                        <div class="qrCode" v-show="qrCodeIsShow">
                            <div class="brandBox">
                              <Select v-model="codeData.brandId" placeholder="请选择" @on-change='createImage'>
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                              </Select>
                            </div>
                            <div ref="img" id="img"></div>
                            <span @click="closeCode">X</span>
                            <a :href="codeUrl" download="qrCode">下载</a>
                        </div>
                    </Col>
                    <Col span="9">
                        
                    </Col>
                    
                </Row>
            </Form>
      </div>
      <div class="box" style="margin-top: 30px;padding-bottom:20px">
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME} from "@/util/index.js"; //搜索条件默认时间
import area from "@/config/china_code_data.js";
//生成二维码插件
import QRCode from "qrcodejs2";
export default {
  name:"factory-personnel-management-keepAlive",

  data() {
    return {
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      codeUrl: "",
      areaData: area,
      qrCodeIsShow: true,
      isShow: false, //是否显示模态框
      formData: {
        areaCode: [],
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        wxNickName: "",
        brandId: ""
      },
      codeData: {
        brandId: ""
      },
      qrcode: null,
      columns1: [
        {
          title: "品牌名称",
          key: "brandName",
          align: "center"
        },
        {
          title: "绑定时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "昵称",
          key: "wxNickName",
          align: "center"
        },
        {
          title: "工厂人员ID",
          key: "staffId",
          align: "center"
        },
        {
          title: "省",
          key: "provName",
          align: "center"
        },
        {
          title: "市",
          key: "cityName",
          align: "center"
        },
        {
          title: "区",
          key: "areaName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该员工？",
                        onOk: () => {
                          let sendData = {
                            id: params.row.id
                          };
                          this.Global.doPost(
                            "brandStaff/deleteBrandStaff.json",
                            sendData,
                            res => {
                              this.$Message.success("删除成功");
                              this.init();
                            }
                          );
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      pageData: [],
      storeId: "",
      brandList: [],
      codeSrc: ""
    };
  },
  components: {
    dataRange
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formItem.brandId = this.brandList[0].id;
        this.codeData.brandId = this.brandList[0].id;
        this.init();
        this.createImage();
      }
    });
  },
  methods: {
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
    endTimeChange(value) {
      this.end.hour = value.hour;
      this.end.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryEndTime = this.Global.setHoursData(value.time, value.hour);
    },
    createImage() {
      //生成二维码
      let img = document.getElementById("img");
      img.innerHTML = "";
      this.qrcode = new QRCode(img, {
        text: `https://hzhuihe.cn/plant?brandId=${
          this.codeData.brandId
        }&userType=FS`,
        width: 120,
        height: 120,
        render: "canvas",
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      var canvasList = img.getElementsByTagName("canvas")[0];
      this.codeUrl = canvasList.toDataURL("image/png");
    },
    showCode() {
      this.qrCodeIsShow = true;
    },
    closeCode() {
      this.qrCodeIsShow = false;
    },
    dataChange(val) {
      this.formData.queryEndTime = val.slice(0, 11) + "23:59:59";
    },
    init() {
      let data = this.Global.JsonChange(this.formData);
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
      // delete data["brandId"];
      this.Global.doPost("brandStaff/queryBrandFactoryList.json", data, res => {
        this.pageData = res.datalist;
      });
    },
    submit() {
      this.init();
    }
  }
};
</script>