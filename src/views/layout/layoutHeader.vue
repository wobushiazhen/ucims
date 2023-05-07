<template>
  <div class="layoutHeader">
    <div class="lhLeft">
      <div class="lh-icon">ucims</div>
    </div>
    <div class="lhRight">
      <div class="lhRight-sf"><screenfull></screenfull></div>
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link iconfont lhRight-content">
          <el-avatar size="small" :src="useUInfo.currentUser.avatar" style="marginRight:10px"/>
           用户,{{ useUInfo.usernameL }}
          <span class="triangle">&#xe771;</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="dropdown-activity">
            <el-dropdown-item @click="logOut"> 退出账号 </el-dropdown-item>
            <el-dropdown-item>gitee仓库</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      title="提示"
      width="30%"
      align-center
    >
      <span>您确定要退出系统嘛？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onLogOut"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <div class="titlePage">
    <pageHeader></pageHeader>
  </div>
</template>

<style scoped lang="scss">
.layoutHeader {
  height: 70px;
  background: #ffffff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .lhLeft {
    padding: 0 30px;
    .lh-icon {
      background: #fff;
      font-size: 28px;
      color: #6b8fe2;
      box-shadow: 2px 3px 4px #6b8fe2;
    }
  }
  .lhRight {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    .lhRight-sf {
      margin-top: 4px;
      margin-right: 15px;
    }
    span:nth-child(1):hover {
      cursor: pointer;
    }
    span:last-child {
      margin-left: 12px;
    }
    .lhRight-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70px;
      line-height: 70px;
    }
    .triangle {
      display: inline-block;
      transform: rotate(90deg);
    }
    .lhRight-content:hover .triangle {
      transform: rotate(0deg);
    }
    .lhRight:hover .triangle {
      transform: rotate(0deg);
    }
  }
}
.titlePage {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  // margin: 0 auto;
  margin-left: 168px;
}
</style>

<script setup>
import { uInfo } from "@/stores/userinfo.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import screenfull from "../component/screenfull.vue";
import pageHeader from "@/components/pageHeader.vue";
const centerDialogVisible = ref(false);
const useUInfo = uInfo();
const router = useRouter();

//退出登录按钮
const logOut = () => {
  centerDialogVisible.value = true;
};
//确定退出按钮
const onLogOut = () => {
  centerDialogVisible.value = false;
  console.log("1111");
  localStorage.clear();
  router.replace("/login");
  ElMessage({
    showClose: true,
    message: `退出成功`,
    type: "success",
  });
};
</script>