// 查看门头照

<style lang="less" scoped>
.zm-show-photo {
  cursor: pointer;
  display: inline;
  text-decoration: underline;
}
.photo-title {
  display: flex;
  flex-direction: row;
  .left-title,
  .right-title {
    text-align: center;
    flex: 1;
  }
}
.photo {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  .photo-left,
  .photo-right {
    flex: 1;
    box-sizing: border-box;
    .photo-img {
      padding: 10px;
      box-sizing: border-box;
      img {
        display: block;
        max-width: 100%;
        border: 1px solid #e5e5e5;
        min-height: 100px;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>

<template>
  <div class="zm-show-photo" @click="showPhoto">
    ( 门头照 )
    <!-- 显示门头照 -->
    <Modal v-model="photoShow" width="1000">
      <p slot="header" style="color:#f60;text-align:center">门头照</p>
      <div class="photo-title">
        <div class="left-title">上传门头照</div>
        <div class="right-title">签约门头照</div>
      </div>
      <div class="photo">
        <div class="photo-left">
          <div class="photo-img">
            <img :src="uploadPhoto" alt v-if="uploadPhoto">
            <p v-else>暂无上传门头照</p>
          </div>
        </div>
        <div class="photo-right">
          <div class="photo-img">
            <img v-if="signPhoto" :src="signPhoto" alt>
            <p v-else>暂无上传门头照</p>
          </div>
        </div>
      </div>
      <div slot="footer" style="display:none;"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "show-photo",
  data() {
    return {
      photoShow: false
    };
  },
  props: {
    uploadPhoto: {
      //上传门头照
      type: String
    },
    signPhoto: {
      //签约门头照
      type: String
    }
  },
  methods: {
    showPhoto() {
      this.photoShow = true;
    }
  }
};
</script>


