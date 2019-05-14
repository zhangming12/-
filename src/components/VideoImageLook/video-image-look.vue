<style lang="less" scoped>
.video-image-look {
  display: inline;
  cursor: pointer;
}
.modal-main-image {
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
.modal-main-radio {
  display: flex;
  justify-content: center;
  video {
    width: 100%;
  }
}
</style>

<template>
  <div class="video-image-look" @click="showModal">
    查看
    <Modal v-model="showToolTip" width="700" :title="fileType == 'image' ? '图片查看' :'视频查看'">
      <div class="modal-main-image" v-if="fileType=='image'">
        <div class="modal-left">
          <div class="main-left">
            <Icon
              @click="beforeImage"
              style="cursor: pointer;"
              type="ios-arrow-dropleft-circle"
              size="40"
            />
          </div>
          <div class="main-center">
            <img :src="modalSrc">
          </div>
          <div class="main-right">
            <Icon
              @click="nextImage"
              style="cursor: pointer;"
              type="ios-arrow-dropright-circle"
              size="40"
            />
          </div>
        </div>
        <div class="modal-right">
          <div v-for="(item,index) in imageList" :key="index" @mouseover="modalMouseover(item)">
            <img :class="{'active' : modalSrc == item}" :src="item">
          </div>
        </div>
      </div>
      <div class="modal-main-radio" v-else>
        <video :src="url" controls></video>
      </div>
      <div slot="footer" class="modal-footer"></div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "video-image-look",
  data() {
    return {
      showToolTip: false,
      modalSrc: null,
      src: null,
      imageList: null
    };
  },
  created() {
    if (this.fileType == "image") {
      this.imageList = JSON.parse(this.url);
      this.modalSrc = this.imageList[0];
    }
  },
  props: {
    fileType: {
      type: String,
      default: "radio"
    },
    url: {
      type: [String, Array]
    }
  },
  methods: {
    showModal() {
      this.showToolTip = true;
    },
    mouseover(item) {
      this.modalSrc = item;
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
  }
};
</script>