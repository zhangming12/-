<style lang="less" scoped>
    @import '../../config/index.less';
    #Main{
        padding: 15px;
    }
    .box{
        width: 100%;
        box-shadow: 0 0 10px 2px rgba(0,0,0,.1);
        margin: 0 auto;
        padding: 30px 20px;
        padding-bottom: 0;
        background: #fff;
    }
    .ivu-table-row{
        box-shadow: 0 0 5px 2px rgba(0,0,0,.1)!important;
        transform: translateY(0px);
    }

    .time{
        float: left;
        padding: 0px 10px;
        border: 1px solid @primary-color;
        margin-right: 10px;
        cursor: pointer;
    }
    .select{
        background: @primary-color;
        color: #fff;
    }
    .Title{
        text-indent: 1%;
        padding-bottom: 15px;
        font-size: 16px;
    }
    .export{
        height: 24px;
        position: relative;
        div{
            border:1px solid @primary-color;
            padding: 3px 12px;
            float:right;
            border-bottom: 0;
            position: absolute;
            right: 1px;
            bottom: -1px;
            color: @primary-color;
            cursor: pointer;
            i{
                margin-right: 2px;
            }
        }
    }
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">用户管理</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="60" >
                <Row>
                    <Col span="6">                       
                        <Form-item label="用户姓名" prop="userName">
                            <Input v-model.trim="formData.userName" ></Input>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="登陆账号" prop="loginAccount">
                            <Input v-model.trim="formData.loginAccount" ></Input>
                        </Form-item>
                    </Col>
                    <Col span='4' offset="1">
                        <Button @click="submit('form')" type="primary">查询</Button>
                        <Button @click="editNew" type="success" style='margin-left: 10px;'>新建</Button>
                    </Col>
                </Row>
            </Form>
      </div>
      <div class="box" style="margin-top: 30px;padding-bottom:20px">
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
      <!--  修改用户信息 -->
      <Modal v-model="reviseStatus" title="修改" @on-ok="ok" loading ok-text='保存'>
          <Form :model="reviseData" :label-width="60" >                    
                <Form-item label="登录名" prop="loginAccount">
                        <Input placeholder="登录名" v-model="reviseData.loginAccount"></Input>
                </Form-item>
                <Form-item label="姓名" prop="userName">
                        <Input placeholder="请输入姓名" v-model="reviseData.userName"></Input>
                </Form-item>
                <Form-item label="登陆账号" prop="phone">
                    <Input placeholder="请输入手机号" v-model="reviseData.phone" ></Input>
                </Form-item>
            </Form>
      </Modal>
      <!-- 新建用户信息 -->
      <Modal v-model="editStatus" title="新增" @on-ok="ok" loading ok-text='提交' :mask-closable=false>
          <Form :model="editData" :label-width="80" :rules='rule' ref="form">
                <Row>
                    <Col span='12'>
                         <Form-item label="登录账号" prop="loginAccount">
                                <Input placeholder="登录账号" v-model="editData.loginAccount"></Input>
                        </Form-item>
                        <Form-item label="登陆账号" prop="phone">
                            <Input placeholder="请输入手机号" v-model="editData.phone" ></Input>
                        </Form-item>
                        <Form-item label="密码" prop="loginPwd">
                                <Input placeholder="再次输入密码" v-model="editData.loginPwd"></Input>
                        </Form-item>
                    </Col>
                    <Col span='12'>
                        <Form-item label="用户姓名" prop="userName">
                                <Input placeholder="请输入用户姓名" v-model="editData.userName"></Input>
                        </Form-item>
                        <Form-item label="验证码" prop="authCode">
                            <Row>
                                <Col span='15'>
                                    <Input placeholder="请输入验证码" v-model="editData.authCode"></Input>
                                </Col>
                                <Col offset='1' span='8'>
                                    <Button type='primary' @click='sendMsg' :disabled='disabledStatus'>{{ codeMsg }}</Button>
                                </Col>
                            </Row>
                                
                        </Form-item>
                        <Form-item label="确认密码" prop="loginNewPwd">
                                <Input placeholder="请输入密码" v-model="editData.loginNewPwd"></Input>
                        </Form-item>
                    </Col>
                </Row>                    
            </Form>
            <div slot='footer'>
                <Button @click='editSubmit("form")'>确定</Button>
            </div>
      </Modal>
  </div>
</template>

