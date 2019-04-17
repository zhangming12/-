<style>
.zhezhao { 
    width:100%; 
    height:100%; 
    background-color:#000; 
    filter:alpha(opacity=50); 
    -moz-opacity:0.5; 
    opacity:0.5; 
    position:absolute; 
    left:0px; 
    top:0px; 
    display: none;
    z-index:1000; 
} 
</style>
<template>
<div>
    <div class="zhezhao"></div> 
</div>
</template>
<script>
export default {
    props:{
        showVideo:Boolean
    },
    data () {
        return {
            isShowStatue:false,
        }
    },
    methods: {

    },
    watch: {
        showVideo(val){
            this.isShowStatue=val
        }
    },

}
</script>


