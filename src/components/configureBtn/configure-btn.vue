<style lang="less" scoped>
.check-boxs {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  .check {
    width: 100%;
    height: 36px;
    line-height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    
  }
}
.modal-main {
  .title {
    line-height: 24px;
    font-size: 12px;
  }
  .itemBox {
    margin: 5px 0;
  }
  .categoryBox {
    height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .left,
    .right {
      width: 47%;
      height: 100%;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      .tit {
        line-height: 30px;
        font-size: 12px;
        border-bottom: 1px solid #e5e5e5;
        width: 90%;
        margin-left: 5%;
      }
      .cMain {
        height: 260px;
        margin-top: 5px;
        overflow-y: scroll;
        .item {
          line-height: 30px;
          padding-left: 20px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="check-boxs">
    <div class="check">
      <Button class="btn" :disabled="dis" type="primary" size="small" @click="showModal">配置</Button>
    </div>
    <Modal v-model="showToolTip" width="800" title="SKU必备项配置">
      <div class="modal-main">
        <div class="title">选择SKU考核品类：</div>
        <div class="categoryBox itemBox">
          <div class="left">
            <div class="tit">待选
              <Checkbox
                style="margin-left:20px;"
                @on-change="selectAllMethod"
                v-model="selectAll"
              >全选</Checkbox>
            </div>
            <div class="cMain">
              <CheckboxGroup v-model="cSkuNecessary" @on-change="checkChange">
                <div class="item" v-for="item in categoryList" :key="item.id">
                  <Checkbox :label="item.id">{{ item.skuName }}</Checkbox>
                </div>
              </CheckboxGroup>
            </div>
          </div>
          <div class="right" v-if="showRight">
            <div class="tit">已选</div>
            <div class="cMain">
              <CheckboxGroup v-model="selectedCategoryList" v-if="selectedCategoryList.length">
                <div class="item" v-for="item in selectedCategoryList" :key="item">
                  <Checkbox disabled :label="item">{{ item }}</Checkbox>
                </div>
              </CheckboxGroup>
              <CheckboxGroup v-model="sCategoryList" v-else>
                <div class="item" v-for="item in sCategoryList" :key="item">
                  <Checkbox disabled :label="item">{{ item }}</Checkbox>
                </div>
              </CheckboxGroup>
            </div>
          </div>
        </div>
        <div class="title">常用SKU标签：</div>
        <div class="labelBox itemBox">
          <Input type="textarea" v-model="cLabel" :rows="4" placeholder="请输入常用SKU标签"/>
        </div>
        <div class="title">配置SKU品类规则：</div>
        <div class="ruleBox itemBox">
          <Input type="textarea" v-model="cSkuExpression" :rows="4" placeholder="请输入SKU品类规则"/>
        </div>
      </div>
      <div slot="footer" class="modal-footer">
        <Button type="info" @click="cancel">取消</Button>
        <Button type="primary" @click="sure">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "configure-btn",
  data() {
    return {
      cLabel: this.label, //常用标签
      cSkuExpression: this.skuExpression, //规则
      cSkuNecessary: [...this.skuNecessary], //已选中
      showToolTip: false,
      showRight: true,
      // categoryList: [],
      // selectedCategoryList: [...this.sCategoryList],
      // selectedCategoryList:JSON.parse(JSON.stringify(this.sCategoryList)),
      selectedCategoryList:[],
      selectAll: false
    };
  },
  computed: {},
  props: {
    checkList: {
      type: Array,
      default() {
        return [];
      }
    },
    brandId: {
      type: [Number, String],
      required: true
    },
    dis: {
      type: Boolean,
      default: false
    },
    skuExpression: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    categoryList: {
      type: Array,
      default() {
        return [];
      }
    },
    sCategoryList: {
      type: Array,
      default() {
        return [];
      }
    },
    skuNecessary: {
      type: Array,
      default() {
        return [];
      }
    },
    ind:{
      type:[String,Number]
    }
  },
  destroyed() {},
  created() {},
  methods: {
    selectAllMethod(val) {
      if (val) {
        let arr = [];
        let arr1 = [];
        this.categoryList.forEach(item => {
          arr.push(item.id);
          arr1.push(item.skuName);
        });
        this.cSkuNecessary = [...arr];
        this.selectedCategoryList = [...arr1];
      } else {
        this.cSkuNecessary = [];
        this.selectedCategoryList = [];
        this.$emit("sCategoryListChange",this.ind)
      }
    },
    cancel() {
      this.showToolTip = false;
    },
    getSelectedCategoryList(val) {
      let arr = [];
      if (val.length) {
        let arr = [];
        val.forEach(item => {
          this.categoryList.forEach(v => {
            if (item == v.id) {
              arr.push(v.skuName);
            }
          });
        });
      }
      return arr;
    },
    sure() {
      if (!this.cSkuNecessary.length) {
        this.$Message.info("请选择品类");
        return false;
      }
      if (!this.cLabel) {
        this.$Message.info("请输入常用标签");
        return false;
      }
      if (!this.cSkuExpression) {
        this.$Message.info("请输入SKU品类规则");
        return false;
      }
      try {
        JSON.parse(this.cSkuExpression)
      } catch (error) {
        this.$Message.info("输入的品类规则不合法")
        return
      }
      this.$emit("getSKUInfomation", {
        skuNecessary: this.cSkuNecessary,
        label: this.cLabel,
        skuExpression: this.cSkuExpression
      });
      this.cancel();
    },
    checkChange(val) {
      this.selectedCategoryList = [];
      if (val && val.length) {
        let arr = [];
        val.forEach(item => {
          this.categoryList.forEach(v => {
            if (item == v.id) {
              arr.push(v.skuName);
            }
          });
        });
        this.selectedCategoryList = [...arr];
      }
    },
    showModal() {
      this.showToolTip = true;
      this.showRight = false;
      this.$nextTick(() => {
        this.showRight = true;
      });
    }
  },
  components: {},
  filters: {}
};
</script> 