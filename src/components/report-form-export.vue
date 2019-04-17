<style lang="less" scoped>
    @import '../config/index.less';
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
    //搜索条件 时间控件
    .ivu-date-picker{
        display: block;
    }
</style>

<template>
  <div id="Main">
      <h2 class="Title">中粮陈列日报导出</h2>
      <div class="box">
            <Form ref="form" :model="formData" :label-width="88" :rules="rule">
                <Row>
                    <Col span="10">                        
                        <Form-item label="上传时间" required prop="queryTime">
                            <DatePicker  v-model="defaultTime" placeholder="选择日期跟时间" type="datetimerange" ></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="1">
                        <Form-item label="品牌名称">
                            <Input v-model="brandName" disabled ></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div class="contentTop">
            <Button @click="displayRegUserTrackStatisticsExport"  icon="ios-download-outline"  type="primary">注册用户统计</Button>
            <Button @click="displayApplyUserTrackStatisticsExport"  icon="ios-download-outline"  type="primary">申请陈列用户统计</Button>
            <Dropdown @on-click="handleClick">
                <Button type="primary" >
                    已上传陈列视频用户统计
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list" >
                    <DropdownItem name="0">导出全部</DropdownItem>
                    <DropdownItem name="1">导出通过</DropdownItem>
                    <DropdownItem name="2">导出不通过</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Button @click="displayRegUserTrackDetailExport"  icon="ios-download-outline"  type="primary">客户注册明细</Button>
            <Button @click="displayApplyUserTrackDetailExport"  icon="ios-download-outline"  type="primary">已申请陈列明细	</Button>
            <Button @click="displayUploadRecordTrackDetailExport"  icon="ios-download-outline"  type="primary">已上传陈列视频审核明细</Button>            
        </div>  
        <div>
            <Dropdown @on-click="displayUploadUserTrackStatisticsForMonthExport">
                <Button type="primary" >
                    已上传陈列视频用户统计（带月份）
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list" >
                    <DropdownItem name="0">导出全部</DropdownItem>
                    <DropdownItem name="1">导出通过</DropdownItem>
                    <DropdownItem name="2">导出不通过</DropdownItem>
                </DropdownMenu>
            </Dropdown> 
            <Button @click="displayJoinGoodsRecordTrackDetailExport"  icon="ios-download-outline"  type="primary">进货量明细</Button>          
        </div>      
      </div>
  </div>
</template>

<script>
import {EDFAULT_STARTTIME,EDFAULT_ENDTIME,EDFAULT_TIME} from '@/util/index.js'; //搜索条件默认时间
export default {
    data () {
        const that = this;
        return {
            formData: {
                brandId:8,            
            },
            defaultTime:[ '2017-12-01 00:00:00' , `${EDFAULT_TIME} 17:00:00`  ],
            rule: {
                queryTime: [
                    { required: true, message: '选择日期跟时间' }
                ]
            },
            brandName:'中粮可口可乐饮料（河北）有限公司'
        }
    },
    methods: {
        displayRegUserTrackStatisticsExport(){
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.defaultTime[0]);
            data['queryEndTime'] = this.Global.createTime(this.defaultTime[1]);           
            var url = this.Global.getExportUrl('report/displayRegUserTrackStatisticsExport.json',data);
            window.open(url);
        },
        displayApplyUserTrackStatisticsExport(){
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.defaultTime[0]);
            data['queryEndTime'] = this.Global.createTime(this.defaultTime[1]);           
            
            var url = this.Global.getExportUrl('report/displayApplyUserTrackStatisticsExport.json',data);
            window.open(url);
        },
        handleClick(name){
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.defaultTime[0]);
            data['queryEndTime'] = this.Global.createTime(this.defaultTime[1]);  
            switch (name) {
                case '0':
                    data['checkStatus'] = 0;
                    break;
                case '1':
                    data['checkStatus'] = 1;
                    break;
                case '2':
                    data['checkStatus'] = 2;
                    break;
                default:
                    break;
            }
            
            var url = this.Global.getExportUrl('report/displayUploadUserTrackStatisticsExport.json',data);
            window.open(url);
        },
        displayRegUserTrackDetailExport(){
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.defaultTime[0]);
            data['queryEndTime'] = this.Global.createTime(this.defaultTime[1]);           
            
            var url = this.Global.getExportUrl('report/displayRegUserTrackDetailExport.json',data);
            window.open(url);
        },
        displayApplyUserTrackDetailExport(){
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.defaultTime[0]);
            data['queryEndTime'] = this.Global.createTime(this.defaultTime[1]);           
            
            var url = this.Global.getExportUrl('report/displayApplyUserTrackDetailExport.json',data);
            window.open(url);
        },
        displayUploadRecordTrackDetailExport(){
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.defaultTime[0]);
            data['queryEndTime'] = this.Global.createTime(this.defaultTime[1]);           
            
            var url = this.Global.getExportUrl('report/displayUploadRecordTrackDetailExport.json',data);
            window.open(url);
        },
        displayUploadUserTrackStatisticsForMonthExport(name){
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.defaultTime[0]);
            data['queryEndTime'] = this.Global.createTime(this.defaultTime[1]);              
            switch (name) {
                case '0':
                    data['checkStatus'] = 0;
                    break;
                case '1':
                    data['checkStatus'] = 1;
                    break;
                case '2':
                    data['checkStatus'] = 2;
                    break;
                default:
                    break;
            }
            
            var url = this.Global.getExportUrl('report/displayUploadUserTrackStatisticsForMonthExport.json',data);
            window.open(url);
        },
        displayJoinGoodsRecordTrackDetailExport(){
            var data = this.Global.JsonChange(this.formData);
            data['queryStartTime'] = this.Global.createTime(this.defaultTime[0]);
            data['queryEndTime'] = this.Global.createTime(this.defaultTime[1]);           
            
            var url = this.Global.getExportUrl('report/displayJoinGoodsRecordTrackDetailExport.json',data);
            window.open(url);
        }
    }
}
</script>


