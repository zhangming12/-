<style lang="less" scoped>
@import '../../config/index.less';
.box {
    width: 100%;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
    margin: 0 auto;
    padding: 30px 20px;
    padding-bottom: 0;
    background: #fff;
}
.ivu-date-picker{
            display: block;
    }
    .searchBox{
        overflow: hidden;
        .search_btn{
            float: left;
            width: 50px;
            padding: 5px 14px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0; 
        }
        .search_icon{
            float: left;
            padding: 5px 10px;            
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;            
        }
    }
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">活动参与情况明细</h2> -->
        <div class="box">
            <Form ref="form" :model="formData" :label-width="88" :rules="rule">                
                <Row>
                    <Col span='9'>
                        <Form-item label="拍摄时间" required>
                            <Row>
                                <Col span="11">
                                    <Form-item prop="queryStartTime">
                                        <Date-picker type="datetime" placeholder="选择时间" v-model="formData.queryStartTime" ></Date-picker>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center">至</Col>
                                <Col span="11">
                                    <Form-item prop="queryEndTime">
                                        <Date-picker type="datetime" placeholder="选择时间" v-model="formData.queryEndTime"></Date-picker>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Form-item>                        
                        <Form-item label="客户渠道">                                               
                            <Select v-model="formData.bapChannel" clearable>
                                <Option v-for="(item, key, index) in protocolBapChannel" :value="key" :key="index">{{ item }}</Option>
                            </Select>
                        </Form-item>                         
                    </Col>
                    <Col span='6' >
                        <Form-item label="客户编号">
                            <Input  v-model="formData.joinCode"></Input> 
                        </Form-item>                          
                        <Form-item label="业代姓名">
                            <Input  v-model="formData.workerName"></Input> 
                        </Form-item>
                                          
                    </Col>
                    <Col span='6'>
                        <Form-item label="店铺名称">
                            <Input  v-model="formData.storeName"></Input>                              
                        </Form-item>    
                        <Form-item label="业代手机">
                            <Input  v-model="formData.workerPhone"></Input>                             
                        </Form-item>                                              
                         
                                         
                    </Col>                    
                    <Col span="2" offset="1">
                        <div class="searchBox">
                            <Button @click="submit('form')" class="btn-search  search_btn" type="primary">查询</Button>  
                            <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-up" v-if="showQuery"></Button>
                            <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-down" v-else></Button>                       
                        </div>                                            
                    </Col>
                </Row>
                <transition name="fade">
                <Row v-if="showQuery">
                    <Col span='9'>                                                 
                        <Form-item label="销售路线" >
                            <Input  v-model="formData.salesRoute"></Input> 
                        </Form-item>
                        <Form-item label="大区">                         
                            <Input  v-model="formData.salesRegion"></Input>                             
                        </Form-item>                   
                    </Col>
                    <Col span='6'>
                        <Form-item label="参与活动">
                            <Select v-model="formData.isLoong" clearable>                              
                                <Option  value="0" >未参与</Option>
                                <Option  value="1" >执行中</Option>
                            </Select>
                        </Form-item>                                                  
                        <Form-item label="营业部">
                            <Input  v-model="formData.busiDept"></Input> 
                        </Form-item>                 
                    </Col>
                    <Col span='6'>
                        <Form-item label="销售部" >                                                        
                            <Input  v-model="formData.salesDept"></Input>                             
                        </Form-item>                                                                                          
                    </Col>                                                         
                </Row>
                </transition>
            </Form>
        </div>
        <div class="box" style="margin-top: 30px;padding-bottom:20px">
            <div class='contentTop'>
                <Button @click="exportExcel" class="btn-export" icon="ios-download-outline" type="primary">导出</Button>
            </div>
            <Table :columns="columns1" :data="pageData" disabled-hover></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {EDFAULT_STARTTIME,EDFAULT_ENDTIME} from '@/util/index.js'; //搜索条件默认时间
