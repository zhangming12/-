<style>
.area{
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #dddee1;
    height: 32px;
    padding: 4px 7px;
    line-height: 2;
    cursor: pointer;
    /* .TextOverflow() */
}
</style>
<template>
    <Modal v-model='treeShow' @on-ok="handeleAreaList" @on-cancel="handleCancel">
        <div style='height: 400px; overflow-y:auto;'>
            <Tree :data="areaData" ref='tree' multiple show-checkbox></Tree>
        </div>
       
    </Modal>
</template>
<script>
import area from '@/config/areaCode.js';
export default {
    /**
     * @desc 省市区code
     * @param  formAreaCode {String}
     * @desc 模态框显隐控制
     * @param  isShowTree {Boolean}
     * */
    props:{
        formAreaCode:String,
        isShowTree:Boolean, 
    },
   watch:{
       formAreaCode(val){
           if(val){
               this.areaTreeCode=val;
           }
       },
       isShowTree(val){
           if(val){
               this.treeShow=val;
           }
       },
    //    treeShow(val){
    //        if(val == false){
    //            //针对框架没有 model关闭事件 监听treeShow状态
    //            this.$emit( 'sendCitySelectStatus' ,false)
    //        }
    //    }
   },
    data(){
        return{
            treeShow: false,
            bizAreaList: [],
            areaName: '',
            areaData: area,
            areaTreeCode:''
        }
    },
    methods:{
        
        handeleAreaList: function(){
            
           var treeData = this.$refs.tree.getCheckedNodes();
           var arr = [];
           var areaName = '';
           for( var i=0; i<treeData.length; i++ ){
               arr.push(treeData[i].value);
               areaName += treeData[i].title + '/'
           }
           this.bizAreaList = arr;
           this.areaName = areaName;
           this.$emit( 'sendCityTreeCode' ,arr,areaName)
        },
        handleCancel(){
            this.treeShow=false;
            this.$emit( 'sendCityTreeStatus' ,false );
        },
    }
}
</script>
