<template>
  <div>
    <el-table :data="listFliterDate" style="width: 98.5%">
      <el-table-column min-width="2" label="序号" type="index">
      </el-table-column>
      <el-table-column min-width="3" label="活动编号" prop="活动编号">
      </el-table-column>
      <el-table-column min-width="4" label="活动主题" prop="活动主题">
      </el-table-column>
      <el-table-column min-width="4" label="活动图片" prop="活动图片">
        <template #default="scope">
          <img class="imgS" :src="scope.row.活动图片" alt="暂无" />
        </template>
      </el-table-column>
      <el-table-column min-width="3" label="参与对象" prop="参与对象">
      </el-table-column>
      <el-table-column min-width="4" label="活动状态" sortable prop="活动状态">
        <template #default="scope">
          <span :style="{ color: getStatusColor(scope.row.活动状态) }">{{
            scope.row.活动状态
          }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="4" label="开始时间" prop="开始时间" sortable>
      </el-table-column>
      <el-table-column min-width="4" label="结束时间" prop="结束时间" sortable>
      </el-table-column>
      <el-table-column min-width="4" label="创建时间" prop="创建时间" sortable>
      </el-table-column>
      <el-table-column min-width="3" label="活动地点" prop="活动地点">
      </el-table-column>
      <el-table-column min-width="5" fixed="right" v-if="tableList?.length > 0">
        <template #header class="colRight">
          <div class="colRight-search">
            <el-input
              size="small"
              v-model.trim="search"
              placeholder="找一找"
              style="width: 118px; marginBottom: 3px"
              @keyup.enter="onSearch()"
            />
          </div>
          <el-button
            type="primary"
            style="width: 53px"
            size="small"
            @click="handleAdd()"
            >添加</el-button
          >
        </template>
        <template #default="scope">
          <el-button
            :type="getStatusType(scope.row.活动状态)"
            style="width: 65px"
            size="small"
            :disabled="scope.row.活动状态 == '审核中' || scope.row.活动状态 == '未通过' || scope.row.活动状态 == '已通过'"
            @click="handleEdit(scope.row)"
            >{{ getStatus(scope.row.活动状态) }}</el-button
          >
          <el-button
            style="width: 53px"
            size="small"
            type="danger"
            @click="handleDelete(scope.row.活动编号)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <template v-slot:empty>
        <div>暂无数据</div>
      </template>
    </el-table>
  </div>
  <div class="pagination" v-if="tableList?.length > 0">
    <el-pagination
      small
      background
      layout="total,prev, pager, next"
      :total="tableList.length"
      v-model:current-page="page"
      :page-size="pageSize"
      class="mt-4"
    />
  </div>
</template>

<style scoped>
.pagination {
  margin-top: 20px;
}
.imgS {
  width: 60px;
  height: 45px;
}
</style>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { uInfo } from "@/stores/userinfo.js";
import { useRouter } from "vue-router";
import { getActivity, searchActivity, delActivity,updateActivity } from "@/api/activity.js";
import { Refresh } from "@element-plus/icons-vue";
import { useTopageStore } from "@/stores/topage.js";
import axios from "axios";
const router = useRouter();
const { currentUser } = uInfo();
const tableList = ref();
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const page = ref(1);
const pageSize = ref(10);
const search = ref("");

const getActivityList = () => {
  getActivity(currentUser.uid).then((res) => {
    ElMessage({
      showClose: true,
      message: `获取成功!`,
      type: "success",
    });
    const newArr = res.data.map((obj) => {
      const date1 = new Date(obj.starttime);
      const date2 = new Date(obj.endtime);
      const date3 = new Date(obj.createtime);
      return {
        活动编号: obj.aid,
        活动主题: obj.title,
        活动图片: "",
        参与对象: obj.ren,
        开始时间: date1.toLocaleString(),
        结束时间: date2.toLocaleString(),
        创建时间: date3.toLocaleString(),
        活动状态: obj.status,
        活动地点: obj.place,
      };
    });
    tableList.value = newArr;
  });
};
const topage = useTopageStore();

onMounted(() => {
  getActivityList();
  axios.get("http://localhost:3000/activityList").then((res) => {
    tableList.value.活动图片 = res.data;
    for (let i = 0; i <= res.data.length; i++) {
      tableList.value[i].活动图片 = res.data[i]?.img;
    }
  });
});

const listFliterDate = computed(() => {
  return tableList.value?.slice((page.value - 1) * 10, page.value * 10);
});

// 添加
const handleAdd = () => {
  router.push("/manager/activityManagement/commit");
  topage.activeRoute =
    "/manager/activityManagement/commit,管理 / 活动管理 / 活动列表";
};

// 刷新
const onSearch = () => {
  const value = search.value;
  searchActivity(value).then((res) => {
    const newArr = res.data.map((obj) => {
      const date1 = new Date(obj.starttime);
      const date2 = new Date(obj.endtime);
      const date3 = new Date(obj.createtime);
      return {
        活动编号: obj.aid,
        活动主题: obj.title,
        活动图片: "",
        参与对象: obj.ren,
        开始时间: date1.toLocaleString(),
        结束时间: date2.toLocaleString(),
        创建时间: date3.toLocaleString(),
        活动状态: obj.status,
        活动地点: obj.place,
      };
    });
    tableList.value = newArr;
  });
};

// 活动状态
function getStatusColor(status) {
  switch (status) {
    case "未提交":
      return "gray";
    case "审核中":
      return "orange";
    case "审核通过":
      return "green";
    case "未通过":
      return "red";
    default:
      return "green";
  }
}

// 活动按钮提交状态
function getStatus(status) {
  switch (status) {
    case "未提交":
      return "提交审核";
    case "审核中":
      return "已提交";
    case "已通过":
      return "已通过";
    case "未通过":
      return "审核不通过";
    default:
      return "5555";
  }
}

// 活动按钮类型状态
function getStatusType(status) {
  switch (status) {
    case "未提交":
      return "success";
    case "审核中":
      return "info";
    case "审核通过":
      return "primary";
    case "未通过":
      return "danger";
    default:
      return "5555";
  }
}

// 删除
function handleDelete(data) {
  console.log(data);
  delActivity(data).then((res) => {
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `删除成功!`,
        type: "success",
      });
      window.location.reload();
    }
  });
}

// 提交审核
function handleEdit(data) {
  console.log(data);
  const { 活动编号 } = data;
  updateActivity({aid:活动编号,status:"审核中"}).then(res=>{
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `删除成功!`,
        type: "success",
      });
      window.location.reload();
    }F

  })
}
</script>
