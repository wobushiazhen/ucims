<template>
  <keep-alive>
    <div class="newManager">
      <div class="leftMain">
        <el-tooltip :content="isTable == true ? '不显示此表格' : '显示表格'">
          <el-button plain size="small" class="isBtn" @click="isHiddent">{{
            isTable == true ? "隐藏" : "显示"
          }}</el-button>
        </el-tooltip>
        <el-card class="card" shadow="hover" v-if="isTable">
          <div class="card-title">
            <span>表格编辑区域</span>
            <el-button
              type="success"
              color="#6b8fe2"
              plain
              size="small"
              @click="onSave"
              >保存格式</el-button
            >
          </div>
          <div></div>
          <div class="card-table">
            <h3 class="card-tableCaption" contenteditable="true" ref="caption">
              {{ ltableData.caption }}
            </h3>
            <span class="table-date" :style="{ textAlign: textAlign }"
              >年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</span
            >
            <div class="card-tableMain">
              <el-tooltip content="表格可以进行编辑哦">
                <table border="1px">
                  <tr>
                    <td class="tdtitle" contenteditable="true" ref="tr1td1">
                      {{ ltableData.tr1td1 }}
                    </td>
                    <td colspan="2" class="td1" contenteditable="true"></td>
                    <td class="tdtitle" contenteditable="true" ref="tr1td2">
                      {{ ltableData.tr1td2 }}
                    </td>
                    <td colspan="2" class="td1" contenteditable="true"></td>
                    <td
                      rowspan="4"
                      class="tdtitle"
                      style="width: 90px"
                      contenteditable="true"
                    >
                      照片
                    </td>
                  </tr>
                  <tr>
                    <td class="tdtitle" contenteditable="true" ref="tr2td1">
                      {{ ltableData.tr2td1 }}
                    </td>
                    <td class="td2" contenteditable="true"></td>
                    <td class="tdtitle" contenteditable="true" ref="tr2td2">
                      {{ ltableData.tr2td2 }}
                    </td>
                    <td class="td2" contenteditable="true"></td>
                    <td class="tdtitle" contenteditable="true" ref="tr2td3">
                      {{ ltableData.tr2td3 }}
                    </td>
                    <td class="td2" contenteditable="true"></td>
                  </tr>
                  <tr>
                    <td class="tdtitle" contenteditable="true" ref="tr3td1">
                      {{ ltableData.tr3td1 }}
                    </td>
                    <td class="td2" contenteditable="true"></td>
                    <td class="tdtitle" contenteditable="true" ref="tr3td2">
                      {{ ltableData.tr3td2 }}
                    </td>
                    <td class="td2" contenteditable="true"></td>
                    <td class="tdtitle" contenteditable="true" ref="tr3td3">
                      {{ ltableData.tr3td3 }}
                    </td>
                    <td class="td2" contenteditable="true"></td>
                  </tr>
                  <tr>
                    <td class="tdtitle" contenteditable="true" ref="tr4td1">
                      {{ ltableData.tr4td1 }}
                    </td>
                    <td class="td3" colspan="2" contenteditable="true"></td>
                    <td class="tdtitle" contenteditable="true" ref="tr4td2">
                      {{ ltableData.tr4td2 }}
                    </td>
                    <td class="td3" colspan="2" contenteditable="true"></td>
                  </tr>
                  <tr>
                    <td class="tdtitle" contenteditable="true" ref="tr5td1">
                      {{ ltableData.tr5td1 }}
                    </td>
                    <td class="td2" contenteditable="true"></td>
                    <td class="tdtitle" contenteditable="true" ref="tr5td2">
                      {{ ltableData.tr5td2 }}
                    </td>
                    <td class="td2" contenteditable="true"></td>
                    <td class="tdtitle" contenteditable="true" ref="tr5td3">
                      {{ ltableData.tr5td3 }}
                    </td>
                    <td class="tdtitle" colspan="2" contenteditable="true">
                      √是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;否
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="tdtitle"
                      style="height: 60px"
                      contenteditable="true"
                      ref="tr6"
                    >
                      {{ ltableData.tr6 }}
                    </td>
                    <td colspan="7" contenteditable="true"></td>
                  </tr>
                  <tr>
                    <td class="tdtitle" contenteditable="true" ref="tr7">
                      {{ ltableData.tr7 }}
                    </td>
                    <td colspan="7" contenteditable="true"></td>
                  </tr>
                  <tr>
                    <td
                      class="tdtitle td3"
                      style="height: 60px"
                      contenteditable="true"
                      ref="tr8"
                    >
                      {{ ltableData.tr8 }}
                    </td>
                    <td colspan="7" contenteditable="true"></td>
                  </tr>
                  <tr>
                    <td
                      class="tdtitle td3"
                      style="height: 40px"
                      contenteditable="true"
                      ref="tr9"
                    >
                      {{ ltableData.tr9 }}
                    </td>
                    <td colspan="7" contenteditable="true"></td>
                  </tr>
                </table>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </div>
      <div class="rightMain" :style="{ flex: isHiddent == true ? '0' : '1' }">
        <div class="word-header">
          <el-button color="#6b8fe2" plain size="small" @click="onUpload"
            >上传</el-button
          >
          <el-button color="#6b8fe2" plain size="small" @click="onPrint"
            >打印</el-button
          >
          <el-button color="#6b8fe2" plain size="small" @click="onDownLoad"
            >下载</el-button
          >
        </div>
        <div ref="printContent" id="printContent">
          <h3 class="word-caption">
            {{ ltableData.caption }}
          </h3>
          <span
            class="table-date"
            style="fontsize: 16px; lineheight: 40px"
            :style="{ textAlign: textAlign }"
            >年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</span
          >
          <table border="1px" class="word-table" style="textalign: center">
            <tr>
              <td class="word-td">
                {{ ltableData.tr1td1 }}
              </td>
              <td colspan="2" class="word-td1">&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td class="word-td">
                {{ ltableData.tr1td2 }}
              </td>
              <td colspan="2" class="word-td1"></td>
              <td rowspan="4">照片</td>
            </tr>
            <tr>
              <td class="word-td">
                {{ ltableData.tr2td1 }}
              </td>
              <td class="word-td2"></td>
              <td class="word-td">
                {{ ltableData.tr2td2 }}
              </td>
              <td class="word-td2"></td>
              <td class="word-td">
                {{ ltableData.tr2td3 }}
              </td>
              <td class="word-td2"></td>
            </tr>
            <tr>
              <td class="word-td">
                {{ ltableData.tr3td1 }}
              </td>
              <td class="word-td2"></td>
              <td class="word-td">
                {{ ltableData.tr3td2 }}
              </td>
              <td class="word-td2"></td>
              <td class="word-td">
                {{ ltableData.tr3td3 }}
              </td>
              <td class="word-td2"></td>
            </tr>
            <tr>
              <td class="word-td">
                {{ ltableData.tr4td1 }}
              </td>
              <td colspan="2"></td>
              <td class="word-td">
                {{ ltableData.tr4td2 }}
              </td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td class="word-td">
                {{ ltableData.tr5td1 }}
              </td>
              <td></td>
              <td class="word-td">
                {{ ltableData.tr5td2 }}
              </td>
              <td></td>
              <td class="word-td">
                {{ ltableData.tr5td3 }}
              </td>
              <td colspan="2">√是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;否</td>
            </tr>
            <tr>
              <td class="word-td">
                {{ ltableData.tr6 }}
              </td>
              <td colspan="7" style="height: 100px"></td>
            </tr>
            <tr>
              <td class="word-td">
                {{ ltableData.tr7 }}
              </td>
              <td colspan="7" style="height: 120px"></td>
            </tr>
            <tr>
              <td class="word-td">
                {{ ltableData.tr8 }}
              </td>
              <td colspan="7" style="height: 100px"></td>
            </tr>
            <tr>
              <td class="word-td">
                {{ ltableData.tr9 }}
              </td>
              <td colspan="7" style="height: 80px"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<style lang="scss" scoped>
