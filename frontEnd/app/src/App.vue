<!--
 * @Author: 黄灿民
 * @Date: 2020-11-08 09:44:53
 * @LastEditTime: 2020-11-09 14:04:15
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\App.vue
-->
<template>
  <div id="app">
    <div class="box" style=""></div>
    <refresh
      ref="refresh"
      @refreshEmit="refreshEmit"
    >
      <ul>
        <li v-for="item in mydata" :key="item.id">{{ item.name }}</li>
      </ul>
    </refresh>
  </div>
</template>

<script>
import axios from "axios";
import Refresh from "@/components/Refresh";
export default {
  name: "App",
  components: {
    Refresh,
  },
  data() {
    return {
      mydata: [],
    };
  },
  methods: {
    async refreshEmit() {
      console.log("refreshEmit -> refreshEmit")
      return await this.getInitData();
    },
    refreshEndEmit() {},
    async getInitData() {
      let result = await axios({
        baseURL: "/api",
        url: "/data",
        method: "post",
        data: {
          page: 1,
        },
      });
      this.mydata.splice(0, this.mydata.length);
      this.mydata.push(...result.data.user);
    },
  },
  async mounted() {
    console.log("mounted -> mounted")
    await this.getInitData();
  },
};
</script>

<style>
body {
  margin: 0;
}
.box {
  /* width: 100px; */
  height: 100px;
  background-color: #00acec;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul li {
  margin: 10px 0;
  background-color: #ccc;
  height: 40px;
  line-height: 40px;
}
</style>
