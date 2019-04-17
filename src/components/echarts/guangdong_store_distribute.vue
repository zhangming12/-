<style lang="less" scoped>
    @import '../../config/index.less';
   
    .box{
        width: 100%;
        // box-shadow: 0 0 10px 2px rgba(0,0,0,.1);
        margin: 0 auto;
        // padding: 30px 20px;
        padding-bottom: 0;
        background: #fff;
        position: relative;
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
    .echartBox{
        height: 800px;
        position: relative;
    }
    .iconBox{
        position: absolute;
        right: 10px;
        z-index: 10;
    }
</style>

<template>
  <div >
    <div class="box">
        <div class="iconBox">
            <router-link to='/bigGDStoreDistribute' v-if="bigStatus">
                <Icon type="arrow-expand" size="22" color="red" class='small '></Icon>
            </router-link>
            <router-link to='/GDStoreDistribute' v-else>
                <Icon type="arrow-shrink" size="22" color="red" class='big '></Icon>
            </router-link>
        </div>

        <div id="scancodeActivity" class="echartBox"></div>


    </div>  
  </div>
</template>

<script>

import echarts from 'echarts';
import 'echarts/map/js/china.js';
import {EDFAULT_STARTTIME,EDFAULT_ENDTIME} from '@/util/index.js'; //搜索条件默认时间

import guangdong from '@/assets/4401001.json' ;
//import guangdong from 'echarts/map/json/province/guangdong.json' ;

import { signLightMap } from '@/api/activity-manage/display-activity-manage.js';
export default {
    data () {  
          
        return {
            bigStatus: true,
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
        var path = this.$route.path;
        if( path == '/GDStoreDistribute' ){
            this.bigStatus = true;
        }else{
             this.bigStatus = false;
        }        
        setInterval(()=>{
            this.init()
        },5000)            
    },
    mounted(){
                      
        this.drawLine();  
        
    },
    methods: {
        drawLine(geoCoordMap={},data=[]){         
            this.myChart = echarts.init(document.getElementById('scancodeActivity'));
            
            this.myChart.showLoading();
            echarts.registerMap('guangdong', guangdong);
            this.myChart.hideLoading();

            var max = 480, min = 9; // todo 
            var maxSize4Pin = 100, minSize4Pin = 20;

            var convertData = function (data) {    
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value).concat(data[i].value1),                            
                        });
                    }
                }                              
                return res;
            };
            

        let option = {
            title: {
                text: 'CNY点亮签到 - 广州市',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#d40203'
                }
            },
            tooltip: {
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
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['credit_pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                show: false,
                min: 0,
                max: 10,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    // color: ['#3B5077', '#031525'] // 蓝黑
                    // color: ['#ffc0cb', '#800080'] // 红紫
                    // color: ['#3C3B3F', '#605C3C'] // 黑绿
                    // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                    // color: ['#23074d', '#cc5333'] // 紫红
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#1488CC', '#2B32B2'] // 浅蓝
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    color: ['#36160b', '#280c08','#441b0d'] // 蓝绿
                }
            },
            // toolbox: {
            //     show: true,
            //     orient: 'vertical',
            //     left: 'right',
            //     top: 'center',
            //     feature: {
            //             dataView: {readOnly: false},
            //             restore: {},
            //             saveAsImage: {}
            //             }
            // },
            geo: {
                show: true,
                map: 'guangdong',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#fff',//地图 区域边界
                    },
                    emphasis: {
                        areaColor: '#ffae00',
                    }
                }
            },
            series : [
                {
                    name: 'CNY',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {                               
                        switch (val[3]) {                    
                            // case 6:
                            //     return val[2] +20;//标志物 放大 底盘
                            //     break;
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
                        // return val[2] *5;//标志物 放大 底盘
                    },
                    //签到地址文字隐藏
                    // label: {
                    //     normal: {
                    //         formatter: '{b}',
                    //         position: 'right',
                    //         show: true
                    //     },
                    //     emphasis: {
                    //         show: true
                    //     }
                    // },
                    itemStyle: {
                        normal: {
                            color: '#fff'
                        }
                    }
                },
                {
                    type: 'map',
                    map: 'guangdong',
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: function (val) {                    
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a*min;
                        b = maxSize4Pin - a*max;
                        
                        return a*val[2]+b*2;//标志物 放大 气球
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
                    coordinateSystem: 'geo',
                    data: convertData(data.filter(v=>{                
                        if(v.value>0){                        
                            return v.value
                        }
                    })),
                    symbolSize: function (val) {
                        switch (val[3]) {
                            // case 6:
                            //     return val[2] +20;//标志物 放大 底盘
                            //     break;
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
                        // return val[2] *2;//选中圈的大小
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    //top5签到地址文字显示
                    // label: {
                    //     normal: {
                    //         formatter: '{b}',
                    //         position: 'right',
                    //         show: true
                    //     }
                    // },
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            shadowBlur: 10,
                            shadowColor: '#ff0101'
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
            // dataList['queryStartTime'] = "2018-01-01 00:00:00";
            // dataList['queryEndTime'] = "2018-01-22 23:59:59";
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


