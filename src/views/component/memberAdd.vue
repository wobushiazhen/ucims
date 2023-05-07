<template>
<el-dialog
    v-model="dialogData.memberAddIsOpen"
    title="添加成员信息"
    width="40%"
    align-center
  >
    <div>
      <el-form :model="formDialog" class="dialogForm" label-width="68px">
        <el-form-item label="姓名">
          <el-input v-model="formDialog.mname" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input maxlength="11" v-model="formDialog.mnumber" />
        </el-form-item>
        <el-form-item label="学校名称">
          <el-input v-model="formDialog.mschoolname" />
        </el-form-item>
        <el-form-item label="职务">
          <el-select placeholder="选择职务" v-model="formDialog.mpost" >
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
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="formDialog.miaosu" />
        </el-form-item>
        <el-form-item label="uid">
          <el-input disabled v-model="formDialog.uid" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
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
  memberAddIsOpen:Boolean,
  title: String,
  usernameL:String
});

const emit =defineEmits(['memberDialogAdd','memberDialogCancel'])

const formDialog = reactive({
  mname: "",
  msex: "F",
  mnumber: "",
  mschoolname: "",
  mpost: "",
  miaosu: "",
  uid:dialogData.usernameL
});

onMounted(() => {
  // console.log(dialogList.dialogData.row);
});



function onSubmit(){
  emit('memberDialogAdd',formDialog)
}
function onCancel(){
  emit('memberDialogCancel')
}
</script>


