webpackJsonp([303],{"/TSP":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".box[data-v-15007fb4]{box-shadow:0 0 10px 2px rgba(0,0,0,.1);padding:30px 20px;padding-bottom:0;overflow:hidden;background:#fff}.ivu-table-row[data-v-15007fb4]{box-shadow:0 0 5px 2px rgba(0,0,0,.1)!important;transform:translateY(0)}",""])},"1CCc":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("4FhF"),n=a("ox6D");var i=function(t){a("wQTB")},r=a("VU/8")(o.a,n.a,!1,i,"data-v-15007fb4",null);e.default=r.exports},"4FhF":function(t,e,a){"use strict";var o=a(8),n=a.n(o);e.a={name:"day-scancode-time-keepAlive",props:{dayScanCodeTimeDataList:Object},watch:{dayScanCodeTimeDataList:function(t){var e=t.scanCount.slice(0,12),a=t.scanCount.slice(12,24),o=Math.max.apply(Math,e),n=Math.max.apply(Math,a),i=e.indexOf(o),r=a.indexOf(n)+12;if(t){var s=t.hour,c=t.scanCount;this.myChart.setOption({xAxis:{type:"category",boundaryGap:!1,data:s},series:[{name:"门店扫码量",type:"line",smooth:!0,data:c,markArea:{data:[[{name:"早高峰",xAxis:i-1},{xAxis:i+1}],[{name:"晚高峰",xAxis:r-1},{xAxis:r+1}]]}}],visualMap:{show:!1,dimension:0,pieces:[{lte:i-1,color:"green"},{gt:i-1,lte:i+1,color:"red"},{gt:i+1,lte:r-1,color:"green"},{gt:r-1,lte:r+1,color:"red"},{gt:r+1,color:"green"}]}})}}},data:function(){return{myChart:""}},components:{},created:function(){},mounted:function(){this.drawLine()},methods:{drawLine:function(){this.myChart=n.a.init(document.getElementById("weekScanCodeTime"));this.myChart.setOption({title:{text:"日扫码时段分布"},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},toolbox:{show:!0,feature:{}},xAxis:{type:"category",boundaryGap:!1,data:[]},yAxis:{type:"value",axisPointer:{snap:!0}},visualMap:{show:!1,dimension:0,pieces:[{lte:7,color:"green"},{gt:7,lte:10,color:"red"},{gt:8,lte:17,color:"green"},{gt:17,lte:21,color:"red"},{gt:21,color:"green"}]},series:[{name:"门店扫码量",type:"line",smooth:!0,data:[],markArea:{data:[[{name:"早高峰",xAxis:"07"},{xAxis:"10"}],[{name:"晚高峰",xAxis:"17"},{xAxis:"21"}]]}}]})}}}},8:function(t,e,a){t.exports=a(0)(175)},ox6D:function(t,e,a){"use strict";var o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"Main"}},[e("div",{staticClass:"box"},[e("div",{style:{height:"380px"},attrs:{id:"weekScanCodeTime"}})])])},staticRenderFns:[]};e.a=o},wQTB:function(t,e,a){var o=a("/TSP");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("e74b66ce",o,!0,{})}});