<template>
  <div class="tableMain">
    <el-table :data="listFliterDate" style="width: 98.5%">
      <el-table-column min-width="3" label="序号" type="index">
      </el-table-column>
      <el-table-column
        v-for="(value, key) in tableList?.[0]"
        :key="key"
        :label="key"
        :prop="key"
        :show-overflow-tooltip="true"
        :sortable="value == 'msex'"
        min-width="7"
      >
      </el-table-column>
      <el-table-column
        min-width="11"
        fixed="right"
        v-if="tableList?.length > 0"
      >
        <template #header class="colRight">
          <div class="colRight-search">
            <el-input
              size="small"
              v-model.trim="search"
              placeholder="找一找"
              style="width: 118px"
              @keyup.enter="onSearch()"
            />
          </div>
          <el-button style="width: 53px" size="small" @click="handleRefresh()">
            <el-icon><Refresh /></el-icon>
          </el-button>
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
            style="width: 53px"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            v-show="delBtn"
            style="width: 53px"
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
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

<style scoped lang='scss'>
.tableMain {
  // margin-right: 0px;
  overflow: auto;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgb(238, 247, 252) !important;
}
::v-deep .el-table,
.el-table__expanded-cell {
  background-color: rgb(245, 248, 251);
  // background-color: transparent;//这是设置透明背景色
}
.colRight {
  display: flex;
}
.colRight-search {
  margin-bottom: 2px;
}
.pagination {
  margin-top: 20px;
}
</style>

<script setup>
import { Refresh } from "@element-plus/icons-vue";
import { computed, ref, defineProps, defineEmits } from "vue";

const page = ref(1);
const pageSize = ref(10);
const tables = defineProps({
  tableList: Array,
  delBtn: {
    type: String,
    default: true,
  },
});
const emit = defineEmits([
  "tableRefresh",
  "tableEdit",
  "tableDelete",
  "tableSearch",
  "tableAdd",
]);

// 找一找
const search = ref("");

// 分页计算
const listFliterDate = computed(() => {
  return tables.tableList?.slice((page.value - 1) * 10, page.value * 10);
});

const handleRefresh = () => {
  emit("tableRefresh", "1");
};

const handleEdit = (index, row) => {
  // console.log(index, row);
  emit("tableEdit", { row, isDialog: true });
};
const handleDelete = (index, row) => {
  // console.log(index, row);
  emit("tableDelete", row);
};
const handleAdd = (index, row) => {
  emit("tableAdd", { isDialog: true, row });
};

const onSearch = () => {
  console.log(search.value);
  emit("tableSearch", search.value);
};
</script>