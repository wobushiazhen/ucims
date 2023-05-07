<template>
  <el-page-header class="headerHover" :icon="ArrowLeft" @back="handleBack">
    <template #content>
      <span class="text-large font-600 mr-3"> {{activeRoute.activeRoute.split(',')[1]}} </span>
    </template>
  </el-page-header>
</template>

<style scoped>
.headerHover{
  margin-left: 8px;
}
.headerHover:hover{
  color: #6b8fe2;
}
.headerHover span{
  font-size: 16px;
  line-height: 46px;
}
</style>

<script setup>
import { ArrowLeft } from "@element-plus/icons-vue";
import { useTopageStore } from "@/stores/topage.js";
import { onBeforeRouteLeave, useRoute,useRouter } from 'vue-router'
const route=useRoute()
const router=useRouter()
const activeRoute = useTopageStore();


// onBeforeRouteLeave((to,from,next)=>{
//   console.log(from);
// })


const handleBack = () => {
  // activeRoute.activeRoute=route.path
  // router.back()
  // console.log(activeRoute.activeRoute.split(','));
  // console.log(route);
};


</script>