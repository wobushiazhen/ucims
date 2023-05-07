<template>
  <div class="home">
    <div class="home-card">
      <div class="memberCount">
        <el-card shadow="always">
          <div class="card-title">
            <span>部门数量</span>
            <el-button size="small" plain color="#626aef">年</el-button>
          </div>
          <div class="memberCountBox">
            <span> {{ getHomeDataList?.departmentCount }}</span>
            <img
              src="https://img95.699pic.com/xsj/0f/tt/to.jpg%21/fh/300"
              alt=""
            />
          </div>
          <div class="memberCountBox2">
            <span>总数：</span>
            <span>{{ getHomeDataList?.departmentCount }} </span>
          </div>
        </el-card>
      </div>
      <div class="memberCount">
        <el-card shadow="always">
          <div class="card-title">
            <span>新闻数量</span>
            <el-button size="small" plain color="#626aef">年</el-button>
          </div>
          <div class="memberCountBox">
            <span> {{ getHomeDataList?.newsCount }}</span>
            <img
              src="https://img1.baidu.com/it/u=1533090051,3866629679&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
              alt=""
            />
          </div>
          <div class="memberCountBox2">
            <span>总数：</span>
            <span> {{ getHomeDataList?.newsCount }}</span>
          </div>
        </el-card>
      </div>
      <div class="memberCount">
        <el-card shadow="always">
          <div class="card-title">
            <span>成员人数</span>
            <el-button size="small" plain color="#626aef">月</el-button>
          </div>
          <div class="memberCountBox">
            <span> {{ getHomeDataList?.memberCount }}</span>
            <img
              src="https://img0.baidu.com/it/u=1839314115,3313374202&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
              alt=""
            />
          </div>
          <div class="memberCountBox2">
            <span>总数：</span>
            <span> {{ getHomeDataList?.memberCount }}</span>
          </div>
        </el-card>
      </div>
      <div class="notice">
        <el-card class="box-card">
          <div class="card-title">社团活动记录</div>
          <div>
            <ul class="uciUl">
              <li v-for="(item, index) in getHomeDataList?.activities">
                <span :style="{ color: getColor(index + 1) }">
                  {{ index + 1 }}</span
                >
                &nbsp; {{ item.title }}
                {{ item.starttime }}
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
    <!-- <div>社团成员</div> -->
    <div class="echarts-box">
      <div id="myEcharts" :style="{ width: '100%', height: '420px' }"></div>
    </div>
    <div>下载量</div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.echarts-box {
  margin-top: -65px;
  width: 800px;
  /* padding: 10px 0px; */
  display: flex;
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
}
.notice {
  width: 400px;
  /* background: #000; */
  min-height: 300px;
  /* margin-left: 30px; */
}
.card-title {
  /* height: 30px; */
  line-height: 20px;
  margin-top: -10px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dfdede;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.echarts-box div .el-card {
  height: 200px;
}
.uciUl li {
  line-height: 30px;
  width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: -25px;
}
.uciUl li span {
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  color: #ecb40b;
}
.home-card {
  display: flex;
  justify-content: space-around;
}
.memberCount {
  width: 265px;
}
.memberCount img {
  width: 80px;
  height: 70px;
}
.memberCountBox {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-top: 10px; */
  span {
    font-size: 24px;
  }
}
.memberCountBox2 {
  margin-top: 10px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin-right: 55px;
}
</style>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { uInfo } from "@/stores/userinfo";
import * as echarts from "echarts";
import { getHomeData } from "@/api/home.js";
const { currentUser } = uInfo();
const getHomeDataList = ref(null);
const getActivities = ref(null);
const downloads = ref(null);
let myEcharts = echarts;
onMounted(async () => {
  await getHomeData(currentUser.uid).then((res) => {
    console.log(res.data);
    getHomeDataList.value = res.data;
    getActivities.value = res.data?.activities;
    downloads.value = res.data?.downloadsObj.map((item) => {
      return item.downloads;
    });
  });
  await initChart(downloads.value);
});

onUnmounted(() => {
  myEcharts.dispose;
});

function initChart(downloads) {
  console.log(downloads);
  let chart = myEcharts.init(
    document.getElementById("myEcharts"),
    "purple-passion"
  );
  chart.setOption({
    title: {
      text: "2023年各月份下载量（单位：次）",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
    },
    tooltip: {
      trigger: "axis",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: downloads,
        type: "line",
        smooth: true,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: "top",
              formatter: "{c}",
            },
          },
        },
      },
    ],
  });
  window.onresize = function () {
    chart.resize();
  };
}

// 社团活动记录列表前3颜色
function getColor(index) {
  switch (index) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "#ecb40b";
    case "未通过":
    default:
      return "black";
  }
}
</script>

