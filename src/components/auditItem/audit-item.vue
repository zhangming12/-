<style lang="less" scoped>
.audit-item {
  // height: 530px;
  box-sizing: border-box;
  padding: 10px 0;
  position: relative;
  display: flex;
  flex-direction: row;
  .no-upload {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      width: 163px;
      height: 163px;
    }
    p {
      margin-top: 15px;
    }
  }
  .audit-item-card {
    box-sizing: border-box;
    padding-left: 20px;
    width: 100%;
    position: relative;
    .check-box {
      position: absolute;
      top: 0;
      right: 0;
    }
    .video-box {
      width: 100%;
      height: 213px;
      display: flex;
      .video {
        width: 100%;
        height: 213px;
        .video-main {
          width: 250px;
          position: relative;
          video {
            width: 250px;
            height: 213px;
          }
          img.triangle {
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
    .content-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      .item-box {
        line-height: 36px;
        font-size: 12px;
        & > p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .redColor {
            color: red;
          }
          .typeSpan {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .status {
          width: 80px;
        }

        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    .btn-box {
      margin-top: 10px;
      margin-right: 10px;
      height: 40px;
      .btn {
        margin-right: 10px;
      }
      .btn-span {
        height: 32px;
        display: flex;
        align-items: center;
      }
    }
  }
}
.redColor {
  color: red;
}
</style>

<template>
  <div class="audit-item">
    <div class="audit-item-card">
      <template v-if="itemData && itemData.checkStatus != -1">
        <div class="video-box">
          <div class="video">
            <div class="video-main" v-if="itemData.fileType == 'radio'">
              <video :src="itemData.imageOneUrl" v-if="itemData.firstRadio" controls></video>
              <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
              <img class="triangle" src="../../assets/image/triangle-first.jpg">
            </div>
            <div class="video-main" v-if="itemData.fileType == 'image'">
              <imageLook
                :key="itemData.imageOneUrl[0]"
                :position="position"
                v-if="itemData.imageOneUrl.length"
                :imageList="itemData.imageOneUrl"
              />
              <img v-else src="../../assets/image/nullImage.png" class="noneVideoUrl">
              <img class="triangle" src="../../assets/image/triangle-first.jpg">
            </div>
          </div>
          <div class="video">
            <div class="video-main" v-if="itemData.fileType == 'radio'">
              <video :src="itemData.imageTwoUrl" v-if="itemData.imageTwoUrl" controls></video>
              <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
              <img class="triangle" src="../../assets/image/triangle-this.jpg">
            </div>
            <div class="video-main" v-if="itemData.fileType == 'image'">
              <imageLook
                :key="itemData.imageTwoUrl[0]"
                :position="position"
                v-if="itemData.imageTwoUrl.length"
                :imageList="itemData.imageTwoUrl"
              />
              <img v-else src="../../assets/image/nullImage.png" class="noneVideoUrl">
              <img class="triangle" src="../../assets/image/triangle-this.jpg">
            </div>
          </div>
        </div>
        <div class="content-box">
          <Row>
            <Col span="8" v-for="(item,index) in showList" :key="index">
              <div class="item-box">
                <p :title="itemData[item.key]">
                  <span
                    :class="{'redColor':item.type == '门头照' && itemData[item.key] == '位置偏移'}"
                  >{{ item.title }}：</span>
                  <span
                    :class="{'redColor':item.type == '门头照' && itemData[item.key] == '位置偏移'}"
                  >{{ itemData[item.key]}}</span>
                  <show-photo
                    v-if="item.type == '门头照'"
                    :uploadPhoto="itemData.newStoreImage"
                    :signPhoto="itemData.storeImage"
                  />
                </p>
              </div>
            </Col>
            <Col span="23">
              <div class="item-box">
                <span class="status">审核状态：</span>
                <RadioGroup v-model="itemData.status" @on-change="radioChange">
                  <Radio :label="1">通过</Radio>
                  <Radio :label="2">不通过</Radio>
                  <Radio v-if="itemData.isBack == 0" :label="3">退回</Radio>
                </RadioGroup>
                <div class="tooltip" style="display:inline-block;">
                  <my-tooltip
                    :auditPolicy="itemData.auditPolicy"
                    :placement="position"
                    style="margin-top:10px;"
                  />
                </div>
              </div>
              <div class="item-box">
                <span class="status">审核意见：</span>
                <Input :key="itemData.id" v-model.trim="itemData.checkMessage" placeholder="审核意见"></Input>
              </div>
            </Col>
          </Row>
        </div>
        <div class="btn-box">
          <Select
            class="btn-left"
            v-if="showReprieve"
            style="width:100px;margin-top:5px;margin-right:10px;"
            size="small"
            :class="{'redColor':itemData.defer == 1}"
            v-model="itemData.defer"
          >
            <Option :value="0">其他</Option>
            <Option :value="1">暂缓</Option>
          </Select>
          <span class="btn-span btn-left" v-if="itemData.showBack">
            审核退回
            <my-tooltip
              :auditPolicy="itemData.backMessage"
              :placement="position"
              style="margin-left:5px;"
            />
          </span>
          <audit-memo class="btn-left" style="margin-top:7px;" v-model="itemData.memo"/>
          <span
            v-if="itemData.cheatNum"
            class="btn-span btn-left redColor"
            style="margin-left:15px;cursor:pointer;"
          >作弊{{itemData.cheatNum}}次</span>
          <Button type="primary" class="btn btn-right" @click="save(itemData)">保存</Button>
          <Button
            class="btn btn-right"
            type="info"
            @click="lookDetail(itemData)"
            v-if="showLookDetail"
            style="margin-right:10px;"
          >查看详情</Button>
        </div>
      </template>
      <div class="no-upload" v-else>
        <img src="../../assets/image/no-video.jpg" alt="暂未上传视频">
        <p>暂未上传视频</p>
      </div>
    </div>
  </div>
</template>

<script>
import imageLook from "@/components/imgLook/img-look.vue";
import myTooltip from "@/components/tooltip/tooltip.vue";
import showPhoto from "@/components/showPhoto/show-photo.vue";
import auditMemo from "@/components/auditItem/audit-memo.vue";
export default {
  name: "audit-item",
  props: {
    itemData: {
      type: Object
    },
    position: {
      type: String,
      default: "left"
    },
    index: {
      type: Number
    },
    showReprieve: {
      type: Boolean,
      default: false
    },
    showList: {
      type: Array
    }
  },
  data() {
    return {
      showLookDetail: false
    };
  },
  components: {
    imageLook,
    myTooltip,
    showPhoto,
    auditMemo
  },
  created() {
    this.showLookDetail = this.Global.getConfig().hide == 0;
  },
  methods: {
    //保存
    save(item) {
      this.$set(item, "memo", item.memo);
      this.$emit("save", { item, index: this.index });
    },
    //查看详情
    lookDetail(val) {
      this.$emit("lookDetail", val);
    },
    radioChange(val) {
      this.$emit("radioChange", {
        index: this.index,
        val
      });
    }
  }
};
</script>