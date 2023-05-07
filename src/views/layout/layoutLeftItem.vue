<template>
  <div class="itemMian">
    <el-menu
      :default-active="default_active"
      class="el-menu-vertical-demo"
      :default-openeds="openeds"
      router
    >
      <!-- <el-icon><ReadingLamp /></el-icon> -->
      <el-menu-item index="/home" @click="getPage('/home,首页')">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu class="sub-menu-hover" index="/manager">
        <template #title>
          <el-icon><Tools /></el-icon>
          <span>管理</span>
        </template>
        <el-menu-item
          index="/manager/memberShip"
          @click="getPage('/manager/memberShip,管理 / 成员管理')"
        >
          <el-icon><Stamp /></el-icon>
          成员管理
        </el-menu-item>
        <el-menu-item
          index="/manager/department"
          @click="getPage('/manager/department,管理 / 部门管理')"
        >
          <el-icon><OfficeBuilding /></el-icon>
          部门管理
        </el-menu-item>
        <el-sub-menu class="sub-menu-hover" index="/manager/activityManagement">
          <template #title>
            <el-icon><AddLocation /></el-icon>
            <span>活动管理</span>
          </template>
          <el-menu-item
            index="/manager/activityManagement/list"
            @click="getPage('/manager/activityManagement/list,管理 / 活动管理 / 活动列表')">
            <el-icon><Postcard /></el-icon>
            活动列表
          </el-menu-item>
          <el-menu-item
            index="/manager/activityManagement/commit"
            @click="
              getPage(
                '/manager/activityManagement/commit,管理 / 活动管理 / 提交活动'
              )
            "
          >
            <el-icon><Finished /></el-icon>
            提交活动
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu class="sub-menu-hover" index="/manager/news">
          <template #title>
            <el-icon><Postcard /></el-icon>
            <span>社团新闻</span>
          </template>
          <el-menu-item
            index="/manager/news/edit"
            @click="
              getPage(
                '/manager/news/edit,管理 / 社团新闻 / 编辑新闻'
              )">
            <el-icon><ReadingLamp /></el-icon>
            编辑新闻
          </el-menu-item>
          <el-menu-item
            index="/manager/news/list1"
            @click="
              getPage(
                '/manager/news/list1,管理 / 社团新闻 / 新闻列表'
              )">
            <el-icon><Wallet /></el-icon>
            新闻列表
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          index="/manager/newManagement"
          @click="getPage('/manager/newManagement,管理 / 招新管理')"
        >
          <el-icon><FirstAidKit /></el-icon>
          招新管理
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item
        index="/configuration"
        @click="getPage('/configuration,配置')"
      >
        <el-icon><SetUp /></el-icon>
        <span>配置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang='scss'>
.el-menu,
.el-sub-menu,
.el-menu-item {
  background: #fafafa;
}
.el-menu-item:hover {
  background: #e8e8e8;
}

.el-sub-menu__title:hover {
  background: #e8e8e8 !important;
}

.itemMian {
  height: 100%;
  overflow: hidden;
}
.el-menu-item.is-active {
  color: #6b8fe2;
}
</style>

<script setup>
//展开的左侧菜单列表

import {
  House,
  Location,
  Tools,
  SetUp,
  OfficeBuilding,
  Stamp,
  AddLocation,
  DocumentRemove,
  FirstAidKit,
  Postcard,
  Finished,
  ReadingLamp,
  Wallet
} from "@element-plus/icons-vue";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTopageStore } from "@/stores/topage.js";
import { useRoutesStore } from "@/stores/routes.js";

const router = useRouter();
const route = useRoute();
const activeRoute = useTopageStore();

const default_active = ref(route.path); //默认选中

const openeds = ref(["/manager"]);

const getPage = (default_active) => {
  // console.log(default_active, "default_active");
  activeRoute.setActiveRoute(default_active);
  // default_active.value(default_active)
};



watch(
  () => activeRoute.activeRoute,
  (newVal) => {
    console.log(newVal);
    default_active.value = newVal;
  }
);

// const newRoute=computed({
//   get:()=> 
// })

// // 同步mname和mid
// const uidFromName = computed({
//   get: () => formDialog.部门负责人,
//   set: (value) => {
//     formDialog.mid = value
//   }
// })
// watch(uidFromName, (newValue) => {
//   // uidFromName.value = `UID-${newValue}`
//   const targerObj=dialogList.memberList?.find(obj=>obj.mname===newValue)
//   const targerMid=targerObj? targerObj.mid : null
//   formDialog.mid=targerMid
// },{immediate:true})



onMounted(() => {
  // 前端路由数据
  // console.log(getHashRoutes[0]);
  // console.log(activeRoute.activeRoute, "-------------");
});
</script>