import { loongTrackStatisticsDetail } from '@/api/landLoong-activity-manage/landLoong-activity-manage.js'
import { 
    protocolBapChannel,//BAP渠道
    landLoongIsLoong,
} from '@/util/ENUMS.js';
export default {
  name:"activity-partake-detail-keepAlive",

    data() {
        const that = this;
        const validateStart = (rule, value, callback) => { // 验证开始时间
            if (value == '') {
                callback(new Error('请输入开始时间'));
            } else {
                if (this.formData.queryEndTime !== '') {
                    // 对结束时间单独验证
                    this.$refs.form.validateField('queryEndTime');
                }
                callback();
            }
        }
        const validateEnd = (rule, value, callback) => { // 验证结束时间

            if (value == '') {
                callback(new Error('请输入结束时间'));
            } else {
                const str = new Date(this.formData.queryStartTime).getTime()
                const end = new Date(value).getTime();
                if (end < str) { // 判断开始时间是否大于结束时间
                    callback(new Error('开始时间大于结束时间'))
                } else {
                    callback();
                }

            }
        }
        return {
            formData: {
                queryStartTime: EDFAULT_STARTTIME,
                queryEndTime: EDFAULT_ENDTIME,                 
                joinCode:'',
                storeName:'',
                busiDept:'',
                workerName:'',
                workerPhone:'',
                salesRoute:'',
                salesDept:'',
                salesRegion:'',
                bapChannel:'',
                isLoong:''               
            },
            protocolBapChannel,
            page: 1,
            pageNum: 0,
            rule: {
                queryStartTime: [
                    { validator: validateStart }
                ],
                queryEndTime: [
                    { validator: validateEnd }
                ],
                queryTime: [
                    { required: true, message: '选择日期跟时间' }
                ]
            },
            columns1: [

            ],
            defaultList: [
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, 
                {
                    title: '销售部',
                    key: 'salesDept',
                    width: 120,                    
                    align: 'center'
                },
                {
                    title: '销售大区',
                    key: 'salesRegion',
                    width: 120,                    
                    align: 'center'
                },
                {
                    title: '营业部',
                    key: 'busiDept',
                    width: 120,                    
                    align: 'center'
                },
                {
                    title: '客户编号',
                    key: 'joinCode',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '门店名称',
                    key: 'storeName',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    key: 'userName',
                    width: 100,
                    align: 'center'
                },
               


                {
                    title: 'DSD/DSS',
                    key: 'storeNature',
                    width: 100,
                    align: 'center'
                },
                {
                    title: 'BAP渠道',
                    key: 'bapChannel',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '销售路线',
                    key: 'salesRoute',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '负责业代',
                    key: 'workerName',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '区域性质',
                    key: 'regionProp',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '客户地址',
                    key: 'address',
                    width: 200,
                    align: 'center'
                },
                {
                    title: '手机',
                    key: 'phone',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '执行状态',
                    key: 'loongStatus',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return landLoongIsLoong[params.row.loongStatus];
                    }
                },
            ],
            pageData: [],
            keyList: [],
            activityList: [],
            showQuery:false,
        }
    },
    created: function() {
        this.columns1 = this.columns1.concat(this.defaultList);
        this.init(1,10)
        
    },
    methods: {
        submit: function(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.page = 1;
                    this.init(this.page, 10)
                }
            })
        },
        changePage: function(size) {
            this.init(size, 10)
        },
        init: function(currentPage, pageSize) {
            var that = this;
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.formData.queryStartTime);
            data['queryEndTime'] = this.Global.createTime(this.formData.queryEndTime);
            this.Global.deleteEmptyProperty(data)
            data['brandId'] = 8;
            data['currentPage'] = currentPage;
            data['pageSize'] = pageSize;            
            loongTrackStatisticsDetail(data).then((res)=>{
                console.log(res)
                this.pageNum = res.data.items;
                this.page = res.data.page;
                this.columns1 = [];
                this.columns1 = this.columns1.concat(this.defaultList);
                let  datalist = res.data.datalist;
                let keyList = [];
                if(datalist.length>0){
                    var list = datalist[0].weekData;                    
                    for (var i in list) {                      
                        var obj = {
                            title: `第${list[i].weeks}周（${list[i].tag}）`,
                            key: `${list[i].weeks}uploadTime`,                            
                            align: 'center',
                            width: 150,
                        };
                        // var obj1 = {
                        //     title: `第${list[i].weeks}周达成率`,
                        //     key: `${list[i].weeks}uploadRate`,
                        //     align: 'center',
                        //     width: 110,                            
                        // };                       
                        this.columns1.push(obj);                        
                        // this.columns1.push(obj1);                                                
                        keyList.push(list[i]);                        
                    }
                } 
                this.keyList = keyList                                
                for (var j = 0; j < datalist.length; j++) {
                    for (var n = 0; n < this.keyList.length; n++) {
                        if( datalist[j].weekData ){
                            // datalist[j][`${this.keyList[n].weeks}uploadTime`] = this.keyList[n].uploadTime?'✅': '' ;                                                                                                                                                        
                            datalist[j][`${this.keyList[n].weeks}uploadTime`] = datalist[j].weekData[n]['uploadTime']?'✅': '' ;                                                                                                                                                                                    
                        } 
                    }
                }
                this.pageData = datalist;
            })
        },
        exportExcel: function() {
            var that = this;
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.formData.queryStartTime);
            data['queryEndTime'] = this.Global.createTime(this.formData.queryEndTime);
            this.Global.deleteEmptyProperty(data);
            data['brandId'] = 8;             
            var url = this.Global.getExportUrl('report/loongTrackStatisticsDetailExport.json', data);
            window.open(url);
        }
    }
}
</script>


