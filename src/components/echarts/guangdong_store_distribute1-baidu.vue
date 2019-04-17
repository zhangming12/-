<style lang="less" scoped>
    @import '../../config/index.less';
   
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
    .center-title{
        text-indent: 1%;
        padding: 10px 0;
        font-size: 16px;
    }
</style>

<template>
  <div id="Main">
    <h2 class="Title" id="Title">CNY点亮签到广州分布统计</h2>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div id="scancodeActivity" :style="{  height: '800px'}"></div>
    </div>  
  </div>
</template>

<script>

import echarts from 'echarts';
import 'echarts/map/js/china.js';
import {EDFAULT_STARTTIME,EDFAULT_ENDTIME} from '@/util/index.js'; //搜索条件默认时间
import guangdong from '@/assets/4401001.json' ;
//import guangdong from 'echarts/map/json/province/guangdong.json' ;
require('echarts');
require('echarts/extension/bmap/bmap');

import { signLightMap } from '@/api/activity-manage/display-activity-manage.js';
export default {
    data () {    
        return {
            formData: {
                queryTime: [ EDFAULT_STARTTIME , EDFAULT_ENDTIME ]
            },
            rule: {                
                queryTime: [
                    { required: true, message: '选择日期跟时间' }
                ]
            },
            myChart:'',   
        
        }
    },
    created: function(){  
        this.init()       
        setInterval(()=>{
            this.init()
        },30000)            
    },
    mounted(){             
        this.drawLine();                
    },
    methods: {
        drawLine(geoCoordMap={},data=[]){

        this.myChart = echarts.init(document.getElementById('scancodeActivity'));

        var max = 480, min = 9; // todo 
        var maxSize4Pin = 100, minSize4Pin = 20;
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value).concat(data[i].value1)
                    });
                }
            }            
            return res;
        };      
        let option = {
            backgroundColor: '#404a59',
            title: {
                text: 'CNY点亮签到 - 广州市',
                left: 'center',
                textStyle: {
                    color: '#d40203'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: function (params) {                              
                    if(typeof(params.value)[2] == "undefined"){
                    //区域城市
                    //   return params.name + ' : ' + params.value;
                        return params.name ;            
                    }else{
                    //签到地点
                    //   params.name + ' : ' + '计划10人，实到7人'
                        return params.name + ' : 计划' + params.value[2] + '人，实到' + params.value[3] + '人';//图标移上去显示内容
                    }
                }
            },
            bmap: {
                center: [113.272006,23.146502],
                zoom: 10,
                roam: true,
                mapStyle: {
                    styleJson: [
                         
                    
                    {
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "visibility": "off",
                            "lightness": 1
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },                                                                              
                    {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                          "visibility": "off"
                        }
                    }                                       
            ]                       
                }
            },
            series : [
                {
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: convertData(data),
                    symbolSize: function (val) {
                        
                        switch (val[3]) {                                                       
                                    case 5:
                                        return val[3] +20;//标志物 放大 底盘
                                        break;
                                    case 4:
                                        return val[3] *6;//标志物 放大 底盘
                                    case 3:
                                        return val[3] *7;//标志物 放大 底盘
                                        break;
                                    case 2:
                                        return val[3] *8;//标志物 放大 底盘
                                        break;
                                    case 1:
                                        return val[3] *14;//标志物 放大 底盘
                                        break;
                                    case 0:
                                        return val[3];//标志物 放大 底盘
                                        break;
                                    default:
                                        return val[3] +20;//标志物 放大 底盘
                                        break;
                                }
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    symbol: 'pin',
                    symbolSize: function (val) {                    
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a*min;
                        b = maxSize4Pin - a*max;                                
                        return a*val[2]+b*2.5;//标志物 放大 气球
                    },                
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 12,
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#d40203', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(data),
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: convertData(data.filter(v=>{                               
                        if(v.value>0){                        
                            return v.value
                        }
                    })),
                    symbolSize: function (val) {
                        switch (val[3]) {                                    
                            case 5:
                                return val[3] +15;//标志物 放大 底盘
                                break;
                            case 4:
                                return val[3] *6;//标志物 放大 底盘
                            case 3:
                                return val[3] *7;//标志物 放大 底盘
                                break;
                            case 2:
                                return val[3] *8;//标志物 放大 底盘
                                break;
                            case 1:
                                return val[3] *14;//标志物 放大 底盘
                                break;
                            case 0:
                                return val[3];//标志物 放大 底盘
                                break;
                            default:
                                return val[3] +15;//标志物 放大 底盘
                                break;
                        }
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ff9804',
                            shadowBlur: 10,
                            shadowColor: '#ff9804'
                        }
                    },
                    zlevel: 1
                },
                
            ]
        };  
            this.myChart.setOption(option);                               
        },
        init(){
            var dataList = this.Global.JsonChange(this.formData);
            dataList['queryStartTime'] = EDFAULT_STARTTIME;
            dataList['queryEndTime'] = EDFAULT_ENDTIME;
            delete dataList.queryTime
            this.Global.deleteEmptyProperty(dataList);
            signLightMap(dataList).then(res=>{                
                if(res.data && res.status === 1){
                    let dataList = res.data;                    
                    let geoCoordMap = {};
                    let arrList = []
                    for (var x of dataList){
                        let signLocate = x.signLocate.split(',').reverse()
                        signLocate[0]=Number(signLocate[0])
                        signLocate[1]=Number(signLocate[1])
                        geoCoordMap[x.signName] = signLocate;  
                        let obj={};
                        let signName = x.signName;
                        obj['name'] = x.signName;
                        obj['value'] = x.planCount; //计划签到
                        obj['value1'] = x.actuallyCount; //实际签到  
                        //obj['value1'] = x.planCount; //计划签到
                        //obj['value'] = x.actuallyCount; //实际签到                                             
                        arrList.push(obj)                     
                    }                    
                    this.drawLine(geoCoordMap,arrList);                 
                }                
            })
        },                        
    }
}
</script>


