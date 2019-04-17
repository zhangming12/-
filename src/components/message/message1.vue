<style lang="less" scoped>
.messageBox {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.messageList {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.marquee_top {
  transition: all 0.5s;
  // margin-top: -25%;
  animation: toTop 0.5s linear;
}
@keyframes toTop {
  0% {
    top: 0px;
  }
  // 50% {
  //   top: -25%;
  // }
  100% {
    top: -25%;
  }
}
.messageList li {
  height: 25%;
  line-height: 50px;
  font-size: 14px;
  padding-left: 20px;
  transition: all 0.5s;
}

.messageList li span {
  padding: 0 2px;
}

.item {
  width: 100%;
  height: 100%;
  position: relative;
  .left {
    position: absolute;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    z-index: 2;
    top: 50%;
    left: 0;
    margin-top: -25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(235, 235, 235);
    background-image: url("../../assets/presentationBoardImage/8.png");
    background-size: cover;
    img {
      display: block;
      width: 50px;
      border-radius: 50%;
      height: 50px;
    }
  }
  .right {
    position: absolute;
    width: 90%;
    top: 50%;
    height: 50px;
    line-height: 50px;
    margin-top: -20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    box-sizing: border-box;
    border: 2px solid rgb(220, 220, 220);
    border-radius: 4px;
    background: rgb(236, 236, 236);
    color: rgb(102, 102, 102);
    margin-left: 30px;
    z-index: 1;
    span {
      display: inline-block;
    }
  }
}
.fade11-transverse-leave-active,
.fade11-transverse-enter-active {
  transition: all 0.5s;
}
.fade11-transverse-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade11-transverse-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
// 过渡动画 缩放渐变
.fade11-scale-leave-active,
.fade11-scale-enter-active {
  transition: all 0.5s;
}
.fade11-scale-enter {
  opacity: 0;
  transform: scale(1.2);
}
.fade11-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>

<template>
  <div class="messageBox">
    <ul class="messageList" :class="{marquee_top:animate}">
      <!-- <transition-group name="fade11">  -->
      <li v-for="(item, index) in marqueeList" :key="item.id">
        <div class="item">
          <div class="left">
            <img :src="item.wxFaceUrl" alt>
          </div>
          <div class="right">
            <span>{{ item.countTime }}</span>
            <span>加入活动</span>
          </div>
        </div>
      </li>
      <!-- </transition-group> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animate: false,
      marqueeList: [],
      storeId: "",
      id: "",
      lock: false
    };
  },
  props: {
    peopleData: {
      type: [Object],
      default() {
        return {};
      }
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    destory: {
      type: Boolean,
      default: false
    },
    isRest: {
      type: Boolean,
      default: false
    },
    brandId: {
      type: [Number, String],
      default: 3
    },
    groupId: {
      type: [Number, String],
      default: 137
    }
  },
  created() {},
  mounted() {
    let timer = setInterval(() => {
      if (!this.lock && !this.destory) {
        this.showMarquee();
      }
    }, 2000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  watch: {
    // isUpdate(val) {
    //   if (val) {
    //     //进行某些操作
    //     this.showMarquee();
    //   }
    // },
    isRest(val) {
      if (val) {
        //进行某些操作
        this.marqueeList = [];
        this.storeId = "";
        this.id = "";
      }
    }
  },
  methods: {
    // showMarquee() {
    //   if (this.marqueeList.length > 3) this.animate = true;
    //   setTimeout(() => {
    //     if (this.marqueeList.length > 3) {
    //       this.marqueeList.shift();
    //     }
    //     this.marqueeList.push(this.peopleData);
    //     this.animate = false;
    //   }, 500);
    // },
    showMarquee() {
      this.lock = true;
      let data = {
        groupId: this.groupId,
        brandId: this.brandId,
        id: this.id,
        storeId: this.storeId
      };
      this.Global.deleteEmptyProperty(data);
      this.Global.doPostNoLoading(
        "displayStoreApply/displayDemoSigningCountUserByDayList.json",
        data,
        res => {
          this.lock = false;
          if (res && res[0].id) {
            console.log(
              `id:${res[0].id},storeId:${res[0].storeId},wxFaceUrl:${
                res[0].wxFaceUrl
              }`
            );
            let peopleData = res[0];
            this.id = res[0].id;
            this.storeId = res[0].storeId;
            if (this.marqueeList.length > 3) this.animate = true;
            setTimeout(() => {
              if (this.marqueeList.length > 3) {
                this.marqueeList.shift();
              }
              this.marqueeList.push(peopleData);
              this.animate = false;
            }, 500);
          }
        }
      );
    }
  }
};
</script>