.newManager {
  margin-top: 15px;
  height: 100%;
  width: 100%;
  display: flex;
  .leftMain {
    position: relative;
    .card-title {
      margin-top: 10px;
    }
  }
  // overflow: auto;
  .rightMain {
    margin-left: 25px;
    margin-right: 15px;
    flex: 1;
    width: 100%;
    overflow: auto;
    .word-caption {
      font-size: 25px;
      text-align: center;
    }
    .word-table {
      width: 100%;
      text-align: center;
      margin-bottom: 200px;

      .word-td {
        width: 100px;
        height: 38px;
      }
      .word-td1 {
        width: 135px;
      }
      .word-td2 {
        width: 90px;
      }
    }
    .word-header {
      margin-bottom: 30px;
      display: flex;
      // float: right;
      flex-direction: row-reverse;
      // justify-content: space-between;
    }
  }
}
.card-title {
  height: 30px;
  line-height: 30px;
  margin-top: -5px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dfdede;
  span {
    margin-right: 222px;
  }
}
.card {
  width: 430px;
  // border: 1px solid #868686;
  .card-table {
    text-align: center;
    .card-tableMain {
      width: 100%;
      font-size: 12px;
      // border: 1px solid #ccc;
      .tdtitle {
        text-align: center;
        width: 55px;
        height: 27px;
        // font-size: 12px;
      }
      .td1 {
        // width: 20px;
        height: 20px;
      }
      .td2 {
        width: 60px;
        height: 20px;
      }
      .td3 {
        height: 20px;
      }
    }
  }
}
.table-date {
  display: block;
  line-height: 30px;
  font-size: 12px;
}
table {
  border-collapse: collapse;
}
.isBtn {
  position: absolute;
}
</style>

