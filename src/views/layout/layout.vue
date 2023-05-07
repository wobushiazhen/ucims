<template>
  <div class="main">
    <layoutHeaderVue></layoutHeaderVue>
    <div class="content">
      <div class="layout-left">
        <layoutLeftVue></layoutLeftVue>
      </div>
      <div class="layoutMain">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from "vue";
import layoutHeaderVue from "./layoutHeader.vue";
import layoutLeftVue from "./layoutLeft.vue";
import { getUser } from "@/api/user";
onMounted(() => {
  getUser().then((res) => {
    // console.log(res);
    const data = res.data.map((item) => {
      return item?.role?.split(",");
    });
    console.log(data);
  });
});
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.layout-left{
  /* width: 200px; */
  margin-right: 20px;
  height: 100%;
}
.layoutMain {
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>



