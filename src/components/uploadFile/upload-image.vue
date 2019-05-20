<style lang="less" scoped>
.zm-upload-image {
  display: block;
  overflow: hidden;
  height: 170px;
  .zm-upload-box {
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 0 20px;
    .upload-btn {
      display: block;
    }
  }
  .zm-image-box {
    float: left;
    .upload-image {
      img {
        width: 200px;
        height: 170px;
        display: block;
      }
    }
    .upload-video {
      video,
      img {
        width: 200px;
        height: 170px;
        display: block;
      }
    }
  }
}
</style>

<template>
  <div class="zm-upload-image">
    <!-- 上传组件 -->
    <div class="zm-upload-box">
      <slot name="title"></slot>

      <Upload
        action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
        :data="upData"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :show-upload-list="false"
        :format="format"
        :on-format-error="handleFormatError"
      >
        <Button class="upload-btn" type="primary">{{ imgUrl ? "重新上传" : "上传"}}</Button>
      </Upload>
    </div>
    <!-- 预览框 -->
    <div class="zm-image-box">
      <!-- 上传的是图片时 -->
      <div class="upload-image" v-if="imgType == 'image'">
        <img :src="imgUrl" v-if="imgUrl">
        <img src="../../assets/image/imgBg.png" v-else>
      </div>
      <!-- 上传视频时 -->
      <div class="upload-video" v-else>
        <video controls v-if="imgUrl" :src="imgUrl"></video>
        <img src="../../assets/image/imgBg.png" alt v-else>
      </div>
    </div>
  </div>
</template>


<script>
/**
 * 二次封装iview Upload组件用于上传图片视频
 * @param {String} value 图像url
 * @param {String} imgType 上传的是图片还是视频 image/video
 * @param {Boolean} needCheck 是否需要检查图片大小,仅在上传图片时有效
 * @param {Array} format 支持的上传文件格式
 * @param {Object} opt 图片的大小限制，仅在上传图片时 与 needCheck 为true时有效
 */
import PROJECT_CONFIG from "@/util/config.js";
import upData from "@/assets/js/upload.js";
export default {
  name: "zm-upload-image",
  props: {
    value: {
      //上传返回的url
      type: String,
      default: ""
    },
    imgType: {
      //上传的类型
      type: String,
      default: "image"
    },
    needCheck: {
      //是否需要检查图片大小,仅在上传图片时有效
      type: Boolean,
      default: false
    },
    opt: {
      //图片的大小限制，仅在上传图片时 与 needCheck 为true时有效
      type: Object,
      default() {
        return {
          width: 710,
          height400
        };
      }
    },
    format: {
      //支持的上传格式
      type: Array,
      default() {
        return ["jpg", "jpeg", "png"];
      }
    }
  },
  data() {
    return {
      upData: upData,
      imgUrl: this.value,
      uploadTime: "" //上传的时间戳
    };
  },
  watch: {
    value(val) {
      this.imgUrl = val;
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.imgUrl =
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.uploadTime + file.name;
      this.$emit("input", this.imgUrl);
    },
    handleFormatError(file) {
      if (this.format.length) {
        let desc = `文件：${file.name}格式不正确，请上传${this.format.join(
          "、"
        )}格式的${this.imgType == "video" ? "视频" : "图片"}`;
        this.$Notice.warning({
          title: "文件格式不正确",
          desc
        });
      }
    },
    beforeUpload(res) {
      this.uploadTime = Date.now();
      this.upData["key"] = "ecuda/image/" + this.uploadTime + res.name;
      if (this.needCheck && this.imgType === "image") {
        return this.checkImageWH(res);
      }
    },
    checkImageWH(file) {
      let { width, height } = this.opt;
      return new Promise((resolve, reject) => {
        let filereader = new FileReader();
        filereader.onload = e => {
          let src = e.target.result;
          const image = new Image();
          image.onload = () => {
            if (
              (width && this.width != width) ||
              (height && this.height != height)
            ) {
              this.$Notice.info({
                title: `请上传宽为${width},高为${height}的图片"`
              });
              reject();
            } else {
              resolve();
            }
          };
          image.onerror = reject;
          image.src = src;
        };
        filereader.readAsDataURL(file);
      });
    }
  }
};
</script>