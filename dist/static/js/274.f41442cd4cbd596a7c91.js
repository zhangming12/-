webpackJsonp([274],{BHQ5:function(t,e){var s;s=Crypto.util,Crypto.HMAC=function(t,e,a,r){for(var o=a=a.length>4*t._blocksize?t(a,{asBytes:!0}):s.stringToBytes(a),n=a.slice(0),i=0;i<4*t._blocksize;i++)o[i]^=92,n[i]^=54;var d=t(s.bytesToString(o)+t(s.bytesToString(n)+e,{asString:!0}),{asBytes:!0});return r&&r.asBytes?d:r&&r.asString?s.bytesToString(d):s.bytesToHex(d)}},DH0U:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,'.box[data-v-1ede32bd]{padding:0;min-width:1135px}button[data-v-1ede32bd]{outline:none;list-style:none;border:0;cursor:pointer}button#success[data-v-1ede32bd]{color:#19be6b;background:transparent}button#fail[data-v-1ede32bd]{color:#ed3f14;background:transparent}button#primary[data-v-1ede32bd]{color:#ff8a34;background:transparent}button.down[data-v-1ede32bd],button.up[data-v-1ede32bd]{color:#ff8a34}button.down[data-v-1ede32bd]:after{content:"\\F116"}button.up[data-v-1ede32bd]:after{content:"\\F124"}#bottonFather[data-v-1ede32bd]{display:flex;justify-content:center;align-items:center}.lookDetail[data-v-1ede32bd]{background:#febf00;border-color:#febf00;color:#fff}.ml20[data-v-1ede32bd]{margin-left:20px}.w18[data-v-1ede32bd]{width:17.5%}.w10[data-v-1ede32bd]{width:12.5%}.w36[data-v-1ede32bd]{width:35%}.fs12[data-v-1ede32bd]{font-size:12px}.fs14[data-v-1ede32bd]{font-size:14px}.fs16[data-v-1ede32bd]{font-size:16px}.fs28[data-v-1ede32bd]{font-size:28px}.text-center[data-v-1ede32bd]{text-align:center}.block[data-v-1ede32bd]{display:block}.container[data-v-1ede32bd]:after{display:block;clear:both;content:"";visibility:hidden;height:0}.container[data-v-1ede32bd]{zoom:1}.text-overflow[data-v-1ede32bd]{display:inline-block;max-width:80%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}input[data-v-1ede32bd]::-ms-input-placeholder{text-align:center!important}input[data-v-1ede32bd]::-webkit-input-placeholder{text-align:center!important}.displayGroupPrimary[data-v-1ede32bd]{color:#ff8a34}.demo-spin-icon-load[data-v-1ede32bd]{animation:ani-demo-spin-data-v-1ede32bd 1s linear infinite}@keyframes ani-demo-spin-data-v-1ede32bd{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}to{transform:rotate(1turn)}}#Main[data-v-1ede32bd]{height:100%}#Main .main-container[data-v-1ede32bd]{padding-top:10px;min-height:100%;position:relative;background:#fff;padding-bottom:60px;min-width:1135px}#Main .main-container .page-box[data-v-1ede32bd]{overflow:hidden;position:absolute;bottom:10px;right:10px}#Main .main-container .searchBox[data-v-1ede32bd]{overflow:hidden}#Main .main-container .searchBox .search-left[data-v-1ede32bd],#Main .main-container .searchBox .search-right[data-v-1ede32bd]{width:48%}#Main .main-container .searchBox .search-left button[data-v-1ede32bd]{outline:none;border:none;width:60px;height:30px;line-height:30px;background:#fff;margin-left:8px;cursor:pointer;color:#ff8a34}#Main .main-container .searchBox .search-right[data-v-1ede32bd]{width:52%}#Main .main-container .searchBox .search-right img[data-v-1ede32bd]{cursor:pointer;margin-left:6px}#Main .main-container .numColor[data-v-1ede32bd]{color:#ff8a34}.box[data-v-1ede32bd]{width:100%;box-shadow:0 0 10px 2px rgba(0,0,0,.1);margin:0 auto;padding:30px 20px;padding-bottom:0;background:#fff;overflow:hidden}.ivu-table-row[data-v-1ede32bd]{box-shadow:0 0 5px 2px rgba(0,0,0,.1)!important;transform:translateY(0)}#imgBox[data-v-1ede32bd]{height:120px;display:table;line-height:120px}#imgBox span[data-v-1ede32bd]{display:inline-block;width:80px}#imgBox .changeImg[data-v-1ede32bd]{width:150px;height:120px;display:table-cell;vertical-align:middle;transform:translateX(20px);border:1px solid #efefef}#imgBox .changeImg img[data-v-1ede32bd]{width:150px;height:120px;display:block}#imgBox p[data-v-1ede32bd]{display:inline-block}footer[data-v-1ede32bd]{text-align:center;margin:40px 0 20px}',""])},LTBv:function(t,e){!function(){var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";window.Crypto={};var n=Crypto.util={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&n.rotl(t,8)|4278255360&n.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=n.endian(t[e]);return t},randomBytes:function(t){for(var e=[];0<t;t--)e.push(Math.floor(256*Math.random()));return e},stringToBytes:function(t){for(var e=[],a=0;a<t.length;a++)e.push(t.charCodeAt(a));return e},bytesToString:function(t){for(var e=[],a=0;a<t.length;a++)e.push(String.fromCharCode(t[a]));return e.join("")},stringToWords:function(t){for(var e=[],a=0,r=0;a<t.length;a++,r+=8)e[r>>>5]|=t.charCodeAt(a)<<24-r%32;return e},bytesToWords:function(t){for(var e=[],a=0,r=0;a<t.length;a++,r+=8)e[r>>>5]|=t[a]<<24-r%32;return e},wordsToBytes:function(t){for(var e=[],a=0;a<32*t.length;a+=8)e.push(t[a>>>5]>>>24-a%32&255);return e},bytesToHex:function(t){for(var e=[],a=0;a<t.length;a++)e.push((t[a]>>>4).toString(16)),e.push((15&t[a]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],a=0;a<t.length;a+=2)e.push(parseInt(t.substr(a,2),16));return e},bytesToBase64:function(t){if("function"==typeof btoa)return btoa(n.bytesToString(t));for(var e,a=[],r=0;r<t.length;r++)switch(r%3){case 0:a.push(o.charAt(t[r]>>>2)),e=(3&t[r])<<4;break;case 1:a.push(o.charAt(e|t[r]>>>4)),e=(15&t[r])<<2;break;case 2:a.push(o.charAt(e|t[r]>>>6)),a.push(o.charAt(63&t[r])),e=-1}for(null!=e&&-1!=e&&a.push(o.charAt(e));a.length%4!=0;)a.push("=");return a.join("")},base64ToBytes:function(t){if("function"==typeof atob)return n.stringToBytes(atob(t));t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],a=0;a<t.length;a++)switch(a%4){case 1:e.push(o.indexOf(t.charAt(a-1))<<2|o.indexOf(t.charAt(a))>>>4);break;case 2:e.push((15&o.indexOf(t.charAt(a-1)))<<4|o.indexOf(t.charAt(a))>>>2);break;case 3:e.push((3&o.indexOf(t.charAt(a-1)))<<6|o.indexOf(t.charAt(a)))}return e}};Crypto.mode={}}()},M0tS:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzVDQUQwMjM5QjE1MTFFNzlFNEI5QUJEMDUzNEQwRTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzVDQUQwMjQ5QjE1MTFFNzlFNEI5QUJEMDUzNEQwRTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNUNBRDAyMTlCMTUxMUU3OUU0QjlBQkQwNTM0RDBFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNUNBRDAyMjlCMTUxMUU3OUU0QjlBQkQwNTM0RDBFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pja9Sl4AAAReSURBVHja7J3bc9JAFMZPSEi4hPut9CJq1da++P8/+Tf45IyO+qAz1apVKdaCtHgOItohDLnsJpJ83/BAywbYXzbfOWd30xqzl08J0q8cEAA0QEMADdAADQE0QEMADdAADQE0QEMADdAADQE0QEMADdCZlrXh9dNnYORL/SfRQN9cgyGsA6AhgAZogIYAGqAhgAZogIYAGqAhgAboVMvK2LgyqVAnp0qWLT9OJzQe0tXXGGaDswTa7VFlR1gvZZep1KCbfbp4T6MPAB1ZhkHNQypU1w7z2h45FTp/RbMZPDqC6oO1lJfiBvW7CIYRxI5cavpqyTbiVAE6rNiX/avaB+hw/bPIcQO05/CYswA6uPKlOA4B6FvJnP+LILWgGUd1V8s7h6hEZtP0gq7uScjSEfGnV4EP+XmVUtDsieW2PGncIUP197me0OQyCOVLOSSdoOsHiyemTbV99e8fqLa+0FWIJw261JKMaike2lwKq9WPL3Q19NVyfCGNUwjamE8yrJbLyg3k/M1mA+EGn1+ntATnTGM1l7JsiY1qNbumTy9o9NF7zoh/yS9xg5nGydLkZu84Brpt75fcjlzCk5FS1jf07S19P6PifELDtBehUuzinKZj3d1NDrTEPWPtq40BnT0XOoqzvbFMPfMj/lIhoRjY3DAFYTn65neSqcmSiIE5Xy7sdm8lJAAdPAb2ycz7OSFiIIYB0OGCQpHKXd+NC7rmQNIPmuvAQIOUDSRfBuiAktTKDXhMSgwkRtAcA8NNZeQLVOkDtG9VdvzFQM9je5oWPlIHmsOa24tyOYiBkAHQPurAiD6bLwZbz84i6GJ98/4Vn+aztQaiH3ToGOjxVoaswmyngegHzXHs91SZEvGIrvQAejUGOtFioOeZ64tfA/RKDFT9EWwg9QFA/6NCTR46ZJfUXyjbCprHnY4l7aWqfcnNAVpGHBu01mSmMcg8aNOJo7iwyzK3l2nQOmKgt4HsBjAQp0KdY31bzWMHzT0p1mL6+j4NhJvV71D7oUTR9oP5YoKx5aAl99qPtQcbDYRPfO9ksb1vWcp3HqksoxIAzX2OPxngEWo6awbyQIbwKlM+Pd1jXdmndtDcn0Rm6D0NZDGQW+u7blHrcL4nzdg20PyljYQ2ijgulTt/+mQKd8+B7JmGxmIj6rhwTC82kkyg+DSzgbAbdE9kk2ogl+8+lluXdUrVljCuAw8SzlT5YpKxGWq1jC+C1n3Z6jh8p+nmWUUj2u3IEmriCr0muexF+8g7rv4XoNngUrNPjhNtzkY0eKAK0JxdGSalRmwjzXtS4CjdTBIZtO36vdN6u8QFTudI4bxYRNDG31t90qd8SbIRRTaSi3rat3BVKVgmo8hGoqV3/PHDU8qCnJr8RaDEQI/OCEqgBIcAGqABGgJogIYAGqAzok0FS84Eo1hAb/qnZhCsA6ABGgJogIYAGqABGgJogIYAGqABGgJogIYAGqABGgJogIZ86JcAAwBsOona4U2NtgAAAABJRU5ErkJggg=="},"R/Rc":function(t,e,a){"use strict";var l={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(t){var e,a,r,o,n,i,d,s="",c=0;for(t=l._utf8_encode(t);c<t.length;)o=(e=t.charCodeAt(c++))>>2,n=(3&e)<<4|(a=t.charCodeAt(c++))>>4,i=(15&a)<<2|(r=t.charCodeAt(c++))>>6,d=63&r,isNaN(a)?i=d=64:isNaN(r)&&(d=64),s=s+this._keyStr.charAt(o)+this._keyStr.charAt(n)+this._keyStr.charAt(i)+this._keyStr.charAt(d);return s},decode:function(t){var e,a,r,o,n,i,d="",s=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");s<t.length;)e=this._keyStr.indexOf(t.charAt(s++))<<2|(o=this._keyStr.indexOf(t.charAt(s++)))>>4,a=(15&o)<<4|(n=this._keyStr.indexOf(t.charAt(s++)))>>2,r=(3&n)<<6|(i=this._keyStr.indexOf(t.charAt(s++))),d+=String.fromCharCode(e),64!=n&&(d+=String.fromCharCode(a)),64!=i&&(d+=String.fromCharCode(r));return d=l._utf8_decode(d)},_utf8_encode:function(t){t=t.replace(/\r\n/g,"\n");for(var e="",a=0;a<t.length;a++){var r=t.charCodeAt(a);r<128?e+=String.fromCharCode(r):(127<r&&r<2048?e+=String.fromCharCode(r>>6|192):(e+=String.fromCharCode(r>>12|224),e+=String.fromCharCode(r>>6&63|128)),e+=String.fromCharCode(63&r|128))}return e},_utf8_decode:function(t){for(var e="",a=0,r=c1=c2=0;a<t.length;)(r=t.charCodeAt(a))<128?(e+=String.fromCharCode(r),a++):191<r&&r<224?(c2=t.charCodeAt(a+1),e+=String.fromCharCode((31&r)<<6|63&c2),a+=2):(c2=t.charCodeAt(a+1),c3=t.charCodeAt(a+2),e+=String.fromCharCode((15&r)<<12|(63&c2)<<6|63&c3),a+=3);return e}};e.a=l},U2yr:function(t,e,a){"use strict";var r=a("f+5i"),o=a("BK/k");e.a={data:function(){var o=this;return{timeStr:"",formData:{startTime:"",endTime:"",name:"",memo:"",id:null},rule:{startTime:[{validator:function(t,e,a){""==e?a(new Error("请输入开始时间")):(""!==o.formData.endTime&&o.$refs.form.validateField("endTime"),a())}}],endTime:[{validator:function(t,e,a){if(""==e)a(new Error("请输入结束时间"));else{var r=new Date(o.formData.startTime).getTime();new Date(e).getTime()<r?a(new Error("开始时间大于结束时间")):a()}}}],brandId:[{required:!0,message:"请选择品牌名称"}],name:[{required:!0,message:"请输入活动名称"}]},type:"",upData:r.a,notifyImg:""}},created:function(){var t=this.$route.query.type,e=this.$route.query.id;t&&(this.type=t),e&&(this.formData.id=e,this.activityDetail(e))},methods:{addRules:function(){this.list.push("")},beforeUpload:function(t){this.timeStr=Date.now(),this.upData.key="ecuda/image/"+this.timeStr+t.name},notifyUpload:function(t,e,a){this.notifyImg=o.a.ossServer+"ecuda/image/"+this.timeStr+e.name},handleFormatError:function(t){this.$Notice.warning({title:"文件格式不正确",desc:"文件 "+t.name+" 格式不正确，请上传 jpg 或 png 格式的图片。"})},activityDetail:function(t){var e=this,a=new Date;t?this.Global.doPost("goodsInfo/getGoodsInfo.json",t,function(t){e.formData.name=t.name,e.formData.memo=t.memo,e.formData.startTime=a.setTime(t.startTime),e.formData.endTime=a.setTime(t.endTime),e.notifyImg=t.url}):this.$Message.error("请在活动列表重新选择")},submit:function(t){var e=this;this.$refs[t].validate(function(t){t?e.init():e.$Message.error("请选择查询条件!!")})},init:function(){var t,e=this,a=this.Global.JsonChange(this.formData);a.startTime=this.Global.createTime(this.formData.startTime),a.endTime=this.Global.createTime(this.formData.endTime),this.Global.deleteEmptyProperty(a),a.url=this.notifyImg,a.type=0,"edd"==this.type&&(a.id=this.formData.id,t="goodsInfo/modiGoodsInfo.json"),"add"==this.type&&(t="goodsInfo/addGoodsInfo.json"),this.Global.doPost(t,a,function(t){e.$router.push("/electronAwardManage")})},goBack:function(){alert(1)}}}},"f+5i":function(t,e,a){"use strict";var r=a("mvHQ"),o=a.n(r),n=a("LTBv"),i=(a.n(n),a("BHQ5")),d=(a.n(i),a("o8UP")),s=(a.n(d),a("R/Rc").a.encode(o()({expiration:"2020-01-01T12:00:00.000Z",conditions:[["content-length-range",0,1048576e3]]}))),c=s,l=Crypto.HMAC(Crypto.SHA1,c,"8RuhER7GukaY9t2AKMhPrysTuYYLmt",{asBytes:!0}),f={OSSAccessKeyId:"LTAIIKr2gHrLW1pp",policy:s,success_action_status:"200",signature:Crypto.util.bytesToBase64(l)};e.a=f},hofx:function(t,e,r){"use strict";var a={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"Main"}},[a("h2",{staticClass:"Title"},[e._v("新建&修改")]),e._v(" "),a("div",{staticClass:"box"},[a("Form",{ref:"form",attrs:{model:e.formData,"label-width":80,rules:e.rule}},[a("Row",[a("Col",{attrs:{span:"10"}},[a("Form-item",{attrs:{label:"折扣时间",required:"","label-width":100}},[a("Row",[a("Col",{attrs:{span:"11"}},[a("Form-item",{attrs:{prop:"startTime"}},[a("Date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"选择时间"},model:{value:e.formData.startTime,callback:function(t){e.$set(e.formData,"startTime",t)},expression:"formData.startTime"}})],1)],1),e._v(" "),a("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}},[e._v("至")]),e._v(" "),a("Col",{attrs:{span:"11"}},[a("Form-item",{attrs:{prop:"endTime"}},[a("Date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"选择时间"},model:{value:e.formData.endTime,callback:function(t){e.$set(e.formData,"endTime",t)},expression:"formData.endTime"}})],1)],1)],1)],1)],1),e._v(" "),a("Col",{attrs:{span:"10",offset:"2"}},[a("Form-item",{attrs:{label:"折扣名称",prop:"name","label-width":100}},[a("Input",{attrs:{placeholder:"请输入..."},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1)],1),e._v(" "),a("Col",{attrs:{span:"24"}},[a("Form-item",{attrs:{"label-width":1}},[a("div",{attrs:{id:"imgBox"}},[a("span",[e._v("折扣图片")]),e._v(" "),a("div",{staticClass:"changeImg"},[e.notifyImg?a("img",{attrs:{src:e.notifyImg,alt:""}}):a("img",{attrs:{src:r("M0tS"),alt:""}})]),e._v(" "),a("Upload",{staticStyle:{transform:"translateX(40px)"},attrs:{action:"https://hbrand.oss-cn-hangzhou.aliyuncs.com",data:e.upData,"before-upload":e.beforeUpload,"on-success":e.notifyUpload,"show-upload-list":!1,format:["jpg","jpeg","png"],"on-format-error":e.handleFormatError}},[a("Button",{attrs:{type:"primary"}},[e._v("重新上传")]),e._v(" "),a("p",{staticStyle:{margin:"0",color:"#ff8a34"}},[e._v("（建议尺寸：240*150px）")])],1)],1)])],1),e._v(" "),a("Col",{attrs:{span:"10"}},[a("Form-item",{attrs:{label:"备注","label-width":100}},[a("Input",{model:{value:e.formData.memo,callback:function(t){e.$set(e.formData,"memo",t)},expression:"formData.memo"}})],1)],1)],1)],1),e._v(" "),a("footer",[a("Button",{attrs:{type:"primary"},on:{click:e.goBack}},[e._v("取消")]),e._v(" "),a("Button",{attrs:{type:"success"},on:{click:function(t){e.submit("form")}}},[e._v("确定")])],1)],1)])},staticRenderFns:[]};e.a=a},kD54:function(t,e,a){var r=a("DH0U");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("5248840e",r,!0,{})},o8UP:function(t,e){var v,r;v=Crypto.util,(r=Crypto.SHA1=function(t,e){var a=v.wordsToBytes(r._sha1(t));return e&&e.asBytes?a:e&&e.asString?v.bytesToString(a):v.bytesToHex(a)})._sha1=function(t){var e=v.stringToWords(t),a=8*t.length,r=[],o=1732584193,n=-271733879,i=-1732584194,d=271733878,s=-1009589776;e[a>>5]|=128<<24-a%32,e[15+(a+64>>>9<<4)]=a;for(var c=0;c<e.length;c+=16){for(var l=o,f=n,h=i,m=d,u=s,p=0;p<80;p++){if(p<16)r[p]=e[c+p];else{var g=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=g<<1|g>>>31}var b=(o<<5|o>>>27)+s+(r[p]>>>0)+(p<20?1518500249+(n&i|~n&d):p<40?1859775393+(n^i^d):p<60?(n&i|n&d|i&d)-1894007588:(n^i^d)-899497514);s=d,d=i,i=n<<30|n>>>2,n=o,o=b}o+=l,n+=f,i+=h,d+=m,s+=u}return[o,n,i,d,s]},r._blocksize=16},ySVj:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("U2yr"),o=a("hofx");var n=function(t){a("kD54")},i=a("VU/8")(r.a,o.a,!1,n,"data-v-1ede32bd",null);e.default=i.exports}});