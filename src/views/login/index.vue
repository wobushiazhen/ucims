<template>
  <div class="login">
    <div class="content">
      <div class="content-left">
        <h4 class="login-text">
          You need to {{ isTag ? "register" : "login" }} on to System -- UCIMS
        </h4>
        <div class="ucims">ucims</div>
      </div>
      <div class="content-right">
        <div class="main">
          <h4 v-show="isTag == false">login</h4>
          <h4 v-show="isTag == true">register</h4>
          <div class="main-form">
            <el-form
              label-position="left"
              label-width="150px"
              style="max-width: 400px"
              :model="formDate"
              ref="formRef"
              :rules="formRules"
            >
              <el-form-item prop="userName">
                <span>User Name</span>
                <el-input v-model.trim="formDate.userName" />
              </el-form-item>
              <el-form-item prop="password">
                <span>Password</span>
                <el-input type="password" v-model.trim="formDate.password" />
              </el-form-item>
              <el-form-item v-show="!isTag">
                <el-button type="primary" plain @click="onLogin"
                  >登 录</el-button
                >
                <el-link href="#" class="register" @click="register"
                  >注册账号</el-link
                >
              </el-form-item>
              <el-form-item v-show="isTag">
                <el-button type="success" plain @click="onRegister"
                  >注 册</el-button
                >
                <el-link href="#" class="register" @click="onReLogin"
                  >返回登录</el-link
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<style scoped lang='scss'>
.login {
  width: 100%;
  height: 100%;
  background: #6b8fe2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .content {
    width: 1220px;
    height: 680px;
    background: #abc1f2;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .content-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .login-text {
      // width: 330px;
      margin-left: 48px;
      // height: 250px;
    }
    .ucims {
      margin-top: 20px;
      width: 220px;
      height: 200px;
      background: #5b86e5;
      line-height: 200px;
      text-align: center;
      color: #abc1f2;
      box-shadow: 5px 1px 5px #7a7c82;
      font-size: 60px;
      border-top-right-radius: 53%;
      border-bottom-right-radius: 53%;
    }
  }
  .content-right {
    border: 1px solid #c2c5cd;
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: #fff;
    left: 52px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    .main {
      position: absolute;
      left: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h4 {
        font-size: 32px;
      }
      .register {
        position: absolute;
        left: 100px;
      }
    }
  }
}
</style>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { login, getToken, registerTo } from "@/api/login.js";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import {uInfo} from "@/stores/userinfo.js";
//登录注册切换显示隐藏
const isTag = ref(false);

//表单数据
const formDate = reactive({
  userName: "",
  password: "",
});

//获取路由器对象做编程式导航
const router = useRouter();

//formRef
const formRef = ref();

//表单验证规则
const formRules = reactive({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

//登录按钮事件
const onLogin = async () => {
  try {
    //表单验证
    await formRef.value.validate();
    //调用获取token接口
    getToken({
      userName: formDate.userName,
      password: formDate.password,
    })
      .then((res) => {
        // 设置token然后调用用户信息接口获取权限信息
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          //往store存用户数据
          const useUInfo=uInfo()
          useUInfo.usernameL=formDate.userName
          router.replace("/");
          
          ElMessage({
            showClose: true,
            message: `登录成功，欢迎您，${formDate.userName}！`,
            type: "success",
          });
        } else {
          ElMessage({
            showClose: true,
            message: "账号或密码有误！",
            type: "error",
          });
        }
      })
      .catch((err) => {});
  } catch (error) {}
  // console.log(login);
};

onMounted(() => {
  // console.log(formRef.value);
});

//返回注册
const register = () => {
  isTag.value = true;
  formDate.userName = "";
  formDate.password = "";
};

//onReLogin 返回登录
const onReLogin = () => {
  isTag.value = false;
};

//onRegister 注册按钮
const onRegister = async () => {
  const date = new Date();
  const currentDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  await formRef.value.validate();
  registerTo({
    userName: formDate.userName,
    password: formDate.password,
    date: currentDate,
  }).then((res) => {
    console.log(res);
    if (res.data.msg === 23000) {
      ElMessage({
        showClose: true,
        message: "账号已存在！",
        type: "error",
      });
    }
    if (res.data.msg === 200) {
      ElMessage({
        showClose: true,
        message: `注册成功！`,
        type: "success",
      });
    }
  });
};
</script>