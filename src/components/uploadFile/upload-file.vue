<style lang="less" scoped>
.upload-file-zm {
  border: 1px solid #ccc;
  width: 150px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  border-radius: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 5px;
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
      <i-icon type="ios-folder" size="14" color="#53a3f4"/>
      {{uploadText}}
    </Upload>
  </div>
</template>

<script>
import upData from "@/assets/js/upload.js";
import config from "@/util/config.js";
export default {
  name: "upload-file",
  data() {
    return {
      upData: upData, //上传的额外参数
      timeStr: "", //上传的时刻的时间戳
      fileUrl: this.value,
      uploadText: "shang",
      url: config.uploadWorkerExcel
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
        return ["xlsx", "xlsm", "csv", "xls"];
      }
    },
    title: {
      type: String,
      default: "上传文件"
    }
    // uploadText: {
    //   type: String,
    //   default: "建议上传大小"
    // }
  },
  watch: {
    value(val) {
      this.fileUrl = val;
    }
  },
  methods: {
    handleError() {},
    handleSuccess(response, file, fileList) {
      // debugger;
      this.uploadText = file.name;
      console.log(file.name);
      var url = response.data;
      if (url) {
        this.fileUrl = url;
        // return;
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


