<style lang="less" scoped>
@import "../../config/index.less";
#scan-Main {
  height: calc(~"(100% - 10px)");
  .main-container {
    margin-top: 10px;
    position: relative;
    min-height: calc(~"(100% - 10px)");
    margin-left: 10px;
    overflow: hidden;
    background: #ffffff;
    // padding-bottom: 60px;
    padding: 10px 10px;
    .title-box {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 10px;
      .title {
        font-size: 14px;
        border-left: 3px solid @primary-color;
        padding-left: 8px;
        height: 16px;
        line-height: 16px;
      }
    }
    .tab-box {
      width: 100%;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
      margin: 10px 0 25px;
      .tabs-head {
        overflow-x: auto;
        padding-right: 30px;
        padding-left: 5px;
        li {
          cursor: pointer;
          box-sizing: border-box;
          padding: 0 10px;
          text-align: center;
          border-radius: 2px;
          float: left;
          min-width: 100px;
          text-align: center;
          position: relative;
          height: 32px;
          line-height: 32px;
          margin-left: 3px;
          .close {
            position: absolute;
            top: 5px;
            right: 3px;
            cursor: pointer;
          }
          .add-btn {
            cursor: pointer;
            position: absolute;
            top: 3px;
            left: 10px;
          }
        }
        li.color {
          color: @primary-color;
        }
        li.notColor {
          background: #e5e5e5;
        }
        li:not(:last-child):hover {
          background: #e5e5e5;
        }
      }
      .tabs-main {
        width: 100%;
        margin-top: 10px;
        overflow: hidden;
        height: 130px;
        transition: all 0.3s;
        .tabs-box {
          transition: all 0.3s;
          height: 130px;
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          .tabs-item {
            height: 130px;
            flex: 1;
            padding-right: 20px;
            .present-name {
              display: flex;
              flex-direction: row;
              span {
                width: 100px;
                color: @primary-color;
                text-decoration: underline;
                cursor: pointer;
                padding-left: 10px;
              }
            }
          }
        }
      }
    }
    .box {
      .area-out-box {
        display: flex;
        flex-direction: row;
        .RadioGroup {
          width: 130px;
        }
        .Select {
          width: 150px;
        }
      }
    }
    .scan-box {
      width: 90%;
      margin-bottom: 10px;
      .upload-box {
        display: flex;
        img {
          width: 50px;
          height: 50px;
          transform: translateY(-6px);
        }
        span {
          transform: translateY(3px);
          margin-left: 10px;
        }
      }
    }
    footer {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      bottom: 15px;
      right: 15px;
      button {
        padding: 3px 20px;
        margin-left: 20px;
      }
    }
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
  text-align: center;
}
.numberInput::-webkit-input-placeholder {
  color: #c5c8ce;
}
.numberInput[disabled] {
  background-color: #f3f3f3;
  opacity: 1;
  cursor: not-allowed;
}
</style>

<template>
  <div id="scan-Main" >
      <!-- <h2 class="Title">活动包配置 </h2> -->
      <div class="main-container">

        <!-- 基础设置 -->
          <div class="title-box">
              <h3 class="title">基础设置</h3>
              <!-- <saveBtn/> -->
          </div>
          
          <div class="scan-box">
              <Form ref="form1" :model="formData" :label-width="88" :rules="rule">
                <Row>
                    <Col span="6">
                        <Form-item label="品牌名称:" required>
                            <Select :disabled="type == 'look'" v-model="formData.brandId" placeholder="品牌名称*">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                        
                    </Col>
                    <Col span="6">
                        <Form-item label="活动包名:" required>
                            <Input :disabled="type == 'look'" v-model="formData.groupName" placeholder="活动包名" />
                        </Form-item>
                        
                    </Col>
                    <Col span="6">
                        <Form-item label="活动对象:" required>
                            <Select :disabled="type == 'look'" v-model="formData.channel" placeholder="活动对象*">
                                <Option value="B">B端</Option>
                                <Option value="C">C端</Option>
                            </Select> 
                        </Form-item>
                        
                    </Col>
                </Row>
              </Form>
          </div>

          <!-- 限制设置 -->
          <div class="title-box">
              <h3 class="title">限制设置</h3>
              <!-- <saveBtn/>/ -->
          </div>
          <div class="box">
              <Form ref="form3" :model="formData" :label-width="110" :rules="rule">
                <Row>
                    <Col span="6">
                        <Form-item label="日活动次数上限:" >
                            <input :disabled="type == 'look'" type="number" placeholder="日活动次数上限" min="0" class="numberInput" v-model="formData.daily_limit_group">
                        </Form-item>
                        <Form-item label="月活动次数上限:" >
                            <input :disabled="type == 'look'" type="number" placeholder="月活动次数上限" min="0" class="numberInput" v-model="formData.month_limit_group">
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="日活动金额上限:" >
                            <input :disabled="type == 'look'" type="number" placeholder="日活动金额上限" min="0" class="numberInput" v-model="formData.daily_amount_limit_group">
                        </Form-item>
                        <Form-item label="月活动金额上限:" >
                            <input :disabled="type == 'look'" type="number" placeholder="月活动金额上限" min="0" class="numberInput" v-model="formData.month_amount_limit_group">
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="周活动次数上限:" >
                            <input :disabled="type == 'look'" type="number" placeholder="周活动次数上限" min="0" class="numberInput" v-model="formData.week_limit_group">
                        </Form-item>
                        <Form-item label="总活动次数上限:" >
                            <input :disabled="type == 'look'" type="number" placeholder="总活动次数上限" min="0" class="numberInput" v-model="formData.user_limit_group">
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="周活动金额上限:" >
                            <input :disabled="type == 'look'" type="number" placeholder="周活动金额上限" min="0" class="numberInput" v-model="formData.week_amount_limit_group">
                        </Form-item>
                        <Form-item label="总活动金额上限:" >
                            <input :disabled="type == 'look'" type="number" placeholder="总活动金额上限" min="0" class="numberInput" v-model="formData.user_amount_limit_group">
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="地理位置扫码限制:" :label-width="126" required>
                            <Select @on-change="conficChange" :disabled="type == 'look'" v-model="formData.confSpec" placeholder="地理位置扫码限制*">
                                <Option value="kong">关闭</Option>
                                <Option value="back">3个位置后回原位置扫码</Option>
                                <Option value="lock">3个位置后锁定账号</Option>
                            </Select> 
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="限制距离(M):" :label-width="110" required>
                            <input :disabled="type == 'look'" type="number" placeholder="限制距离" min="0" class="numberInput" v-model.number="formData.distance">
                        </Form-item>
                    </Col>
                </Row>
              </Form>
          </div>

          <!-- 底部按钮 -->
          <footer>
              <Button @click="backToLast" type="info">返回</Button>
              <Button v-if="type != 'look'" @click="saveGroup" type="primary">保存</Button>
          </footer>

          <!-- 字段说明 -->
          <fieldNameDes/>
      </div>
      
  </div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import detailBtn from "@/components/Button/detail-btn.vue";
