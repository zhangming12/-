<style lang="less" scoped>
@import "../../config/index.less";
#Box {
  padding-top: 20px;
  #title {
    color: @primary-color;
    line-height: 2;
    border-left: 4px solid @primary-color;
    padding-left: 10px;
    font-size: 16px;
  }
  #formBox {
    padding: 30px;
    padding-bottom: 10px;
    #date {
      width: 33%;
    }
  }
  #prizeGroup {
    margin-top: 15px;
    .group {
      // overflow: hidden;
      // clear: both;
      .group-left {
        float: left;
        width: 90%;
        padding: 15px 0 0 5px;
        border: 1px solid #f0f0f0;
        margin: 10px;
        margin-left: 0;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
        .group-title {
          text-align: right;
          line-height: 32px;
        }
        .bottom {
          margin-bottom: 15px;
        }
      }
      .rulesBtn {
        margin-right: 30px;
        margin-top: 75px;
        display: inline-block;
        color: @primary-color;
        cursor: pointer;
      }
      .clear {
        clear: both;
      }
    }
  }
  #notWinning{
    width: 90%;
    padding: 15px 0 0 5px;
    margin-left: 0;
    line-height: 32px;
    .bottom{
      margin-bottom: 15px;
    }
    .group-title {
      text-align: right;
      
    }
  }
}
</style>

<template>
  <div id='Box'>
      <div id="title">
        基础信息
      </div>

      <div id='formBox'>
       <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span="10">
                    <Form-item label="活动时间">
                        <Row>
                            <Col span="11">
                            <Form-item prop="startTime">
                                <Date-picker type="datetime" placeholder="选择时间" v-model="formData.startTime" style="width: 100%;"></Date-picker>
                            </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">至</Col>
                            <Col span="11">
                            <Form-item prop="endTime">
                                <Date-picker type="datetime" placeholder="选择时间" v-model="formData.endTime" style="width: 100%;"></Date-picker>
                            </Form-item>
                            </Col>
                        </Row>
                    </Form-item> 
                    </Col>
                    <Col span='6' offset="1">
                      <!-- <Form-item label="活动名称" prop="brandId">
                          <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                              <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                          </Select>
                      </Form-item> -->
                      12
                    </Col>
                    <Col span='6' offset="1">
                    23
                      <!-- <Form-item label="品牌名称" prop="brandId">
                          <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                              <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                          </Select>
                      </Form-item> -->
                    </Col>                 
                </Row>
            </Form>
      </div>
      <div id="title">
        奖项设置
      </div>

      <div id="prizeGroup">
          <div class="group" v-for="(item, index) in displayGroupList"  :key="index">
              <div class="group-left" >
                  <Row class='bottom'>
                      <Col span="8">
                          <Row>
                              <Col span='9'>
                                <div class="group-title">红包金额(元)：</div>
                              </Col>
                              <Col span='14'>
                                  <Input v-model="item.activityTag"  style="width:100%"></Input>
                              </Col>
                          </Row>
                      </Col>
                      <Col span="8">
                          <Row>
                              <Col span='9'>
                                <div class="group-title">中奖概率(%)：</div>
                              </Col>
                              <Col span='14'>
                                  <Input v-model="item.activityTag"  style="width:100%"></Input>
                              </Col>
                          </Row>
                      </Col>
                      <Col span="8">
                          <Row>
                              <Col span='9'>
                                <div class="group-title">折扣数量(份)：</div>
                              </Col>
                              <Col span='14'>
                                  <Input v-model="item.activityTag"  style="width:100%"></Input>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
                  <Row class='bottom'>
                      <Col span="8">
                          <Row>
                              <Col span='9'>
                                <div class="group-title">单日中奖上限(次)：</div>
                              </Col>
                              <Col span='14'>
                                  <Input v-model="item.activityTag"  style="width:100%"></Input>
                              </Col>
                          </Row>
                      </Col>
                      <Col span="8">
                          <Row>
                              <Col span='9'>
                                <div class="group-title">单周中奖上限(次)：</div>
                              </Col>
                              <Col span='14'>
                                  <Input v-model="item.activityTag"  style="width:100%"></Input>
                              </Col>
                          </Row>
                      </Col>
                      <Col span="8">
                          <Row>
                              <Col span='9'>
                                <div class="group-title">总中奖上限(次)：</div>
                              </Col>
                              <Col span='14'>
                                  <Input v-model="item.activityTag"  style="width:100%"></Input>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
                  <Row class='bottom'>
                      <Col span="3">
                          <div class="group-title">中奖通知消息：</div>
                      </Col>
                      <Col span="20">
                          <Input v-model="item.activityTag"  style="width:100%"></Input>
                      </Col>
                  </Row>
              </div>
              <div class="group-right">
                  <div @click="addRules" class="rulesBtn" v-if="index == 0">
                      <Icon type="plus-circled" size="25"></Icon>
                  </div>
                  <div v-else @click="delRules(index,item.id)" class="rulesBtn">
                      <Icon type="trash-a" size="25"></Icon>
                  </div>
              </div>
              <div class="clear"></div>
          </div>
      </div>
      <div id='notWinning'>
          <Row class='bottom'>
              <Col span="8">
                  <Row>
                      <Col span='9'>
                        <div class="group-title">奖项名称：</div>
                      </Col>
                      <Col span='14'>
                          谢谢参与
                      </Col>
                  </Row>
              </Col>
              <Col span="8">
                  <Row>
                      <Col span='9'>
                        <div class="group-title">中奖概率(%)：</div>
                      </Col>
                      <Col span='14'>
                          <Input v-model="b"  style="width:100%"></Input>
                      </Col>
                  </Row>
              </Col>
          </Row>
          <Row class='bottom'>
              <Col span="3">
                  <div class="group-title">中奖通知消息：</div>
              </Col>
              <Col span="20">
                  <Input v-model="a"  style="width:100%"></Input>
              </Col>
          </Row>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        startTime: "",
        endTime: ""
      },
      rule: {},
      displayGroupList: [
        {
          activityTag: "",
          ruleText: "",
          displayRule: "", //陈列规则
          presentType: "",
          minAmount: null,
          maxAmount: null,
          quantity: 1,
          totalQuantity: 9999999,
          useableQuantity: 9999999
        }
      ],
      confValue: [],
      a: "",
      b: ""
    };
  },
  methods: {
    changeUrl(e) {
      this.$emit("child", e.currentTarget.value);
    },
    delRules: function(index, id) {
      //删除陈列分组
      if (id) {
        this.deleteItem.push(id);
      }
      this.displayGroupList.splice(index, 1);
    },
    addRules: function() {
      /* 添加空是因为 单选框会默认显示label数据*/
      let item = {
        activityTag: "",
        ruleText: "",
        displayRule: "",
        presentType: "",
        minAmount: null,
        maxAmount: null,
        quantity: 1,
        totalQuantity: 9999999,
        useableQuantity: 9999999
      };
      this.displayGroupList.push(item);
    }
  }
};
</script>

