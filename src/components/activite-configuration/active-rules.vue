<style lang="less" scoped>
@import '../../config/index.less';
  #configBox{
    padding: 20px;
    overflow: hidden;
    #configLeft{
      width: 305px;
      margin-right: 20px;
      float: left;
    }
    #configRight{
      overflow: hidden;
    }
  }
</style>

<template>
  <div >
      <div id="configBox">
        <div id="configLeft">
            <Phone v-bind='formData'></Phone>
        </div>
        <div id="configRight">
            <Form ref="form" :model="formData" :label-width="88" >
                <Row>
                  <Col span='16'>
                      <Form-item label="标题名称:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='16'>
                      <Form-item label="标题颜色:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                  <Col span='6' offset='1'>
                    <ColorPicker v-model="color1" />
                  </Col>
                </Row>
                <Row>
                  <Col span='16' >
                      <Form-item label="标题背景:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                  <Col span='6' offset='1'>
                    <ColorPicker v-model="color1" />
                  </Col>
                </Row>
                <Row>
                  <Col span='16'>
                      <Form-item label="方框高度:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='16'>
                      <Form-item label="标题名称:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Form-item label="规则内容:" prop="name">   
                      <Input v-model="formData.name" type="textarea" :rows='10' placeholder="注意：手动回车键实现换行操作" ></Input>                                           
                </Form-item>
            </Form>
        </div>
      </div>
  </div>
</template>

<script>

import Phone from './phone';
export default {
    data () {
      return {
       formData: {
         name: ''
       },
       rule: [],
       color1:''
      }
    },
    methods: {
      changeUrl (e) {
        return 123
      }
    },
    components: {
      Phone
    }
}
</script>

