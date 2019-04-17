<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

header {
  text-align: center;
  color: @primary-color;
  font-size: 14px;
}
.ivu-radio-wrapper {
  margin-right: 30px;
}
</style>

<template>
    <div id="Main">
        <h2 class="Title">资讯发布</h2>
        <div class="box">
            <Form ref="form" :model="formData" :label-width="60">
                <Row>
                    <Col span="10">
                        <Form-item label="品牌名称" prop="brandId">
                            <Select v-model="formData.brandId" placeholder="请选择品牌" clearable>
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                        
                        <Form-item label="展示区域" prop="searchAreaCode">
                            <Cascader :data="areaData" v-model="formData.searchAreaCode" change-on-select></Cascader>
                        </Form-item>
                        <Form-item label="渠道" prop="channel">
                            <Radio-group v-model="formData.channel">
                                <Radio label="BPP">e店佳</Radio>
                                <Radio label="CPP">e促达</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="1">
                        <Form-item label="资讯标题" prop="bannerTitle">
                            <Input v-model.trim="formData.bannerTitle"></Input>
                        </Form-item>

                        <Form-item label="展示状态" prop="showStatus">
                            <Radio-group v-model="formData.showStatus">
                                <Radio label="1">展示中</Radio>
                                <Radio label="2">未展示</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span='2' offset="1" style="margin-top:24px">
                    <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="box" style="padding-bottom:20px">
            
            <div class='contentTop'>
                <Button @click="exportExcel" class="btn-right mg-left10" icon="ios-download-outline" type="primary">导出</Button>
                <Button @click="add" class="btn-right" icon="plus-round" type="success">新建</Button>
            </div>
            <Table :columns="columns1" :data="pageData" disabled-hover></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <Modal v-model="value" width="900" ok-text="保存" scrollable :styles="{top: '20px'}" :mask-closable="false">
            <p slot='header' style="color:#f60;text-align:center">
                <Icon type="document-text" size="16"></Icon>
                <span>资讯</span>
            </p>

            <edd :type="btnType" @close="close"></edd>
            <div slot="footer">
                <!-- <Button type="primary" size="large" >取消</Button>
                <Button type="success" size="large" >保存</Button> -->
            </div>
        </Modal>
    </div>
</template>

<script>
import area from "../../config/china_code_data.js";
import edd from "./edd";
import { channelCode } from "@/util/ENUMS.js";
export default {
  name:"information-list-keepAlive",

  data() {
    var that = this;
    return {
      formData: {
        searchAreaCode: [],
        showStatus: "",
        brandId: "",
        brandTitle: "",
        channel: ""
      },
      page: 1,
      value: false,
      pageNum: 0,
      pageSize: 10,
      columns1: [
        {
          title: "渠道",
          key: "channel",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            return channelCode[params.row.channel];
          }
        },
        {
          title: "品牌名称",
          key: "brandName",
          minWidth: 150,
          align: "center"
        },
        {
          title: "资讯标题",
          key: "bannerTitle",
          minWidth: 150,
          tooltip: true,
          align: "center"
        },
        {
          title: "开始时间",
          key: "startTime",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.startTime);
          }
        },
        {
          title: "结束时间",
          key: "endTime",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.endTime);
          }
        },
        {
          title: "排序",
          key: "orderIndex",
          minWidth: 80,
          align: "center"
        },
        {
          title: "类型",
          key: "contentType",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            return this.Global.ENUMS.textType[params.row.contentType];
          }
        },
        {
          title: "状态",
          key: "showStatus",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            if (params.row.showStatus == 1) {
              return "展示中";
            }

            if (params.row.showStatus == 2) {
              return "未展示";
            }
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            var handle = {};
            if (params.row.status == 1) {
              handle["txt"] = "删除";
              handle["type"] = "error";
              handle["content"] = "确定删除";
              handle["status"] = 0;
            } else {
              handle["txt"] = "恢复";
              handle["type"] = "success";
              handle["content"] = "确定恢复";
              handle["status"] = 1;
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.value = !this.value;
                      this.btnType = {
                        type: "edit",
                        id: params.row.id
                      };
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: handle.type,
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.confirm({
                        title: "提示",
                        content: handle.content,
                        onOk: function() {
                          that.delete(params.row.id, handle.status);
                        }
                      });
                    }
                  }
                },
                handle.txt
              )
            ]);
          }
        }
      ],
      pageData: [],
      areaData: area,
      brandList: [],
      memo: "",
      btnType: {}
    };
  },
  components: {
    edd
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      this.init();
    });
  },
  mounted: function() {},
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.page = size;
      this.init();
    },
    createTime: function(val) {
      var time = this.Global.createTime(val);
      return time;
    },
    init: function() {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);

      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["bizType"] = "news";
      this.Global.doPost("banner/queryBannerList.json", data, function(res) {
        if (res) {
          that.pageNum = res.items;
          that.pageData = res.datalist;
          that.page = res.page;
        } else {
          that.pageNum = 0;
          that.pageData = [];
        }
      });
    },
    blackType: function(data) {
      return this.Global.ENUMS.blackType[data];
    },
    exportExcel: function() {
      this.$Message.error("暂未开通此功能");
    },
    close: function(data) {
      this.value = data;
      this.init();
    },
    add: function() {
      this.value = !this.value;
      this.btnType = {
        type: "add",
        id: ""
      };
    },
    delete: function(id, status) {
      var that = this;
      this.Global.doPost(
        "banner/updateBannerInfoStatus.json",
        {
          id: id,
          status: status
        },
        function(res) {
          that.init();
        }
      );
    }
  }
};
</script>


