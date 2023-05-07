<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :http-request="onChange"
    >
      <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>
<style scoped>
.avatar-uploader {
  display: flex;
  justify-content: space-around;
  /* flex-direction: ; */
}

.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 40px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: rgb(9, 167, 202);
}

.el-icon.avatar-uploader-icon {
  /* display: block; */
  font-size: 25px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>
<script setup>
import { onMounted, reactive,ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { uInfo } from '@/stores/userinfo.js'

const props=defineProps({
  avatarUrl:String
})

const { currentUser }=uInfo()
const emit=defineEmits(['handleAvatar'])

const formData = ref({
  avatar: "",
});

const imageUrl = ref("");

onMounted(()=>{
  formData.value.avatar=currentUser.avatar
})

function onChange(options) {
  console.log(options);
  const file = options.file;
  const typeRight = ["image/png", "image/jpg", "image/jpeg"].includes(
    file.type
  );
  const sizeRight = file.size / 1024 / 1024 < 2;
  if (!typeRight || !sizeRight) {
    ElMessage.error("校验不通过，请检查文件类型与大小");
    return false;
  }
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    console.log('选中的数据',fileReader.result);
    // console.log('父组件的数据',avatarUrl.avatarUrl);
    formData.value.avatar = fileReader.result;
    currentUser.avatar=fileReader.result
    emit('handleAvatar',fileReader.result)
  };
  return false;
}
</script>
