<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.table-box {
  padding: 0 10px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">扫码活动配置(活动)</h2> -->
    <div class="main-container">
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>

          <addNewBtn class="btn-right ml20" @btnClick="addNewActivity"/>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :page-size="pageSize" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addNewBtn from "@/components/Button/addNew-btn.vue";
export default {
  name: "scan-activity-configure-activity",
  data() {
    return {
      brandId: "",
      groupId: "",
      pageNum: 0,
      page: 1,
      pageSize: 20,
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "品牌",
          key: "brandName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "活动包名",
          key: "groupName",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "活动名称",
          key: "name",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "活动时间",
          minWidth: 160,
          key: "summary",
          align: "center",
          tooltip: true
        },
        {
          title: "活动状态",
          minWidth: 100,
          key: "showStatus",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let arr = ["", "未开始", "进行中", "已结束"];
            return h("div", arr[params.row.showStatus]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            let buttonDom = [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let queryParams = {
                        id: params.row.id,
                        groupId: this.groupId,
                        brandId: this.brandId,
                        type: "look"
                      };

                      this.$router.push({
                        path: "/scanActivityConfigure",
                        query: queryParams
                      });
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let queryParams = {
                        id: params.row.id,
                        brandId: this.brandId,
                        groupId: this.groupId,
                        type: "modify"
                      };

                      this.$router.push({
                        path: "/scanActivityConfigure",
                        query: queryParams
                      });
                    }
                  }
                },
                "修改"
              )
            ];
            return h("div", buttonDom);
          }
        }
      ],
      pageData: []
    };
  },
  components: { addNewBtn },
  created() {
    this.groupId = this.$route.query.groupId;
    this.brandId = this.$route.query.brandId;
    this.page = 1;
    this.init();
  },
  methods: {
    // 新建活动
    addNewActivity() {
      this.$router.push({
        path: "/scanActivityConfigure",
        query: {
          type: "add",
          groupId: this.groupId,
          brandId: this.brandId
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      if (this.groupId) {
        let data = {
          groupId: this.groupId,
          pageSize: this.pageSize,
          currentPage: this.page
        };
        this.Global.doPost(
          "activityMaintain/getActivityList.json",
          data,
          res => {
            this.pageData = res.datalist;
            this.pageNum = res.items;
          }
        );
      }
    }
  }
};
</script>