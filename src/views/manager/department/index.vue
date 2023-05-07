<template>
  <div>
    <div>
      <tables
        :delBtn="false"
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
      :memberList="memberList"
    ></dialoga>

    <div>
      <departmentAdd
        :memberAddIsOpen="memberAddIsOpen"
        :usernameL="currentUser.uid"
        :title="title"
        @memberDialogAdd="memberDialogAdd"
        @memberDialogCancel="memberDialogCancel"
      ></departmentAdd>
    </div>
  </div>
</template>


<script setup>
import {
  getDepartment,
  updateDepartment,
  addDepartment,
  searchDepartment
} from "@/api/department.js";
import { getMember } from "@/api/member.js";
import { uInfo } from "@/stores/userinfo.js";
import { computed, onMounted, reactive, ref } from "vue";
import tables from "@/components/table.vue";
import dialoga from "@/views/component/departmentDialog.vue";
import departmentAdd from "@/views/component/departmentAdd.vue";
const { usernameL, currentUser } = uInfo();
const dialogData = ref({});
const tableList = ref();
const title = "编辑部门信息";
const memberList = ref();
const memberAddIsOpen = ref(false);
const getDepartmentList = () => {
  getDepartment().then((res) => {
    console.log(res.data);
    ElMessage({
      showClose: true,
      message: `获取成功!`,
      type: "success",
    });
    const newArr = res.data.map((obj) => {
      const date = new Date(obj.dcreatetime);
      return {
        部门编号: obj.did,
        部门名称: obj.dname,
        部门人数: obj.dnumber,
        部门负责人: obj.dmanager,
        创建时间: date.toLocaleString(),
        mid: obj.mid,
      };
    });
    tableList.value = newArr;
  });
};

onMounted(() => {
  getDepartmentList();
  getMember({ uid: usernameL }).then((res) => {
    memberList.value = res.data.map(({ mid, mname }) => ({ mid, mname }));
    // console.log(memberList.value);
  });
});

// 刷新
function tableRefresh() {
  getDepartmentList();
}

// 编辑
function tableEdit(data) {
  dialogData.value = data;
}

// 编辑确认
function dialogSubmit(data) {
  console.log(data, "提交后的数据");
  updateDepartment(data).then((res) => {
    console.log(res);
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `操作成功！`,
        type: "success",
      });
      getDepartmentList();
    }
  });
}

// 删除
function tableDelete(data) {
  delMember(data.成员号).then((res) => {
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `删除成功!`,
        type: "success",
      });
      getDepartmentList();
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
  addDepartment(data).then((res) => {
    console.log(res);
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `添加成功!`,
        type: "success",
      });
      getDepartmentList();
    }
  });
}
// 添加取消
function memberDialogCancel() {
  memberAddIsOpen.value = false;
}

// 搜索
function tableSearch(value){
  // console.log(value);
  searchDepartment(value).then(res=>{
    console.log(res.data);
    tableList.value=res.data
  })
}
</script>