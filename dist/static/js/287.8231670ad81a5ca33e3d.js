webpackJsonp([287],{"+Ou1":function(a,t,e){(a.exports=e("FZ+f")(!1)).push([a.i,'.box[data-v-186430a6]{width:100%;margin:0 auto;padding:0;background:#fff;min-width:1135px}button[data-v-186430a6]{outline:none;list-style:none;border:0;cursor:pointer}button#success[data-v-186430a6]{color:#19be6b;background:transparent}button#fail[data-v-186430a6]{color:#ed3f14;background:transparent}button#primary[data-v-186430a6]{color:#ff8a34;background:transparent}button.down[data-v-186430a6],button.up[data-v-186430a6]{color:#ff8a34}button.down[data-v-186430a6]:after{content:"\\F116"}button.up[data-v-186430a6]:after{content:"\\F124"}#bottonFather[data-v-186430a6]{display:flex;justify-content:center;align-items:center}.lookDetail[data-v-186430a6]{background:#febf00;border-color:#febf00;color:#fff}.ml20[data-v-186430a6]{margin-left:20px}.w18[data-v-186430a6]{width:17.5%}.w10[data-v-186430a6]{width:12.5%}.w36[data-v-186430a6]{width:35%}.fs12[data-v-186430a6]{font-size:12px}.fs14[data-v-186430a6]{font-size:14px}.fs16[data-v-186430a6]{font-size:16px}.fs28[data-v-186430a6]{font-size:28px}.text-center[data-v-186430a6]{text-align:center}.block[data-v-186430a6]{display:block}.container[data-v-186430a6]:after{display:block;clear:both;content:"";visibility:hidden;height:0}.container[data-v-186430a6]{zoom:1}.text-overflow[data-v-186430a6]{display:inline-block;max-width:80%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}input[data-v-186430a6]::-ms-input-placeholder{text-align:center!important}input[data-v-186430a6]::-webkit-input-placeholder{text-align:center!important}.displayGroupPrimary[data-v-186430a6]{color:#ff8a34}.demo-spin-icon-load[data-v-186430a6]{animation:ani-demo-spin-data-v-186430a6 1s linear infinite}@keyframes ani-demo-spin-data-v-186430a6{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}to{transform:rotate(1turn)}}#Main[data-v-186430a6]{height:100%}#Main .main-container[data-v-186430a6]{padding-top:10px;min-height:100%;position:relative;background:#fff;padding-bottom:60px;min-width:1135px}#Main .main-container .page-box[data-v-186430a6]{overflow:hidden;position:absolute;bottom:10px;right:10px}#Main .main-container .searchBox[data-v-186430a6]{overflow:hidden}#Main .main-container .searchBox .search-left[data-v-186430a6],#Main .main-container .searchBox .search-right[data-v-186430a6]{width:48%}#Main .main-container .searchBox .search-left button[data-v-186430a6]{outline:none;border:none;width:60px;height:30px;line-height:30px;background:#fff;margin-left:8px;cursor:pointer;color:#ff8a34}#Main .main-container .searchBox .search-right[data-v-186430a6]{width:52%}#Main .main-container .searchBox .search-right img[data-v-186430a6]{cursor:pointer;margin-left:6px}#Main .main-container .numColor[data-v-186430a6]{color:#ff8a34}.main-container[data-v-186430a6]{width:100%;height:100%;background:#fff;padding-bottom:0!important}.main-container .box[data-v-186430a6]{width:100%;padding:10px;padding-top:0;overflow:hidden}.main-container .box .container .w18[data-v-186430a6]{width:50%}.main-container .box .container .w16[data-v-186430a6]{width:35%}.main-container .box #mapContainer[data-v-186430a6]{width:100%;height:300px;margin-left:10px}.search-box p[data-v-186430a6]{line-height:24px;margin-left:10px}.box[data-v-186430a6]{padding:0 10px}.box .title[data-v-186430a6]{font-weight:700;font-size:14px;text-align:40px;padding-left:10px;display:block;margin-bottom:20px}.modify[data-v-186430a6]{margin-top:20px}.addressBox p[data-v-186430a6]{line-height:40px;text-indent:30px}.addressBox .sureBtn[data-v-186430a6]{margin:10px}',""])},BJoH:function(a,t,e){var n=e("+Ou1");"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);e("rjj0")("1150aac6",n,!0,{})},Cdx3:function(a,t,e){var n=e("sB3e"),o=e("lktj");e("uqUo")("keys",function(){return function(a){return o(n(a))}})},DZzE:function(a,t,e){"use strict";var n=e("fZjL"),s=e.n(n);t.a={name:"modify-store-address",data:function(){return{formData:{areaName:""},showData:{joinCode:"",storeId:"",storeName:"",phone:"",oldAddress:""},newAddress:"",province:null,city:null,area:null,signName:null,id:null,signAddress:null,signLocate:null,lng:null,locate:[]}},computed:{},created:function(){if(s()(this.$route.query).length){var a=this.$route.query,t=a.storeId,e=a.storeName,n=a.joinCode,o=a.address,i=a.phone,r=a.locate;this.showData={storeId:t,storeName:e,joinCode:n,oldAddress:o,phone:i},r&&(this.locate=r.split(",").reverse())}},mounted:function(){var e=this;this.locate.length?this.queryLocate():this.Global.doPost("cnySign/getLocate.json",{areaName:this.showData.oldAddress},function(a){if(a){var t=a.split(",").reverse();e.locate=t,e.queryLocate()}})},filters:{},methods:{queryLocate:function(){var n=this;this.Global.doPost("store/queryThisLocateAndFirstLocate.json",this.showData.storeId,function(a){if(a){var t=a.firstLocate?a.firstLocate:"",e=a.thisLocate?a.thisLocate:"";n.thisLocate=e.split(",").reverse(),n.firstLocate=t.split(",").reverse()}n.mapInit(n.locate,n.firstLocate,n.thisLocate)})},sureModifyAddress:function(){var t=this;if(!this.signLocate||!this.signLocate)return this.$Message.error("请选择本店位置"),!1;var a={storeId:this.showData.storeId,locate:this.signLocate,address:this.newAddress};this.Global.doPost("store/doSettingStore.json",a,function(a){t.$Message.success("修改成功"),setTimeout(function(){t.$router.push({path:"/customerInformate"})},1e3)})},submit:function(){var e=this;if(!this.formData.areaName)return this.$Message.info("请输入地址"),!1;var a={};a.areaName=this.formData.areaName,this.Global.doPost("cnySign/getLocate.json",a,function(a){if(a){var t=a.split(",").reverse();e.mapInit(e.locate,e.firstLocate,e.thisLocate,t)}})},mapInit:function(a){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[],e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[],n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:[],o=this,i=new BMap.Map("mapContainer"),r=new BMap.Point(Number(a[0]),Number(a[1]));i.centerAndZoom(r,15);var s=new BMap.Geocoder;var d=new BMap.Icon("https://hbrand.oss-cn-hangzhou.aliyuncs.com/ecuda/image/pos-red.png",new BMap.Size(32,32)),c=new BMap.Icon("https://hbrand.oss-cn-hangzhou.aliyuncs.com/ecuda/image/pos-green.png",new BMap.Size(32,32));function l(a){a.domEvent.stopPropagation(),o.lng&&y(o.lng);var t=[a.point.lng,a.point.lat];o.signLocate=t.reverse().join();s.getLocation(a.point,function(a){o.newAddress=a.address})}if(0<t.length){var p=new BMap.Point(Number(t[0]),Number(t[1])),v=new BMap.Icon("https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-first.jpg",new BMap.Size(48,55)),u=new BMap.Marker(p,{icon:v});u.addEventListener("click",function(a){l(a)}),i.addOverlay(u)}if(0<e.length){var f=new BMap.Point(Number(e[0]),Number(e[1])),h=new BMap.Icon("https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-this.jpg",new BMap.Size(48,55)),m=new BMap.Marker(f,{icon:h});m.addEventListener("click",function(a){l(a)}),i.addOverlay(m)}if(0<a.length){var g=new BMap.Point(Number(a[0]),Number(a[1])),b=new BMap.Icon("https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-store.jpg",new BMap.Size(48,55)),w=new BMap.Marker(g,{icon:b});i.addOverlay(w),w.addEventListener("click",function(a){l(a)})}if(n&&n.length){var x=new BMap.Point(Number(n[0]),Number(n[1])),M=new BMap.Marker(x,{icon:d});i.addOverlay(M),M.addEventListener("click",function(a){l(a)})}function y(a){for(var t=i.getOverlays(),e=0;e<t.length;e++)if("[object Marker]"==t[e].toString()&&t[e].getPosition().lng==a)return i.removeOverlay(t[e]),!1}i.centerAndZoom(r,18),i.enableScrollWheelZoom(!0),i.addEventListener("click",function(a){o.lng&&y(o.lng);var t=[a.point.lng,a.point.lat];o.lng=a.point.lng,o.signLocate=t.reverse().join();var e=new BMap.Point(Number(a.point.lng),Number(a.point.lat)),n=new BMap.Marker(e,{icon:c});i.addOverlay(n);s.getLocation(a.point,function(a){o.newAddress=a.address})})}}}},MlGG:function(a,t,e){"use strict";var n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"Main"}},[e("div",{staticClass:"main-container"},[e("div",{staticClass:"box"},[e("div",{staticClass:"title"},[t._v("店铺信息")]),t._v(" "),e("div",{staticClass:"main-box"},[e("Row",[e("Col",{attrs:{span:"5",offset:"1"}},[e("span",[t._v("客户编号：")]),t._v(" "),e("span",[t._v(t._s(t.showData.joinCode))])]),t._v(" "),e("Col",{attrs:{span:"6"}},[e("span",[t._v("店铺ID：")]),t._v(" "),e("span",[t._v(t._s(t.showData.storeId))])]),t._v(" "),e("Col",{attrs:{span:"6"}},[e("span",[t._v("店铺名称：")]),t._v(" "),e("span",[t._v(t._s(t.showData.storeName))])]),t._v(" "),e("Col",{attrs:{span:"6"}},[e("span",[t._v("手机号：")]),t._v(" "),e("span",[t._v(t._s(t.showData.phone))])])],1)],1)]),t._v(" "),e("div",{staticClass:"box modify"},[e("div",{staticClass:"title"},[t._v("修改信息")]),t._v(" "),e("div",{staticClass:"search-box"},[e("Form",{ref:"form",staticStyle:{"margin-top":"10px"},attrs:{model:t.formData,"label-width":10}},[e("div",{staticClass:"container"},[e("div",{staticClass:"btn-left w18"},[e("Form-item",{attrs:{required:""}},[e("Input",{attrs:{clearable:"",placeholder:"请输入地址"},model:{value:t.formData.areaName,callback:function(a){t.$set(t.formData,"areaName","string"==typeof a?a.trim():a)},expression:"formData.areaName"}})],1)],1),t._v(" "),e("div",{staticClass:"btn-left w10",staticStyle:{"margin-left":"20px"}},[e("div",{staticClass:"searchBox"},[e("div",{staticClass:"search-right",on:{click:function(a){t.submit("form")}}},[e("Button",{attrs:{shape:"circle",icon:"ios-search",type:"primary"}},[t._v("搜索地址")])],1)])])])])],1),t._v(" "),e("div",{attrs:{id:"mapContainer"}})]),t._v(" "),e("div",{staticClass:"box addressBox"},[e("p",[t._v("原地址："+t._s(t.showData.oldAddress))]),t._v(" "),e("p",[t._v("选定新地址：\n        "),e("Input",{staticStyle:{width:"400px"},attrs:{placeholder:"新地址"},model:{value:t.newAddress,callback:function(a){t.newAddress=a},expression:"newAddress"}})],1),t._v(" "),e("Button",{staticClass:"btn-right sureBtn",attrs:{type:"primary"},on:{click:t.sureModifyAddress}},[t._v("确定修改")])],1)])])},staticRenderFns:[]};t.a=n},fZjL:function(a,t,e){a.exports={default:e("jFbC"),__esModule:!0}},jFbC:function(a,t,e){e("Cdx3"),a.exports=e("FeBl").Object.keys},uqUo:function(a,t,e){var o=e("kM2E"),i=e("FeBl"),r=e("S82l");a.exports=function(a,t){var e=(i.Object||{})[a]||Object[a],n={};n[a]=t(e),o(o.S+o.F*r(function(){e(1)}),"Object",n)}},vlZ1:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("DZzE"),o=e("MlGG");var i=function(a){e("BJoH")},r=e("VU/8")(n.a,o.a,!1,i,"data-v-186430a6",null);t.default=r.exports}});