<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
.container {
  width: 100%;
  // height: 100%;
  height: 600px;
  padding: 8px;
  padding-bottom: 0;
  background: #f4f3f9;
  .boxs {
    background: white;
    // height: 100%;
    height: calc(~"(100% - 40px)");
    .box-top {
      width: 100%;
      height: 70%;
      .left,
      .right {
        float: left;
        height: 100%;
        width: 50%;
        padding: 10px 10px 0;
        .title {
          text-align: center;
          font-weight: normal;
          font-size: 14px;
          color: #ff8a23;
        }
        .content-box {
          width: 100%;
          height: 100%;
          // overflow-y: auto;
          p {
            text-align: center;
            color: black;
            line-height: 40px;
            span {
              color: #ff8a23;
            }
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
          .content {
            width: 100%;
            // min-height: 90%;
            // height: 100%;
            height: calc(~"(100% - 40px)");
            overflow: hidden;
            overflow-y: auto;
            ul {
              width: 100%;
              min-height: 90%;
              li {
                float: left;
                width: 50%;
                padding: 10px;
                height: 80px;
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
                  margin-right: 5px;
                  img {
                    width: 20px;
                    height: 20px;
                    margin-top: 20px;
                    cursor: pointer;
                  }
                }
                .li-middle {
                  width: 60px;
                  margin-right: 5px;
                  img {
                    width: 60px;
                    height: 60px;
                    border: 1px solid red;
                  }
                }
                .li-right {
                  line-height: 30px;
                  font-size: 12px;
                  width: calc(~"100% - 90px");
                  overflow: hidden;
                }
              }
            }
          }
        }
      }

      .left .content-box {
        border-right: 2px #dddddd dashed;
      }
    }
    .box-bottom {
      height: 28%;
      margin-top: 2%;
      padding: 8px;
      .left,
      .right {
        float: left;
        width: 50%;
        height: 90%;
        .boxs {
          height: 100%;
          width: 96%;
          border: 1px solid #d7d7d7;
          border-radius: 2px;
          position: relative;
          padding: 6px;
          padding-top: 10px;
          .title {
            position: absolute;
            color: #ff943b;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            background: white;
            width: 125px;
            height: 25px;
            line-height: 25px;
            top: -13px;
            left: 20px;
          }
          .textarea {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            resize: none;
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
footer {
  width: 100%;
  height: 40px;
  text-align: center;
  background: #fff;
  span {
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: white;
    margin-top: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  span.back {
    background: #3399ff;
    margin-right: 10px;
  }
  span.save {
    background: #00cc66;
    margin-left: 10px;
  }
}
</style>
<template>
  <div class="container">
      <div class="boxs">
          <div class="box-top">
              <div class="left">
                <h3 class="title">需要记录的SKU</h3>
                <div class="content-box">
                    <p>SKU数量: <span> {{recoredSkuList.length}}</span> 个</p>
                    <div class="content">
                        <ul>
                            <li v-for="(item,index) in recoredSkuList" :key="index">
                                <div class="li-left" @click="deleteSKU(index)">
                                    <img src="../../assets/image/SKU3.png" alt="">
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
            <div class="right">
                <h3 class="title">待选区域SKU</h3>
                <div class="content-box">
                    <div class="skuSelect">
                        <span>SKU分类:</span>
                        <Select class="select" v-model="skuCatgariy" placeholder="请选择SKU分类" @on-change="skuChange" clearable>
                            <Option :value="item.salesBrandTag" v-for="(item,index) in skuCatgariyList" :key="index">{{ item.salesBrandTag }}</Option>
                        </Select>
                    </div>
                    <div class="content">
                        <ul>
                            <li @click="addClick(index)" v-for="(item,index) in skuList" :key="index">
                                <div class="li-left">
                                    <img src="../../assets/image/SKU1.png" v-show="judgeChecked(item.id)">
                                    <img src="../../assets/image/SKU2.png" v-show="!judgeChecked(item.id)">
                                </div>
                                <div class="li-middle">
                                    <img :src="item.imageUrl" alt="" :class="judgeChecked(item.id)?'':'gray'">
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
          <div class="box-bottom">
              <div class="left">
                  <div class="boxs">
                      <div class="title">
                            SKU数量校验规则
                      </div>
                      <textarea :readonly="type == 'look'" v-model="skuNumberRule" class="textarea" cols="30" rows="10"></textarea>
                  </div>
                  
              </div>
              <div class="right">
                  <div class="boxs">
                      <div class="title" style="width:140px;">
                            SKU必备项校验规则
                      </div>
                      <textarea :readonly="type == 'look'" v-model="skuRule" class="textarea" cols="30" rows="10"></textarea>
                  </div>
              </div>
          </div>
      </div>
      <footer>
        <span class="back" @click="back">返回</span>
        <span class="save" @click="save">保存</span>
      </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      skuCatgariy: "", //sku分类
      skuCatgariyList: [], //sku分类列表
      skuList: [], //sku列表
      recoredSkuList: [], //需要记录的sku列表

      skuNumberRule: "", //sku数量校验规则
      skuRule: "", //sku必备项校验规则
      skuCheckedList: []
    };
  },
  props: {
    aid: {
      type: [String, Number],
      default: ""
    },
    gid: {
      type: [String, Number],
      default: ""
    },
    brandId: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: [String, Number],
      default: ""
    },
    arecoredSkuList: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {},
  watch: {
    brandId() {
      this.init();
    },
    arecoredSkuList(val) {
      console.log(val);

      console.log("数据改变了");
      

      this.init();
    }
  },
  computed: {},
  methods: {
    judgeChecked(id) {
      let flag = false;
      for (let i = 0; i < this.skuCheckedList.length; i++) {
        if (id == this.skuCheckedList[i].id) {
          flag = this.skuCheckedList[i].checked;
        }
      }
      return flag;
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
    //   删除
    deleteSKU(index) {
      if (this.type == "look") {
        return;
      }
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除该SKU？",
        onOk: () => {
          let id = this.recoredSkuList[index].id;
          for (let i = 0; i < this.skuCheckedList.length; i++) {
            if (id == this.skuCheckedList[i].id) {
              this.skuCheckedList[i].checked = false;
              break;
            }
          }
          this.recoredSkuList.splice(index, 1);
        }
      });
    },
    //添加删除
    addClick(index) {
      if (this.type == "look") {
        return;
      }
      for (let i = 0; i < this.skuCheckedList.length; i++) {
        if (this.skuCheckedList[i].id == this.skuList[index].id) {
          this.skuCheckedList[i].checked = !this.skuCheckedList[i].checked;
        }
      }
      if (this.judgeChecked(this.skuList[index].id)) {
        this.recoredSkuList.push(this.skuList[index]);
      } else {
        let id = this.skuList[index].id;
        for (let i = 0; i < this.recoredSkuList.length; i++) {
          if (id == this.recoredSkuList[i].id) {
            this.recoredSkuList.splice(i, 1);
            break;
          }
        }
      }
    },
    init() {
      this.Global.doPost(
        "displayYxtg/getAllSkuInfoByBrand.json",
        { brandId: this.brandId },
        res => {
          // console.log(res);
          this.skuList = res;
          this.skuCheckedList = [];
          for (let i = 0; i < res.length; i++) {
            this.skuCheckedList.push({ checked: false, id: res[i].id });
          }
          this.readVuexSkuList();
        }
      );
      if (this.brandId) {
        this.Global.doPost(
          "displayYxtg/getSkuTag.json",
          { brandId: this.brandId },
          res => {
            this.skuCatgariyList = res;
          }
        );
      }
    },
    //回到上一页
    back() {
      // this.$router.back(-1);
      this.$emit("getData", "close");
    },
    readVuexSkuList() {
      if (this.skuCheckedList && this.skuCheckedList.length) {
        if (Object.keys(this.arecoredSkuList).length) {
          this.skuRule = this.arecoredSkuList.skuRule;
          this.recoredSkuList = this.arecoredSkuList.recoredSkuList;
          this.skuNumberRule = this.arecoredSkuList.skuNumberRule;
          if (this.recoredSkuList && this.recoredSkuList.length) {
            for (let i = 0; i < this.skuCheckedList.length; i++) {
              for (let j = 0; j < this.recoredSkuList.length; j++) {
                if (this.recoredSkuList[j].id == this.skuCheckedList[i].id) {
                  this.skuCheckedList[i].checked = true;
                }
              }
            }
          }
        } else {
          this.recoredSkuList = [];
          this.skuRule = "";
          this.skuNumberRule = "";
          for (let i = 0; i < this.skuCheckedList.length; i++) {
            this.skuCheckedList[i].checked = false;
          }
        }
      }
    },
    save() {
      if (!this.recoredSkuList.length) {
        this.$Message.error("请选择sku");
        return false;
      }
      if (!this.skuNumberRule) {
        this.$Message.error("sku数量校验规则不能为空");
        return false;
      }
      if (!this.skuRule) {
        this.$Message.error("sku必备项校验规则不能为空");
        return false;
      }
      let str = `b${this.brandId}a${this.aid}g${this.gid}`;
      let data = {};
      data[str] = {
        skuRule: this.skuRule,
        skuNumberRule: this.skuNumberRule,
        recoredSkuList: this.recoredSkuList
      };
      this.$emit("getData", [str, data[str]]);
      this.recoredSkuList = [];
      this.skuCheckedList.forEach(item => {
        item.checked = false;
      });
      this.skuNumberRule = "";
      this.skuRule = "";
      // this.arecoredSkuList = {};
    }
  }
};
</script>