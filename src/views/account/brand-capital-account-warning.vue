<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.form {
  display: flex;
  position: relative;
  .container {
    width: 35%;
    margin: auto;
    .w18 {
      width: 50%;
      .container {
        width: 100%;
      }
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}

.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.table-box {
  padding: 0 10px;
  // min-height: 500px;/
  padding-bottom: 60px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
}

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 50%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 10px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .modal-main {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .modal-container-item {
      padding-left: 100px;
      margin-bottom: 20px;
      .item {
        .title {
          font-weight: bold;
        }
      }
      .tip {
          font-size: 12px;
          color: #c5c8ce;
      }
    }
  }
}
.upDate {
  float: left;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding: 2px 12px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
}
.demo {
  float: left;
  margin-left: 10px;
  color: @primary-color;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
  span {
    text-decoration: underline;
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
#textarea {
  outline: @primary-color;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  display: block;
  width: 70%;
  text-indent: 10px;
  margin-top: 10px;
  min-height: 80px;
}
#textarea::-webkit-input-placeholder {
  color: #c5c8ce;
}
#textarea::-moz-placeholder {
  color: #c5c8ce;
}
#textarea:-ms-input-placeholder {
  color: #c5c8ce;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">品牌资金账户预警</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
            <div class="container">
              
              <div class="btn-left w18">
                <Form-item  required>
                  <Select v-model="formData.brandId" placeholder="品牌名称*">
                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                  </Select> 
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item  prop="phone">
                  <Input v-model="formData.phone" placeholder="*预警手机号"/>
                </Form-item>
              </div>
              
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-right search-right" @click="submit('form')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
        </Form>
      </div>
      <div class="table-box box">
        <Table ref="table" :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
      
    <!-- 品牌资金账户预警 -->
    <myModal class="myModal"
        @close="closeModal"
        :modal="myModalisShow">
      <div slot="main" class="modal-main">
        <h3>品牌资金账户预警</h3>
        <div class="modal-container-item">
            <div class="item">
                <span class="title">品牌名称：</span>可口可乐
            </div>
        </div>
        <div class="modal-container-item">
            <div class="item">
                <span class="title">黄色预警：</span>低于
                <InputNumber v-model="formItem.yellow"></InputNumber>元
            </div>
            <div class="tip">
                Tip：低于黄色预警金额会立即提醒1次
            </div>
        </div>
        <div class="modal-container-item">
            <div class="item">
                <span class="title">橙色预警：</span>低于
                <InputNumber v-model="formItem.yellow"></InputNumber>元
            </div>
            <div class="tip">
                Tip：低于橙色预警金额每隔6小时预警
            </div>
        </div>
        <div class="modal-container-item">
            <div class="item">
                <span class="title">红色预警：</span>低于
                <InputNumber v-model="formItem.yellow"></InputNumber>元
            </div>
            <div class="tip">
                Tip：低于红色预警金额每隔10分钟预警
            </div>
        </div>
        <div class="modal-container-item">
            <div class="item">
                <span class="title">预警手机号:</span>
                <span class="tip">
                    Tip:多个手机号之间用 / 隔开
                </span>
            </div>
            <textarea v-model.trim="formItem.reviewedMemo" name="" id="textarea" placeholder="请输入手机号"></textarea>
        </div>
        <div class="maintain-footer">
            <Button type="text" @click="closeModal">取消</Button>
            <Button type="text" @click="sureMethod">确定</Button>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import myModal from "@/components/Modal/my-modal.vue";
export default {
  name:"brand-capital-account-warning-keepAlive",
  data() {
    return {
      myModalisShow: false,
      formData: {
        brandId: "",
        phone: ""
      },
      formItem: {
        phoneText: "",
        yellow: "",
        red: "",
        orange: "",
        brandId: "",
        brandName: ""
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      columns1: [
        {
          title: "品牌名称",
          key: "brandName",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "黄色预警",
          minWidth: 100,
          key: "remitArrow",
          align: "center",
          tooltip: true
        },
        {
          title: "橙色预警",
          minWidth: 150,
          key: "bankName",
          align: "center",
          tooltip: true
        },
        {
          title: "红色预警",
          minWidth: 180,
          key: "recNo",
          align: "center",
          tooltip: true
        },
        {
          title: "预警手机号",
          minWidth: 120,
          key: "remitPrice",
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          minWidth: 80,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            var tag = [];
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.formItem.brandId = params.row.brandId;
                      this.formItem.brandName = params.row.brandName;
                      this.myModalisShow = true;
                    }
                  }
                },
                "修改"
              )
            );
            return h("div", tag);
          }
        }
      ],
      pageData: [{ aa: "bb" }],
      brandList: []
    };
  },

  components: { myModal },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      {},
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          
        }
      }
    );
  },
  watch: {
    myModalisShow(val) {
      if (!val) {
        // this.formItem = {
        //   reviewedStatus: "",
        //   reviewedMemo: "",
        //   id: "",
        //   brandId: ""
        // };
      }
    }
  },
  methods: {
    sureMethod() {
      if (!this.formItem.reviewedStatus) {
        this.$Message.error("审核状态不能为空");
        return false;
      }
      //当审核状态为不通过时，审核意见必填
      if (this.formItem.reviewedStatus == 2 && !this.formItem.reviewedMemo) {
        this.$Message.error("审核意见不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formItem);
      this.Global.deleteEmptyProperty(data);
      console.log(data);
      this.Global.doPost("brandAccount/fundAudit.json", data, res => {
        this.myModalisShow = false;
        this.$Message.success("审核成功");
        this.init();
      });
    },
    closeModal() {
      this.myModalisShow = false;
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("brandAccount/queryTransferList.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
      });
    }
  }
};
</script>