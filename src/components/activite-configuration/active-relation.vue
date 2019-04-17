<style lang="less" scoped>
@import '../../config/index.less';

</style>

<template>
  <div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
  </div>
</template>

<script>
export default {
    data (){
       return {
          columns1: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 70,
                },
                {
                    title: '码包名称',
                    key: 'brandName',
                    align: 'center',
                },
                 {
                    title: '生码时间',
                    key: 'totalScanCode',
                    align: 'center'
                },
                 {
                    title: '批次号',
                    key: 'todayStores',
                    align: 'center'
                },
                {
                    title: '码数量',
                    key: 'todayScanCode',
                    align: 'center'
                }
            ],
            pageData: []
       }
    }
}
</script>


