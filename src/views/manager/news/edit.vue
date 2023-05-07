<template>
  <div class="home">
    <el-button
      @click="onSave"
      size="small"
      color="#6b8fe2"
      class="saveBtn"
      plain
      >保存</el-button
    >
    <Tinymce v-model:value="val" />
  </div>
</template>

<style scoped>
.home {
  margin-top: 5px;
  position: relative;
  margin-right: 20px;
}
.saveBtn {
  position: absolute;
  width: 40px;
  top: 13px;
  right: 20px;
  z-index: 100;
}
</style>

<script setup>
import Tinymce from "@/components/editor.vue";
import { ref } from "vue";

// export default {
// name: "Home",
// components: {
//   Tinymce,
// },
// setup() {
// const val = ref("Welcome to Your Vue.js App");
// return {
// val
// };
// },
// methods:{
// onSave(){
// console.log(this.val);
// }
// }
// };

const val = ref("输入什么吧...");
const onSave = () => {
  console.log(val.value);
};
</script>