<template>
  <div>
    <div>
      <tables
        :tableList="tableList"
        @tableRefresh="tableRefresh"
        @tableDelete="tableDelete"
        @tableEdit="tableEdit"
        @tableAdd="tableAdd"
        @tableSearch="tableSearch"
      ></tables>
    </div>
    <dialoga
      :dialogData="dialogData"
      :title="title"
      @dialogSubmit="dialogSubmit"
    ></dialoga>
  </div>
  <div>
    <memberAdd
      :memberAddIsOpen="memberAddIsOpen"
      :usernameL="currentUser.uid"
      :title="title"
      @memberDialogAdd="memberDialogAdd"
      @memberDialogCancel="memberDialogCancel"
    ></memberAdd>
  </div>
</template>
<script setup>
import { getMember, delMember, updateMember, addMember,searchMember } from "@/api/member.js";
import { uInfo } from "@/stores/userinfo.js";
import { computed, onMounted, reactive, ref } from "vue";
import tables from "@/components/table.vue";
import dialoga from "@/components/dialog.vue";
import memberAdd from "@/views/component/memberAdd.vue";
const { usernameL, currentUser } = uInfo();
const dialogData = ref({});
const tableList = ref();
const title = "编辑成员信息";
const memberAddIsOpen = ref(false);
// 获取成员列表
const getMemberList = () => {
  getMember({ uid: usernameL }).then((res) => {
    // console.log(res.data);
    ElMessage({
      showClose: true,
      message: `获取成功!`,
      type: "success",
    });
    const newArr = res.data.map((obj) => {
      return {
        成员号: obj.mid,
        姓名: obj.mname,
        性别: obj.msex,
        手机号: obj.mnumber,
        学校名称: obj.mschoolname,
        职务: obj.mpost,
        描述: obj.miaosu,
        uid: obj.uid,
      };
    });
    tableList.value = newArr;
  });
};

onMounted(() => {
  getMemberList();
});

// 刷新
function tableRefresh() {
  getMemberList();
}
// 删除
function tableDelete(data) {
  // console.log(data.成员号);
  delMember(data.成员号).then((res) => {
    // console.log(res);
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `删除成功!`,
        type: "success",
      });
      getMemberList();
    }
  });
}
// 编辑
function tableEdit(data) {
  dialogData.value = data;
}
// 编辑确认
function dialogSubmit(data) {
  console.log(data, "提交后的数据");
  updateMember(data).then((res) => {
    console.log(res);
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `操作成功！`,
        type: "success",
      });
      getMemberList();
    }
  });
}

// 添加
function tableAdd(data) {
  console.log(data);
  memberAddIsOpen.value = data.isDialog;
}
// 添加确认
function memberDialogAdd(data) {
  memberAddIsOpen.value = false;
  console.log(data);
  addMember(data).then((res) => {
    console.log(res);
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `添加成功!`,
        type: "success",
      });
      getMemberList();
    }
  });
}
// 添加取消
function memberDialogCancel() {
  memberAddIsOpen.value = false;
}

// 搜索
function tableSearch(value){
  console.log(value);
  searchMember(value).then(res=>{
    console.log(res.data);
    tableList.value=res.data
  })
}
</script>
