<style lang="less" scoped>
.image-box {
  display: flex;
  flex-direction: row;
  width: 250px;
  height: 213px;
  cursor: pointer;
  .img-left {
    width: 200px;
    height: 213px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-right {
    width: 50px;
    margin-left: 4px;
    img {
      display: block;
      width: 30px;
      height: 30px;
      max-width: 30px;
      max-height: 30px;
      margin-bottom: 3px;
      cursor: pointer;
    }
    img.active {
      border: 1px solid red;
    }
  }
}

.modal-main {
  display: flex;
  flex-direction: row;
  min-height: 400px;
  .modal-left {
    width: 600px;
    display: flex;
    flex-direction: row;
    .main-left,
    .main-right {
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .main-center {
      width: 540px;
      img {
        display: block;
        width: 530px;
        // height: 400px;
      }
    }
  }
  .modal-right {
    width: 60px;
    margin-left: 10px;
    img {
      display: block;
      width: 60px;
      height: 60px;
      margin-bottom: 8px;
      cursor: pointer;
    }
    img.active {
      border: 1px solid red;
    }
  }
}
.modal-footer {
  width: 0;
  height: 0;
  display: none;
}
</style>

<template>
  <div class="image-box">
    <div class="img-left" @click="showModal">
        <img-zoom :src="src" 
        width="200" height="213" 
        :bigsrc="src" 
        :configs="configs"></img-zoom>
    </div>
    <div class="img-right">
        <div v-for="(item,index) in imageList" :key="index" @mouseover="mouseover(item)">
            <img :class="{'active' : src == item}" :src="item">
        </div>
    </div>
    <Modal
        v-model="showToolTip"
        width=700
        title="图片查看">
        <div class="modal-main">
            <div class="modal-left">
                <div class="main-left">
                    <Icon @click="beforeImage" style="cursor: pointer;" type="ios-arrow-dropleft-circle" size="40"/>
                </div>
                <div class="main-center">
                    <img :src="modalSrc">
                </div>
                <div class="main-right">
                    <Icon @click="nextImage" style="cursor: pointer;" type="ios-arrow-dropright-circle" size="40" />
                </div>
            </div>
            <div class="modal-right">
                <div v-for="(item,index) in imageList" :key="index" @mouseover="modalMouseover(item)">
                    <img :class="{'active' : modalSrc == item}" :src="item">
                </div>
            </div>
        </div>
        <div slot="footer" class="modal-footer">
        </div>
    </Modal>
  </div>
</template>

<script>
import imgZoom from "./img-zoom.vue"
export default {
  name: "image-look",
  data() {
    return {
      src: this.imageList[0],
      showToolTip: false,
      modalSrc: null
    };
  },
  props: {
    imageList: {
      type: [Array],
      default() {
        return [];
      }
    },
    position: {
      type: [String],
      default: "right"
    }
  },
  computed: {
    configs() {
      return {
        width: 300,
        height: 300,
        maskWidth: 50,
        maskHeight: 50,
        maskColor: "red",
        maskOpacity: 0.2,
        position: this.position
      };
    }
  },
  methods: {
    showModal() {
      this.modalSrc = this.src;
      this.showToolTip = true;
    },
    mouseover(item) {
      this.src = item;
    },
    modalMouseover(item) {
      this.modalSrc = item;
    },
    beforeImage() {
      let index = this.getImageIndex();
      let len = this.imageList.length - 1;
      index--;
      if (index < 0) {
        this.modalSrc = this.imageList[len];
      } else {
        this.modalSrc = this.imageList[index];
      }
    },
    nextImage() {
      let index = this.getImageIndex();
      let len = this.imageList.length - 1;
      index++;
      if (index > len) {
        this.modalSrc = this.imageList[0];
      } else {
        this.modalSrc = this.imageList[index];
      }
    },
    getImageIndex() {
      return this.imageList.indexOf(this.modalSrc);
    }
  },
  components: { imgZoom }
};
</script>