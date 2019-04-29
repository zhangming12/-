<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}
.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;

      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    color: #333;
    cursor: pointer;
  }
  .demo {
    float: right;
    color: @primary-color;
    line-height: 24px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">菜单权限设置</h2> -->
    <div class="main-container">
      <div class="box" style="margin-top: 15px;overflow: hidden;">
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/util/config.js";
export default {
  name: "menu-permissions-settings-keepAlive",

  data() {
    return {
      pageSize: 10,
      page: 1,
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "品牌",
          key: "brandName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            var tag = [
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
                      let queryParams = {
                        brandId: params.row.id,
                        brandName: params.row.brandName
                      };

                      this.$router.push({
                        path: "/menuSettings",
                        query: queryParams
                      });
                    }
                  }
                },
                "设置"
              )
            ];
            return h("div", tag);
          }
        }
      ],
      pageData: [],
      pageNum: 0,
      brandList: [],
      showUnlock: false
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryAllBrands.json", "", res => {
      this.pageData = [];
      Object.entries(res).forEach(item => {
        this.pageData.push({ id: Number(item[0]), brandName: item[1] });
      });
    });
  },
  methods: {
    cancel() {
      this.changeSaleRouteIsShow = false;
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = {};
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("worker/queryWorkerActivityReport.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>