import saveBtn from "@/components/Button/save-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import upData from "@/assets/js/upload.js";
import hhTable from "@/components/table/table.vue";
import PROJECT_CONFIG from "@/util/config.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "scan-group-configure",

  data() {
    return {
      upData: upData,
      groupId: "",
      type: "", //look 查看,modify 修改 add新增
      formData: {
        brandId: "",
        groupId: "",
        confSpec: "kong",
        distance: null,
        groupName: "", //活动包名称
        channel: "", //活动对象
        daily_limit_group: null //日活动次数限
      },
      rule: {},
      brandList: [],
      brandId: ""
    };
  },
  components: {
    dataRange,
    exportBtn,
    detailBtn,
    myModal,
    hhTable,
    saveBtn,
    fieldNameDes
  },
  created() {
    this.groupId = this.$route.query.groupId;
    this.brandId = this.$route.query.brandId;
    this.type = this.$route.query.type;
    //查询品牌信息
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
    });
    //查询活动包信息
    if (this.groupId && this.type != "add") {
      this.Global.doPostNoLoading(
        "activityMaintain/getGroupLimitConfig.json",
        { groupId: this.groupId },
        res => {
          this.formData = res;
          if (res.four_locate_check) {
            this.formData.distance = Number(res.four_locate_check.distance);
            this.formData.confSpec = res.four_locate_check.confSpec;
          } else {
            this.formData.distance = null;
            this.formData.confSpec = "kong";
          }
        }
      );
    }
  },
  watch: {
    // 'formData.confSpec'(val){
    //   console.log(val)
    //   if(val == 'kong'){
    //     console.log("lllll")
    //   }
    // }
  },
  methods: {
    conficChange(val) {
      console.log(val);

      if (val == "kong") {
        console.log(val);
        this.formData.distance = null;
        this.$set(this.formData, "distance", null);
      }
    },
    backToLast(groupId) {
      if (this.type != "add") {
        this.$router.push({
          path: "/scanActivityConfigureGroup"
        });
      } else {
        //新建活动包时直接跳转到新建活动页面
        this.$router.push({
          path: "/scanActivityConfigureGroup",
          query: {
            type: "add",
            brandId: this.formData.brandId,
            groupId
          }
        });
      }
    },
    saveGroup() {
      if (!this.formData.brandId) {
        this.$Message.error("品牌名称不能为空");
        return false;
      }
      if (!this.formData.groupName) {
        this.$Message.error("活动包名称不能为空");
        return false;
      }
      if (!this.formData.channel) {
        this.$Message.error("活动对象不能为空");
        return false;
      }
      if (!this.formData.confSpec) {
        this.$Message.error("地理位置扫码限制不能为空");
        return false;
      }
      if (this.formData.confSpec != "kong" && !this.formData.distance) {
        this.$Message.error("限制距离不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formData);
      data["four_locate_check"] =
        data["confSpec"] == "kong" ? "" : data["confSpec"];
      this.Global.deleteEmptyProperty(data);

      delete data["confSpec"];
      data["operateType"] = this.type == "add" ? 1 : 2;
      this.Global.doPost(
        "activityMaintain/doUpdateOrBuildGroup.json",
        data,
        res => {
          this.$Message.success("保存成功");
          this.groupId = res;
          // this.backToLast(res);
          this.$router.push({
            path: "/scanActivityConfigure",
            query: {
              type: "add",
              brandId: this.formData.brandId,
              groupId: res
            }
          });
        }
      );
    }
  }
};
</script>


