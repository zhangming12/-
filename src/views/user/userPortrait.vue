<style lang="less" scoped>
@import "../../config/index.less";
.Title {
  text-indent: 1%;
  padding-bottom: 15px;
  font-size: 16px;
}
#Main {
  padding: 15px;
}

#box {
  padding: 20px;
}
</style>

<template>
    <div id="Main">
        <h3>暂未开通</h3>
        <div id="box">
            <!-- <hhTable ref="table" :columns="columns" :pageData="pageData" :noneStatus="noneStatus"></hhTable> -->
        </div>
        
    </div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
export default {
  components: {
    hhTable
  },

  data() {
    return {
      selectStatus: false,
      noneStatus: true,
      columns: [
        {
          title: "中国",
          key: "cn",
          tooltip: true
        },
        {
          title: "美国",
          key: "usa",
          tooltip: true
        },
        {
          title: "英国",
          key: "uk",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  id: "bottonFather"
                }
              },
              [
                h(
                  "button",
                  {
                    style: {
                      borderRight: "1px solid #d2d2d2",
                      padding: "3px 7px"
                    },
                    attrs: {
                      id: "success"
                    },
                    on: {
                      click: () => {
                        this.$refs.table.changeExpend(params, this.showList);
                      }
                    }
                  },
                  "点击"
                ),
                h(
                  "button",
                  {
                    style: {
                      padding: "3px 7px"
                    },
                    class: {
                      down: !this.selectStatus,
                      up: this.selectStatus,
                      "ivu-icon": true
                    },
                    on: {
                      click: () => {
                        this.$refs.table.changeExpend(params, this.showList);
                        this.selectStatus = !this.selectStatus;
                      }
                    }
                  },
                  "点击"
                )
              ]
            );
          }
        }
      ],
      pageData: [
        {
          aa: "11"
        },
        {
          aa: "22"
        }
      ],
      showList: [
        {
          title: "店铺名称",
          key: "aa"
        },
        {
          title: "店铺名称",
          key: "usa"
        },
        {
          title: "店铺名称",
          key: "uk"
        }
      ] // 展示更多的时候的数据
    };
  }
};
</script>


