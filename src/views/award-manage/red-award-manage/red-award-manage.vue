<style lang="less" scoped>
@import "../../../config/index.less";

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
</style>

<template>
  <div id="Main">
      <h2 class="Title">红包折扣管理</h2>
      <div class="box">
            <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span='10'>                     
                        <Form-item label="折扣名称" >
                            <Input v-model="formData.name" placeholder="请输入..." ></Input> 
                        </Form-item>
                    </Col>
                    <Col span='10' offset="1">
                        <Form-item label="折扣状态" prop="status"  clearable >
                            <Select v-model="formData.status" placeholder="请选择" clearable>
                                <Option v-for="(value, key, index) in awardStatus" :value="key" :key="key">{{value}}</Option> 
                            </Select>
                        </Form-item>                  
                    </Col>
                    <Col span="2" offset="1">
                        <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
                    </Col>
                </Row>
            </Form>
      </div>
      <div class="box" style="padding-bottom:20px">
        <div class='contentTop'>
            <Button class="btn-right" icon="plus-round" @click="handleAdd" type="primary">新建</Button>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { awardStatus } from "@/util/ENUMS.js";

export default {
  name: "red-award-manage-keepAlive",
  data() {
    const that = this;
    const validateStart = (rule, value, callback) => {
      // 验证开始时间
      if (value == "") {
        callback(new Error("请输入开始时间"));
      } else {
        if (this.formData.queryEndTime !== "") {
          // 对结束时间单独验证
          this.$refs.form.validateField("queryEndTime");
        }
        callback();
      }
    };
    const validateEnd = (rule, value, callback) => {
      // 验证结束时间

      if (value == "") {
        callback(new Error("请输入结束时间"));
      } else {
        const str = new Date(this.formData.queryStartTime).getTime();
        const end = new Date(value).getTime();
        if (end < str) {
          // 判断开始时间是否大于结束时间
          callback(new Error("开始时间大于结束时间"));
        } else {
          callback();
        }
      }
    };
    return {
      formData: {
        name: "",
        status: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],

        activityId: [{ required: true, message: "请选择活动名称" }]
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "折扣名称",
          key: "name",
          width: 150,
          align: "center"
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "center",
          render: (h, params) => {
            return that.Global.createTime(params.row.startTime);
          }
        },
        {
          title: "结束时间",
          key: "endTime",
          align: "center",
          render: (h, params) => {
            return that.Global.createTime(params.row.endTime);
          }
        },
        {
          title: "状态",
          key: "status",
          width: 100,
          align: "center",
          render: (h, params) => {
            return awardStatus[params.row.status];
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: "200",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/redAwardManage-edit",
                        query: { type: "edd", id: params.row.id }
                      });
                    }
                  }
                },
                "修改"
              ),
              // h('Button',{
              //     props: {
              //         type: 'primary',
              //         size: 'small'
              //     },
              //     on: {
              //         click: () => {
              //             this.$router.push('/salesmanEdd?type=edd&id=' + params.row.id);
              //         }
              //     }
              // },'查看')
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除？",
                        onOk: function() {
                          that.handleDelete(params.row.id);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      pageData: [],
      awardStatus //折扣状态
    };
  },
  created: function() {
    this.init(1, 10);
  },
  mounted: function() {},
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init: function(currentPage, pageSize) {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      this.Global.deleteEmptyProperty(data);
      data["type"] = "2";
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.doPost("goodsInfo/queryWithPage.json", data, function(res) {
        that.pageNum = res.items;
        that.pageData = res.datalist;
      });
    },
    handleAdd() {
      this.$router.push({
        path: "/realyAwardManage-edit",
        query: { type: "add" }
      });
    },
    handleDelete(id) {
      var that = this;
      this.Global.doPost(
        "goodsInfo/deleteGoodsInfo.json",
        {
          id: id
        },
        function() {
          that.$Message.success("成功");
          that.init();
        }
      );
    }
  }
};
</script>