<script setup>
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
} from "vue";
import printJS from 'print-js'
import { updateWord } from "@/api/text.js";
import htmlDocx from "html-docx-js/dist/html-docx";
import saveAs from "file-saver";

import { uInfo } from "@/stores/userinfo.js";

const { currentUser } = uInfo();
// 打印内容
const printContent = ref(null);
const isTable = ref(true);
const textAlign = ref("right");
const caption = ref("");
const tr1td1 = ref("");
const tr1td2 = ref("");
const tr2td1 = ref("");
const tr2td2 = ref("");
const tr2td3 = ref("");
const tr3td1 = ref("");
const tr3td2 = ref("");
const tr3td3 = ref("");
const tr4td1 = ref("");
const tr4td2 = ref("");
const tr5td1 = ref("");
const tr5td2 = ref("");
const tr5td3 = ref("");
const tr6 = ref("");
const tr7 = ref("");
const tr8 = ref("");
const tr9 = ref("");

const tooltip = ref("");
const ltableData = reactive({
  caption: "xxx社团报名表",
  tr1td1: "院系",
  tr1td2: "专业",
  tr2td1: "姓名",
  tr2td2: "性别",
  tr2td3: "籍贯",
  tr3td1: "政治面貌",
  tr3td2: "民族",
  tr3td3: "身高/体重",
  tr4td1: "联系方式",
  tr4td2: "电子邮箱",
  tr5td1: "第一意愿",
  tr5td2: "第二意愿",
  tr5td3: "是否接受调剂",
  tr6: "兴趣爱好/个人特长",
  tr7: "个人经历(参与过的社团经历、社会实践等)",
  tr8: "曾获得的奖项",
  tr9: "个人优势",
});

onMounted(() => {});

// 保存
const onSave = () => {
  ElMessage({
    showClose: true,
    message: `已保存!`,
    type: "success",
  });
  ltableData.caption = caption.value.innerHTML;
  ltableData.tr1td1 = tr1td1.value.innerHTML;
  ltableData.tr1td2 = tr1td2.value.innerHTML;
  ltableData.tr2td1 = tr2td1.value.innerHTML;
  ltableData.tr2td2 = tr2td2.value.innerHTML;
  ltableData.tr2td3 = tr2td3.value.innerHTML;
  ltableData.tr3td1 = tr3td1.value.innerHTML;
  ltableData.tr3td2 = tr3td2.value.innerHTML;
  ltableData.tr3td3 = tr3td3.value.innerHTML;
  ltableData.tr4td1 = tr4td1.value.innerHTML;
  ltableData.tr4td2 = tr4td2.value.innerHTML;
  ltableData.tr5td1 = tr5td1.value.innerHTML;
  ltableData.tr5td2 = tr5td2.value.innerHTML;
  ltableData.tr5td3 = tr5td3.value.innerHTML;
  ltableData.tr6 = tr6.value.innerHTML;
  ltableData.tr7 = tr7.value.innerHTML;
  ltableData.tr8 = tr8.value.innerHTML;
  ltableData.tr9 = tr9.value.innerHTML;
};

