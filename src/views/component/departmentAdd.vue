<template>
  <el-dialog
    v-model="dialogData.memberAddIsOpen"
    title="添加部门信息"
    width="40%"
    align-center
  >
    <div>
      <el-form :model="formDialog" class="dialogForm" label-width="90px">
        <el-form-item label="部门名称">
          <el-input v-model="formDialog.dname" />
        </el-form-item>
        <el-form-item label="部门人数">
          <el-input v-model="formDialog.dnumber" />
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-input v-model="formDialog.dmanager" />
        </el-form-item>
        <!-- <el-form-item label="职务">
          <el-select placeholder="选择职务" v-model="formDialog.mpost" >
            <el-option label="会长/主席" value="会长/主席" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="创建时间">
          <!-- <el-input disabled v-model="formDialog.dcreatetime" /> -->
          <el-date-picker
            v-model="formDialog.dcreatetime"
            type="datetime"
            placeholder="选择创建日期"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
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
import { ref, defineProps, onMounted, reactive, watch } from "vue";
const dialogData = defineProps({
  memberAddIsOpen: Boolean,
  title: String,
  usernameL: String,
});

const emit = defineEmits(["memberDialogAdd", "memberDialogCancel"]);

const formDialog = reactive({
  dname: "",
  dnumber: "",
  dmanager: "",
  dcreatetime: "",
  mid: "",
});

onMounted(() => {
  // console.log(dialogList.dialogData.row);
});

function onSubmit() {
  emit("memberDialogAdd", formDialog);
}
function onCancel() {
  emit("memberDialogCancel");
}
</script>


