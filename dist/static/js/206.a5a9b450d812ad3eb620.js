webpackJsonp([206],{"//Fk":function(t,e,a){t.exports={default:a("U5ju"),__esModule:!0}},"0ip8":function(t,e,f){"use strict";var a=f("bOdI"),h=f.n(a),l=f("BO1k"),p=f.n(l),i=(f("BK/k"),f("b3t2")),m=f("t5DY");e.a={name:"customer-information-edit-keepAlive",components:{citySelect:i.a},data:function(){return{formData:{storeName:"",name:"",areaCode:[],address:"",storeId:null},areaData:[],isShowTree:!1,areaArrayList:[],formAreaCode:"",isAreaShow:!0,AreaProvince:null,AreaCity:null,AreaArea:null}},created:function(){var s=this,t=this.$route.query,e=t.userId,a=t.storeName,l=t.nickName,i=t.address,r=t.areaCode,n=t.province,u=t.city,o=t.area;this.formData=h()({storeId:e,storeName:a,name:l,address:i},"storeName",a),this.AreaProvince=n,this.AreaCity=u,this.AreaArea=o;var v=r,c=r.slice(0,2)+"0000",d=r.slice(0,4)+"00";f.i(m.d)(1).then(function(t){if(1==t.status){var e=t.data,a=[],l=!0,i=!1,r=void 0;try{for(var n,u=p()(e);!(l=(n=u.next()).done);l=!0){var o=n.value,v={value:o.id,label:o.areaName,loading:!1,level:o.level,children:[]};a.push(v)}}catch(t){i=!0,r=t}finally{try{!l&&u.return&&u.return()}finally{if(i)throw r}}s.areaArrayList=a}}).then(function(){f.i(m.d)(null,c).then(function(t){for(var e=function(t){var e=[],a=!0,l=!1,i=void 0;try{for(var r,n=p()(t);!(a=(r=n.next()).done);a=!0){var u=r.value,o={value:u.id,label:u.areaName,loading:!1,level:u.level,children:[]};e.push(o)}}catch(t){l=!0,i=t}finally{try{!a&&n.return&&n.return()}finally{if(l)throw i}}return e}(t.data),a=s.areaArrayList,l=0;l<a.length;l++)a[l].value==c&&(a[l].children=e)})}).then(function(){f.i(m.d)(null,d).then(function(t){for(var e=function(t){var e=[],a=!0,l=!1,i=void 0;try{for(var r,n=p()(t);!(a=(r=n.next()).done);a=!0){var u=r.value,o={value:u.id,label:u.areaName,level:u.level};e.push(o)}}catch(t){l=!0,i=t}finally{try{!a&&n.return&&n.return()}finally{if(l)throw i}}return e}(t.data),a=s.areaArrayList,l=0;l<a.length;l++)if(a[l].value==c)for(var i=0;i<a[l].children.length;i++)a[l].children[i].value==d&&(a[l].children[i].children=e);s.formData.areaCode=[c,d,v]})})},methods:{showCascader:function(){this.isAreaShow=!1},activityDetail:function(t){var e=this,a=new Date;t?this.Global.doPost("goodsInfo/getGoodsInfo.json",t,function(t){e.formData.name=t.name,e.formData.memo=t.memo,e.formData.startTime=a.setTime(t.startTime),e.formData.endTime=a.setTime(t.endTime),e.notifyImg=t.url}):this.$Message.error("请在活动列表重新选择")},submit:function(t){var e=this;this.$refs[t].validate(function(t){t?e.init():e.$Message.error("请选择查询条件!!")})},init:function(){var e=this,t=this.Global.JsonChange(this.formData);this.Global.deleteEmptyProperty(t),this.Global.doPost("store/modifyStoreInfo.json",t,function(t){e.$router.push("/customerInformate")})},goBack:function(){this.$router.back()},loadData:function(s,c){s.loading=!0,2==s.level?f.i(m.d)(null,s.value).then(function(t){if(1==t.status){var e=t.data,a=[],l=!0,i=!1,r=void 0;try{for(var n,u=p()(e);!(l=(n=u.next()).done);l=!0){var o=n.value,v={value:o.id,label:o.areaName,level:o.level};a.push(v)}}catch(t){i=!0,r=t}finally{try{!l&&u.return&&u.return()}finally{if(i)throw r}}s.children=a,s.loading=!1,c()}}):1==s.level&&f.i(m.d)(null,s.value).then(function(t){if(1==t.status){var e=t.data,a=[],l=!0,i=!1,r=void 0;try{for(var n,u=p()(e);!(l=(n=u.next()).done);l=!0){var o=n.value,v={value:o.id,label:o.areaName,loading:!1,level:o.level,children:[]};a.push(v)}}catch(t){i=!0,r=t}finally{try{!l&&u.return&&u.return()}finally{if(i)throw r}}s.children=a,s.loading=!1,c()}})}}}},"2KxR":function(t,e){t.exports=function(t,e,a,l){if(!(t instanceof e)||void 0!==l&&l in t)throw TypeError(a+": incorrect invocation!");return t}},"4P/H":function(t,e,a){var l=a("e/NK");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("3339ec51",l,!0,{})},"82Mu":function(t,e,a){var u=a("7KvD"),o=a("L42u").set,v=u.MutationObserver||u.WebKitMutationObserver,s=u.process,c=u.Promise,d="process"==a("R9M2")(s);t.exports=function(){var a,l,i,t=function(){var t,e;for(d&&(t=s.domain)&&t.exit();a;){e=a.fn,a=a.next;try{e()}catch(t){throw a?i():l=void 0,t}}l=void 0,t&&t.enter()};if(d)i=function(){s.nextTick(t)};else if(!v||u.navigator&&u.navigator.standalone)if(c&&c.resolve){var e=c.resolve(void 0);i=function(){e.then(t)}}else i=function(){o.call(u,t)};else{var r=!0,n=document.createTextNode("");new v(t).observe(n,{characterData:!0}),i=function(){n.data=r=!r}}return function(t){var e={fn:t,next:void 0};l&&(l.next=e),a||(a=e,i()),l=e}}},"9bBU":function(t,e,a){a("mClu");var l=a("FeBl").Object;t.exports=function(t,e,a){return l.defineProperty(t,e,a)}},AUDw:function(t,e,a){"use strict";var l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"Main"}},[a("div",{staticClass:"box"},[a("Form",{ref:"form",attrs:{model:e.formData,"label-width":88}},[a("Row",[a("Col",{attrs:{span:"10"}},[a("Form-item",{attrs:{label:"店铺名称",prop:"storeName"}},[a("Input",{attrs:{placeholder:"请输入..."},model:{value:e.formData.storeName,callback:function(t){e.$set(e.formData,"storeName",t)},expression:"formData.storeName"}})],1),e._v(" "),a("Form-item",{attrs:{label:"省市区"}},[e.isAreaShow?a("div",{staticClass:"area",on:{click:e.showCascader}},[e._v(e._s(e.AreaProvince)+"/"+e._s(e.AreaCity)+"/"+e._s(e.AreaArea))]):a("Cascader",{attrs:{data:e.areaArrayList,"load-data":e.loadData,"change-on-select":""},model:{value:e.formData.areaCode,callback:function(t){e.$set(e.formData,"areaCode",t)},expression:"formData.areaCode"}})],1)],1),e._v(" "),a("Col",{attrs:{span:"10",offset:"1"}},[a("Form-item",{attrs:{label:"姓名"}},[a("Input",{attrs:{placeholder:"请输入..."},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1),e._v(" "),a("Form-item",{attrs:{label:"地址"}},[a("Input",{model:{value:e.formData.address,callback:function(t){e.$set(e.formData,"address",t)},expression:"formData.address"}})],1)],1)],1)],1),e._v(" "),a("footer",[a("Button",{attrs:{type:"primary"},on:{click:e.goBack}},[e._v("返回")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"24px"},attrs:{type:"success"},on:{click:function(t){e.submit("form")}}},[e._v("保存")])],1)],1)])},staticRenderFns:[]};e.a=l},Bbjz:function(t,e,a){"use strict";var l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Modal",{on:{"on-ok":e.handeleAreaList,"on-cancel":e.handleCancel},model:{value:e.treeShow,callback:function(t){e.treeShow=t},expression:"treeShow"}},[a("div",{staticStyle:{height:"400px","overflow-y":"auto"}},[a("Tree",{ref:"tree",attrs:{data:e.areaData,multiple:"","show-checkbox":""}})],1)])},staticRenderFns:[]};e.a=l},C4MV:function(t,e,a){t.exports={default:a("9bBU"),__esModule:!0}},CXw9:function(t,e,a){"use strict";var l,i,r,n,u=a("O4g8"),o=a("7KvD"),v=a("+ZMJ"),s=a("RY/4"),c=a("kM2E"),d=a("EqjI"),f=a("lOnJ"),h=a("2KxR"),p=a("NWt+"),m=a("t8x9"),y=a("L42u").set,x=a("82Mu")(),g=a("qARP"),b=a("dNDb"),w=a("iUbK"),_=a("fJUb"),k="Promise",j=o.TypeError,M=o.process,D=M&&M.versions,C=D&&D.v8||"",A=o[k],B="process"==s(M),P=function(){},S=i=g.f,N=!!function(){try{var t=A.resolve(1),e=(t.constructor={})[a("dSzd")("species")]=function(t){t(P,P)};return(B||"function"==typeof PromiseRejectionEvent)&&t.then(P)instanceof e&&0!==C.indexOf("6.6")&&-1===w.indexOf("Chrome/66")}catch(t){}}(),R=function(t){var e;return!(!d(t)||"function"!=typeof(e=t.then))&&e},I=function(s,a){if(!s._n){s._n=!0;var l=s._c;x(function(){for(var o=s._v,v=1==s._s,t=0,e=function(t){var e,a,l,i=v?t.ok:t.fail,r=t.resolve,n=t.reject,u=t.domain;try{i?(v||(2==s._h&&E(s),s._h=1),!0===i?e=o:(u&&u.enter(),e=i(o),u&&(u.exit(),l=!0)),e===t.promise?n(j("Promise-chain cycle")):(a=R(e))?a.call(e,r,n):r(e)):n(o)}catch(t){u&&!l&&u.exit(),n(t)}};l.length>t;)e(l[t++]);s._c=[],s._n=!1,a&&!s._h&&F(s)})}},F=function(r){y.call(o,function(){var t,e,a,l=r._v,i=T(r);if(i&&(t=b(function(){B?M.emit("unhandledRejection",l,r):(e=o.onunhandledrejection)?e({promise:r,reason:l}):(a=o.console)&&a.error&&a.error("Unhandled promise rejection",l)}),r._h=B||T(r)?2:1),r._a=void 0,i&&t.e)throw t.v})},T=function(t){return 1!==t._h&&0===(t._a||t._c).length},E=function(e){y.call(o,function(){var t;B?M.emit("rejectionHandled",e):(t=o.onrejectionhandled)&&t({promise:e,reason:e._v})})},O=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),I(e,!0))},U=function(t){var a,l=this;if(!l._d){l._d=!0,l=l._w||l;try{if(l===t)throw j("Promise can't be resolved itself");(a=R(t))?x(function(){var e={_w:l,_d:!1};try{a.call(t,v(U,e,1),v(O,e,1))}catch(t){O.call(e,t)}}):(l._v=t,l._s=1,I(l,!1))}catch(t){O.call({_w:l,_d:!1},t)}}};N||(A=function(t){h(this,A,k,"_h"),f(t),l.call(this);try{t(v(U,this,1),v(O,this,1))}catch(t){O.call(this,t)}},(l=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=a("xH/j")(A.prototype,{then:function(t,e){var a=S(m(this,A));return a.ok="function"!=typeof t||t,a.fail="function"==typeof e&&e,a.domain=B?M.domain:void 0,this._c.push(a),this._a&&this._a.push(a),this._s&&I(this,!1),a.promise},catch:function(t){return this.then(void 0,t)}}),r=function(){var t=new l;this.promise=t,this.resolve=v(U,t,1),this.reject=v(O,t,1)},g.f=S=function(t){return t===A||t===n?new r(t):i(t)}),c(c.G+c.W+c.F*!N,{Promise:A}),a("e6n0")(A,k),a("bRrM")(k),n=a("FeBl")[k],c(c.S+c.F*!N,k,{reject:function(t){var e=S(this);return(0,e.reject)(t),e.promise}}),c(c.S+c.F*(u||!N),k,{resolve:function(t){return _(u&&this===n?A:this,t)}}),c(c.S+c.F*!(N&&a("dY0y")(function(t){A.all(t).catch(P)})),k,{all:function(t){var n=this,e=S(n),u=e.resolve,o=e.reject,a=b(function(){var l=[],i=0,r=1;p(t,!1,function(t){var e=i++,a=!1;l.push(void 0),r++,n.resolve(t).then(function(t){a||(a=!0,l[e]=t,--r||u(l))},o)}),--r||u(l)});return a.e&&o(a.v),e.promise},race:function(t){var e=this,a=S(e),l=a.reject,i=b(function(){p(t,!1,function(t){e.resolve(t).then(a.resolve,l)})});return i.e&&l(i.v),a.promise}})},EqBC:function(t,e,a){"use strict";var l=a("kM2E"),i=a("FeBl"),r=a("7KvD"),n=a("t8x9"),u=a("fJUb");l(l.P+l.R,"Promise",{finally:function(e){var a=n(this,i.Promise||r.Promise),t="function"==typeof e;return this.then(t?function(t){return u(a,e()).then(function(){return t})}:e,t?function(t){return u(a,e()).then(function(){throw t})}:e)}})},L42u:function(t,e,a){var l,i,r,n=a("+ZMJ"),u=a("knuC"),o=a("RPLV"),v=a("ON07"),s=a("7KvD"),c=s.process,d=s.setImmediate,f=s.clearImmediate,h=s.MessageChannel,p=s.Dispatch,m=0,y={},x="onreadystatechange",g=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},b=function(t){g.call(t.data)};d&&f||(d=function(t){for(var e=[],a=1;arguments.length>a;)e.push(arguments[a++]);return y[++m]=function(){u("function"==typeof t?t:Function(t),e)},l(m),m},f=function(t){delete y[t]},"process"==a("R9M2")(c)?l=function(t){c.nextTick(n(g,t,1))}:p&&p.now?l=function(t){p.now(n(g,t,1))}:h?(r=(i=new h).port2,i.port1.onmessage=b,l=n(r.postMessage,r,1)):s.addEventListener&&"function"==typeof postMessage&&!s.importScripts?(l=function(t){s.postMessage(t+"","*")},s.addEventListener("message",b,!1)):l=x in v("script")?function(t){o.appendChild(v("script"))[x]=function(){o.removeChild(this),g.call(t)}}:function(t){setTimeout(n(g,t,1),0)}),t.exports={set:d,clear:f}},"NWt+":function(t,e,a){var d=a("+ZMJ"),f=a("msXi"),h=a("Mhyx"),p=a("77Pl"),m=a("QRG4"),y=a("3fs2"),x={},g={};(e=t.exports=function(t,e,a,l,i){var r,n,u,o,v=i?function(){return t}:y(t),s=d(a,l,e?2:1),c=0;if("function"!=typeof v)throw TypeError(t+" is not iterable!");if(h(v)){for(r=m(t.length);c<r;c++)if((o=e?s(p(n=t[c])[0],n[1]):s(t[c]))===x||o===g)return o}else for(u=v.call(t);!(n=u.next()).done;)if((o=f(u,s,n.value,e))===x||o===g)return o}).BREAK=x,e.RETURN=g},PrM8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("0ip8"),i=a("AUDw");var r=function(t){a("nrPb")},n=a("VU/8")(l.a,i.a,!1,r,"data-v-2d3344f0",null);e.default=n.exports},QBvU:function(t,e,a){"use strict";var l=a("k/PS");e.a={props:{formAreaCode:String,isShowTree:Boolean},watch:{formAreaCode:function(t){t&&(this.areaTreeCode=t)},isShowTree:function(t){t&&(this.treeShow=t)}},data:function(){return{treeShow:!1,bizAreaList:[],areaName:"",areaData:l.a,areaTreeCode:""}},methods:{handeleAreaList:function(){for(var t=this.$refs.tree.getCheckedNodes(),e=[],a="",l=0;l<t.length;l++)e.push(t[l].value),a+=t[l].title+"/";this.bizAreaList=e,this.areaName=a,this.$emit("sendCityTreeCode",e,a)},handleCancel:function(){this.treeShow=!1,this.$emit("sendCityTreeStatus",!1)}}}},TFS0:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,'.box[data-v-2d3344f0]{padding:0;min-width:1135px}button[data-v-2d3344f0]{outline:none;list-style:none;border:0;cursor:pointer}button#success[data-v-2d3344f0]{color:#19be6b;background:transparent}button#fail[data-v-2d3344f0]{color:#ed3f14;background:transparent}button#primary[data-v-2d3344f0]{color:#ff8a34;background:transparent}button.down[data-v-2d3344f0],button.up[data-v-2d3344f0]{color:#ff8a34}button.down[data-v-2d3344f0]:after{content:"\\F116"}button.up[data-v-2d3344f0]:after{content:"\\F124"}#bottonFather[data-v-2d3344f0]{display:flex;justify-content:center;align-items:center}.lookDetail[data-v-2d3344f0]{background:#febf00;border-color:#febf00;color:#fff}.ml20[data-v-2d3344f0]{margin-left:20px}.w18[data-v-2d3344f0]{width:17.5%}.w10[data-v-2d3344f0]{width:12.5%}.w36[data-v-2d3344f0]{width:35%}.fs12[data-v-2d3344f0]{font-size:12px}.fs14[data-v-2d3344f0]{font-size:14px}.fs16[data-v-2d3344f0]{font-size:16px}.fs28[data-v-2d3344f0]{font-size:28px}.text-center[data-v-2d3344f0]{text-align:center}.block[data-v-2d3344f0]{display:block}.container[data-v-2d3344f0]:after{display:block;clear:both;content:"";visibility:hidden;height:0}.container[data-v-2d3344f0]{zoom:1}.text-overflow[data-v-2d3344f0]{display:inline-block;max-width:80%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}input[data-v-2d3344f0]::-ms-input-placeholder{text-align:center!important}input[data-v-2d3344f0]::-webkit-input-placeholder{text-align:center!important}.displayGroupPrimary[data-v-2d3344f0]{color:#ff8a34}.demo-spin-icon-load[data-v-2d3344f0]{animation:ani-demo-spin-data-v-2d3344f0 1s linear infinite}@keyframes ani-demo-spin-data-v-2d3344f0{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}to{transform:rotate(1turn)}}#Main[data-v-2d3344f0]{height:100%}#Main .main-container[data-v-2d3344f0]{padding-top:10px;min-height:100%;position:relative;background:#fff;padding-bottom:60px;min-width:1135px}#Main .main-container .page-box[data-v-2d3344f0]{overflow:hidden;position:absolute;bottom:10px;right:10px}#Main .main-container .searchBox[data-v-2d3344f0]{overflow:hidden}#Main .main-container .searchBox .search-left[data-v-2d3344f0],#Main .main-container .searchBox .search-right[data-v-2d3344f0]{width:48%}#Main .main-container .searchBox .search-left button[data-v-2d3344f0]{outline:none;border:none;width:60px;height:30px;line-height:30px;background:#fff;margin-left:8px;cursor:pointer;color:#ff8a34}#Main .main-container .searchBox .search-right[data-v-2d3344f0]{width:52%}#Main .main-container .searchBox .search-right img[data-v-2d3344f0]{cursor:pointer;margin-left:6px}#Main .main-container .numColor[data-v-2d3344f0]{color:#ff8a34}.box[data-v-2d3344f0]{height:400px;width:100%;box-shadow:0 0 10px 2px rgba(0,0,0,.1);margin:0 auto;padding:30px 20px;padding-bottom:0;background:#fff;overflow:hidden}.ivu-table-row[data-v-2d3344f0]{box-shadow:0 0 5px 2px rgba(0,0,0,.1)!important;transform:translateY(0)}#imgBox[data-v-2d3344f0]{height:120px;display:table;line-height:120px}#imgBox span[data-v-2d3344f0]{display:inline-block;width:80px}#imgBox .changeImg[data-v-2d3344f0]{width:150px;height:120px;display:table-cell;vertical-align:middle;transform:translateX(20px);border:1px solid #efefef}#imgBox .changeImg img[data-v-2d3344f0]{width:150px;height:120px;display:block}#imgBox p[data-v-2d3344f0]{display:inline-block}footer[data-v-2d3344f0]{text-align:center;margin:40px 0 20px}',""])},U5ju:function(t,e,a){a("M6a0"),a("zQR9"),a("+tPU"),a("CXw9"),a("EqBC"),a("jKW+"),t.exports=a("FeBl").Promise},b3t2:function(t,e,a){"use strict";var l=a("QBvU"),i=a("Bbjz");var r=function(t){a("4P/H")},n=a("VU/8")(l.a,i.a,!1,r,null,null);e.a=n.exports},bOdI:function(t,e,a){"use strict";e.__esModule=!0;var l,i=a("C4MV"),r=(l=i)&&l.__esModule?l:{default:l};e.default=function(t,e,a){return e in t?(0,r.default)(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}},bRrM:function(t,e,a){"use strict";var l=a("7KvD"),i=a("FeBl"),r=a("evD5"),n=a("+E39"),u=a("dSzd")("species");t.exports=function(t){var e="function"==typeof i[t]?i[t]:l[t];n&&e&&!e[u]&&r.f(e,u,{configurable:!0,get:function(){return this}})}},dNDb:function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},"e/NK":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".area{overflow:hidden;border-radius:4px;border:1px solid #dddee1;height:32px;padding:4px 7px;line-height:2;cursor:pointer}",""])},"f+26":function(t,e,a){"use strict";var l=a("//Fk"),i=a.n(l),r=a(4),n=a.n(r),u=a("NC6I"),o=(a.n(u),a("NHnr")),v=a("BK/k"),s=a("yt7g"),c=n.a.create({baseURL:v.a.dataServer,timeout:3e4}),d=v.a.dataServer+"activity/queryActivityList.json";c.interceptors.request.use(function(t){var e=s.a.getContext();return t.data.context=e,t.data.sign=s.a.getSign(e),t},function(t){i.a.reject(t)}),c.interceptors.response.use(function(t){if("MEMBER_NOT_LOGIN"!==t.data.errorMsg)return 1===t.data.status?d===t.config.url&&0===t.data.data.items?void o.default.$Message.warning("该品牌暂无陈列活动"):t.data:(o.default.$Message.error(t.data.errorMsg),t.data);sessionStorage.clear(),o.default.$router.replace("/")},function(t){return t&&t.response&&200!==t.response.status&&o.default.$Message.error("系统繁忙，请稍后再试"),console.log(t),i.a.reject(t)}),e.a=c},fJUb:function(t,e,a){var l=a("77Pl"),i=a("EqjI"),r=a("qARP");t.exports=function(t,e){if(l(t),i(e)&&e.constructor===t)return e;var a=r.f(t);return(0,a.resolve)(e),a.promise}},iUbK:function(t,e,a){var l=a("7KvD").navigator;t.exports=l&&l.userAgent||""},"jKW+":function(t,e,a){"use strict";var l=a("kM2E"),i=a("qARP"),r=a("dNDb");l(l.S,"Promise",{try:function(t){var e=i.f(this),a=r(t);return(a.e?e.reject:e.resolve)(a.v),e.promise}})},"k/PS":function(t,e,a){"use strict";e.a=[{value:"0",title:"全国"},{value:"110000",title:"北京"},{value:"120000",title:"天津"},{value:"130000",title:"河北省",children:[{value:"130100",title:"石家庄市"},{value:"130200",title:"唐山市"},{value:"130300",title:"秦皇岛市"},{value:"130400",title:"邯郸市"},{value:"130500",title:"邢台市"},{value:"130600",title:"保定市"},{value:"130700",title:"张家口市"},{value:"130800",title:"承德市"},{value:"130900",title:"沧州市"},{value:"131000",title:"廊坊市"},{value:"131100",title:"衡水市"}]},{value:"140000",title:"山西省",children:[{value:"140100",title:"太原市"},{value:"140200",title:"大同市"},{value:"140300",title:"阳泉市"},{value:"140400",title:"长治市"},{value:"140500",title:"晋城市"},{value:"140600",title:"朔州市"},{value:"140700",title:"晋中市"},{value:"140800",title:"运城市"},{value:"140900",title:"忻州市"},{value:"141000",title:"临汾市"},{value:"141100",title:"吕梁市"}]},{value:"150000",title:"内蒙古自治区",children:[{value:"150100",title:"呼和浩特市"},{value:"150200",title:"包头市"},{value:"150300",title:"乌海市"},{value:"150400",title:"赤峰市"},{value:"150500",title:"通辽市"},{value:"150600",title:"鄂尔多斯市"},{value:"150700",title:"呼伦贝尔市"},{value:"150800",title:"巴彦淖尔市"},{value:"150900",title:"乌兰察布市"},{value:"152200",title:"兴安盟"},{value:"152500",title:"锡林郭勒盟"},{value:"152900",title:"阿拉善盟"}]},{value:"210000",title:"辽宁省",children:[{value:"210100",title:"沈阳市"},{value:"210200",title:"大连市"},{value:"210300",title:"鞍山市"},{value:"210400",title:"抚顺市"},{value:"210500",title:"本溪市"},{value:"210600",title:"丹东市"},{value:"210700",title:"锦州市"},{value:"210800",title:"营口市"},{value:"210900",title:"阜新市"},{value:"211000",title:"辽阳市"},{value:"211100",title:"盘锦市"},{value:"211200",title:"铁岭市"},{value:"211300",title:"朝阳市"},{value:"211400",title:"葫芦岛市"}]},{value:"220000",title:"吉林省",children:[{value:"220100",title:"长春市"},{value:"220200",title:"吉林市"},{value:"220300",title:"四平市"},{value:"220400",title:"辽源市"},{value:"220500",title:"通化市"},{value:"220600",title:"白山市"},{value:"220700",title:"松原市"},{value:"220800",title:"白城市"},{value:"222400",title:"延边朝鲜族自治州"}]},{value:"230000",title:"黑龙江省",children:[{value:"230100",title:"哈尔滨市"},{value:"230200",title:"齐齐哈尔市"},{value:"230300",title:"鸡西市"},{value:"230400",title:"鹤岗市"},{value:"230500",title:"双鸭山市"},{value:"230600",title:"大庆市"},{value:"230700",title:"伊春市"},{value:"230800",title:"佳木斯市"},{value:"230900",title:"七台河市"},{value:"231000",title:"牡丹江市"},{value:"231100",title:"黑河市"},{value:"231200",title:"绥化市"},{value:"232700",title:"大兴安岭地区"}]},{value:"310000",title:"上海"},{value:"320000",title:"江苏省",children:[{value:"320100",title:"南京市"},{value:"320200",title:"无锡市"},{value:"320300",title:"徐州市"},{value:"320400",title:"常州市"},{value:"320500",title:"苏州市"},{value:"320600",title:"南通市"},{value:"320700",title:"连云港市"},{value:"320800",title:"淮安市"},{value:"320900",title:"盐城市"},{value:"321000",title:"扬州市"},{value:"321100",title:"镇江市"},{value:"321200",title:"泰州市"},{value:"321300",title:"宿迁市"}]},{value:"330000",title:"浙江省",children:[{value:"330100",title:"杭州市"},{value:"330200",title:"宁波市"},{value:"330300",title:"温州市"},{value:"330400",title:"嘉兴市"},{value:"330500",title:"湖州市"},{value:"330600",title:"绍兴市"},{value:"330700",title:"金华市"},{value:"330800",title:"衢州市"},{value:"330900",title:"舟山市"},{value:"331000",title:"台州市"},{value:"331100",title:"丽水市"},{value:"331200",title:"舟山群岛新区"}]},{value:"340000",title:"安徽省",children:[{value:"340100",title:"合肥市"},{value:"340200",title:"芜湖市"},{value:"340300",title:"蚌埠市"},{value:"340400",title:"淮南市"},{value:"340500",title:"马鞍山市"},{value:"340600",title:"淮北市"},{value:"340700",title:"铜陵市"},{value:"340800",title:"安庆市"},{value:"341000",title:"黄山市"},{value:"341100",title:"滁州市"},{value:"341200",title:"阜阳市"},{value:"341300",title:"宿州市"},{value:"341500",title:"六安市"},{value:"341600",title:"亳州市"},{value:"341700",title:"池州市"},{value:"341800",title:"宣城市"}]},{value:"350000",title:"福建省",children:[{value:"350100",title:"福州市"},{value:"350200",title:"厦门市"},{value:"350300",title:"莆田市"},{value:"350400",title:"三明市"},{value:"350500",title:"泉州市"},{value:"350600",title:"漳州市"},{value:"350700",title:"南平市"},{value:"350800",title:"龙岩市"},{value:"350900",title:"宁德市"}]},{value:"360000",title:"江西省",children:[{value:"360100",title:"南昌市"},{value:"360200",title:"景德镇市"},{value:"360300",title:"萍乡市"},{value:"360400",title:"九江市"},{value:"360500",title:"新余市"},{value:"360600",title:"鹰潭市"},{value:"360700",title:"赣州市"},{value:"360800",title:"吉安市"},{value:"360900",title:"宜春市"},{value:"361000",title:"抚州市"},{value:"361100",title:"上饶市"}]},{value:"370000",title:"山东省",children:[{value:"370100",title:"济南市"},{value:"370200",title:"青岛市"},{value:"370300",title:"淄博市"},{value:"370400",title:"枣庄市"},{value:"370500",title:"东营市"},{value:"370600",title:"烟台市"},{value:"370700",title:"潍坊市"},{value:"370800",title:"济宁市"},{value:"370900",title:"泰安市"},{value:"371000",title:"威海市"},{value:"371100",title:"日照市"},{value:"371200",title:"莱芜市"},{value:"371300",title:"临沂市"},{value:"371400",title:"德州市"},{value:"371500",title:"聊城市"},{value:"371600",title:"滨州市"},{value:"371700",title:"菏泽市"}]},{value:"410000",title:"河南省",children:[{value:"410100",title:"郑州市"},{value:"410200",title:"开封市"},{value:"410300",title:"洛阳市"},{value:"410400",title:"平顶山市"},{value:"410500",title:"安阳市"},{value:"410600",title:"鹤壁市"},{value:"410700",title:"新乡市"},{value:"410800",title:"焦作市"},{value:"410900",title:"濮阳市"},{value:"411000",title:"许昌市"},{value:"411100",title:"漯河市"},{value:"411200",title:"三门峡市"},{value:"411300",title:"南阳市"},{value:"411400",title:"商丘市"},{value:"411500",title:"信阳市"},{value:"411600",title:"周口市"},{value:"411700",title:"驻马店市"},{value:"419001",title:"济源市"}]},{value:"420000",title:"湖北省",children:[{value:"420100",title:"武汉市"},{value:"420200",title:"黄石市"},{value:"420300",title:"十堰市"},{value:"420500",title:"宜昌市"},{value:"420600",title:"襄阳市"},{value:"420700",title:"鄂州市"},{value:"420800",title:"荆门市"},{value:"420900",title:"孝感市"},{value:"421000",title:"荆州市"},{value:"421100",title:"黄冈市"},{value:"421200",title:"咸宁市"},{value:"421300",title:"随州市"},{value:"422800",title:"恩施土家族苗族自治州"},{value:"429004",title:"仙桃市"},{value:"429005",title:"潜江市"},{value:"429006",title:"天门市"},{value:"429021",title:"神农架林区"}]},{value:"430000",title:"湖南省",children:[{value:"430100",title:"长沙市"},{value:"430200",title:"株洲市"},{value:"430300",title:"湘潭市"},{value:"430400",title:"衡阳市"},{value:"430500",title:"邵阳市"},{value:"430600",title:"岳阳市"},{value:"430700",title:"常德市"},{value:"430800",title:"张家界市"},{value:"430900",title:"益阳市"},{value:"431000",title:"郴州市"},{value:"431100",title:"永州市"},{value:"431200",title:"怀化市"},{value:"431300",title:"娄底市"},{value:"433100",title:"湘西土家族苗族自治州"}]},{value:"440000",title:"广东省",children:[{value:"440100",title:"广州市"},{value:"440200",title:"韶关市"},{value:"440300",title:"深圳市"},{value:"440400",title:"珠海市"},{value:"440500",title:"汕头市"},{value:"440600",title:"佛山市"},{value:"440700",title:"江门市"},{value:"440800",title:"湛江市"},{value:"440900",title:"茂名市"},{value:"441200",title:"肇庆市"},{value:"441300",title:"惠州市"},{value:"441400",title:"梅州市"},{value:"441500",title:"汕尾市"},{value:"441600",title:"河源市"},{value:"441700",title:"阳江市"},{value:"441800",title:"清远市"},{value:"441900",title:"东莞市"},{value:"442000",title:"中山市"},{value:"445100",title:"潮州市"},{value:"445200",title:"揭阳市"},{value:"445300",title:"云浮市"}]},{value:"450000",title:"广西壮族自治区",children:[{value:"450100",title:"南宁市"},{value:"450200",title:"柳州市"},{value:"450300",title:"桂林市"},{value:"450400",title:"梧州市"},{value:"450500",title:"北海市"},{value:"450600",title:"防城港市"},{value:"450700",title:"钦州市"},{value:"450800",title:"贵港市"},{value:"450900",title:"玉林市"},{value:"451000",title:"百色市"},{value:"451100",title:"贺州市"},{value:"451200",title:"河池市"},{value:"451300",title:"来宾市"},{value:"451400",title:"崇左市"}]},{value:"460000",title:"海南省",children:[{value:"460100",title:"海口市"},{value:"460200",title:"三亚市"},{value:"460300",title:"三沙市"},{value:"460400",title:"儋州市"},{value:"469001",title:"五指山市"},{value:"469002",title:"琼海市"},{value:"469005",title:"文昌市"},{value:"469006",title:"万宁市"},{value:"469007",title:"东方市"},{value:"469021",title:"定安县"},{value:"469022",title:"屯昌县"},{value:"469023",title:"澄迈县"},{value:"469024",title:"临高县"},{value:"469025",title:"白沙黎族自治县"},{value:"469026",title:"昌江黎族自治县"},{value:"469027",title:"乐东黎族自治县"},{value:"469028",title:"陵水黎族自治县"},{value:"469029",title:"保亭黎族苗族自治县"},{value:"469030",title:"琼中黎族苗族自治县"}]},{value:"500000",title:"重庆"},{value:"510000",title:"四川省",children:[{value:"510100",title:"成都市"},{value:"510300",title:"自贡市"},{value:"510400",title:"攀枝花市"},{value:"510500",title:"泸州市"},{value:"510600",title:"德阳市"},{value:"510700",title:"绵阳市"},{value:"510800",title:"广元市"},{value:"510900",title:"遂宁市"},{value:"511000",title:"内江市"},{value:"511100",title:"乐山市"},{value:"511300",title:"南充市"},{value:"511400",title:"眉山市"},{value:"511500",title:"宜宾市"},{value:"511600",title:"广安市"},{value:"511700",title:"达州市"},{value:"511800",title:"雅安市"},{value:"511900",title:"巴中市"},{value:"512000",title:"资阳市"},{value:"513200",title:"阿坝藏族羌族自治州"},{value:"513300",title:"甘孜藏族自治州"},{value:"513400",title:"凉山彝族自治州"}]},{value:"520000",title:"贵州省",children:[{value:"520100",title:"贵阳市"},{value:"520200",title:"六盘水市"},{value:"520300",title:"遵义市"},{value:"520400",title:"安顺市"},{value:"520500",title:"毕节市"},{value:"520600",title:"铜仁市"},{value:"522300",title:"黔西南布依族苗族自治州"},{value:"522600",title:"黔东南苗族侗族自治州"},{value:"522700",title:"黔南布依族苗族自治州"}]},{value:"530000",title:"云南省",children:[{value:"530100",title:"昆明市"},{value:"530300",title:"曲靖市"},{value:"530400",title:"玉溪市"},{value:"530500",title:"保山市"},{value:"530600",title:"昭通市"},{value:"530700",title:"丽江市"},{value:"530800",title:"普洱市"},{value:"530900",title:"临沧市"},{value:"532300",title:"楚雄彝族自治州"},{value:"532500",title:"红河哈尼族彝族自治州"},{value:"532600",title:"文山壮族苗族自治州"},{value:"532800",title:"西双版纳傣族自治州"},{value:"532900",title:"大理白族自治州"},{value:"533100",title:"德宏傣族景颇族自治州"},{value:"533300",title:"怒江傈僳族自治州"},{value:"533400",title:"迪庆藏族自治州"}]},{value:"540000",title:"西藏自治区",children:[{value:"540100",title:"拉萨市"},{value:"540200",title:"日喀则市"},{value:"540300",title:"昌都市"},{value:"540400",title:"林芝市"},{value:"540500",title:"山南市"},{value:"542400",title:"那曲地区"},{value:"542500",title:"阿里地区"}]},{value:"610000",title:"陕西省",children:[{value:"610100",title:"西安市"},{value:"610200",title:"铜川市"},{value:"610300",title:"宝鸡市"},{value:"610400",title:"咸阳市"},{value:"610500",title:"渭南市"},{value:"610600",title:"延安市"},{value:"610700",title:"汉中市"},{value:"610800",title:"榆林市"},{value:"610900",title:"安康市"},{value:"611000",title:"商洛市"},{value:"611100",title:"西咸新区"}]},{value:"620000",title:"甘肃省",children:[{value:"620100",title:"兰州市"},{value:"620200",title:"嘉峪关市"},{value:"620300",title:"金昌市"},{value:"620400",title:"白银市"},{value:"620500",title:"天水市"},{value:"620600",title:"武威市"},{value:"620700",title:"张掖市"},{value:"620800",title:"平凉市"},{value:"620900",title:"酒泉市"},{value:"621000",title:"庆阳市"},{value:"621100",title:"定西市"},{value:"621200",title:"陇南市"},{value:"622900",title:"临夏回族自治州"},{value:"623000",title:"甘南藏族自治州"}]},{value:"630000",title:"青海省",children:[{value:"630100",title:"西宁市"},{value:"630200",title:"海东市"},{value:"632200",title:"海北藏族自治州"},{value:"632300",title:"黄南藏族自治州"},{value:"632500",title:"海南藏族自治州"},{value:"632600",title:"果洛藏族自治州"},{value:"632700",title:"玉树藏族自治州"},{value:"632800",title:"海西蒙古族藏族自治州"}]},{value:"640000",title:"宁夏回族自治区",children:[{value:"640100",title:"银川市"},{value:"640200",title:"石嘴山市"},{value:"640300",title:"吴忠市"},{value:"640400",title:"固原市"},{value:"640500",title:"中卫市"}]},{value:"650000",title:"新疆维吾尔自治区",children:[{value:"650100",title:"乌鲁木齐市"},{value:"650200",title:"克拉玛依市"},{value:"650400",title:"吐鲁番市"},{value:"650500",title:"哈密市"},{value:"652300",title:"昌吉回族自治州"},{value:"652700",title:"博尔塔拉蒙古自治州"},{value:"652800",title:"巴音郭楞蒙古自治州"},{value:"652900",title:"阿克苏地区"},{value:"653000",title:"克孜勒苏柯尔克孜自治州"},{value:"653100",title:"喀什地区"},{value:"653200",title:"和田地区"},{value:"654000",title:"伊犁哈萨克自治州"},{value:"654200",title:"塔城地区"},{value:"654300",title:"阿勒泰地区"},{value:"659001",title:"石河子市"},{value:"659002",title:"阿拉尔市"},{value:"659003",title:"图木舒克市"},{value:"659004",title:"五家渠市"},{value:"659005",title:"北屯市"},{value:"659006",title:"铁门关市"},{value:"659007",title:"双河市"},{value:"659008",title:"可克达拉市"},{value:"659009",title:"昆玉市"}]},{value:"710000",title:"台湾",children:[{value:"710100",title:"台北市"},{value:"710200",title:"高雄市"},{value:"710300",title:"基隆市"},{value:"710400",title:"台中市"},{value:"710500",title:"台南市"},{value:"710600",title:"新竹市"},{value:"710700",title:"嘉义市"},{value:"710800",title:"新北市"},{value:"712200",title:"宜兰县"},{value:"712300",title:"桃园市"},{value:"712400",title:"新竹县"},{value:"712500",title:"苗栗县"},{value:"712700",title:"彰化县"},{value:"712800",title:"南投县"},{value:"712900",title:"云林县"},{value:"713000",title:"嘉义县"},{value:"713300",title:"屏东县"},{value:"713400",title:"台东县"},{value:"713500",title:"花莲县"},{value:"713600",title:"澎湖县"},{value:"713700",title:"金门县"},{value:"713800",title:"连江县"}]},{value:"810000",title:"香港特别行政区",children:[{value:"810100",title:"香港岛"},{value:"810200",title:"九龙"},{value:"810300",title:"新界"}]},{value:"820000",title:"澳门特别行政区",children:[{value:"820100",title:"澳门半岛"},{value:"820200",title:"氹仔岛"},{value:"820300",title:"路环岛"}]},{value:"910000",title:"未知"}]},knuC:function(t,e){t.exports=function(t,e,a){var l=void 0===a;switch(e.length){case 0:return l?t():t.call(a);case 1:return l?t(e[0]):t.call(a,e[0]);case 2:return l?t(e[0],e[1]):t.call(a,e[0],e[1]);case 3:return l?t(e[0],e[1],e[2]):t.call(a,e[0],e[1],e[2]);case 4:return l?t(e[0],e[1],e[2],e[3]):t.call(a,e[0],e[1],e[2],e[3])}return t.apply(a,e)}},mClu:function(t,e,a){var l=a("kM2E");l(l.S+l.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},nrPb:function(t,e,a){var l=a("TFS0");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("35b72ae6",l,!0,{})},qARP:function(t,e,a){"use strict";var i=a("lOnJ");function l(t){var a,l;this.promise=new t(function(t,e){if(void 0!==a||void 0!==l)throw TypeError("Bad Promise constructor");a=t,l=e}),this.resolve=i(a),this.reject=i(l)}t.exports.f=function(t){return new l(t)}},t5DY:function(t,e,l){"use strict";e.d=function(t,e){var a={data:{level:t,parentId:e}};return l.i(i.a)({url:"/areaDict/doQueryAll.json",method:"post",data:a})},e.a=function(){return l.i(i.a)({url:"/brand/doQueryWithPage.json",method:"post",data:{data:{status:1}}})},e.l=function(t){var e={data:{brandId:t,type:3}};return l.i(i.a)({url:"/activity/queryActivityList.json",method:"post",data:e})},e.k=function(t){var e={data:t};return l.i(i.a)({url:"/displayYxtg/queryActivityGroupVOByBrandId.json",method:"post",data:e})},e.j=function(t){var e={data:t};return l.i(i.a)({url:"/resource/getRoleResource.json",method:"post",data:e})},e.i=function(t){var e={data:t};return l.i(i.a)({url:"/resource/removeRoleResource.json",method:"post",data:e})},e.h=function(t){var e={data:t};return l.i(i.a)({url:"/resource/doDelete.json",method:"post",data:e})},e.c=function(t){var e={data:t};return l.i(i.a)({url:"/displayYxtg/queryActivityVOByGroupId.json",method:"post",data:e})},e.g=function(t){var e={data:t};return l.i(i.a)({url:"/displayYxtg/queryActivityPresentVOByactivityId.json",method:"post",data:e})},e.e=function(t){var e={data:t};return l.i(i.a)({url:"/activityUtil/queryActivityVOByGroupId.json",method:"post",data:e})},e.f=function(t){var e={data:t};return l.i(i.a)({url:"/activityUtil/queryActivityGroupVOByBrandId.json",method:"post",data:e})},e.b=function(t){var e={data:t};return l.i(i.a)({url:"/uploadReport/queryOrganizationDictList.json",method:"post",data:e})};var i=l("f+26")},t8x9:function(t,e,a){var i=a("77Pl"),r=a("lOnJ"),n=a("dSzd")("species");t.exports=function(t,e){var a,l=i(t).constructor;return void 0===l||null==(a=i(l)[n])?e:r(a)}},"xH/j":function(t,e,a){var i=a("hJx8");t.exports=function(t,e,a){for(var l in e)a&&t[l]?t[l]=e[l]:i(t,l,e[l]);return t}}});