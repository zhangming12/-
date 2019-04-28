<style lang="less" scoped>
@import '../../../config/index.less';


.box {
    width: 100%;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
    margin: 0 auto;
    padding: 30px 20px;
    padding-bottom: 0;
    background: #fff;
    overflow: hidden;
}

.ivu-table-row {
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1)!important;
    transform: translateY(0px);
}

#imgBox {
    height: 120px;
    display: table;
    line-height: 120px;
    span{
        display: inline-block;
        width: 80px;
    }
    .changeImg {
        width: 150px;
        height: 120px;
        display: table-cell;
        vertical-align: middle;
        transform: translateX(20px);
        border: 1px solid #efefef;
        img{
            // width: 100%;
            width: 150px;
            height: 120px;
            display: block;
        }
    }
    p{
        display: inline-block;
    }
}

footer{
    text-align: center;
    margin: 40px 0 20px;
    // button{
    //     display: inline-block;
    //     width: 76px;
    //     height: 28px;
    //     text-align: center;
    //     line-height: 28px;
    //     font-size: 16px;
    //     border: 0;
    //     outline: none;
    //     color: #fd7f23;
    //     border:1px solid #fd7f23;
    //     background: #ffffff;
    //     cursor: pointer;
    // }
    // button:last-child{
    //     color: #ffffff;
    //     background:#fd7f23;
    //     margin-left: 60px;
    // }
}
</style>

<template>
    <div id="Main">
        <h2 class="Title">新建&修改</h2>
        <div class="box">
            <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span="10">
                        <Form-item label="折扣时间" required  :label-width="100">
                            <Row>
                                <Col span="11">
                                <Form-item prop="startTime">
                                    <Date-picker type="datetime" placeholder="选择时间" v-model="formData.startTime" style="width: 100%;"></Date-picker>
                                </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center">至</Col>
                                <Col span="11">
                                <Form-item prop="endTime">
                                    <Date-picker type="datetime" placeholder="选择时间" v-model="formData.endTime" style="width: 100%;"></Date-picker>
                                </Form-item>
                                </Col>
                            </Row>
                        </Form-item>
                        
                    </Col>
                    <Col span="10" offset="2">
                        <Form-item label="折扣名称" prop="name"  :label-width="100">
                            <Input v-model="formData.name" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="24">
                        <Form-item :label-width="1">
                            <div id="imgBox">
                                <span>折扣图片</span>
                                <div class="changeImg">
                                    <img :src="notifyImg" alt="" v-if="notifyImg">
                                    <img src="../../../assets/image/imgBg.png" alt="" v-else>
                                </div>
                                <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" 
                                style="transform:translateX(40px)"
                                :data="upData" 
                                :before-upload="beforeUpload" 
                                :on-success="notifyUpload" 
                                :show-upload-list="false"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError">
                                    <Button type="primary">重新上传</Button>
                                    <p style="margin:0;color: #ff8a34;">（建议尺寸：240*150px）</p>
                                </Upload>
                            </div>
                        </Form-item>
                    </Col>
                    <Col span="10">
                        <Form-item label="备注" :label-width="100">
                            <Input v-model='formData.memo'></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>           
            <footer>
                <Button type="primary"  @click='goBack'>取消</Button>
                <Button type="success"  @click="submit('form')" >确定</Button>
            </footer>
        </div>     
    </div>
</template>

<script>

import upData from '@/assets/js/upload.js';
import PROJECT_CONFIG from '@/util/config.js';
import { validateStart, validateEnd } from "@/util/index.js";//验证规则

export default {
    data() {
        const that = this;
        return {   
            timeStr:"",      
            formData: {
                startTime: '',
                endTime: '',
                name: '',
                memo:'',
                id:null
            },
            rule: {
                startTime: [
                    { validator: validateStart }
                ],
                endTime: [
                    { validator: validateEnd }
                ],
                brandId: [
                    { required: true, message: '请选择品牌名称'}
                ],
                name: [
                    { required: true, message: '请输入活动名称'}
                ]
            },     
            type: '',       
            upData: upData,
            notifyImg: '',
    
        }
    },
    created: function() {

        var type = this.$route.query.type;

        var id = this.$route.query.id;

        if( type ){
            this.type = type;
        }
        if( id ){
            this.formData.id=id;
            this.activityDetail(id)
        }
   
    },
    methods: {
        addRules: function() {
            /* 
                添加空是因为 单选框会默认显示label数据
            */
            this.list.push('');
        },
        beforeUpload: function(res) {
            this.timeStr = Date.now()
            this.upData['key'] = 'ecuda/image/' + this.timeStr + res.name;
        },
        notifyUpload: function(response, file, fileList) {
            this.notifyImg = PROJECT_CONFIG.ossServer + 'ecuda/image/' + this.timeStr + file.name;
        },
        handleFormatError: function(file){
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
      
       
        activityDetail: function(id){
            var that = this;
            var newDate = new Date();
            if( id ){
                this.Global.doPost('goodsInfo/getGoodsInfo.json',id,function(res){
                 
                    that.formData['name'] = res.name;
                    that.formData['memo'] = res.memo;
                    that.formData['startTime'] = newDate.setTime(res.startTime);
                    that.formData['endTime'] = newDate.setTime(res.endTime);
                    that.notifyImg = res.url;
                    
     
                })
            }else{
                this.$Message.error('请在活动列表重新选择')
            }  
        },
        submit: function(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.init()
                } else {
                    this.$Message.error('请选择查询条件!!');
                }
            })
        },
 
        init: function() {
            var that = this;
            var data = this.Global.JsonChange(this.formData);
            data['startTime'] = this.Global.createTime(this.formData.startTime);
            data['endTime'] = this.Global.createTime(this.formData.endTime);
            this.Global.deleteEmptyProperty(data);
            data['url'] = this.notifyImg;
            data['type'] = 0;
            var api;
            if( this.type == 'edd' ){
                data['id'] = this.formData.id;
                api = 'goodsInfo/modiGoodsInfo.json';
            }
            if( this.type == 'add' ){
                api = 'goodsInfo/addGoodsInfo.json';
            }
            this.Global.doPost(api, data, function(res) {
                that.$router.push('/electronAwardManage');
            })
        },
        goBack: function(){
            alert(1)
            // this.$router.back();
        }
    }
}
</script>


