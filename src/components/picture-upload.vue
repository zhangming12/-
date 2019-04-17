<style lang="less" scoped>
    #imgBox {
        height: 120px;
        display: table;
        line-height: 120px;
        .changeImg {
            width: 150px;
            height: 120px;
            display: table-cell;
            vertical-align: middle;
            transform: translateX(20px);
            border: 1px solid #efefef;
            img{
                //width: 100%;
                width: 150px;
                height: 120px;
                display: block;
            }
        }
    }
</style>
<template>
    <div id="imgBox">
        <span>图片</span>
        <div class="changeImg">
            <img :src="picture_url" alt="" v-if="picture_url">
            <img src="../../../assets/image/imgBg.png" alt="" v-else>
        </div>
        <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" 
            style="transform:translateX(40px)"
            :data="upData" 
            :before-upload="beforeUpload" 
            :on-success="pictureUpload" 
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :on-format-error="handleFormatError">
            <Button type="primary">重新上传</Button>
            <span style="color:#ff8a34">（建议尺寸：210*170px）</span>
        </Upload>
    </div>
</template>
<script>
import upData from '@/assets/js/upload.js';
import PROJECT_CONFIG from '@/util/config.js';
export default {
    props:{
        // 有必要传，在多个upload组件同时存在，来区分
        param:{
            type: String,
            //required: true
        }
    },
    data(){
        return {
            upData: upData,
            picture_url:'',
            picture_param:null,
            timeStr:""
        }
    },
    watch:{
        param(val){
            if(val){
                this.picture_param=val;
            }
        }
    },
    methods:{
        beforeUpload: function(res) {
            this.timeStr = Date.now()
            this.upData['key'] = 'ecuda/image/' + this.timeStr + res.name;
        },
        pictureUpload: function(response, file, fileList) {
            //success
            if(file){
                this.picture_url = PROJECT_CONFIG.ossServer + 'ecuda/image/' + this.timeStr + file.name;
                //@param {string} 图片 url  ; @param {string}  区分upload组件 
                this.$emit('picture_url',picture_url,this.picture_param)
            }
        },
        handleFormatError: function(file){
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
    }
}
</script>
