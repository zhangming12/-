<style lang="less" scoped>
@import "../../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  overflow: hidden;
}
#phoneBox {
  width: 305px;
  height: 663px;
  background: url("../../../assets/image/sPhone.png") center no-repeat;
  background-size: 100%;
  padding-top: 133px;
  float: left;
}
#htmlBox {
  width: 273px;
  height: 439px;
  overflow-y: scroll;
  background: #f8f8f8;
  margin: 0 auto;

  img {
    display: block;
    width: 100%;
    height: 175px;
  }
  #title {
    font-size: 15px;
    color: @primary-color;
    background: #fff;
    padding-bottom: 10px;
    margin-bottom: 5px;
  }
  #content {
    padding: 12px;
    background: #fff;
  }
}

#content {
  overflow: hidden;
  float: left;
  padding-left: 130px;
  width: 700px;
}

footer {
  text-align: center;
  margin: 40px 0 20px;
}

.changeImg {
  width: 140px;
  height: 140px;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>

<template>
  <div id="Main">
    <h2 class="Title">新建&修改</h2>
    <div class="box">
      <div id="phoneBox">
        <div id="htmlBox">
          <img :src="formData.url" alt>
          <div id="title">{{ formData.name }}</div>
          <div ref="text" id="content"></div>
        </div>
      </div>
      <div id="content">
        <Form ref="form" :model="formData" :label-width="75" :rules="rule">
          <Form-item :label-width="1">
            <div id="imgBox">
              <Row>
                <Col span="7">
                  <div class="changeImg">
                    <img :src="formData.url" alt v-if="formData.url">
                    <img src="../../../assets/image/imgBg.png" alt v-else>
                  </div>
                </Col>
                <Col span="12">
                  <Upload
                    action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                    style
                    :data="upData"
                    :before-upload="beforeUpload"
                    :on-success="urlUpload"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatError"
                  >
                    <div>详情页折扣图片</div>
                    <p style="margin:0;color: #ff8a34; margin-bottom: 20px;">(建议尺寸：750*350px)</p>
                    <Button type="primary">重新上传</Button>
                  </Upload>
                </Col>
              </Row>
            </div>
          </Form-item>
          <Form-item :label-width="1">
            <div id="imgBox">
              <Row>
                <Col span="7">
                  <div class="changeImg">
                    <img :src="formData.goodsUrl" alt v-if="formData.goodsUrl">
                    <img src="../../../assets/image/imgBg.png" alt v-else>
                  </div>
                </Col>
                <Col span="12">
                  <Upload
                    action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                    style
                    :data="upData"
                    :before-upload="beforeUpload2"
                    :on-success="goodsUpload"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatError"
                  >
                    <div>列表折扣图片</div>
                    <p style="margin:0;color: #ff8a34; margin-bottom: 20px;">(建议尺寸：210*190px)</p>
                    <Button type="primary">重新上传</Button>
                  </Upload>
                </Col>
              </Row>
            </div>
          </Form-item>
          <Form-item label="折扣名称" prop="name">
            <Input v-model="formData.name" placeholder="请输入..."></Input>
          </Form-item>
          <Form-item label="详细说明" prop="name">
            <div id="editorElem"></div>
          </Form-item>
          <footer>
            <Button type="success" style="margin-right: 20px;" @click="goBack">返回</Button>
            <Button type="primary" @click="submit('form')">保存</Button>
          </footer>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
import base64 from "js-base64";
import E from "wangeditor";
import axios from "axios";

export default {
  data() {
    return {
      timeStr1: "",
      timeStr2: "",
      formData: {
        name: "",
        goodsUrl: "",
        url: "",
        summary: "",
        id: ""
      },
      rule: {},
      notifyImg: "",
      upData,
      editor: null,
      val: ""
    };
  },
  created() {
    let type = this.$route.query.type;
    let id = this.$route.query.id;
    if (type) {
      this.type = type;
    }
    if (id) {
      this.formData.id = id;
      this.activityDetail(id);
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
      this.upData["key"] = "entity/image/" + file[0].name;
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
          insert(PROJECT_CONFIG.ossServer + "entity/image/" + file[0].name);
        });
    };
    this.editor.customConfig.onchange = text => {
      // 监控变化，同步更新
      console.log(text);
      this.$refs.text.innerHTML = text;
    };
    this.editor.create();
  },
  methods: {
    beforeUpload: function(res) {
      this.timeStr1 = Date.now();
      this.upData["key"] = "entity/image/" + this.timeStr1 + res.name;
    },
    beforeUpload2: function(res) {
      this.timeStr2 = Date.now();

      this.upData["key"] = "entity/image/" + this.timeStr2 + res.name;
    },
    goodsUpload: function(response, file, fileList) {
      this.formData.goodsUrl =
        PROJECT_CONFIG.ossServer + "entity/image/" + this.timeStr2 + file.name;
      console.log(this.formData.goodsUrl);
    },
    urlUpload: function(response, file, fileList) {
      this.formData.url =
        PROJECT_CONFIG.ossServer + "entity/image/" + this.timeStr1 + file.name;
    },
    handleFormatError: function(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    activityDetail(id) {
      if (id) {
        this.Global.doPost("goodsInfo/getGoodsInfo.json", id, res => {
          this.formData["name"] = res.name;
          if (res.summary) {
            this.editor.txt.html(base64.Base64.decode(res.summary));
            this.$refs.text.innerHTML = base64.Base64.decode(res.summary);
            // this.editor.txt.html(res.summary);
            // this.$refs.text.innerHTML = res.summary;
            // this.formData['summary'] = base64.Base64.decode(res.summary);
          }
          this.formData["goodsUrl"] = res.goodsUrl;
          this.formData["url"] = res.url;
        });
      } else {
        this.$Message.error("请在活动列表重新选择");
      }
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    init() {
      let content = base64.Base64.encode(this.editor.txt.html());
      let data = this.Global.JsonChange(this.formData);
      data["summary"] = content;
      this.Global.deleteEmptyProperty(data);
      data["type"] = 1;
      var api;
      if (this.type == "edd") {
        data["id"] = this.formData.id;
        api = "goodsInfo/modiGoodsInfo.json";
      }
      if (this.type == "add") {
        api = "goodsInfo/addGoodsInfo.json";
      }
      this.Global.doPost(api, data, res => {
        this.$router.push("/awardManage");
      });
    },
    goBack() {
      this.$router.push({
        path: "./awardManage"
      });
    }
  }
};
</script>


