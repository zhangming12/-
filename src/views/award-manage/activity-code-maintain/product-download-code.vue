<style lang="less" scoped>
    @import '../../../config/index.less';

    .box{
        width: 100%;
        box-shadow: 0 0 10px 2px rgba(0,0,0,.1);
        margin: 0 auto 15px;
        padding: 30px 20px;
        padding-bottom: 0;
        background: #fff;
    }
    .ivu-table-row{
        box-shadow: 0 0 5px 2px rgba(0,0,0,.1)!important;
        transform: translateY(0px);
    }
    
</style>

<template>
  <div id="Main">
      <h2 class="Title">生成并下载码包</h2>
      <div class="box" style="    padding-bottom: 10px;">
            <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span='10'>                     
                        <Form-item label="码包名称" >
                            <Input v-model="formData.qrRuleName" :disabled="true"></Input> 
                        </Form-item>
                        <Form-item label="码包加量" prop="planQuantity" required>
                            <Input v-model.number="formData.planQuantity" placeholder="请输入..."></Input> 
                        </Form-item>
                        <Form-item label="说明备注" >
                            <Input v-model.number="formData.memo" placeholder="请输入..."></Input> 
                        </Form-item>
                    </Col>
                    <Col span='10' offset="1">
                        <Form-item label="流水线" >
                            <Input v-model="formData.pipeLine" :disabled="true"></Input> 
                        </Form-item>
                        <Form-item label="批次号">
                            <Input v-model="formData.batchName" placeholder="请输入..." ></Input> 
                        </Form-item>                 
                    </Col>
                    
                </Row>
            </Form>
            <Table :columns="columns1" :data="pageData" disabled-hover></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="page" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
            <Row>
                <Col span="24" style="text-align: center;">
                    <Button @click="submit('form')" type="primary"  style="width: 80px;">生成码包</Button>
                    <Button type="info"  style="width: 80px;margin-left:10px" @click="handleBack">返回</Button>
                </Col>
            </Row>
      </div>
      <Modal v-model="modal2" width="360" >
            <p slot="header">
                <span>下载确认</span>
            </p>
            <div style="text-align:center">
                <Form ref="formCustom" :model="formCustom"  :label-width="80" :rules="rule">
                    <FormItem label="手机号" prop="phone">
                        <Input type="text" v-model="formCustom.phone" placeholder="请输入手机号" :disabled="true"></Input>
                    </FormItem>
                    <FormItem label="验证码" prop="codeCheck">
                        <Input type="text" v-model="formCustom.codeCheck" placeholder="请输入验证码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary"  @click="getPhoneCode('formCustom')" :disabled="getCodeStatus" v-text="title"></Button>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="cancle">取消</Button>
                <Button type="primary" @click="handleSure('formCustom')">确定下载</Button>
            </div>
    </Modal>
  </div>
</template>

<script>
 import {codeProductStatus } from '@/util/ENUMS.js' 
 
