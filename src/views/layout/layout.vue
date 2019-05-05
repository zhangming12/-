/*
 * @Author: lisong 
 * @Date: 2018-08-16 14:31:41 
 * @Last Modified by: lisong
 * @Last Modified time: 2018-11-30 17:53:58
 */

<template>
  <div class="layout">
    <div class="layout-menu-left" :style="{ width: shrink?'60px':'200px' }">
      <shrinkable-menu
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :before-push="beforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
      >
        <div slot="top" class="logo-con">
          <div v-show="!shrink" class="layout-logo-left" key="max-logo">e店佳后台管理系统</div>
          <img v-show="shrink" src="../../assets/image/E.png" key="min-logo">
        </div>
      </shrinkable-menu>
    </div>
    <div class="layout-main">
      <div class="layout-header">
        <div class="navicon-con">
          <Button
            class="toggleBtn"
            :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
            type="text"
            @click="toggleClick"
          >
            <Icon type="md-menu" size="23" color="#fff"/>
          </Button>
        </div>
        <!-- 三级分类 -->
        <div class="header-middle-con">
          <ul class="header-menuBtn">
            <li
              :class="[headerMenuList.select === item.id?'select':''] "
              v-for="(item,index) in headerMenuList.list"
              :key="index"
              v-if=" item.resType === 'template' "
              @click="changeMenu(index)"
            >
              <Icon :type="item.resIcon" size="23"/>
              {{item.resName}}
            </li>
          </ul>
        </div>
        <div class="header-avator-con">
          <div class="closeBtn" @click="goToNotice">
            <Icon type="ios-mail" style="margin-top:2px;" color="red" size="25"/>
            <sup v-if="$store.state.noticeMsg" class="sup">{{ $store.state.noticeMsg }}</sup>
          </div>
          <div class="closeBtn" @click="loginOut">
            <Icon type="md-power" color="rgba(255,255,255,.7)" size="20"/>
          </div>
        </div>
      </div>
      <div class="tages">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>

      <div class="layout-content">
        <keep-alive :include="/keepAlive/">
          <router-view :status="shrink"/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import list from "@/config/data.js";
