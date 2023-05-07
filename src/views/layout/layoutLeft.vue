<template>
  <div class="layoutLeft">
    <div class="layoutLeft_box">
      <layoutLeftItem></layoutLeftItem>
    </div>
  </div>
</template>

<script setup>
import layoutLeftItem from './layoutLeftItem.vue'
</script>

<style scoped lang="scss" >
.layoutLeft{
  width: 180px;
  height: 100%;
  overflow: hidden;
  // padding-left: 33px;
  background: #FAFAFA;
  .layoutLeft_box{
    width: 100%;
    height: 100%;
    background: #FAFAFA;
    margin-top: 0px;
    margin-right: 39px;
  }
}

</style>