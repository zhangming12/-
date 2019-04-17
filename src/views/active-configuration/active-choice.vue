<style lang="less" scoped>
    @import '../../config/index.less';
    .box{
        width: 100%;
        box-shadow: 0 0 10px 2px rgba(0,0,0,.1);
        margin: 0 auto;
        padding: 30px 20px;
        padding-bottom: 0;
        background: #fff;
        overflow: hidden;
    }
    #search{
        float: right;
        #searchInput{
            width: 430px;
            height: 34px;
            float: left;
        }
        .btn{
            overflow: hidden;
            margin-left: 20px;
        }
    }
    #List{
        overflow: hidden;
        padding-top: 50px;
        width: 100%;
        li{
            width: 50%;
            box-sizing: border-box;
            padding-left: 20px;
            float: left;
            .activeView{
                width: 40%;
                float: left;
                position: relative;
                img{
                    width: 100%;
                    display: block;
                }
                #mask{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background: rgba(0,0,0,.1);
                    top: 0;
                    left: 0;
                }
            }
            .activeInfo{
                overflow: hidden;
                padding-left: 10px;
                .activeTitle{
                    font-size: 20px;
                    color: @primary-color;
                    font-weight: 700;
                }
                .rangeTitle{
                    font-size: 16px;
                    color: #333;
                    font-weight: 700;
                    margin: 20px 0;

                }
                .labelBox{
                    span{
                        padding: 8px 10px;
                        border: 1px dashed #333;
                        color: #333;
                        font-size: 14px;
                        margin-right: 15px;
                        display: inline-block;
                        margin-bottom: 10px;
                    }
                }
                .context{
                    font-size: 14px;
                    color: #333;
                    line-height: 1.5;
                }
            }
        }
    }
</style>

<template>
  <div id='Main'>
      <!-- <h2 class="Title">活动参与明细</h2> -->
      <div class="box">
          <div id='search'>
              <div id='searchInput'>
                  <Input></Input>
              </div>
              <Button type="primary" class='btn'>搜索</Button>
          </div>
          <ul id='List'>
              <li>
                  <div class='activeView' @mousemove="overShow" @mouseout="outHide">
                      <img src="//wx2.sinaimg.cn/orj360/005IkzJ3gy1fmonqd9wp3j31kw11xx6p.jpg" alt="扫码赢大奖">
                      <div id='mask' v-show='maskStatus'></div>
                  </div>
                  <div class="activeInfo">
                      <div class="activeTitle">
                          扫码赢大礼
                      </div>
                      <div class="activeRange">
                          <p class="rangeTitle">适推荐场景</p>
                          <p class='labelBox'>
                              <span>新品推广</span>  
                          </p>
                      </div>
                      <div class="activeExplain">
                          <p class="rangeTitle">特点说明</p>
                          <p class="context">
                              扫码得奖而且
                          </p>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name:"active-choice-keepAlive",
    data (){
        return {
            maskStatus: false
        }
    },
    methods: {
        overShow() {
            this.maskStatus = true;
        },
        outHide() {
            this.maskStatus = false;
        }
    }
}
</script>


