<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
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
    }
    .upDate {
      cursor: pointer;
      text-align: center;
      border: 1px solid #aeaeae;
      padding: 2px 12px;
      margin-right: 10px;
      width: 150px;
    }
    .modal-table {
      max-height: 500px;
      margin-top: 10px;
      .iamge {
        display: block;
        width: 580px;
        height: 400px;
        //   margin:10px;
      }
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.ivu-input {
  text-align: center !important;
}
.spanBtn {
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    color: @primary-color;
  }
}
.form {
  position: relative;
  display: flex;
  justify-content: center;
  .container {
    width: 52.5%;
    .w18 {
      width: 33.3333%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">二维码列表</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入昵称" v-model="formData.wxNickName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Cascader
                  placeholder="所在地"
                  :data="areaData"
                  v-model="formData.areaCode"
                  change-on-select
                ></Cascader>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.sex" placeholder="性别" clearable>
                  <Option value="0">女</Option>
                  <Option value="1">男</Option>
                </Select>
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
        <div class="contentTop">
          <span class="btn-left">
            共查询到
            <span class="numColor">{{ pageNum }}</span> 条数据
          </span>
        </div>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
  </div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import area from "@/config/china_code_data.js";
export default {
  name: "user-list-keepAlive",
  data() {
    return {
      areaData: area,
      formData: {},
      page: 1,
      pageNum: 0,
      noneStatus: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "头像",
          key: "wxFaceUrl",
          align: "center",
          render: (h, params) => {
            var tag = [
              h("img", {
                attrs: { src: params.row.wxFaceUrl },
                style: {
                  display: "block",
                  width: "30px",
                  height: "30px",
                  margin: "0 auto",
                  cursor: "pointer"
                }
              })
            ];
            return h("div", tag);
          }
        },
        {
          title: "昵称",
          key: "wxNickName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "ID",
          key: "memberId",
          minWidth: 140,
          align: "center"
        },
        {
          title: "性别",
          key: "sex",
          minWidth: 140,
          align: "center",
          render: (h, params) => {
            let str = "女";
            if (params.row.sex == 1) {
              str = "男";
            }
            return h("div", str);
          }
        },
        {
          title: "所在地",
          key: "address",
          minWidth: 140,
          align: "center",
          tooltip: true
        }
      ],
      pageData: [],
      pageSize: 10
    };
  },
  components: {
    myModal,
    hhTable,
    fieldNameDes
  },
  methods: {
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("storeZjtg/queryWithPageByMember.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
        this.noneStatus = true;
      });
    }
  }
};
</script>