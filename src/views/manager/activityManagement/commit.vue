<template>
  <div class="commit">
    <div class="commitCrad">
      <el-card class="box-card">
        <div class="card-title">提交活动</div>
        <div>
          <el-form
            :model="formData"
            label-width="180px"
            class="commitCrad-form"
          >
            <el-form-item label="活动主题">
              <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="活动照片" class="imgFormItme">
              <el-upload
                class="upload-box"
                list-type="picture-card"
                :on-change="onChange"
                :file-list="formData.imgs"
                :multiple="true"
                :auto-upload="false"
                :on-exceed="onExceed"
                :limit="9"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <!-- <el-button
                style="marginright: 20px"
                size="small"
                type="success"
                @click="handleSubmit"
                >提交图片</el-button
              > -->
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="预览" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="参与对象">
              <el-input v-model="formData.ren" style="width: 218px" />
            </el-form-item>
            <el-form-item label="活动地点">
              <el-input v-model="formData.place" style="width: 218px" />
            </el-form-item>
            <el-form-item label="开始时间 ~ 结束时间">
              <el-date-picker
                @change="onDatePiker"
                :locale="zhCn"
                v-model="times"
                type="datetimerange"
                range-separator="--"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
            <el-form-item label="活动简介">
              <el-input v-model="formData.introduce" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-tooltip placement="top">
                <template #content>保存之前确保已提交图片</template>
                <el-button
                  color="#6b8fe2"
                  type="primary"
                  style="width: 180px; color: #ffffff; margintop: 12px"
                  @click="onSubmit"
                  >保存</el-button
                >
              </el-tooltip>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.commit {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.commitCrad {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 130px;
  .commitCrad-form {
    margin-top: 30px;
    max-width: 700px;
    .el-form-item {
      margin: 28px 0px;
    }
  }
}
.card-title {
  height: 30px;
  line-height: 30px;
  margin-top: -5px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dfdede;
}
.upload-box {
  display: flex;
}
</style>

<script setup>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
import { uInfo } from "@/stores/userinfo.js";
import { getActivity, addActivity } from "@/api/activity.js";
import { Plus } from "@element-plus/icons-vue";
import { zhCn } from "/node_modules/element-plus/es/locale";
import { useTopageStore } from "@/stores/topage.js";
const { currentUser } = uInfo();

const topage = useTopageStore();
const times = ref([]);

const formData = reactive({
  title: "",
  ren: "",
  place: "",
  starttime: "",
  endtime: "",
  introduce: "",
  uid: currentUser?.uid,
  // imgs: [],
  createtime: new Date().toLocaleString(),
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const onDatePiker = () => {
  const date0 = new Date(times.value[0]);
  const date1 = new Date(times.value[1]);
  formData.starttime = date0.toLocaleString();
  formData.endtime = date1.toLocaleString();
};

const onExceed = () => {
  ElMessage({
    showClose: true,
    message: `最多上传9张照片`,
    type: "warning",
  });
};

const onChange = (options) => {
  console.log(options.raw);
  const file = options?.raw;
  const typeRight = ["image/png", "image/jpg", "image/jpeg"].includes(
    file?.type
  );
  const sizeRight = file?.size / 1024 < 100;
  if (!typeRight || !sizeRight) {
    ElMessage.error("校验不通过，请检查文件类型与大小");
    return false;
  }
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    console.log("选中的数据", fileReader.result);
    // formData.imgs.push({ img: fileReader.result, name: file.name });
    axios
      .post("http://localhost:3000/activityList", {
        img: fileReader.result,
        name: file.name,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return false;
};
// const handleSubmit = async () => {
//   console.log(formData.imgs);
// };

const onSubmit = () => {
  addActivity(formData).then((res) => {
    console.log(res);
    ElMessage({
      showClose: true,
      message: `操作成功！`,
      type: "success",
    });
  });
};

onMounted(() => {
  // console.log(topage.activeRoute);
});
</script>
