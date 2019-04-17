<style lang="less" scoped>
@import '../../config/index.less';
    #phoneBox{
      width: 305px;
      height: 663px;
      background: url('../../assets/image/phone.png')center no-repeat;
      background-size: 100%;
      padding-top: 137px;
      #htmlBox{
        width: 272px;
        height: 434px;
        background: #fff;
        margin: 0 auto;
      }
      iframe{
          width: 100%;
          height: 100%;
      }
    }
</style>

<template>
    <div id="phoneBox">
        <div id='htmlBox'>
            <iframe ref="iframe" src="../../../static/phone.html" frameborder="0" @load="load"></iframe>
        </div>
    </div>  
</template>

<script>
export default {
    props: ['name'],
    data () {
      return {
        data: ''
      }
    },
    methods: {
      changeUrl (e) {
        return 123
      },
      load: function (name) {
            const app = this.$refs.iframe.contentWindow.a;
            if (app && app.setContent) {
                app.setContent(this.name)
            }
            else {
                window._item = this.name
            }
        }
    },
    created () {
        var head = document.getElementsByTagName('head')[0];
        var dom = document.createElement('link');
        dom.href = '123';
        dom.rel = 'stylesheet';
        head.appendChild(dom)
        window.phone = this;
    },
    watch: {
        name (){
            this.load()
        }
    }
}
</script>