// 打印
const onPrint = () => {
  const node = printContent.value;
  printJS({
    printable: node,
    type: "html",
    targetStyles: ["*"],
  });
};

// 下载
const onDownLoad = () => {
  var page = `<!DOCTYPE html><html><head><meta charset="UTF-8" http-equiv="Content-Type" >
     <style>
	    .newManager {
  margin-top: 15px;
  height: 100%;
  width: 100%;
  display: flex;
  .leftMain {
    position: relative;
    .card-title {
      margin-top: 10px;
    }
  }
  .rightMain {
    margin-left: 25px;
    margin-right: 15px;
    flex: 1;
    width: 100%;
    overflow: auto;
    .word-caption {
      font-size: 25px;
      text-align: center;
    }
    .word-table {
      width: 100%;
      text-align: center;
      margin-bottom: 200px;
      .word-td {
        width: 100px;
        height: 38px;
      }
      .word-td1 {
        width: 135px;
      }
      .word-td2 {
        width: 90px;
      }
    }
    .word-header {
      margin-bottom: 30px;
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
.card-title {
  height: 30px;
  line-height: 30px;
  margin-top: -5px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dfdede;
  span {
    margin-right: 222px;
  }
}
.card {
  width: 430px;
  .card-table {
    text-align: center;
    .card-tableMain {
      width: 100%;
      font-size: 12px;
      .tdtitle {
        text-align: center;
        width: 55px;
        height: 27px;
      }
      .td1 {
        height: 20px;
      }
      .td2 {
        width: 60px;
        height: 20px;
      }
      .td3 {
        height: 20px;
      }
    }
  }
}
.table-date {
  display: block;
  line-height: 30px;
  font-size: 12px;
}
table {
  border-collapse: collapse;
   border: 1px solid #3b3a3a;
}
td{
  border: 1px solid #3b3a3a;
  height: 10px;
}
	   </style>
    </head><body>
    ${printContent.value.innerHTML} 
    </body></html>`;
  var converted = htmlDocx.asBlob(page);
  saveAs(converted, "1.docx");
};

// 上传
const onUpload = () => {
  var page = `<!DOCTYPE html><html><head><meta charset="UTF-8" http-equiv="Content-Type" >
     <style>
	    .newManager {
        margin-top: 15px;
        height: 100%;
        width: 100%;
        display: flex;
        .leftMain {
          position: relative;
          .card-title {
            margin-top: 10px;
          }
        }
        .rightMain {
          margin-left: 25px;
          margin-right: 15px;
          flex: 1;
          width: 100%;
          overflow: auto;
          .word-caption {
            font-size: 25px;
            text-align: center;
          }
          .word-table {
            width: 100%;
            text-align: center;
            margin-bottom: 200px;
            .word-td {
              width: 100px;
              height: 38px;
            }
            .word-td1 {
              width: 135px;
            }
            .word-td2 {
              width: 90px;
            }
          }
        .word-header {
          margin-bottom: 30px;
          display: flex;
          flex-direction: row-reverse;
        }
        }
}
.card-title {
  height: 30px;
  line-height: 30px;
  margin-top: -5px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dfdede;
  span {
    margin-right: 222px;
  }
}
.card {
  width: 430px;
  .card-table {
    text-align: center;
    .card-tableMain {
      width: 100%;
      font-size: 12px;
      .tdtitle {
        text-align: center;
        width: 55px;
        height: 27px;
      }
      .td1 {
        height: 20px;
      }
      .td2 {
        width: 60px;
        height: 20px;
      }
      .td3 {
        height: 20px;
      }
    }
  }
}
.table-date {
  display: block;
  line-height: 30px;
  font-size: 12px;
}
table {
  border-collapse: collapse;
   border: 1px solid #3b3a3a;
}
td{
  border: 1px solid #3b3a3a;
  height: 10px;
}
	   </style>
    </head><body>
    ${printContent.value.innerHTML} 
    </body></html>`;
  console.log(page);
  updateWord({ text: page, uid: currentUser.uid }).then((res) => {
    console.log(res);
    if (res.data.msg == 200) {
      ElMessage({
        showClose: true,
        message: `操作成功！`,
        type: "success",
      });
    }
  });
};
const isHiddent = () => {
  isTable.value = !isTable.value;
};
</script>