import shrinkableMenu from "@/components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "@/components/tags-pages-opend.vue";
export default {
  data() {
    return {
      menuList: [],
      openName: [],
      shrink: false,
      menuTheme: "light",
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      headerMenuList: {
        select: "",
        list: []
      }
    };
  },
  components: {
    shrinkableMenu,
    tagsPageOpened
  },
  methods: {
    goToNotice() {
      this.$router.push({
        path: "/returnNotice"
      });
    },
    select(name) {
      this.$router.push(name);
    },
    loginOut() {
      this.Global.doPost("doLogout.json", "", res => {
        sessionStorage.clear();
        this.$store.commit("clearAllTags");
        this.$router.replace("/");
      });
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleSubmenuChange() {},
    beforePush(name) {
      return true;
    },
    changeMenu(index) {
      if (this.headerMenuList.select !== this.headerMenuList.list[index].id) {
        this.headerMenuList.select = this.headerMenuList.list[index].id;
        this.menuList = this.headerMenuList.list[index].children;
      }
    },
    getParentId(name) {
      let arr = this.headerMenuList.list;
      arr.forEach(item => {
        item.children.forEach(val => {
          for (let i = 0, len = val.children.length; i < len; i++) {
            if (
              val[i].children &&
              val[i].children.length &&
              val[i].children.resPage == "/" + name
            ) {
              return {
                selectId: item.id,
                parentId: val.id
              };
            }
          }
        });
      });
      return false;
    }
  },
  created() {
    var user = sessionStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      // this.menuList = userData.resources;

      const resourceData = userData.resources;
      let implode = (arr, parentId) => {
        let newArr = [];
        if (arr.length === 0) {
          return newArr;
        }
        arr.forEach(item => {
          if (item.parentId === parentId) {
            item = {
              resName: item.resName,
              id: item.id,
              parentId: item.parentId,
              isHidden: item.isHidden,
              resType: item.resType,
              summary: item.summary,
              resIcon: item.resIcon,
              resPage: item.resPage,
              orderIndex: item.orderIndex
            };
            // console.log(item.id)
            item.children = implode(arr, item.id);
            newArr.push(item);
          }
        });
        return newArr;
      };
      this.headerMenuList.list = [];
      const arr = implode(resourceData, 0, 1);
      console.log(arr);
      arr.forEach(item => {
        if (item.resType == "template" && item.parentId == 0) {
          this.headerMenuList.list.push(item);
        }
      });
      // this.headerMenuList.list = arr;
      // this.headerMenuList.select = arr[0].id;
      this.headerMenuList.select = this.headerMenuList.list[0].id;
      this.menuList = this.headerMenuList.list[0].children;
    } else {
      this.$router.replace("/");
    }
    this.$store.commit("setOpenedList");
    // this.$on("")
  },
  computed: {
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    }
    // '$store.state.'
  },
  watch: {
    $route(to) {
      this.Global.openNewPage(this, to.path, to.query);
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../config/index.less";
.header-menuBtn {
  width: 100%;
  height: 100%;
  align-items: center;
  li {
    padding: 0 10px;
    border-bottom: 4px solid transparent;
    float: left;
    box-sizing: border-box;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
    color: #fff;
    &.select {
      border-color: @primary-color;
      color: @primary-color;
    }
  }
}
.toggleBtn:hover {
  background-color: @primary-color;
}
.fade-transverse-leave-active,
.fade-transverse-enter-active {
  transition: all 0.5s;
}
.fade-transverse-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transverse-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
// 过渡动画 缩放渐变
.fade-scale-leave-active,
.fade-scale-enter-active {
  transition: all 0.5s;
}
.fade-scale-enter {
  opacity: 0;
  transform: scale(1.2);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.ivu-row-flex {
  height: 100%;
}
.ivu-menu-light {
  height: calc(~"100% - 60px");
  overflow-y: auto;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  height: 100%;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  width: 100%;
  height: calc(~"100% - 80px");
  overflow-y: scroll;
  // overflow-x: auto;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
  background: #fff;
}
.layout-menu-left {
  background: #fff;
  height: 100%;
  float: left;
  transition: width 0.3s;
}
.layout-menu-left::-webkit-scrollbar {
  display: none;
}
.layout-main {
  height: 100%;
  overflow: hidden;
}
.layout-header {
  height: 40px;
  background: #26201b;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.1);
  line-height: 40px;
  position: relative;
  .header-middle-con {
    position: absolute;
    left: 60px;
    top: 0;
    right: 200px;
    bottom: 0;
    padding: 0 5px;
    overflow: hidden;
  }
  .header-avator-con {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 300px;
    display: flex;
    justify-content: flex-end;
    .closeBtn {
      width: 50px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      .sup {
        color: red;
      }
    }
  }
}
.user {
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0 5px;
  .imgBox {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 5px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
.layout-logo-left {
  width: 100%;
  height: 40px;
  background: #26201b;
  // background: @head-color;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
}
.ivu-badge-count {
  box-shadow: none;
  padding: 0 4px;
  height: 16px;
}
.ivu-badge {
  top: -3px;
}
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 14px 24px 14px 12px;
}
.ivu-menu-vertical .ivu-menu-item {
  padding: 14px 0 14px 43px;
}
.navicon-con {
  display: inline-block;
  // float: left;
}
.tages {
  height: 40px;
  position: relative;
  overflow: hidden;
  background: #f5f7f9;
  // background: @head-color;
}
.logo-con {
  width: 100%;
  background: #26201b;
  // background: @head-color;
  height: 40px;
  img {
    display: block;
    height: 30px;
    width: auto;
    margin: 0 auto;
    transform: translateY(6px);
  }
}
</style>