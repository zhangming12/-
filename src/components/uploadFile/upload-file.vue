<style lang="less" scoped>
.upload-file-zm {
  border: 1px solid #ccc;
  width: 150px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border-radius: 2px;
  padding: 0 5px;
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="upload-file-zm">
    <Upload
      :action="url"
      :show-upload-list="false"
      :format="format"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-format-error="handleFormatError"
    >
      <p :title="uploadText">
        <i-icon type="ios-folder" size="14" color="#53a3f4"/>
        {{ uploadText }}
      </p>
    </Upload>
  </div>
</template>

<script>
/**
 * 二次封装iview Upload组件用于上传excel文件
 * @param {String} value 文件路径
 * @param {Array} format 支持的上传文件格式
 */
import PROJECT_CONFIG from "@/util/config.js";
export default {
  name: "upload-file",
  data() {
    return {
      fileUrl: this.value,
      uploadText: this.fileTitle,
      url: PROJECT_CONFIG.uploadWorkerExcel
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    format: {
      //支持的上传文件格式
      type: Array,
      default() {
        return ["xlsx", "xlsm", "xls"];
      }
    },
    fileTitle: {
      type: String,
      default: "上传文件"
    }
  },
  watch: {
    value(val) {
      this.fileUrl = val;
    },
    fileTitle(val) {
      this.uploadText = val;
    }
  },
  methods: {
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.fileUrl = url;
        this.$emit("input", url);
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件 " + file.name + " 格式不正确，请检验。"
      });
    }
  }
};
</script>