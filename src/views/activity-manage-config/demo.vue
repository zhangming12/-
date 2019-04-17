

<template>
  <div id="Main">
      <iframe :src="url" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
    name:"demo-keepAlive",
    data() {
        return{
            url: '../../../static/index.html'
        }
    }
}
</script>
<style scoped>

</style>