export default {
    name:"product-download-code-keepAlive",
    data () {
        return {
            formData: {       
                ruleName:'',
                pipeLine:'',
                planQuantity:'',
                batchName:'',
                memo:''
            },
            page: 1,
            pageNum: 0,
            rule: {              
                planQuantity: [
                    { required: true, message: '码包加量不能为空'},
                    { type: 'number', message: '请输入数字', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' }
                ],
                codeCheck: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ],
            },
            columns1: [
                {   
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '时间',
                    key: 'brandName',
                    align: 'center'
                },
                {
                    title: '加码包量',
                    key: 'planQuantity',
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    render: (h,params) => {      
                        return codeProductStatus[params.row.status]
                    }
                },
                {
                    title: '备注',
                    key: 'memo',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h,params) => {
                        return h('div', [
                            h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        
                                        this.handleDownload(params.row.batchId,params.row.brandId)
                                        
                                    }
                                }
                            },'下载')                        
                        ])
                    }
                }

            ],
            pageData: [], 
            activetyCodeId:null  ,//活动码包id 
            modal2:false,  
            formCustom:{
                phone:null,//手机号
                codeCheck:'',//验证码
                batchId:'',//批次ID
                brandId:'',
            },
            getCodeStatus:false,
            title:'获取验证码',
            userPhone:null
                    
        }
    },
    created: function(){
        let that=this;
        var id = this.$route.query.id;
        this.activetyCodeId=id;
        if(id){
            this.Global.doPost('qrCodeRule/queryQrCodeRuleInfo.json',id,function(res){
                
                that.formData.qrRuleId=res.id;
                that.formData.qrRuleName=res.ruleName;//码包名称
                that.formData.pipeLine=res.pipeLine;//流水线

                that.formData.brandId=res.brandId;
                that.formData.brandName=res.brandName;
                that.formData.activityId=res.activityId;
                that.formData.activityName=res.activityName;
                that.pageData=res.taskList;

            })
        };
        let session_user=sessionStorage.getItem('user');
        let session_userId= JSON.parse(session_user).userId;
        this.Global.doPost('admin/doGet.json',session_userId,function(res){
            that.formCustom.phone=res.phone;
        })
    },
    mounted: function(){
        
    },
    methods: {
        submit: function(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.init();
                } else {
                    this.$Message.error('请选择查询条件!!');
                }
            })
        },
        changePage: function(size){
           this.init(size,10)
        },
        init: function(currentPage,pageSize){
            var that = this;
            var data = this.Global.JsonChange(this.formData);
            this.Global.deleteEmptyProperty(data)
            delete data['pipeLine']
            this.Global.doPost('qrCodeTask/doPorductQR.json',data,function(res){
                that.getList(that.activetyCodeId)
            })
        },
        exportExcel: function(){
            var that = this;
            var data = this.Global.JsonChange(this.formData);
            this.Global.deleteEmptyProperty(data);
            
            var url = this.Global.getExportUrl('qrCodeTask/downloadBatchQrCodeFile.json',data);
            window.open(url);
        },
        handleBack(){
             this.$router.push({path:'/activityCodeMaintain'})
        },
        getList(id){
            var that = this;
            that.Global.doPost('qrCodeRule/queryQrCodeRuleInfo.json',id,function(res){
                
                // that.formData.qrRuleId=res.id;
                
                // that.formData.pipeLine=res.pipeLine;//流水线

                // that.formData.brandId=res.brandId;
                // that.formData.brandName=res.brandName;
                // that.formData.activityId=res.activityId;
                // that.formData.activityName=res.activityName;
                that.formData.planQuantity=res.planQuantity;
                that.formData.memo=res.memo;
                that.formData.batchName=res.batchName;
                that.pageData=res.taskList;

            })
        },
        handleDownload(batchId,brandId){
            
            //下载码包
            if(this.formCustom.phone){
                this.modal2=true;
                this.formCustom.batchId=batchId;
                this.formCustom.brandId=brandId;
                //this.formCustom.phone='';
                this.formCustom.codeCheck='';
                this.getCodeStatus=false;
            }else{
                that.$Message.error('未获取到用户手机号');
            }
            
        },
        getPhoneCode(name){
            var that =this;
            let phone= this.formCustom.phone;
                if((/^1[34578]\d{9}$/.test(phone))) {
                    this.Global.sendMsg(phone,'bind_mobile',function(res){
                    that.$Message.success('验证码已发送!');
                    that.getCodeStatus=true;
                    that.phoneCodeTimeDown()
                    })
                }else{
                    this.$Message.error('请输入正确的手机号');
                }   
        },
        phoneCodeTimeDown(){
            var that =this;
            var InterValObj; //timer变量，控制时间
            var count = 90; //间隔函数，1秒执行
            var curCount = 0; //当前剩余秒数
            curCount=count;
            InterValObj=window.setInterval(function(){
                if(curCount == 0) {
                    clearInterval(InterValObj)
                    that.getCodeStatus=false;
                    that.title='获取验证码';
                }else{
                    curCount--;
                    that.title= curCount + 's后获取验证码';
                    
                }
            }, 1000) 
        },
        handleSure(name){
            
            let that=this;
            this.$refs[name].validate((valid) => {
                if(valid){
                    //确认下载
                if(this.formCustom.codeCheck){
                    let param={
                    "brandId":this.formCustom.brandId,
                    "batchId":this.formCustom.batchId,
                    "AuthCode":{
                        "authCode":this.formCustom.codeCheck,
                        "phone":this.formCustom.phone,
                        "smsBizCode":'bind_mobile',
                    },
                    }
                    var url = this.Global.getExportUrl('qrCodeTask/downloadBatchQrCodeFile.json',param);
                    window.open(url);
                    this.modal2=false;
                }else{
                    this.$Message.error('请填写手机验证码!');
                }
                }
            
            })
            
        },
        cancle(){
            this.modal2=false;
        }
        
    }
}
</script>


