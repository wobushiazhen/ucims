<template>
  <div class="configurationMain">
    <div class="info">
      <el-card class="box-card">
        <div class="card-title">个人信息</div>
        <div>
          <el-form :model="formData" style="padding: 0px 90px">
            <el-form-item>
              <el-row :gutter="70">
                <el-col :span="12">
                  <span>姓名</span>
                  <el-input v-model="formData.name" />
                </el-col>
                <el-col :span="12">
                  邮箱
                  <el-input v-model="formData.email" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="70">
                <el-col :span="12">
                  <span>手机号</span>
                  <el-input maxlength="11" v-model="formData.phone" />
                </el-col>
                <el-col :span="12">
                  学校名称
                  <el-input v-model="formData.schoolname" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col :span="24" style="display:flex">
                  <span >性别</span>
                  <el-radio-group class="radioColor" v-model="formData.sex">
                    男<el-radio label="M" value="M" /> 女<el-radio
                      label="F"
                      value="F"
                    />
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="70">
                <el-col :span="12">
                  <span>社团名称</span>
                  <el-input v-model="formData.corporatename" />
                </el-col>
                <el-col :span="12">
                  职务
                  <el-select placeholder="选择职务" v-model="formData.post">
                    <el-option label="会长/主席" value="会长/主席" />
                    <el-option label="副会长/副主席" value="副会长/副主席" />
                    <el-option label="总干事/秘书" value="总干事/秘书" />
                    <el-option
                      label="财务负责人/财务部长"
                      value="财务负责人/财务部长"
                    />
                    <el-option
                      label="宣传部长/宣传负责人"
                      value="宣传部长/宣传负责人"
                    />
                    <el-option
                      label="外联部长/外联负责人"
                      value="外联部长/外联负责人"
                    />
                    <el-option
                      label="活动策划部长/活动策划负责人"
                      value="活动策划部长/活动策划负责人"
                    />
                    <el-option
                      label="学术部长/学术负责人"
                      value="学术部长/学术负责人"
                    />
                    <el-option
                      label="文体部长/文体负责人"
                      value="文体部长/文体负责人"
                    />
                    <el-option
                      label="实习部长/实习负责人"
                      value="实习部长/实习负责人"
                    />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              人生格言
              <el-input v-model="formData.introduce" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button
                color="#6b8fe2"
                type="primary"
                style="width: 180px; color: #ffffff; margintop: 12px"
                @click="onSubmit"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="login">
      <el-card class="box-card">
        <div class="card-title">我的账户</div>
        <div class="loginMain">
          <div>
            <avatar
              @handleAvatar="handleAvatar"
              :avatarUrl="userForm.avatar"
            ></avatar>
          </div>
          <div class="account">
            <el-form :inline="true" :model="userForm" class="demo-form-inline">
              <el-form-item label="账号" style="margintop: 10px">
                <el-input
                  v-model="userForm.userName"
                  disabled
                  :placeholder="usernameL"
                />
              </el-form-item>
              <el-form-item label="密码" style="margintop: 10px">
                <el-input
                  v-model="userForm.password"
                  type="password"
                  placeholder="修改密码"
                />
              </el-form-item >
              <div class="account">创建账号时间：{{ userForm.riqi }}</div>
              <el-form-item label=" " style="marginRight:5px">
                <el-button
                  color="#6b8fe2"
                  type="primary"
                  style="width: 176px; marginleft: 60px; color: #ffffff"
                  @click="onSubmitlogin"
                  >修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.configurationMain {
  height: 100%;
  padding: 10px 20px 0px 0px;
  display: flex;
  justify-content: space-around;
  .info {
    width: 660px;
  }
  .login {
    width: 420px;
    .loginMain {
      padding: 25px 20px 35px 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .account {
        color: #6b8fe2;
        margin-top: 15px;
        margin-bottom: 30px;
      }
    }
  }
}
.box-card {
  padding: 0px 10px;
}
.card-title {
  height: 30px;
  line-height: 30px;
  margin-top: -5px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dfdede;
}
.radioColor {
  // padding-top: -30px;
  margin-left: 60px;
}

.demo-form-inline {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script setup>
import { currentUser, updataCurrentUser, updatePerson } from "@/api/login.js";
// import { updatePerson } from "@/api/user.js";
import { uInfo } from "@/stores/userinfo.js";
import { onMounted, reactive, ref } from "vue";
import { UserFilled } from "@element-plus/icons-vue";
import avatar from "@/components/avatar.vue";
import { Avatar } from "@element-plus/icons";
const { usernameL } = uInfo();
const currentUserData = ref();

const userForm = reactive({
  avatar: "",
  password: "",
  riqi: "",
  uid: "",
});

const formData = reactive({
  name: "",
  email: "",
  phone: "",
  schoolname: "",
  sex: "M",
  corporatename: "",
  post: "",
  introduce: "",
  uid: "",
});
const getCurrentUser = () => {
  currentUser({ userName: usernameL })
    .then((res) => {
      console.log(res.data[0]);
      const a = res.data[0];
      currentUserData.value = a;
      formData.name = a.name;
      formData.email = a.email;
      formData.phone = a.phone;
      formData.schoolname = a.schoolname;
      formData.sex = a.sex;
      formData.corporatename = a.corporatename;
      formData.introduce = a.introduce;
      formData.post = a.post;
      formData.uid = a.uid;
      // const blob = new Blob([a.avatar], { type: "image/jpeg" });
      // const imageUrl = URL.createObjectURL(blob);
      userForm.avatar = "https://ts4.cn.mm.bing.net/th?id=OIP-C.JpExcS-YgMJN3bDnQBuJ-gHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2";
      // const base64String = btoa(String.fromCharCode(...new Uint8Array(a.avatar)));
      // console.log(base64String);
      // const uint8Array = new Uint8Array(a.avatar);
      // const binaryString = uint8Array.reduce((str, byte) => str + String.fromCharCode(byte), '');
      // const base64String = btoa(binaryString);
      // userForm.avatar = 'data:image/jpeg;base64,'+base64String;
      userForm.password = a.password;
      userForm.riqi = a.riqi;
      userForm.uid = a.uid;
    })
    .catch((err) => {
      console.log(err);
    });
};

// 子组件的头像数据
const handleAvatar = (data) => {
  userForm.avatar = data;
};

onMounted(async () => {
  await getCurrentUser();
});

const onSubmit = () => {
  console.log(formData);
  updataCurrentUser({ formData }).then((res) => {
    // console.log(res);
    const { msg } = res.data;
    if (msg == 200) {
      ElMessage({
        showClose: true,
        message: `更新成功!`,
        type: "success",
      });
      getCurrentUser();
    }
  });
};
const onSubmitlogin = () => {
  updatePerson({uid:userForm.uid,password:userForm.password}).then((res) => {
    console.log(res, "66666666");
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `更新成功!`,
        type: "success",
      });
      getCurrentUser();
    }
  });
};
</script>
