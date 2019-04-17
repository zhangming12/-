<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.form {
  position: relative;
  display: flex;
  .container {
    width: 17.5%;
    margin: auto;
    .w18 {
      width: 100%;
    }
  }
}
.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.table-box {
  padding: 0 10px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
}

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 50%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 8px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      // overflow-y: auto;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        // .numColor {
        //   color: @primary-color;
        // }
      }
    }
  }
}
.ivu-input {
  text-align: center !important;
}
.upload-image-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
}
.upload-box {
  display: flex;
  margin-left: 20px;
  position: relative;
  .zhezhao {
    // background: red;
    cursor: not-allowed;
    width: 105px;
    height: 85px;
    position: absolute;
    top: -0;
    left: 0;
  }
  img {
    width: 105px;
    height: 85px;
  }
}
.selectBox {
  width: 94%;
  margin-left: 3%;
  height: 400px;
  padding: 10px 0;
  border: 1px solid #e5e5e5;
  .left,
  .right {
    float: left;
    width: 48%;
    height: 100%;
    margin-left: 2%;
    overflow-y: auto;
  }
  .left {
    border-right: 1px solid;
  }
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">品牌管理</h2> -->
      <div class="main-container">
        
        <div class="table-box box">
            <div class="contentTop">
              <span class="btn-left">此表共包含<span class='numColor'>{{ pageNum }}</span>条数据</span>
              
              <addNewBtn class="btn-right ml20" @btnClick="showModal" />
              <!-- <exportBtn  class="btn-right" @btnClick="exportExcel" /> -->
            </div>
            <!-- <Table :columns="columns1" :data="pageData" disabled-hover></Table> -->
            <hhTable ref="table" :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" ></hhTable>
        </div>
        <div class="page-box">
          <div style="float: right;">
            <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
          </div>
        </div>
      </div>
      <!-- 新建/修改品牌 -->
      <myModal class="myModal"
          @close="closeModal"
          width="520"
          :modal="myModalisShow">
        <div slot="main" class="modal-main">
          <h3>{{type == 'modify' ? '修改品牌信息' : type == 'look' ? '查看品牌' :'新建品牌'}}</h3>
          <div class="modal-table">
              <Form ref="form" :model="formDatas" :label-width="88">
                  <Form-item label="品牌名称" required>
                      <!-- <Select :disabled="type == 'look'" v-model="formDatas.brandId" placeholder="品牌名称">
                        <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select> -->
                      <Input :disabled="type == 'modify'" v-model.trim="formDatas.brandName" placeholder="品牌名称" />
                  </Form-item>
                  <Form-item label="品牌描述" required>
                      <Input :disabled="type == 'look'" v-model.trim="formDatas.brandDesc" placeholder="品牌描述" />
                  </Form-item>
                  <Form-item label="授信额度" required>
                      <Input :disabled="type == 'look'" v-model.trim="formDatas.creditLine" placeholder="授信额度" />
                  </Form-item>
                  <Form-item label="联系人" required>
                      <Input :disabled="type == 'look'" v-model.trim="formDatas.userName" placeholder="联系人" />
                  </Form-item>
                  <Form-item label="账号" required>
                      <Input :disabled="type == 'look'" v-model.trim="formDatas.loginAccount" placeholder="账号" />
                  </Form-item>
                  <Form-item label="手机号" required>
                      <Input :disabled="type == 'look'" v-model.trim="formDatas.phone" placeholder="手机号" />
                  </Form-item>
                  <Form-item v-if="type == 'add'" label="密码" required>
                      <Input :disabled="type == 'look'" type="password" v-model.trim="formDatas.loginPwd" placeholder="密码" />
                  </Form-item>
                  <div class="upload-image-box">
                      <p>
                          <span style="color:red;">*</span>
                          <span> 品牌图标</span>
                      </p>
                      <div class="upload-box">
                        <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" 
                            :data="upData" 
                            :before-upload="beforeUpload" 
                            :on-success="UploadLogoUrl" 
                            :show-upload-list="false"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError">
                            <img :src="formDatas.logoUrl " alt="" v-if="formDatas.logoUrl ">
                            <img src="../../assets/image/imgBg.png" alt="" v-else>
                            <div class="zhezhao" @click.stop.prevent="zhezhaoClick" v-if="type == 'look'"></div>
                        </Upload>
                      </div>
                  </div>
                  <div class="modal-fotter" style="text-align:center;">
                      <!-- <Button @click="closeModal" type="default">取消</Button> -->
                      <Button v-if="type != 'add'" @click="closeModal" type="default">取消</Button>
                      <Button v-if="type == 'add'" @click="saveNewPresent" type="default">下一步，设置菜单</Button>
                      <Button v-else @click="saveNewPresent" type="default">确定</Button>
                      
                  </div>
              </Form>
          </div>
        </div>
      </myModal>
      <!-- 设置菜单 -->
      <myModal class="myModal"
          @close="closeModal"
          width="800"
          :modal="myMenuisShow">
        <div slot="main" class="modal-main">
          <h3>菜单选择</h3>
          <div class="modal-table">
            <div class="selectBox">
                <div class="left">
                  <Tree @on-check-change='checkChange' ref="fatherTree"  :data="baseData" show-checkbox></Tree>
                </div>
                <div class="right">
                  <Tree :data="checkedData" ref="tree"></Tree>
                </div>
            </div>
            <div class="modal-fotter" style="text-align:center;">
                <Button @click="closeModal" type="default">取消</Button>
                <Button v-if="type != 'look'" @click="saveMenu" type="default">保存</Button>
            </div>
          </div>
        </div>
      </myModal>
  </div>
</template>

<script>
import { queryDisPlayApplyAudit } from "@/api/activity-manage/display-apply-examine.js"; //api
import dataRange from "../../components/data-rang.vue";
import md5 from "js-md5";
import exportBtn from "../../components/Button/export-btn.vue";
import addNewBtn from "../../components/Button/addNew-btn.vue";
import myModal from "../../components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import {
  typeQueryActivityVOByGroupId, //根据品牌ID获取活动包名
  typeQueryActivityGroupVOByBrandId, //根据活动包名ID获取陈列活动列表
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import { displayApplyDetail } from "@/api/activity-manage/display-activity-manage.js"; //api
import { getDisplayActivityListDoQuery } from "@/api/common.js";
export default {
  name: "brand-manage-keepAlive",
  data() {
    return {
      timeStr:"",
      checkedData: [],
      myModalisShow: false,
      brandId: "",
      formData: {
        brandId: "",
        name: ""
      },
      myMenuisShow: false,
      brandList: [],
      noneStatus: false,
      upData: upData,
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "品牌ID",
          key: "id",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "品牌名称",
          key: "brandName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },

        {
          title: "品牌描述",
          key: "brandDesc",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "授信额度",
          key: "creditLine",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let buttonDom = [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.setData(params.row, "modify");
                      this.formDatas.brandName = params.row.brandName;
                      this.formDatas.brandDesc = params.row.brandDesc;
                      this.formDatas.creditLine = params.row.creditLine;
                      this.formDatas.userName = params.row.userName;
                      this.formDatas.phone = params.row.phone;
                      this.formDatas.id = params.row.id;
                      this.formDatas.userId = params.row.userId;
                      this.formDatas.logoUrl = params.row.logoUrl;
                      this.formDatas.loginAccount = params.row.loginAccount;
                      this.brandId = params.row.id;
                      
                      this.addNewPresent();
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.getTreeData(params.row.id);
                      this.menuData.brandId = params.row.id;
                      this.menuData.brandName = params.row.brandName;
                      this.myMenuisShow = true;
                    }
                  }
                },
                "设置菜单"
              )
            ];
            return h("div", buttonDom);
          }
        }
      ],
      type: "",
      pageData: [],
      brandList: [],
      activityList: [],
      baseData: [],
      formDatas: {
        brandId: "",
        brandName: "",
        logoUrl: "",
        creditLine: null,
        brandDesc: ""
      },
      logoUrl: "",
      menuData: {}
    };
  },
  components: { dataRange, exportBtn, myModal, addNewBtn, hhTable },
  created() {
    this.init();
  },
  watch: {
    myModalisShow(val) {
      if (!val) {
        this.formDatas = {
          brandId: "",
          presentType: "",
          activityTag: "",
          logoUrl: ""
        };
      }
    },
    myMenuisShow(val) {
      if (!val) {
        this.checkedData = [];
      }
    }
  },
  methods: {
    //保存菜单设置
    saveMenu() {
      let datas = this.$refs["fatherTree"].getCheckedNodes();
      let list = [];
      // datas.forEach(item => {
      //   list.push({
      //     resourceId: item.id
      //   });
      // });
      datas.forEach(item => {
        list.push({resourceId: item.id});
        if (item.level == 2) {
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(a => {
                if (a.id == item.id) {
                  list.push({resourceId: val.id});
                }
              });
            }
          });
        }
        if (item.level == 3) {
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(a => {
                if (a.children && a.children.length) {
                  a.children.forEach(b => {
                    if (b.id == item.id) {
                      list.push({resourceId: val.id});
                      list.push({resourceId: a.id});
                    }
                  });
                }
              });
            }
          });
        }
      });
      list = this.arrRemoval(list)
      var data = {};
      data["brandId"] = this.menuData.brandId;
      data["brandName"] = this.menuData.brandName;
      data["resourceList"] = list;
      this.Global.doPost("brand/settingBrandResource.json", data, res => {
        this.$Message.success("设置成功");
        this.init();
        this.closeModal();
      });
    },
    //获取菜单配置
    getTreeData(brandId) {
      const resourceData = JSON.parse(sessionStorage.getItem("user")).resources;
      let implode = (arr, parentId, level) => {
        let newArr = [];
        if (arr.length === 0) {
          return newArr;
        }
        arr.forEach(item => {
          if (item.parentId === parentId) {
            item = {
              title: item.resName,
              id: item.id,
              parentId,
              level,
              checked: false
            };
            item.children = implode(arr, item.id, level + 1);
            newArr.push(item);
          }
        });
        return newArr;
      };
      const arr = implode(resourceData, 0, 1);
      this.baseData = arr;
      this.Global.doPost(
        "resource/queryBrandResourceListByPms.json",
        {
          brandId
        },
        res => {
          let checkedArr = [];
          res.forEach(item => {
            let level = null
            if(item.resType == "template"){
              level = 1
            }
            if(item.resType == "menu"){
              level = 2
            }
            if(item.resType == "page"){
              level = 3
            }
            checkedArr.push({
              children:[],
              checked:true,
              level,
              title:item.resName,
              id:item.id
            })
            this.baseData.forEach((j, index) => {
              // if (item.resType == "template" && item.id == j.id) {
              //   this.$set(this.baseData[index], "checked", true);
              // }
              if (j.children && j.children.length) {
                j.children.forEach((val, num) => {
                  // if (item.resType == "menu" && item.id == val.id) {
                  //   this.$set(
                  //     this.baseData[index].children[num],
                  //     "checked",
                  //     true
                  //   );
                  // }
                  if (val.children && val.children.length) {
                    val.children.forEach((k, n) => {
                      if (item.resType == "page" && item.id == k.id) {
                        this.$set(
                          this.baseData[index].children[num].children[n],
                          "checked",
                          true
                        );
                      }
                    });
                  }
                });
              }
            });
          });
          // 过滤选中菜单显示
          // this.checkChange(checkedArr);
          this.checkedData = implode(res,0,1)
        }
      );
    },
    arrRemoval(arr) {
      let obj = {};
      let newArr = [];
    
      for(let i = 0,len = arr.length;i<len;i++){
        if(!obj[arr[i].resourceId]){
          obj[arr[i].resourceId] = 'a';
          newArr.push(arr[i])
        }
      }
      return newArr
    },
    checkChange(val) {
      let arr = []; //选中的
      val.forEach(item => {
        if (item.level == 1) {
          // debugger
          //选中的是一级
          this.baseData.forEach(val => {
            if (val.id == item.id) {
              arr.push({
                title: val.title,
                level: 1,
                children: [],
                expand: true
              });
            }
          });
        }
        if (item.level == 2) {
          //选中的是二级
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(j => {
                if (item.id == j.id) {
                  if (arr.length) {
                    let flag = null;
                    //有一级的情况
                    arr.forEach(k => {
                      if (k.title == val.title) {
                        flag = k;
                      }
                    });
                    if (flag) {
                      flag.children.push({
                        expand: true,
                        level: 2,
                        title: item.title,
                        children:[]
                      });
                    } else {
                      arr.push({
                        title: val.title,
                        level: 1,
                        expand: true,
                        children: [
                          {
                            expand: true,
                            level: 2,
                            title: item.title,
                            children: []
                          }
                        ]
                      });
                    }
                    //没有一级的情况
                  } else {
                    arr.push({
                      title: val.title,
                      level: 1,
                      expand: true,
                      children: [
                        {
                          expand: true,
                          level: 2,
                          title: item.title,
                          children: []
                        }
                      ]
                    });
                  }
                }
              });
            }
          });
        }
        if (item.level == 3) {
          //选中的是三级
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(j => {
                if (j.children && j.children.length) {
                  j.children.forEach(n => {
                    if (item.id == n.id) {
                      //arr为空时
                      if (arr.length == 0) {
                        arr.push({
                          title: val.title,
                          expand: true,
                          level: 1,
                          children: [
                            {
                              expand: true,
                              level: 2,
                              title: j.title,
                              children: [
                                {
                                  expand: true,
                                  level: 3,
                                  title: item.title,
                                  children: []
                                }
                              ]
                            }
                          ]
                        });
                      } else {
                        //arr不为空时
                        // debugger
                        let flag1 = null;
                        
                        arr.forEach(a => {
                          if (a.title == val.title) {
                            flag1 = a;
                          }
                        });

                        if (flag1) {
                          let flag2 = null;
                          //有包含他的一级
                          flag1.children.forEach( b => {
                            if(b.title == j.title){
                              flag2 = b
                            }
                          })
                          if(flag2){
                            //有包含他的二级
                            flag2.children.push(
                              {
                                title:item.title,
                                children:[],
                                level:3,
                                expand:true
                              }
                            )
                          }else{
                            //没有包含她的二级
                            flag1.children.push(
                              {
                                title:j.title,
                                expand:true,
                                level:2,
                                children:[
                                  {
                                    title:item.title,
                                    children:[],
                                    level:3,
                                    expand:true 
                                  }
                                ]
                              }
                            )
                          }
                            
                            
                        } else {
                          //没有包含它的一级
                          arr.push({
                            title: val.title,
                            expand: true,
                            level: 1,
                            children: [
                              {
                                expand: true,
                                level: 2,
                                title: j.title,
                                children: [
                                  {
                                    expand: true,
                                    level: 3,
                                    title: item.title,
                                    children: []
                                  }
                                ]
                              }
                            ]
                          });
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
      this.checkedData = arr;
    },
    zhezhaoClick() {
      return false;
    },
    showModal() {
      this.addNewPresent();
      this.type = "add";
    },
    stopOrStartGoods(data) {
      this.Global.doPost(
        "activityMaintain/doStopOrStartGoods.json",
        data,
        res => {
          this.$Message.success("成功");
          this.init();
        }
      );
    },
    setData(row, type) {
      this.type = type;
      this.formDatas = {
        id: row.brandId,
        name: row.name,
        type: row.type + "",
        logoUrl: row.logoUrl
      };
    },
    saveNewPresent() {
      if (!this.formDatas.brandName) {
        this.$Message.error("品牌名称不能为空");
        return false;
      }
      if (!this.formDatas.brandDesc) {
        this.$Message.error("品牌描述不能为空");
        return false;
      }
      if (!this.formDatas.creditLine) {
        this.$Message.error("授信额度不能为空");
        return false;
      }
      if (!this.formDatas.userName) {
        this.$Message.error("联系人不能为空");
        return false;
      }
      if (!this.formDatas.loginAccount) {
        this.$Message.error("账户不能为空");
        return false;
      }
      if (!this.formDatas.phone) {
        this.$Message.error("手机号不能为空");
        return false;
      }
      if (!this.Global.checkPhone(this.formDatas.phone)) {
        this.$Message.error("手机号格式不对");
        return false;
      }
      if (this.type == "add" && !this.formDatas.loginPwd) {
        this.$Message.error("密码不能为空");
        return false;
      }
      if (this.type == "add") {
        if (
          this.formDatas.loginPwd.length < 6 ||
          this.formDatas.loginPwd.length > 16
        ) {
          this.$Message.error("密码长度在6到16之间");
          return false;
        }
      }
      if (!this.formDatas.logoUrl) {
        this.$Message.error("请上传品牌logo");
        return false;
      }

      let data = this.Global.JsonChange(this.formDatas);
      this.Global.deleteEmptyProperty(data);

      if (this.type == "modify") {
        delete data["type"];
        data["id"] = this.formDatas.id;
        data["userId"] = this.formDatas.userId;
        this.Global.doPost("brand/doUpdate.json", data, res => {
          let str = "修改成功";
          this.$Message.success(str);
          this.menuData.brandName = this.formDatas.brandName;
          this.menuData.brandId = this.brandId;

          if (this.type == "add") {
            this.getTreeData(this.menuData.brandId);
          }
          this.myModalisShow = false;
          if (this.type == "add") {
            this.myMenuisShow = true;
          }
          this.init(this.page, 10);
        });
      } else {
        data["loginPwd"] = md5(this.formDatas.loginPwd);
        this.Global.doPost("brand/doSave.json", data, res => {
          let str = this.type == "modify" ? "修改成功" : "保存成功";
          this.$Message.success(str);
          this.menuData.brandId = res.id;
          this.menuData.brandName = this.formDatas.brandName;
          this.myModalisShow = false;
          this.getTreeData(res.id);
          this.myMenuisShow = true;
          this.init(this.page, 10);
        });
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    beforeUpload(res) {
      this.timeStr = Date.now()
      this.upData["key"] = "ecuda/image/" + this.timeStr + res.name;
    },
    UploadLogoUrl(response, file, fileList) {
      //陈列图片
    
      this.formDatas.logoUrl =
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr + file.name;
      // console.log(this.formData.logoUrl);
      this.$set(this.formDatas, "logoUrl", this.formDatas.logoUrl);
    },
    closeModal() {
      this.myModalisShow = false;
      this.myMenuisShow = false;
    },
    addNewPresent() {
      this.myModalisShow = true;
    },
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("brand/doQueryWithPageByUser.json", data, res => {
        //   console.log(res);
        this.pageData = res.datalist;
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "uploadReport/organizationUploadDetailExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