<script>
export default {
  name:"userManage-keepAlive",

    data () {
        const that = this;
        const validatePhone = (rule, value, callback) => { // 验证手机号码
            if( value == '' ){
                callback(new Error('请输入手机号码'));
            }else{
                if ( !(/^1[34578]\d{9}$/.test(value)) ) { // 判断手机号码格式
                    callback(new Error('请输入正确手机号码'))
                }else{
                    callback();
                }
            }
        }
        const validatePwd = (rule, value, callback) => { // 验证密码
            if( value == '' ){
                callback(new Error('请输入密码'));
            }else{
                if (this.editData.loginNewPwd !== '') {
                    // 对结束时间单独验证
                    this.$refs.form.validateField('loginNewPwd');
                }
                callback();
            }
        }
        const validateNewPwd = (rule, value, callback) => { // 验证第二次密码
            if( value == '' ){
                callback(new Error('请再次输入密码'));
            }else{
                if (value != this.editData.loginPwd ){ // 判断两次密码不一致
                    callback(new Error('两次密码不一致'))
                }else{
                    callback();
                }
                
            }
        }
        return {
            formData: {
                userName: '',
                loginAccount: ''
            },
            reviseData: {
                loginAccount: '',
                phone: '',
                userName: ''
            },
            editData: {
                loginAccount: '',
                phone: '',
                userName: '',
                authCode: '',
                loginPwd: '',
                loginNewPwd: ''
            },
            page: 1,
            rule: {
                phone: [
                    { validator: validatePhone,required: true}
                ],
                loginAccount: [
                    {required: true,message: '请输入登陆账号'}
                ],
                userName: [
                    {required: true,message: '请输入用户姓名'}
                ],
                authCode: [
                    {required: true,message: '请输入验证码'}
                ],
                loginPwd: [
                    { validator: validatePwd,required: true}
                ],
                loginNewPwd: [
                    { validator: validateNewPwd,required: true}
                ],
            },
            pageNum: 0,
            pageSize: 10,
            reviseStatus: false,
            editStatus: false,
            selectUserId: '',
            codeMsg: '发送',
            disabledStatus: false,
            columns1: [
                {
                    title: '用户ID',
                    key: 'userId',
                    align: 'center'
                },
                {
                    title: '用户姓名',
                    key: 'userName',
                    align: 'center'
                },
                {
                    title: '登陆账号',
                    key: 'loginAccount',
                    align: 'center'
                },
                {
                    title: '手机号码',
                    key: 'phone',
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    render: (h,params) => {
                        return this.Global.ENUMS.userStauts[params.row.status]
                    }
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    render: (h,params) => {
                        return this.Global.createTime(params.row.createTime)
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        var handle = {};
                        var limit = {};
                        if( params.row.status == 1 ){
                            handle['txt'] = '锁定';
                            handle['type'] = 'primary';
                            handle['content'] = '用户将被锁定';
                            handle['status'] = 2
                        }else if( params.row.status == 2 ){
                            handle['txt'] = '恢复';
                            handle['type'] = 'success';
                            handle['content'] = '用户将被恢复';
                            handle['status'] = 1;
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: handle.type,
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: '警告',
                                            content: handle.content,
                                            onOk: function(){
                                                that.userBlack(params.row.userId,handle.status)
                                            }
                                        })
                                    }
                                }
                            }, handle.txt),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.selectUserId = params.row.userId;
                                        this.showMemo()
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            pageData: [],
        }
    },
    created: function(){
        this.init()
    },
    methods: {
        submit: function(name){
            this.page = 1;
            this.init()
        },
        changePage: function(size){
            this.page = size;
            this.init()
        },
        init: function(){
            var that = this;
            var data = this.Global.JsonChange(this.formData);
            this.Global.deleteEmptyProperty(data)
            data['currentPage'] = this.page;
            data['pageSize'] = this.pageSize;
            this.Global.doPost('admin/doQueryWithPage.json',data,function(res){
                that.pageNum = res.items;
                that.pageData = res.datalist;
            })
        },
        userBlack: function(userId,status){
            var that = this;
            this.Global.doPost('admin/setAdminStatus.json',{
                userId: userId,
                status: status
            },function(res){
                that.init()
            })
        },
        showMemo: function(){
            var that = this;
            this.reviseStatus = true;
            if( this.reviseStatus ){
                this.Global.doPost('admin/doGet.json',this.selectUserId,function(res){
                    that.reviseData['userName'] = res.userName;
                    that.reviseData['phone'] = res.phone;
                    that.reviseData['loginAccount'] = res.loginAccount;
                })
            }
        },
        ok: function(){
            this.getUserMemo(this.selectUserId)
        },
        getUserMemo: function(userId){
            var that = this;
            this.Global.doPost('admin/doUpdate.json',{
                userId: userId,
                phone: this.reviseData.phone,
                userName: this.reviseData.userName,
                loginAccount: this.reviseData.loginAccount
            },function(){
                that.reviseStatus = false
                that.init()
            })
        },
        editNew: function(){

            this.editStatus = !this.editStatus;
        },
        editSubmit: function(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.editNewInit()
                } else {
                    this.$Message.error('请选择查询条件!!');
                }
            })
        },
        editNewInit: function(){
            var that = this;
            var data = this.Global.JsonChange(this.editData);
            this.Global.deleteEmptyProperty(data);
            data['loginPwd'] = this.Global.Md5(data.loginPwd);
            data['loginNewPwd'] = this.Global.Md5(data.loginNewPwd);
            data['userType'] = 'V';
            this.Global.doPost('admin/doSave.json',data,function(res){
                that.editStatus = !that.editStatus;
                that.init();
            })
        },
        sendMsg: function(){
                var that = this;
                var phone = this.editData.phone;
                if(!(/^1[34578]\d{9}$/.test(phone))) {
                    this.$Message.error('请输入正确的手机号');
                    return false;
                }
                this.disabledStatus = true;
                var time = 60;
                this.Global.sendMsg(phone, 'user_complate', function () {
                    that.Global.TimeDown(time, function (t) {
                        that.codeMsg = t + 'S'
                    }, function () {
                        that.disabledStatus = false;
                        that.codeMsg = '发送'
                    })
                })
                
            },
    }
}
</script>


