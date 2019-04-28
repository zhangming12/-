
<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  padding: 15px;
}
.box {
  // position: relative;
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  overflow: hidden;
  .form-title {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    font-weight: 600;
    padding-left: 10px;
    border-left: 3px solid @primary-color;
    margin-bottom: 10px;
    color: @primary-color;
  }
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.imgBox {
  position: relative;
  width: 70px;
  height: 80px;
  float: right;
  top: -30px;
  left: 10px;
  .menuImg {
    display: block;
    width: 70px;
    height: 70px;
  }
  .menuName {
    text-align: center;
    font-size: 12px;
  }
}
.numberInput {
  border: 1px solid #dddee1;
  width: 100%;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">功能权限设置</h2> -->

    <div class="box">
      <!-- 品牌 -->
      <Form :model="formData" label-position="left" :label-width="72">
        <div class="form-title" style="margin-bottom:10px;">
          品牌 :
          <span>{{brandName}}</span>
        </div>
        <!-- 选择可用菜单 -->
        <div class="form-title">选择可用菜单</div>
        <Form>
          <Checkbox-group v-model="menu" v-if="menuDataList">
            <Row>
              <Col
                span="8"
                style="margin-bottom:20px;"
                v-for="(item,index) in menuDataList"
                :key="item.id"
              >
                <Row type="flex" align="middle" style="height:80px;">
                  <Col span="8" style="height:80px;">
                    <Checkbox :label="item.id" style="position:relative;top:30px;">
                      <div class="imgBox">
                        <img :src="item.resIcon" alt class="menuImg">
                        <p class="menuName">{{item.resName}}</p>
                      </div>
                    </Checkbox>
                  </Col>
                  <Col span="5" style="height:30px;">
                    <FormItem label="序号:" :label-width="40">
                      <!-- <InputNumber :max="20" :min="1" :step="1" style="width:100%;" ></InputNumber> -->
                      <input
                        type="number"
                        min="1"
                        max="20"
                        class="numberInput"
                        v-model.number="menuList[index].orderIndex"
                      >
                    </FormItem>
                  </Col>
                  <Col span="9" offset="1" style="height:30px;">
                    <Input
                      placeholder="请输入文字角标"
                      v-if="item.iconSign == 3"
                      v-model="menuList[index].resourceText"
                      :maxlength="4"
                    ></Input>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Checkbox-group>
        </Form>

        <div style="text-align:center;margin:20px 0;">
          <i-button type="success" @click="cancel" style="margin-right:10px;">取消</i-button>
          <i-button type="primary" @click="submit" style="margin-left:10px;">确定</i-button>
        </div>
      </Form>
      <!-- 操作日志  -->
      <div class="form-title" style="margin-top:18px;">操作日志</div>
      <div style="padding:10px;">
        <p style="text-indent:20px;" v-for="(item,index) in logList" :key="index">
          <span>{{index+1}},</span>
          <span>{{item.createTime | formatDate}}</span>
          <span>{{item.userName}}</span>
          设置了
          <span>{{item.params}}</span>
          品牌
          ，增加了
          <span>{{item.result}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { getRoleResource } from "@/api/common.js";

export default {
  name: "menu-settings",

  data() {
    return {
      numberInput: null,
      menuList: [],
      menu: [],
      logList: [], //操作日志
      formData: {},
      menuDataList: [],
      brandName: "",
      brandId: ""
    };
  },
  created() {
    this.brandName = this.$route.query.brandName;
    this.brandId = this.$route.query.brandId;
    this.init();
  },
  mounted() {},
  watch: {},
  methods: {
    cancel() {
      this.menu = [];
      this.$router.push({
        path: "/menuPermissionsSettings"
      });
    },
    submit() {
      let data = {
        brandId: this.brandId,
        brandName: this.brandName,
        resourceList: []
      };
      let len = this.menu.length;

      // if (!len) {
      //   this.$Message.error("请选择菜单");
      //   return false;
      // }
      let list = [];
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < this.menuDataList.length; j++) {
          if (this.menuDataList[j].id == this.menu[i]) {
            if (!this.menuList[j].orderIndex) {
              this.$Message.error("请选择次序");
              return false;
            }
            if (this.menuDataList[j].iconSign == 3) {
              list.push({
                resourceId: this.menu[i],
                resourceText: this.menuList[j].resourceText,
                orderIndex: this.menuList[j].orderIndex
              });
            } else {
              list.push({
                resourceId: this.menu[i],
                orderIndex: this.menuList[j].orderIndex
              });
            }
          }
        }
      }
      data.resourceList = list;
      data = this.Global.JsonChange(data);
      this.$Modal.confirm({
        title: "警告",
        content: "是否确定修改",
        onOk: () => {
          this.Global.doPost("resource/setBrandResource.json", data, res => {
            this.$Message.success("设置成功");
            this.cancel();
          });
        }
      });
    },
    init() {
      let data = {};
      //获取操作品牌菜单列表
      this.Global.doPost("resource/doQueryAll.json", data, res => {
        if (res && res.length) {
          let len = res.length;
          for (let i = 0; i < len; i++) {
            this.menuList.push({
              resourceId: "",
              resourceText: "",
              orderIndex: null
            });
          }
          this.menuDataList = res;
          this.Global.doPost(
            "resource/queryBrandResourceList.json",
            { brandId: this.brandId },
            res => {
              if (res) {
                for (let i = 0; i < res.length; i++) {
                  this.menu.push(res[i].id);
                }
                for (let i = 0; i < res.length; i++) {
                  for (let j = 0; j < this.menuDataList.length; j++) {
                    if (this.menuDataList[j].id == this.menu[i]) {
                      this.menuList[j].orderIndex = res[i].orderIndex;
                      this.menuList[j].resourceText = res[i].resourceText;
                    }
                  }
                }
              }
            }
          );
        }
      });
      //获取操作日志数据
      this.Global.doPost("resource/queryOperateLogVO.json", {}, res => {
        this.logList = [];
        if (res && res.length) {
          this.logList = res;
        }
      });
    }
  },
  filters: {
    //格式化时间
    formatDate(t) {
      var date = new Date(Number(t));
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
};
</script>