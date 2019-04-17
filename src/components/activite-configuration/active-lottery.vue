<style lang="less" scoped>
@import '../../config/index.less';
  #configBox{
    padding: 20px;
    overflow: hidden;
    #configLeft{
      width: 305px;
      margin-right: 20px;
      float: left;
    }
    #configRight{
      overflow: hidden;
      .list{
        overflow: hidden;
        margin-bottom: 20px;
        .imgBox{
          float: left;
          width: 120px;
          padding-right: 20px;
          img{
            width: 100%;
            display: block;
          }
        }
        .rule{
          h2{
            font-size: 14px;
          }
          p{
            font-size: 14px;
            line-height: 1.5;
            margin: 10px 0;
          }
          .btnBox{
            overflow: hidden;
            .dowloand{
              text-decoration: underline;
              color: #234cfb;
              float: left;
              margin-right: 30px;
              line-height: 24px;
              user-select: none;
              cursor: pointer;
            }
            .upload{
              overflow: hidden;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div >
      <div id="configBox">
        <div id="configLeft">
            <Phone></Phone>
        </div>
        <div id="configRight">
            <div class="list">
                <div class="imgBox">
                  <img src="../../assets/image/phone.png" alt="">
                </div>
                <div class="rule">
                  <h2>活动背景页</h2>
                  <p>固定尺寸：750px*1206px,格式为jpg、png、jpeg，图片大小不可大于1M</p>
                  <div class="btnBox">
                    <div class='dowloand'>PSD下载</div>
                    <Button type='primary' size="small" class='upload'>重新上传</Button>
                  </div>
                </div>
            </div>
            <div class="list">
                <div class="imgBox">
                  <img src="../../assets/image/phone.png" alt="">
                </div>
                <div class="rule">
                  <h2>活动背景页</h2>
                  <p>固定尺寸：750px*1206px,格式为jpg、png、jpeg，图片大小不可大于1M</p>
                  <div class="btnBox">
                    <div class='dowloand'>PSD下载</div>
                    <Button type='primary' size="small" class='upload'>重新上传</Button>
                  </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>

import Phone from './phone';
export default {
    data () {
      return {
        data: ''
      }
    },
    methods: {
      changeUrl (e) {
        return 123
      }
    },
    components: {
      Phone
    }
}
</script>

