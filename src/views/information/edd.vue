<style lang="less" scoped>
#main {
  height: 500px;
  overflow-y: auto;
  #List {
    overflow: hidden;
    #upload {
      width: 90px;
      float: left;
      .add {
        width: 90px;
        height: 90px;
        border-radius: 5px;
        border: 1px dashed #495060;
        text-align: center;
        line-height: 90px;
      }
    }
    .imgList {
      margin-right: 10px;
      width: 90px;
      height: 90px;
      border-radius: 5px;
      border: 1px dashed #495060;
      display: table-cell;
      vertical-align: middle;
      float: left;
      img {
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  #editorElem {
    margin-top: 10px;
    text-align: left;
  }
  footer {
    text-align: center;
    height: 60px;
    line-height: 60px;
    button {
      margin-right: 20px;
    }
  }
  #areaList {
    overflow: hidden;
    span {
      margin-right: 30px;
      vertical-align: middle;
    }
    i {
      font-size: 16px;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  video {
    width: 300px;
    height: 180px;
  }
}
</style>

<template>
    <div id="main">
        <Form ref="form" :model="formData" :label-width="80" :rules="rule">
            <Row>
                <Col span="14">
                  <Form-item label="时间" required>
                      <Row>
                        <Col span="11">
                            <Form-item prop="startTime">
                              <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.startTime" start></data-range>
                            </Form-item>
                        </Col>
                        <Col span="2" style="text-align: center;">至</Col>
                        <Col span="11">
                            <Form-item prop="endTime">
                                <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="formData.endTime"></data-range>
                            </Form-item>
                        </Col>
                    </Row>
                  </Form-item>
                  <Form-item label="资讯标题" prop="bannerTitle">
                      <Input v-model.trim="formData.bannerTitle"></Input>
                  </Form-item>
                  <Form-item label="展示状态">
                      <Radio-group v-model="showStatus">
                          <Radio label="text">图文</Radio>
                          <Radio label="video">视频</Radio>
                      </Radio-group>
                  </Form-item>
                </Col>
                <Col span="9" offset="1">
                  <Form-item label="品牌名称" prop="brandId" required>
                      <Select v-model="formData.brandId" placeholder="请选择" width="80" label-in-value @on-change="changeBrand">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select>
                  </Form-item>
                  <Form-item label="排序" prop="orderIndex">
                      <Input v-model.trim="formData.orderIndex"></Input>
                  </Form-item>
                  <Form-item label="渠道">
                      <Radio-group v-model="channel">
                          <Radio label="BPP">e店佳</Radio>
                          <Radio label="CPP">e促达</Radio>
                      </Radio-group>
                  </Form-item>
                </Col>
            </Row>
            <Form-item label="展示区域" >
                <Cascader change-on-select :data="areaData" style="width: 200px;display: inline-block;" @on-change="areaChange"></Cascader>
                <Button icon="plus" @click="addArea">添加</Button>
            </Form-item>
             <Form-item label="已选列表" v-if="bizAreaList.length>0">
                 <div id="areaList" v-for="(item,index) in bizAreaList" :key="index">
                      <span >{{ item.areaName}}</span>
                      <span @click="delArea(index)">
                          <Icon type="trash-a" ></Icon>
                      </span> 
                 </div>
            </Form-item>
        </Form>
        <div v-show="showStatus == 'text'">
            <div>图文封面：</div>
            <p style="margin: 10px 0;">注：多次上传以最后一张为基准</p>
            <p style="margin: 10px 0;color: #ff8a34;">（建议尺寸：710*430px）</p>
            <div id="List">
                <div class="imgList" v-if="bannerImg">
                    <img :src="bannerImg" alt="">
                </div>
                <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" id="upload" 
                :data="upData" 
                :before-upload="beforeUpload" 
                :on-success="successUpload" 
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :on-format-error="handleFormatError">
                    <div class="add">
                        <Icon type="ios-cloud-upload" size="30"></Icon>
                    </div>
                </Upload>
            </div>
            <div id="editorElem"></div>
        </div>
        <div v-show="showStatus == 'video'">
            <div>视频封面：</div>
            <p style="margin: 10px 0;">注：多次上传以最后一张为基准</p>
             <div id="List">
                <div class="imgList" v-if="videoImg">
                    <img :src="videoImg" alt="">
                </div>
                <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" id="upload" 
                :data="upData" 
                :before-upload="beforeUpload2" 
                :on-success="successUpload" 
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :on-format-error="handleFormatError">
                    <div class="add">
                        <Icon type="ios-cloud-upload" size="30"></Icon>
                    </div>
                </Upload>
            </div>
            <div style="margin: 10px 0;">视频：</div>
            <video :src="videoUrl" v-if="videoUrl" controls></video>
            <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" id="upload" 
            :data="upData" 
            :before-upload="videoBefore" 
            :on-success="videoSuccess"
            :format="['mp4']"
            :on-format-error="videoFormatError">
            <Button type="primary" icon="ios-cloud-upload-outline">上传视频</Button>
            </Upload>
        </div>
        <footer>
            <Button type="primary" size="large" @click="cancal">取消</Button>
            <Button type="success" size="large" @click="submit('form')" :loading="loading">保存</Button>
        </footer>
    </div>
</template>


<script>
import dataRange from "@/components/data-rang.vue";

import area from "../../config/china_code_data.js";
import upData from "../../assets/js/upload.js";
import PROJECT_CONFIG from "../../util/config.js";
import base64 from "js-base64";
import E from "wangeditor";
import axios from "axios";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import { validateStart, validateEnd } from "@/util/index.js";//验证规则

export default {
  data() {
    const that = this;
    return {
      timeStr1:"",
      timeStr2:"",
      timeStr3:"",
      start: {
        time: "",
        hour: ""
      },
     end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      areaData: area,
      rule: {
        startTime: [{ validator: validateStart }],
        endTime: [{ validator: validateEnd }],
        bannerTitle: [{ required: true, message: "请输入标题" }]
      },
      formData: {
        startTime: EDFAULT_STARTTIME,
        endTime: EDFAULT_ENDTIME,
        bannerTitle: "",
        brandId: "0",
        orderIndex: "",
        brandName: "全部"
      },
      brandList: [],
      upLoadStatus: false,
      showStatus: "text",
      upData: upData,
      loading: false,
      bannerImg: "",
      editor: "",
      bizAreaList: [],
      selectArea: "",
      videoImg: "",
      videoUrl: "",
      channel: "" //渠道
    };
  },
  props: ["type"],
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
        this.formData.brandId = this.brandList[0].id;
      }
    });
    var Type = this.type;
  },
  methods: {
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.startTime = this.Global.setHoursData(
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
      this.formData.endTime = this.Global.setHoursData(value.time, value.hour);
    },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        } else {
          this.$Message.error("请完善表单信息");
        }
      });
    },
    beforeUpload: function(res) {
      this.timeStr1 = Date.now()
      this.upData["key"] = "ecuda/image/" + this.timeStr1 + res.name;
    },
    beforeUpload2: function(res) {
      this.timeStr2 = Date.now()
      this.upData["key"] = "ecuda/image/" + this.timeStr2 + res.name;
    },
    videoBefore: function(res) {
      this.timeStr3 = Date.now()
      this.upData["key"] = "ecuda/video/" + this.timeStr3 + res.name;
    },
    successUpload: function(response, file, fileList) {
      if (this.showStatus == "text") {
        this.bannerImg = PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr1 + file.name;
      } else {
        this.videoImg = PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr2 + file.name;
      }
    },
    videoSuccess: function(response, file, fileList) {
      this.videoUrl = PROJECT_CONFIG.ossServer + "ecuda/video/" + this.timeStr3 + file.name;
    },
    cancal() {
      this.$emit("close", false);
    },
    init() {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      // data["startTime"] = this.Global.createTime(this.formData.startTime);
      // data["endTime"] = this.Global.createTime(this.formData.endTime);

      data["startTime"] = this.Global.createTime(
        this.formData.startTime
      );
      if (this.start.hour == "24:00") {
        data["startTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["endTime"] = this.Global.createTime(this.formData.endTime);
      if (this.end.hour == "24:00") {
        data["endTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      var arr = [];
      for (var i = 0; i < this.bizAreaList.length; i++) {
        arr.push(this.bizAreaList[i].areaCode);
      }
      if (this.bizAreaList.length == 0) {
        arr[0] = "";
      }
      data["bizAreaList"] = arr;
      data["channel"] = that.channel; //渠道
      if (this.showStatus == "text") {
        if (this.bannerImg == "") {
          this.$Message.error("请选择资讯图片");
          return false;
        }
        if (this.editor.txt.html() == "") {
          this.$Message.error("请输入资讯内容");
          return false;
        }
        data["bannerImage"] = this.bannerImg;
        data["content"] = base64.Base64.encode(this.editor.txt.html());
        data["bizType"] = "news";
        data["contentType"] = "text";
      } else {
        if (this.videoImg == "") {
          this.$Message.error("请选择视频首图");
          return false;
        }
        if (this.editor.txt.html() == "") {
          this.$Message.error("请上传视频");
          return false;
        }
        data["bizType"] = "news";
        data["contentType"] = "video";
        data["videoImage"] = this.videoImg;
        data["videoUrl"] = this.videoUrl;
      }
      this.loading = true;
      var api = "";
      if (this.type.type == "add") {
        api = "banner/addBannerInfo.json";
      } else {
        api = "banner/modiBannerInfo.json";
        data["id"] = this.type.id;
      }
      this.Global.doPost(api, data, () => {
        that.loading = false;
        that.$emit("close", false);
      });
    },
    info: function(id) {
      var that = this;
      var newDate = new Date();
      this.Global.doPost("banner/queryBannerInfo.json", id, function(res) {
        that.formData["bannerTitle"] = res.bannerTitle;
        that.formData["orderIndex"] = res.orderIndex;
        that.formData["brandId"] = res.brandId;
        that.formData["startTime"] = newDate.setTime(res.startTime);
        that.formData["endTime"] = newDate.setTime(res.endTime);
        that.showStatus = res.contentType;
        that.bizAreaList = res.bizAreaList;
        if (res.contentType == "text") {
          that.editor.txt.html(base64.Base64.decode(res.content));
          that.bannerImg = res.bannerImage;
        } else {
          that.videoImg = res.videoImage;
          that.videoUrl = res.videoUrl;
        }
      });
    },
    addArea() {
      if (this.selectArea.length == 0) {
        this.$Message.error("请选择区域");
        return false;
      }
      var selectValue = this.selectArea[this.selectArea.length - 1].value;
      for (var i = 0; i < this.bizAreaList.length; i++) {
        if (this.bizAreaList[i].areaCode == selectValue) {
          this.$Message.error("请勿选择重复地区");
          return;
        }
      }
      this.bizAreaList.push({
        areaName: this.selectArea[this.selectArea.length - 1].__label,
        areaCode: selectValue
      });
    },
    areaChange(value, selectData) {
      console.log(selectData);
      this.selectArea = selectData;
    },
    delArea(index) {
      this.bizAreaList.splice(index, 1);
    },
    changeBrand: function(value) {
      if (value.label == "") {
        value.label = "全部";
      }
      this.formData["brandName"] = value.label;
    },
    handleFormatError: function(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    videoFormatError: function(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件 " + file.name + " 格式不正确，请上传mp4视频"
      });
    }
  },
  mounted() {
    this.editor = new E("#editorElem");
    this.editor.customConfig.uploadImgServer =
      "https://hbrand.oss-cn-hangzhou.aliyuncs.com";
    this.editor.customConfig.customUploadImg = (file, insert) => {
      let param = new FormData(); //创建form对象
      /* 
        *切记oss上传，key一定要在file的前面
        */
      this.upData["key"] = "ecuda/image/" + file[0].name;
      for (let i in this.upData) {
        param.append(i, upData[i]);
      }
      param.append("file", file[0]); //通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      axios
        .post("https://hbrand.oss-cn-hangzhou.aliyuncs.com", param, config)
        .then(response => {
          insert(PROJECT_CONFIG.ossServer + "ecuda/image/" + file[0].name);
        });
    };
    this.editor.create();
  },
  watch: {
    type: {
      handler: function(val, oldVal) {
        if (val.type == "edit") {
          this.info(val.id);
        } else {
          this.bannerImg = "";
          this.editor.txt.html("");
          this.showStatus = "text";
          this.bizAreaList = [];
          this.$refs["form"].resetFields();
          this.videoImg = "";
          this.videoUrl = "";
        }
      },
      deep: true
    }
  }
};
</script>

