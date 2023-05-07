<template>
  <div>
    <el-table :data="listFliterDate" style="width: 98.5%">
      <el-table-column width="60" label="序号" type="index"> </el-table-column>
      <el-table-column width="160" label="主题" prop="主题">
        <template #default="scope">
          <el-popover
            effect="light"
            trigger="hover"
            placement="top"
            width="auto"
          >
            <template #default>
              <div style="minheight: 30px; maxwidth: 110px">
                {{ scope.row.主题 }}
              </div>
            </template>
            <template #reference>
              <div class="ellips">{{ scope.row.主题 }}</div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        label="类型"
        prop="类型"
        :filters="newsFiter"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column width="400" label="内容" prop="内容">
        <template #default="scope">
          <el-popover
            effect="light"
            trigger="hover"
            placement="top"
            width="auto"
          >
            <template #default>
              <div style="minHeight: 50px; maxWidth: 500px">
                {{ scope.row.内容 }}
              </div>
            </template>
            <template #reference>
              <div class="ellips">{{ scope.row.内容 }}</div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="150" label="作者" prop="作者"> </el-table-column>
      <el-table-column width="180" label="时间" prop="时间"> </el-table-column>
      <el-table-column width="205" fixed="right" v-if="tableList?.length > 0">
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
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.nid)"
            plain
            >删除</el-button
          >
          <el-button
            style="width: 60px"
            size="small"
            color="#6b8fe2"
            plain
            @click="handleDetail(scope.row.nid)"
            >查看详情</el-button
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

.ellips {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { uInfo } from "@/stores/userinfo.js";
import { useRouter } from "vue-router";
import { getNews, searchNews, delNews, updateNews } from "@/api/news.js";
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

const newsFiter = ref([
  { text: "公告通知类", value: "公告通知类" },
  { text: "社团日常活动类", value: "社团日常活动类" },
  { text: "比赛类", value: "比赛类" },
  { text: "其他", value: "其他" },
]);
const getNewsList = () => {
  getNews(currentUser.uid).then((res) => {
    ElMessage({
      showClose: true,
      message: `获取成功!`,
      type: "success",
    });
    const newArr = res.data.map((obj) => {
      const date = new Date(obj.createtime);
      return {
        nid: obj.nid,
        主题: obj.title,
        内容: obj.content,
        类型: obj.type,
        时间: obj.createtime,
        作者: obj.author,
      };
    });
    tableList.value = newArr;
  });
};
const topage = useTopageStore();

onMounted(() => {
  getNewsList();
});

const listFliterDate = computed(() => {
  return tableList.value?.slice((page.value - 1) * 10, page.value * 10);
});

// 添加
const handleAdd = () => {
  router.push("/manager/news/edit");
  topage.activeRoute =
    "/manager/news/edit,管理 / 社团新闻 / 编辑新闻";
};

// 查找
const onSearch = () => {
  const value = search.value;
  searchNews(value).then((res) => {
    const newArr = res.data.map((obj) => {
      return {
        nid: obj.nid,
        主题: obj.title,
        内容: obj.content,
        类型: obj.type,
        时间: obj.createtime,
        作者: obj.author,
      };
    });
    tableList.value = newArr;
  });
};

// 删除
function handleDelete(data) {
  console.log(data);
  delNews(data).then((res) => {
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `删除成功!`,
        type: "success",
      });
      getNewsList();
      // window.location.reload();
    }
  });
}

// 筛选
function filterHandler(value, row) {
  searchNews(value).then((res) => {
    const newArr = res.data.map((obj) => {
      return {
        nid: obj.nid,
        主题: obj.title,
        内容: obj.content,
        类型: obj.type,
        时间: obj.createtime,
        作者: obj.author,
      };
    });
    tableList.value = newArr;
  });
}

// 详情
function handleDetail(nid){
  console.log(nid,currentUser.uid);
  // window.open(`/newDetail${nid}`,"_target")
  router.push({
    name:"newsDetail",
    params:{
      nid,
    },
    target: '_blank'
  })
}
</script>


