<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: 100%;
  padding: 8px;
  background: #f4f3f9;
  overflow: hidden;
  .box {
    background: white;
    height: 100%;
    .box-top {
      width: 100%;
      height: 100%;
      .left,
      .right {
        float: left;
        height: 100%;
        padding: 10px 10px 0;
        .video-box {
          width: 100%;
          height: 75%;
          background: #ffebeb;
          position: relative;
          #video {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
        }
        .content-box {
          width: 100%;
          height: 25%;
          padding-bottom: 20px;
          .top {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            .calculation {
              width: 100%;
              height: 30px;
              overflow: hidden;
              span {
                float: left;
                color: #333333;
              }
              span.color {
                color: #ff8d2b;
              }
            }
          }
          .content {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .title {
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: #ff8d2b;
              border-left: 3px #ff8a23 solid;
              padding-left: 8px;
              span {
                color: #333;
              }
            }
            .ulBox {
              height: calc(~"(100% - 40px)");
              overflow: hidden;
              overflow-y: auto;
              padding-bottom: 10px;
            }
            ul {
              width: 100%;
              height: auto;
              overflow: hidden;
              li {
                float: left;
                width: 100%;
                padding: 10px;
                height: 100px;
                .li-left,
                .li-middle,
                .li-right {
                  float: left;
                  height: 100%;
                  img {
                    display: block;
                  }
                }
                .li-left {
                  width: 20px;
                  margin-right: 10px;
                  img {
                    width: 20px;
                    height: 20px;
                    margin-top: 30px;
                    cursor: pointer;
                  }
                }
                .li-middle {
                  width: 80px;
                  margin-right: 10px;
                  img {
                    width: 80px;
                    height: 80px;
                    border: 1px solid red;
                  }
                }
                .li-right {
                  line-height: 80px;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }

      .left {
        width: 35%;
      }
      .right {
        width: 65%;
        .topBar {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          padding: 0;
          .left {
            padding: 0;
            line-height: 40px;
            float: left;
            font-weight: bold;
          }
          .right {
            float: right;
            height: 40px;
            width: 180px;
            padding: 0;
            span {
              display: block;
              width: 80px;
              height: 30px;
              line-height: 30px;
              font-size: 12px;
              text-align: center;
              color: white;
              border-radius: 4px;
              float: left;
              margin-right: 10px;
              cursor: pointer;
            }
            span.btn1 {
              background: #009cfe;
            }
            span.btn2 {
              background: #ff7f00;
            }
          }
        }
        .content-box {
          height: calc(~"(100% - 80px)");
          .content {
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
            ul {
              li {
                width: 50%;
                min-width: 300px;
                position: relative;
                .li-right {
                  line-height: 20px;
                  p {
                    margin-top: 20px;
                  }
                }
                .light-bulb {
                  // float: right;
                  top: 10px;
                  right: 20px;
                  position: absolute;
                  height: 35px;
                  // margin-top: 22px;
                  img {
                    display: inline-block;
                    width: 33px;
                    height: 35px;
                  }
                  span {
                    color: #ff9d56;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);

  filter: grayscale(100%);

  filter: gray;
}
.numberInput {
  border: 1px solid #dddee1;
  width: 80px;
  display: block;
  height: 32px;
  line-height: 32px;
  padding: 0 0 0 7px;
  text-align: left;
  outline: 0;
  -moz-appearance: textfield;
  color: #666;
  border-radius: 4px;
  transition: all 0.2s linear;
}
.skuSelect {
  height: 40px;
  width: 300px;
  margin: 0 auto;
  line-height: 40px;
  .select {
    float: left;
    width: 200px;
  }
  span {
    float: left;
    margin-top: -4px;
    margin-right: 4px;
  }
}
</style>
<template>
  <div class="container">
      <div class="box">
          <div class="box-top">
              <div class="left">
                <div class="video-box">
                    <video :src="videoSrc" controls id="video">
                        您的浏览器不支持Video标签
                    </video>
                </div>
                <div class="content-box">
                    <div class="top">
                        <Row>
                            <Col span="8">
                                <div class="calculation">
                                    <span>SKU数:</span>
                                    <span class="color" v-if="choosenList.length">{{skuNum}}{{skuStatus | statusfilter}}</span>
                                    <span class="color" v-else>0/不合格</span>
                                </div>
                            </Col>
                            <Col span="8">
                                <div class="calculation">
                                    <span>必备分:</span>
                                    <span class="color" v-if="choosenList.length">{{essentialPoints}}{{scoreStatus | statusfilter}}</span>
                                    <span class="color" v-else>0/不合格</span>
                                </div>
                            </Col>
                            <Col span="8">
                                <div class="calculation">
                                    <span>数量:</span>
                                    <span class="color" v-if="choosenList.length">{{num}}</span>
                                    <span class="color" v-else>0</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div class="content">
                        <div class="title">
                            门店SKU: <span>{{choosenList.length}} </span> 个
                        </div>
                        <div class="ulBox">
                            <ul>
                                <li v-for="(item,index) in choosenList" :key="index">
                                    <div class="li-left" @click="deleteSKU(index)">
                                        <img src="../../../assets/image/SKU3.png" alt="">
                                    </div>
                                    <div class="li-middle">
                                        <img :src="item.imageUrl" alt="">
                                    </div>
                                    <div class="li-right">
                                        {{item.sku}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="right">
                <div class="topBar">
                    <span class="left">待选区域SKU</span>
                    <div class="right">
                        <span class="btn1" @click="checkScore">检测得分</span>
                        <span class="btn2" @click="save">保存</span>
                    </div>
                </div>
                <div class="skuSelect">
                    <span>SKU分类:</span>
                    <Select class="select" v-model="skuCatgariy" placeholder="请选择SKU分类" @on-change="skuChange" clearable>
                        <Option :value="item.salesBrandTag" v-for="(item,index) in skuCatgariyList" :key="index">{{ item.salesBrandTag }}</Option>
                    </Select>
                </div>
                <div class="content-box">
                    <div class="content">
                        <ul>
                            <li v-for="(item,index) in skuList" :key="index">
                                <div class="li-left" @click="addClick(index,item)">
                                    <!-- <img src="../../../assets/image/SKU1.png" v-show="checkedList[index].checked">
                                    <img src="../../../assets/image/SKU2.png" v-show="!checkedList[index].checked"> -->
                                    <img src="../../../assets/image/SKU1.png" v-show="judgeChecked(item.id)">
                                    <img src="../../../assets/image/SKU2.png" v-show="!judgeChecked(item.id)">
                                </div>
                                <div class="li-middle">
                                    <img :src="item.imageUrl" :class="judgeChecked(item.id)?'':'gray'">
                                </div>
                                <div class="li-right">
                                    <input type="number" v-model="item.checkNum" placeholder="输入数量" min="1" max="1000" class="numberInput">
                                    <p>{{item.sku}}</p>
                                </div>
                                <div class="light-bulb">
                                    <img src="../../../assets/image/light.png" v-if="item.num" alt="">
                                    <img src="../../../assets/image/lightGray.png" v-if="!item.num" alt="">
                                    <span>{{item.num}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      skuCatgariy: "",
      skuList: [],
      videoSrc: "", //视频地址
      num: 0, //数量
      skuNum: 0, //sku数
      essentialPoints: 0, //必备分,
      scoreStatus: null,
      skuStatus: null,
      id: "",
      checkedList: [],
      choosenList: [],
      brandId: "",
      skuCatgariyList: []
    };
  },
  created() {
    this.brandId = this.$route.query.brandId;
    this.id = this.$route.query.id;
    this.init(this.id);
  },
  mounted() {
    let video = document.getElementById("video");
    window.addEventListener(
      "keydown",
      e => {
        if (e.keyCode == 32) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      },
      false
    );
  },
  beforeDestroy() {
    window.removeEventListener(
      "keydown",
      e => {
        if (e.keyCode == 32) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      },
      false
    );
  },
  watch: {},
  computed: {},

  methods: {
     judgeChecked(id) {
      let flag = false;
      for (let i = 0; i < this.checkedList.length; i++) {
        if (id == this.checkedList[i].id) {
          flag = this.checkedList[i].checked;
        }
      }
      return flag;
    },
    //删除
    deleteSKU(index) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除该SKU？",
        onOk: () => {
          let id = this.choosenList[index].id;
          this.choosenList.splice(index, 1);
          let n = null;
          for (let i = 0; i < this.checkedList.length; i++) {
            if (this.checkedList[i].id == id) {
              n = i;
              break;
            }
          }
          this.checkedList[n].checked = false;
          this.checkScore();
        }
      });
    },
    skuChange(val) {
      this.Global.doPost(
        "displayYxtg/getAllSkuInfoByBrand.json",
        { brandId: this.brandId, salesBrandTag: val },
        res => {
          this.skuList = [];
          this.skuList = res;
        }
      );
    },
    //添加删除
    addClick(index, item) {
      let id = item.id;
      let m = null;
      for(let i = 0;i<this.checkedList.length;i++){
        if(this.checkedList[i].id == id){
          m = i;
          this.checkedList[i].checked = !this.checkedList[i].checked;
          break;
        }
      }
      

      if (this.checkedList[m].checked) {
        this.choosenList.push(item);
      } else {
        let n = null;
        if (this.choosenList.length) {
          for (let i = 0; i < this.choosenList.length; i++) {
            if (this.choosenList[i].id == id) {
              n = i;
              break;
            }
          }
          this.choosenList.splice(n, 1);
        }
      }
    },
    //检测得分
    checkScore() {
      let data = {};
      data.id = this.id;
      let skuVOs = [];
      if (!this.choosenList.length) {
        // this.$Message.info("请选择sku");
        return false;
      }
      for (let i = 0; i < this.choosenList.length; i++) {
        let obj = {};
        if (this.choosenList[i].checkNum) {
          skuVOs.push({
            id: this.choosenList[i].id,
            num: this.choosenList[i].checkNum
          });
        } else {
          skuVOs.push({
            id: this.choosenList[i].id
          });
        }
      }
      data.skuVOs = skuVOs;
      this.Global.doPost("displayYxtg/skuCheckScore.json", data, res => {
        if (res) {
          this.skuNum = res.skuNum;
          this.essentialPoints = res.score;
          this.num = res.total;
          this.scoreStatus = res.scoreStatus;
          this.skuStatus = res.skuStatus;
          // this.checkScore();
        }
      });
    },
    //保存
    save() {
      let data = {};
      data.id = this.id;
      let skuVOs = [];
      if (!this.choosenList.length) {
        this.$Message.info("请选择sku");
        return false;
      }
      for (let i = 0; i < this.choosenList.length; i++) {
        let obj = {};
        if (this.choosenList[i].checkNum) {
          skuVOs.push({
            id: this.choosenList[i].id,
            num: this.choosenList[i].checkNum
          });
        } else {
          skuVOs.push({
            id: this.choosenList[i].id
          });
        }
      }
      data.skuVOs = skuVOs;
      this.Global.doPost("displayYxtg/saveSkuCheckScore.json", data, res => {
        this.$Message.success("保存成功");
      });
      this.checkScore();
    },
    init(id) {
      let data = {};
      //所有的Sku
      this.Global.doPost("displayYxtg/displaySkuCheck.json", { id }, res => {
        
        this.radioUrl = "";
        this.skuList = [];
        if (res) {
          this.videoSrc = res.radioUrl;
          this.skuList = res.skuList;
          this.checkedList = [];
          if (res.skuList && res.skuList.length) {
            for (let i = 0; i < res.skuList.length; i++) {
              this.checkedList.push({
                checked: false,
                id:res.skuList[i].id
              });
            }
          }

          //已选的sku
          this.Global.doPost("displayYxtg/choosenSku.json", { id }, res => {
            
            if (res && res.length) {
              for (let i = 0; i < res.length; i++) {
                for (let j = 0; j < this.skuList.length; j++) {
                  if (res[i].id == this.skuList[j].id) {
                    this.checkedList[j].checked = true;
                    this.choosenList.push(this.skuList[j]);
                    break;
                  }
                }
              }
              this.checkScore();
            }
          });
        }
      });
      if (this.brandId) {
        this.Global.doPost(
          "displayYxtg/getSkuTag.json",
          { brandId: this.brandId },
          res => {
            this.skuCatgariyList = res;
          }
        );
      }
    }
  },
  filters: {
    statusfilter(val) {
      let str = "";
      switch (val) {
        case 1:
          str = "/合格";
          break;
        case 2:
          str = "/不合格";
          break;
        default:
          str = "";
          break;
      }
      return str;
    }
  }
};
</script>