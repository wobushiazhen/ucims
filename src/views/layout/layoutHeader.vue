<template>
  <div class="layoutHeader">
    <div class="lhLeft">
      <div class="lh-icon">ucims</div>
    </div>
    <div class="lhRight">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link iconfont">
          &#xe602; 用户,{{ useUInfo.usernameL }} &#xe771;
        </span>
        <template #dropdown>
          <el-dropdown-menu>
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
    span:nth-child(1):hover {
      cursor: pointer;
    }
    span:last-child {
      margin-left: 12px;
    }
  }
}
</style>

<script setup>
import { uInfo } from "@/stores/userinfo.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
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