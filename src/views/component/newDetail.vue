<template>
  <div class="top">
    <div>
      <div>{{ currentUser.schoolname }} - {{ currentUser.corporatename }}</div>
      <div>{{ currentUser.name }} - {{ currentUser.post }}</div>
    </div>
  </div>
  <div class="detail">
    <div class="detailMain">
      <h4>{{ detailData?.[0]?.title }}</h4>
      <div style="textAlign: left">
        {{ detailData?.[0].content }}
      </div>
      <div style="textAlign: right; marginTop: 15px">
        {{ detailData?.[0].author }} {{ detailData?.[0].createtime }}
      </div>
    </div>
  </div>
</template>

<style setup>
.top {
  height: 70px;
  background: #6b8fe2;
  margin-bottom: 100px;
  color: white;
}
.top > div {
  width: 400px;
  margin: 0 auto;
  height: 70px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.detail {
  width: 640px;
  margin: 0 auto;
  text-align: center;
}
.detailMain > div {
  line-height: 28px;
}
</style>

<script setup>
import CryptoJS from "crypto-js";
import { defineProps, onMounted, ref } from "vue";
import { uInfo } from "@/stores/userinfo.js";
import { getNewsDetail } from "@/api/news.js";

const { currentUser } = uInfo();
const detailData = ref();

const props = defineProps({
  nid: String,
});
const getNewsDetailList = () => {
  console.log(currentUser.uid, props.nid);
  getNewsDetail({ uid: currentUser.uid, nid: props.nid }).then((res) => {
    console.log(res.data);
    ElMessage({
      showClose: true,
      message: `获取成功!`,
      type: "success",
    });
    detailData.value = res.data;
    // const newArr = res.data.map((obj) => {
    //   return {
    //     nid: obj.nid,
    //     主题: obj.title,
    //     内容: obj.content,
    //     类型: obj.type,
    //     时间: obj.createtime,
    //     作者: obj.author,
    //   };
    // });
    // tableList.value = newArr;
  });
};
onMounted(() => {
  getNewsDetailList();
});
</script>
