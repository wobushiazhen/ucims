<template>
  <el-dialog
    v-model="dialogData.isDialog"
    :title="title"
    width="35%"
    align-center
    draggable
  >
    <div>
      <el-form :model="formDialog" class="dialogForm" label-width="92px">
        <el-form-item label="部门名称">
          <el-input v-model="formDialog.部门名称" />
        </el-form-item>
        <el-form-item label="部门人数">
          <el-input v-model="formDialog.部门人数" />
        </el-form-item>
        <el-form-item label="部门负责人">
          <!-- <el-input v-model="formDialog.部门负责人" /> -->
          <el-select placeholder="选择职务" v-model="formDialog.部门负责人">
            <el-option
              v-for="item in memberList"
              :label="item.mname"
              :value="item.mname"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input disabled v-model="formDialog.创建时间" />
        </el-form-item>
        <el-form-item label="mid">
          <el-input disabled v-model="formDialog.mid" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogData.isDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialogForm {
  padding: 10px 70px;
}
</style>

<script  setup>
import { ref, defineProps, onMounted, reactive, watch, computed } from "vue";
const dialogList = defineProps({
  dialogData: Object,
  title: String,
  memberList: Array,
});

const emit = defineEmits(["dialogSubmit"]);

const formDialog = reactive({
  部门编号: "",
  部门人数: "",
  部门名称: "",
  部门负责人: "",
  创建时间: "",
  mid: "",
});

onMounted(() => {});

watch(
  () => dialogList.dialogData,
  (newVal) => {
    Object.assign(formDialog, newVal.row);
  },
  { immediate: true }
);

// 同步mname和mid
const uidFromName = computed({
  get: () => formDialog.部门负责人,
  set: (value) => {
    formDialog.mid = value
  }
})
watch(uidFromName, (newValue) => {
  // uidFromName.value = `UID-${newValue}`
  const targerObj=dialogList.memberList?.find(obj=>obj.mname===newValue)
  const targerMid=targerObj? targerObj.mid : null
  formDialog.mid=targerMid
},{immediate:true})

function onSubmit() {
  dialogList.dialogData.isDialog = false;
  emit("dialogSubmit", formDialog);
}
</script>


