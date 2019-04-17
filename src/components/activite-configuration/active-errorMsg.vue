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
            <Form ref="form" :model="formData" :label-width="70" >
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
                <Row >
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
                  <Col span="10">
                      <Form-item label="默认启用:" prop="name">   
                            活动尚未开始时被扫码                                          
                      </Form-item>
                  </Col>
                  <Col span="12" offset="2">
                      <Form-item label="标题名称:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span="10">
                      <Form-item label="默认启用:" prop="name">   
                            活动已经结束时被扫码                                          
                      </Form-item>
                  </Col>
                  <Col span="12" offset="2">
                      <Form-item label="标题名称:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>

                <Row>
                  <Col span="10">
                      <Form-item label="默认启用:" prop="name">   
                            活动尚未开始时被扫码                                          
                      </Form-item>
                  </Col>
                  <Col span="12" offset="2">
                      <Form-item label="标题名称:" prop="name" >   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='2'>
                      <Form-item :label-width='1'>
                        <Checkbox v-model="single">启用</Checkbox>
                      </Form-item>
                      
                  </Col>
                  <Col span='8'>
                      <Form-item label="每日参与上限(次):" prop="name" :label-width='120'>   
                            <InputNumber v-model="formData.name" :min="1"></InputNumber>                                           
                      </Form-item>
                  </Col>
                  <Col span='12' offset='2'>
                      <Form-item label="标题名称:" prop="name" >   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='2'>
                      <Form-item :label-width='1'>
                        <Checkbox v-model="single">启用</Checkbox>
                      </Form-item>
                      
                  </Col>
                  <Col span='8'>
                      <Form-item label="每日参与上限(次):" prop="name" :label-width='120'>   
                            <InputNumber v-model="formData.name" :min="1"></InputNumber>                                           
                      </Form-item>
                  </Col>
                  <Col span='12' offset='2'>
                      <Form-item label="标题名称:" prop="name" >   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='2'>
                      <Form-item :label-width='1'>
                        <Checkbox v-model="single">启用</Checkbox>
                      </Form-item>
                      
                  </Col>
                  <Col span='8'>
                      <Form-item label="每日参与上限(次):" prop="name" :label-width='120'>   
                            <InputNumber v-model="formData.name" :min="1"></InputNumber>                                           
                      </Form-item>
                  </Col>
                  <Col span='12' offset='2'>
                      <Form-item label="标题名称:" prop="name" >   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='2'>
                      <Form-item :label-width='1'>
                        <Checkbox v-model="single">启用</Checkbox>
                      </Form-item>
                      
                  </Col>
                  <Col span='8'>
                      <Form-item label="每日参与上限(次):" prop="name" :label-width='120'>   
                            <InputNumber v-model="formData.name" :min="1"></InputNumber>                                           
                      </Form-item>
                  </Col>
                  <Col span='12' offset='2'>
                      <Form-item label="标题名称:" prop="name" >   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='2'>
                      <Form-item :label-width='1'>
                        <Checkbox v-model="single">启用</Checkbox>
                      </Form-item>
                      
                  </Col>
                  <Col span='8'>
                      <Form-item label="每日参与上限(次):" prop="name" :label-width='120'>   
                            <InputNumber v-model="formData.name" :min="1"></InputNumber>                                           
                      </Form-item>
                  </Col>
                  <Col span='12' offset='2'>
                      <Form-item label="标题名称:" prop="name" >   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='2'>
                      <Form-item :label-width='1'>
                        <Checkbox v-model="single">启用</Checkbox>
                      </Form-item>
                      
                  </Col>
                  <Col span='8'>
                      <Form-item label="" prop="name" :label-width='1'>   
                            <span>内部员工扫码  </span>                                   
                            <span>黑名单维护</span>                                   
                      </Form-item>
                  </Col>
                  <Col span='12' offset='2'>
                      <Form-item label="标题名称:" prop="name" >   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span='2'>
                      <Form-item :label-width='1'>
                        <Checkbox v-model="single">启用</Checkbox>
                      </Form-item>
                      
                  </Col>
                  <Col span='8'>
                      <Form-item label="" prop="name" :label-width='1'>   
                            <span>内部员工扫码  </span>                                   
                            <span>黑名单维护</span>                                   
                      </Form-item>
                  </Col>
                  <Col span='12' offset='2'>
                      <Form-item label="标题名称:" prop="name" >   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Form-item label="信息提示:" prop="name">   
                            <Input v-model="formData.name" :maxlength='20' placeholder="请输入陈列主题" ></Input>                                           
                      </Form-item>
                  </Col>
                </Row>
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
         name: 1
       },
       rule: [],
       color1:'',
       single: true
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

