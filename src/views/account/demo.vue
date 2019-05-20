<style lang="less" scoped>
.upload-slot {
  margin-bottom: 5px;
  p {
    line-height: 20px;
  }
}
</style>
<template>
  <div id="Main">
    <upload-file v-model="imgUrl" :opt="uploadOpt"></upload-file>
    <Input type="textarea" v-model="ivalue"/>
  </div>
</template>
<script>
import uploadFile from "@/components/uploadFile/upload-file.vue";
export default {
  data() {
    return {
      imgUrl: "",
      uploadOpt: {
        width: 710,
        height: 400
      },
      ivalue: ""
    };
  },
  watch: {
    ivalue(val) {
      console.log(val.split("\n"));
    }
  },
  components: { uploadFile },
  mounted() {},
  methods: {}
};
</script>